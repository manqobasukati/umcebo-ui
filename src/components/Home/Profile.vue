<template>
  <q-tab-panel name="name">
      <div class="text-h6">Profile</div>
    <div>Profile is where the heart is</div>
  </q-tab-panel>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name:'Profile',
    props:['name']
})
</script>

<style>

</style>