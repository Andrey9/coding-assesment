<script setup>
import ComposerProfile from '@/components/composer/ComposerProfile.vue';
import ComposersList from '@/components/composer/ComposersList.vue';
import { useComposersList } from '@/composables/useComposersList.ts';
import { onMounted } from 'vue';

const pageSize = 20;

const {
  activePage,
  totalPages,
  setPage,
  composers,
  activeComposer,
  activeComposerContact,
  activateComposer,
  reloadComposers,
  setSorting,
  setFilter,
} = useComposersList(pageSize);

onMounted(async () => {
  await reloadComposers();
});

</script>

<template>
	<main class="mx-auto mb-20">
    <ComposerProfile
      :composer-contact="activeComposerContact"
      :composer="activeComposer"
    />
    <ComposersList
      :composers="composers"
      :total-pages="totalPages"
      :active-page="activePage"
      @set-page="setPage"
      @activate-composer="activateComposer"
      @sort="setSorting"
      @setFilter="setFilter"
    />
	</main>
</template>

<style lang="scss">

main {
	width: 1280px;
}

.composer-detail {
	background: darken(whitesmoke, 20%);
	//height: 400px;

	.profile {
		.profile-img {
			filter: grayscale(1);
		}
	}
	.name {
		font-size: 1.4em;
		font-weight: bold;
	}
}

.composer-list {
	width: 100%;
	thead tr {
		background: darken(whitesmoke, 20%);
	}
	th {
		font-weight: bold;
		font-size: 1.1em;
	}
	.item {
		transition: background .5s ease;
		&:nth-child(even) {
			background: whitesmoke;
		}
		&:hover {
			background: darken(whitesmoke, 8%);
		}
	}
}

.page-number-btn {
	font-weight: bold;
	transition: background .5s ease;
	&:hover {
		background: darken(whitesmoke, 8%);
	}
}

.item-label {
	font-weight: 600;
}

h4, h5 {
	font-weight: bold;
}

h4 {
	font-size: 1.2em;
}

</style>
