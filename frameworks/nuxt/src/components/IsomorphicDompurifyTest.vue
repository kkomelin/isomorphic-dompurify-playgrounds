<script setup>
import DOMPurify from "isomorphic-dompurify";
</script>

<template>
  <div>{{ DOMPurify.sanitize(`<a onclick="javascript:alert('test')" href="https://github.com/kkomelin/isomorphic-dompurify-playground">Test</a>`) }}</div>
</template>
