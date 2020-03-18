<template>
  <div class="comp-wrap">
    <div v-if="userTransactions">
      <q-card class="my-card" v-for="(transaction, i) in userTransactions" :key="i">
        <q-card-section>
          <div class="row">
            <div class="col-1">
              <i v-if="transaction.action === 'in'" class="fas fa-arrow-right"></i>
              <i v-else-if="transaction.action === 'out'" class="fas fa-arrow-left"></i>
            </div>
            <div class="col-7">
              <p>{{transaction.description}}</p>
              <p class="transaction__date">{{transaction.date}}</p>
            </div>
            <div class="col-3">
              <p>E {{transaction.amount}}</p>
              <p>
                <q-btn @click="edit()" label="edit" text-color="red" no-caps />
              </p>
            </div>
          </div>
        </q-card-section>
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
              <q-btn
                flat
                @click="editUserTransaction(transaction.id)"
                label="submit"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
    <div v-else>
      <q-card class="my-card">
        <q-card-section>
          <p>No transactions</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script  lang="ts">
import Vue from 'vue';
import { Transaction, User } from '../../core/types';
import { MUTATIONS, ACTIONS } from '../../store/index';
import state from '../../store/module-example/state';

export default Vue.extend({
  methods: {
    editUserTransaction(id: number) {
      console.log('Here:', id);
      const payload: Transaction = {
        id: id,
        date: String(new Date()).slice(0, 15),
        action: this.$data.transactionData.action.trim(),
        description: this.$data.transactionData.description,
        amount: parseFloat(this.$data.transactionData.amount)
      };
      this.$store.commit(MUTATIONS.edit_transaction, payload);
      this.$data.alert = !this.$data.alert;
    },
    edit() {
      this.$data.alert = !this.$data.alert;
    }
  },
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
  },
  computed: {
    userTransactions() {
      if (this.$store.getters.get_all_transaction) {
        const t: any = this.$store.getters.get_all_transaction.transactions.filter(
          (transaction: Transaction) => {
            return transaction != null;
          }
        );
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
    }
  }
});
</script>

<style>
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