<template>
  <q-tab-panel name="name">
    <div v-for="(token, i) in word_freq()" :key="i">
      <q-card class="my-card" v-if="token.token_action === 'in'">
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-9">
                    <q-linear-progress rounded size="20px" :value="ratio_form(token)" color="green">
                      <div class="absolute-full flex flex-center">
                        <q-badge rounded color="white" text-color="green" :label="label(token)" />
                      </div>
                    </q-linear-progress>
                  </div>
                  <div class="col-2">
                    <p>{{token.token_name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
     

      <q-card class="my-card" v-else-if="token.token_action === 'out'">
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-9">
                  <q-linear-progress rounded size="20px" :value="ratio_form(token)" color="red">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="red" :label="label(token)" />
                    </div>
                  </q-linear-progress>
                </div>
                <div class="col-2">
                  <p>{{token.token_name}}</p>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
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

export default Vue.extend({
  name: 'ExpenditureAnalysis',
  props: ['name'],
  mounted() {
    console.log('Total in', this.total_in());
    console.log('Total in', this.total_out());
  },
  data() {
    return {
      progress1: 0.5
    };
  },
  methods: {
    label(t: TokenizedAnalysis) {
      if (t.token_action == 'in') {
        if (t.token_total_amount) {
          console.log(t.token_total_amount / this.total_in());
          return `${t.token_total_amount} / ${this.total_in()}`;
        }
      }
      if (t.token_action == 'out') {
        if (t.token_total_amount) {
          console.log(t.token_total_amount / this.total_out());
          return `${t.token_total_amount} / ${this.total_in()}`;
        }
      }
    },
    word_freq() {
      console.log('here mani', this.$store.state.tokenized_analysis);
      return this.$store.state.tokenized_analysis;
    },
    total_in() {
      let sumOfIn = 0;
      let allIn = this.$store.state.user.transactions.filter(
        (t: Transaction) => {
          return t.action == 'in';
        }
      );

      allIn.forEach((element: Transaction) => {
        if (element.amount) {
          sumOfIn = sumOfIn + element.amount;
        }
      });

      return sumOfIn;
    },
    ratio_form(t: TokenizedAnalysis) {
      if (t.token_action == 'in') {
        if (t.token_total_amount) {
          console.log(t.token_total_amount / this.total_in());
          return t.token_total_amount / this.total_in();
        }
      }

      if (t.token_action == 'out') {
        if (t.token_total_amount) {
          console.log(t.token_total_amount / this.total_out());
          return t.token_total_amount / this.total_out();
        }
      }
    },
    total_out() {
      let sumOfOut = 0;
      let allOut = this.$store.state.user.transactions.filter(
        (t: Transaction) => {
          return t.action == 'out';
        }
      );
      allOut.forEach((element: Transaction) => {
        if (element.amount) {
          sumOfOut = sumOfOut + element.amount;
        }
      });

      return sumOfOut;
    }
  }
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