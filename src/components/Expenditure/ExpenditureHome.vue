<template>
  <q-tab-panel name="name">
    <user-transactions />
    <q-card class="my-card">
      <q-card-section>
        <div class="row user__balance">
          <div class="col-1"></div>
          <div class="col-7">
            <p>Balance</p>
          </div>
          <div  class="col-3 ">E {{getUserBalance}}</div>
        </div>
      </q-card-section>
    </q-card>
    <q-btn text-color="white" color="primary" class="add-btn" @click="add()" label="+" />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <q-select v-model="transactionData.action" :options="actionOptions" label="action"></q-select>
        </q-card-section>

        <q-card-section>
          <q-input v-model="transactionData.description" label="description"></q-input>
        </q-card-section>
        <q-card-section>
          <q-input type="number" v-model="transactionData.amount" label="amount"></q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat @click="addUserTransaction()" label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-tab-panel>
</template>
<script lang="ts">
import Vue from 'vue';
import UserTransactions from '../Expenditure/UserTransactions.vue';
import { Transaction } from '../../core/types';
import { getAllTransactions } from '../../core/transactions';
import { ls } from '../../core/local_storage_handler';
import { MUTATIONS, ACTIONS } from '../../store/index';
import state from '../../store/module-example/state';

export default Vue.extend({
  name: 'ExpenditureHome',
  components: {
    UserTransactions
  },
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
        id:Math.floor(Math.random() * 10),
        date: String(new Date()).slice(0,15),
        action: (this.$data.transactionData.action).trim(),
        description: this.$data.transactionData.description,
        amount: parseFloat(this.$data.transactionData.amount)
      };
      this.$store.commit(MUTATIONS.add_transaction, payload);
      this.$data.alert = !this.$data.alert;
      this.$data.transactionData.action = '';
      this.$data.transactionData.description = '';
      this.$data.transactionData.amount = '';
    },
    add() {
      this.$data.alert = !this.$data.alert;
    }
  },
  computed: {
    userTransactions() {
      if (this.$store.getters.get_all_transaction) {
        const t: any = this.$store.getters.get_all_transaction.transactions.filter(
          (transaction: Transaction) => {
            return transaction != null;
          }
        );
        console.log(t)
        return t;
      }
      return [
        {
          id: 1,
          amount: 0,
          description: 'Enter transactions',
          date: new Date()
        }
      ];
    },
    getUserBalance(): any {
      if (this.$store.state.balance) {
        const balance = this.$store.getters.get_user_balance;

        return balance;
      } else {
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
      },
      alert: false,
      actionOptions: ['in', 'out']
    };
  }
});
</script>

<style scoped>
.my-card {
  margin-top: 5p;
  border-radius: 0px;
}
.user__balance{
  font-weight: 500;
}
.add-btn {
  margin-right: 65%;
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  border-radius: 50px;
  font-size: 20px;
}
</style>