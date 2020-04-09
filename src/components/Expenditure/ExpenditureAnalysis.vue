<template>
  <q-tab-panel name="name">
      <expense-text-analysis/>
  </q-tab-panel>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  BACKEND_SERVICES,
  TokenizedAnalysis,
  Transaction
} from '../../core/types';
import { ACTIONS, GETTERS } from '../../store';
import ExpenseTextAnalysis from '../Expenditure/ExpenseTextAnalysis.vue'

export default Vue.extend({
  name: 'ExpenditureAnalysis',
  components:{
    ExpenseTextAnalysis
  },
  props:["name"]
});
</script>

<style scoped>
.my-card {
  margin-top: 5px;
  border-radius: 0px;
}
p.transaction__date {
  color: grey;
  font-size: 10px;
}
i.fa-arrow-right {
  color: rgb(31, 185, 31);
}

i.fa-arrow-left {
  color: rgb(189, 38, 38);
}
</style>