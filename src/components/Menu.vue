<template>
  <div class="row">
      <h1>Hello world</h1>
    <div v-for="(menuItem,index) in  menuList" :key="index" class="col-2"></div>
  </div>
</template>

<script>
import Vue from 'vue';

const menuList = [
  {
    icon: 'fas fa-home',
    label: 'Home'
  },
  {
    icon: '',
    label: 'Budget'
  },
  {
    icon: '',
    label: 'Expenditure'
  },
  {
    icon: '',
    label: 'loan'
  },
  {
    icon: 'fas fa-seedling',
    label: 'Invest & Save'
  },
  {
    icon: '',
    label: 'Stokvel'
  }
];

export default Vue.extend({
  name: 'Menu',
  data() {
    return {
      menuList: menuList
    };
  }
});
</script>

<style>
</style>