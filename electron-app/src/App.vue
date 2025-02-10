<script setup lang="ts">
  import { ref } from 'vue'
  import { useCounterStore } from './store'

  const counter = useCounterStore()
</script>

<template>
  <div style="text-align: center; padding: 20px">
    <a-button type="primary" @click="counter.increment">增加</a-button>
    <p>当前计数：{{ counter.count }}</p>
  </div>
</template>
