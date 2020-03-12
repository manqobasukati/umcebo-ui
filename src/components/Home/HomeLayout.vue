<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-tabs v-model="tab">
        <q-tab name="home" label="Home" />
        <q-tab name="profile" label="Summary" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-tab-panels v-model="tab" animated>
        <home name="home" />
        <profile name="profile" />
      </q-tab-panels>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Home from './Home.vue';
import Profile from './Profile.vue';

import Vue from 'vue';

export default Vue.extend({
  name: 'HomeLayout',
  components: {
    home: Home,
    profile: Profile
  },
  data() {
    return {
      tab: 'home'
    };
  }
});
</script>

<style>
</style>