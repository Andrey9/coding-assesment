<script setup lang="ts">
import ComposerListItem from '@/components/composer/ComposerListItem.vue';
import type { Composer } from '@/types/Composer';
import { ref } from 'vue';

defineProps<{
  composers: Composer[];
  totalPages: number;
  activePage: number;
}>();

const emit = defineEmits<{
  (e: 'activateComposer', id: number): void;
  (e: 'setPage', page: number): void;
  (e: 'sort', field: string): void;
  (e: 'setFilter', text: string): void;
}>();

const searchText = ref('');

function activateComposer(id: number) {
  emit('activateComposer', id);
}
function setPage(page: number) {
  emit('setPage', page);
}
function sort(field: keyof Composer) {
  emit('sort', field);
}
function filter(text: string) {
  emit('setFilter', text);
}
</script>

<template>
  <div>
    <div>
      <input
        v-model="searchText"
        type="text"
        placeholder="Search Composers"
        class="search-input"
        @input="filter(searchText)"
      />
    </div>
    <table class="composer-list">
      <thead>
      <tr>
        <th
          class="cursor-pointer"
          @click="sort('name')"
        >
          Composer Name
        </th>
        <th
          class="cursor-pointer"
          @click="sort('dateOfBirth')"
        >
          Date of Birth
        </th>
      </tr>
      </thead>
      <tbody>
        <ComposerListItem
          v-for="(composer, i) in composers"
          :key="i"
          :composer="composer"
          @click="activateComposer(composer.id)"/>
      </tbody>
    </table>

    <div class="mt-5">
      <button
        v-for="(p, i) in totalPages"
        @click="setPage(i)"
        class="page-number-btn rounded bg-zinc-100 py-2 px-3 mr-2 text-zinc-600"
        :class="{'bg-zinc-200 text-blue-600': i === activePage}"
      >
        {{ p }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
