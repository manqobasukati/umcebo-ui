<template>
  <q-tab-panel name="name">
    <div v-if="userTransactions">
      <q-card class="my-card" v-for="(transaction, i) in userTransactions" :key="i">
        <q-card-section>
          <div class="row">
            <div class="col-2">{{transaction.action}}</div>
            <div class="col-6">
              <p>{{transaction.description}}</p>
              <p>{{transaction.date}}</p>
            </div>
            <div class="col-4">{{transaction.amount}}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <q-card class="my-card">
          <q-card-section>
              <p>No transactions</p>
          </q-card-section>
      </q-card>
    </div>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-6">
            <p>Balance</p>
          </div>
          <div class="col-4">{{getUserBalance}}</div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          ...
          <div class="col-2">
            <q-input v-model="transactionData.action" label="action"></q-input>
          </div>
          <div class="col-4">
            <q-input v-model="transactionData.description" label="description"></q-input>
          </div>
          <div class="col-4">
            <q-input type="number" v-model="transactionData.amount" label="amount"></q-input>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-btn
      text-color="white"
      color="primary"
      @click="addUserTransaction()"
      label="add transaction"
    />
  </q-tab-panel>
</template>
<script lang="ts">
import Vue from 'vue';
import { Transaction, User } from '../../core/types';
import { getAllTransactions } from '../../core/transactions';
import { ls } from '../../core/local_storage_handler';
import { mapState } from 'vuex';
import { MUTATIONS, ACTIONS , GETTERS } from '../../store/index';
import state from '../../store/module-example/state';

export default Vue.extend({
  name: 'Home',
  created() {
    //ls.get_user_balance();
    //ls.add_dumby();
  },
  methods: {
    [MUTATIONS.set_user_balance]() {
      this.$store.commit(
        MUTATIONS.set_user_balance,
        this.$data.transactionData.amount
      );
    },
    addUserTransaction() {
      const payload: Transaction = {
        id: 1,
        date: new Date(),
        action: this.$data.transactionData.action,
        description: this.$data.transactionData.description,
        amount: parseFloat(this.$data.transactionData.amount)
      };
      this.$store.commit(MUTATIONS.add_transaction, payload);
     
    }
  },
  computed: {
    userTransactions() {
      console.log(" userTransactions")

      if( this.$store.getters.get_all_transaction){
      const t:any = this.$store.getters.get_all_transaction.transactions.filter(
        (transaction: Transaction) => {
          return transaction != null;
        }
      );
      return t;
      }
      return [{id:1,amount:0,description:'Enter transactions',date:new Date()}];
    },
    getUserBalance(): any {
      
      if(this.$store.state.balance){
        const balance = this.$store.getters.get_user_balance;
        return balance;
      }else{

        return ls.get_user_balance();
      }
    }
  },
  props: ['name'],
  data() {
    return {
      transactionData: {
        action: null,
        amount: null,
        description: null
      }
    };
  }
});
</script>

<style scoped>
.my-card {
  margin-top: 5px;
  border-radius: 0px;
}
</style>