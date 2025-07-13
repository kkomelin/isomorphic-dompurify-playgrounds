<script lang="ts">
import DOMPurify from "isomorphic-dompurify";
</script>

<div>{DOMPurify.sanitize(`<a onclick="javascript:alert('test')" href="https://svelte">Test</a>`)}</div>
