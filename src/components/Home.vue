<template>
  <div>
    <q-list v-for="(menuItem, index) in menuList" :key="index">
      <q-item clickable v-ripple v-bind:to="menuItem.url">
        <q-item-section avatar>
          <i v-bind:class="menuItem.icon"></i>
        </q-item-section>
        <q-item-section>{{ menuItem.label }}</q-item-section>
        <q-item-section>
          <i class="fa fa-caret-right"></i>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Vue from 'vue';
import { menuList } from 'src/config';

export default Vue.extend({
  name: 'Menu',
  data() {
    return {
      menuList: menuList
    };
  }
});
</script>

<style scoped>
.menuItem__icon {
  font-size: 30px;
  margin-left: 2px;
  margin-bottom: 3px;
}
.row {
  margin-top: 10px;
}
</style>