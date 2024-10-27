import { ref, unref } from 'vue';
import { useComposersApi } from '@/composables/useComposersApi';
import { usePaginated } from '@/composables/usePaginated';
import type { Composer } from '@/types/Composer';
import type { ComposerContact } from '@/types/ComposerContact';

type ComposerSorting = {
  field: keyof Composer | null,
  order: 'asc' | 'desc' | null,
}

export function useComposersList(perPage: number) {
  const composers = ref<Composer[]>([]);
  const searchText = ref('');
  const activeComposer = ref<Composer | null>(null);
  const activeComposerContact = ref<ComposerContact | null>(null);
  const activatedSorting = ref<ComposerSorting>({ field: null, order: null });

  const { fetchComposers, fetchComposer, fetchComposerContact } = useComposersApi();
  const {
    page,
    totalPages,
    pageItems,
    setItems,
    setPage,
  } = usePaginated<Composer>(perPage);

  const reloadComposers = async () => {
    if (!composers.value.length) {
      composers.value = await fetchComposers();
    }
    setItems(
      sortComposers(filterComposersByName(composers.value))
    );
    await activateComposer(composers.value[0].id);
  };

  const activateComposer = async (id: number) => {
    activeComposer.value = await fetchComposer(id);
    activeComposerContact.value = await fetchComposerContact(id);
  }

  const setSorting = async (field: keyof Composer) => {
    const order = activatedSorting.value.field === field && activatedSorting.value.order === 'asc' ? 'desc' : 'asc';
    activatedSorting.value = { field, order };

    await reloadComposers();
  }

  const sortComposers = (composers: Composer[]) => {
    if (activatedSorting.value.field === null) {
      return composers;
    }

    const sortedComposers = unref(composers).sort((a: Composer, b: Composer) => {
      const sortingField = activatedSorting.value.field ?? 'name';
      const aValue = a[sortingField];
      const bValue = b[sortingField];

      return activatedSorting.value.order === 'asc' ?
        String(aValue).localeCompare(String(bValue)) :
        String(bValue).localeCompare(String(aValue));
    });

    return sortedComposers;
  }

  const setFilter = async (text: string) => {
    searchText.value = text;
    await reloadComposers();
  }

  const filterComposersByName = (composers: Composer[]) => {
    if (searchText.value === '') {
      return composers;
    }
    return composers.filter((composer: Composer) => composer.name.toLowerCase().includes(searchText.value.toLowerCase()));
  }

  return {
    activePage: page,
    totalPages,
    setPage,
    composers: pageItems,
    activeComposer,
    activeComposerContact,
    reloadComposers,
    activateComposer,
    setSorting,
    setFilter,
  }
}
