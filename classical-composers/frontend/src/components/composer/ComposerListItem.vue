<script setup lang="ts">
import type { Composer } from '@/types/Composer';

defineProps<{
  composer: Composer;
}>();
</script>

<template>
  <tr
      class="item cursor-pointer"
  >
    <td class="p-2">{{ composer.name }}</td>
    <td class="p-2">{{ composer.dateOfBirth }}</td>
  </tr>
</template>

<style scoped lang="scss">

</style>
