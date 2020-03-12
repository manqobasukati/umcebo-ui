<template>
  <q-tab-panel name="name">
    <div class="text-h6">Summary</div>
    <q-btn label="clear storage" @click="clearStorage()"></q-btn>
    <div></div>
  </q-tab-panel>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Profile',
  props: ['name'],
  methods: {
    clearStorage() {
      localStorage.clear();
      this.$q.notify({
        message: 'Storage cleared.',
        color: 'primary'
      });
    
    }
  }
});
</script>

<style>
</style>