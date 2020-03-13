<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-btn dense flat round icon="menu" @click="left = !left" />
    </q-header>
    <q-drawer 
      v-model="left" 
      side="left" 
      :width="200"
      behavior="mobile" 
      content-class="bg-grey-3"
      bordered>
      <q-scroll-area class="fit">
          <q-list v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable active="menuItem.label === 'Expenditure'" v-ripple>
              <q-item-section avatar>
                <i v-bind:class="menuItem.icon"></i>
              </q-item-section>
              <q-item-section>
                    {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </q-list>
      </q-scroll-area>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <h1>Helloo</h1>
      <router-view ></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Home from './Home.vue';
import Profile from './Profile.vue';

import Vue from 'vue';

const menuList = [
   {
    icon:'fas fa-home',
    label:'Home'
  },
  {
    icon:'fas fa-air-freshener',
    label:'Budget'
  },
  {
    icon:'',
    label:'Expenditure'
  },
  {
    icon:'',
    label:'loan'
  },
  {
    icon:'fas fa-seedling',
    label:'Invest & Save'
  },
  {
    icon:'',
    label:'Stokvel'
  },
  
]

export default Vue.extend({
  name: 'HomeLayout',
  data() {
    return {
      tab: 'home',
      left: false,
      menuList:menuList
    };
  }
});
</script>

<style>
</style>