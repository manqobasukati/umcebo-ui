<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState }from '../src/core/types'

export default Vue.extend({
  name: "App"
});
</script>
