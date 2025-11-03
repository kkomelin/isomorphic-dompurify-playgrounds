import { expect, test } from "@playwright/test";
import { spawn } from "child_process";
import { promisify } from "util";
import { createServer } from "net";

const sleep = promisify(setTimeout);

const frameworks = ["astro", "next", "nuxt", "react", "svelte"];

// Find an available port dynamically
const getAvailablePort = () => {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);

    server.listen(0, () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });
  });
};

// Check if server is ready by attempting to fetch the URL
const waitForServer = async (port, timeoutMs = 60000) => {
  const startTime = Date.now();
  const url = `http://localhost:${port}/`;

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      }
    } catch (error) {
      // Server not ready yet, continue polling
    }
    await sleep(500); // Poll every 500ms
  }

  throw new Error(`Server on port ${port} did not start within ${timeoutMs}ms`);
};

const runFramework = (name, port) => {
  // Spawn without shell: true to avoid extra process layers
  const instance = spawn("pnpm", [
    "--filter",
    name,
    "dev",
    "--port",
    port.toString(),
  ], {
    stdio: "ignore",
    detached: true, // Create new process group for easier cleanup
  });

  // Track if spawn failed
  instance.on("error", (error) => {
    console.error(`Failed to start ${name}:`, error);
  });

  return instance;
};

const stopFramework = async (instance) => {
  if (!instance || instance.killed) {
    return;
  }

  try {
    // Kill the entire process group (negative PID)
    // This ensures all child processes (pnpm -> vite/next/etc) are killed
    if (instance.pid) {
      process.kill(-instance.pid, "SIGTERM");
    }

    // Wait for process to exit, with timeout
    const exitPromise = new Promise((resolve) => {
      instance.on("exit", resolve);
    });

    const timeoutPromise = sleep(5000).then(() => {
      // Force kill if not exited after 5 seconds
      if (!instance.killed && instance.pid) {
        try {
          process.kill(-instance.pid, "SIGKILL");
        } catch (error) {
          // Process may already be dead
        }
      }
    });

    await Promise.race([exitPromise, timeoutPromise]);

    // Give port time to be released
    await sleep(1000);
  } catch (error) {
    // Process may already be dead, which is fine
    if (error.code !== "ESRCH") {
      console.error("Error stopping framework:", error);
    }
  }
};

for (let framework of frameworks) {
  test.describe(framework, () => {
    test(`should display sanitized text`, async ({ page }) => {
      let instance = null;
      let port = null;

      try {
        // Get an available port dynamically
        port = await getAvailablePort();

        instance = runFramework(framework, port);

        // Wait for server to be ready (not for it to exit!)
        await waitForServer(port);

        await page.goto(`http://localhost:${port}/`);
        const text = page.getByText(
          `<a href="https://${framework}">${framework}</a>`
        );
        await expect(text).toBeVisible();
      } finally {
        // Always clean up, even if test fails
        if (instance) {
          await stopFramework(instance);
        }
      }
    });
  });
}
