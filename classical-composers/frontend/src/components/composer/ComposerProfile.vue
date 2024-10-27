<script setup lang="ts">
  import type { Composer } from '@/types/Composer';
  import type { ComposerContact } from '@/types/ComposerContact';

  defineProps<{
    composer?: Composer;
    composerContact?: ComposerContact;
  }>();
</script>

<template>
  <div class="composer-detail flex rounded mt-10 mb-10 p-4">
    <div class="profile ">
      <img :src="composer?.img" class="profile-img rounded"/>
    </div>
    <div class="details flex flex-row ml-5">
      <div class="person-details mr-10">
        <h2 class="name">{{ composer?.name }}</h2>

        <div><span class="item-label">Born</span>: {{ composer?.dateOfBirth }}</div>
      </div>
      <div class="contact-details">
        <h4>Contact Info</h4>

        <div>
          <div><span class="item-label">Phone Number</span>: {{ composerContact?.phone }}</div>
          <div><span class="item-label">Email</span>: {{ composerContact?.email }}</div>

          <h5 class="mt-3">Address</h5>

          <div>
            {{ composerContact?.address?.streetAddr }}<br />
            {{ composerContact?.address?.city }}, {{ composerContact?.address?.stateCode }}, {{ composerContact?.address?.postalcode }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
