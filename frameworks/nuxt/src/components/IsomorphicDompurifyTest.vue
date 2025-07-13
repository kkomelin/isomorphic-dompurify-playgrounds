<script setup>
import DOMPurify from "isomorphic-dompurify";
</script>

<template>
  <div>{{ DOMPurify.sanitize(`<a onclick="javascript:alert('test')" href="https://nuxt">Test</a>`) }}</div>
</template>
