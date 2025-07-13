import { expect, test } from "@playwright/test";
import { spawn } from "child_process";

const frameworks = [
  { name: "astro", port: 3000 },
  { name: "next", port: 3001 },
  { name: "nuxt", port: 3002 },
  { name: "react", port: 3003 },
  { name: "svelte", port: 3004 },
];

test.beforeAll(async () => {
  for (let framework of frameworks) {
    const instance = spawn(
      "pnpm",
      [`${framework.name}:dev`, `--port=${framework.port}`],
      { stdio: "ignore" }
    );
    framework.instance = instance;
  }

  await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for server to start
});

test.afterAll(() =>
  frameworks.forEach((framework) => framework.instance.kill())
);

for (let framework of frameworks) {
  test.describe(framework.name, () => {
    test(`should display sanitized text`, async ({ page }) => {
      await page.goto(`http://localhost:${framework.port}/`);
      const text = await page.getByText(
        `<a href="https://${framework.name}">${framework.name}</a>`
      );
      await expect(text).toBeVisible();
    });
  });
}
