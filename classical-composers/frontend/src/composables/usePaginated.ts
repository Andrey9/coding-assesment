import { computed, ref } from 'vue';

export function usePaginated<T>(perPage: number) {
  const items = ref<T[]>([]);
  const pageIndex = ref(0);
  const page = computed(() => pageIndex.value + 1);

  const totalPages = computed(() => Math.ceil(items.value.length / perPage));
  const pageItems = computed(() => {
    const start = pageIndex.value * perPage;
    return items.value.slice(start, start + perPage);
  });

  const setItems = (newItems: T[]) => {
    items.value = newItems;
    pageIndex.value = 0;
  };

  const setPage = (newPage: number) => {
    pageIndex.value = newPage;
  };

  return {
    page: pageIndex,
    pageItems,
    totalPages,
    perPage,
    setItems,
    setPage,
  };
}
