<template>
  <q-layout view="lHh Lpr lFf">
    <q-tabs v-model="tab">
      <q-tab name="ExpenditureHome" label="Expenditure" />
      <q-tab name="ExpenditureAnalysis" label="Analysis" />
    </q-tabs>

    <q-page-container>
      <q-tab-panels v-model="tab" animated>
        <expenditure-home name="ExpenditureHome" />
        <expenditure-analysis name="ExpenditureAnalysis" />
      </q-tab-panels>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import ExpenditureHome from './ExpenditureHome.vue'
import ExpenditureAnalysis from './ExpenditureAnalysis.vue'

import Vue from 'vue';

export default Vue.extend({
  name: 'ExpenditureHomeLayout',
  components: {
    ExpenditureHome: ExpenditureHome,
    ExpenditureAnalysis: ExpenditureAnalysis
  },
  data() {
    return {
      tab: 'ExpenditureHome'
    };
  }
});
</script>

<style>
</style>