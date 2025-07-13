<script lang="ts">
import DOMPurify from "isomorphic-dompurify";
</script>


<div>{DOMPurify.sanitize(`<a onclick="javascript:alert('test')" href="https://github.com/kkomelin/isomorphic-dompurify-playground">Test</a>`)}</div>

