<template>
  <q-card>
    <q-card-section @click="toggle_card_content()" class="bg-primary text-white">
      <div class="row">
        <div class="col-10">
          <div class="text-h6">Text analysis</div>
        </div>
        <div class="col-2">
          <i v-if="card_content" class="fa fa-caret-down" style="font-size:24px"></i>
          <i v-else class="fa fa-caret-up" style="font-size:24px"></i>
        </div>
      </div>
    </q-card-section>
    <div class="card-content" v-if="card_content">
      <div>
        <q-card-section class="my-card" v-for="(token, i) in word_freq_in()" :key="i">
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
      </div>
      <div>
        <q-card-section class="my-card" v-for="(token, i) in word_freq_out()" :key="i">
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
      </div>
    </div>
  </q-card>
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
  name: 'ExpenseTextAnalysis',
  data() {
    return {
      card_content: false
    };
  },
  methods: {
    toggle_card_content() {
      this.card_content = !this.card_content;
      console.log(this.card_content);
    },
    label(t: TokenizedAnalysis) {
      if (t.token_action == 'in') {
        if (t.token_total_amount) {
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
    word_freq_in() {
      console.log('here mani', this.$store.state.tokenized_analysis);
      return this.$store.state.tokenized_analysis.filter(
        (e: TokenizedAnalysis) => {
          return e.token_action === 'out';
        }
      );
    },
    word_freq_out() {
      return this.$store.state.tokenized_analysis.filter(
        (e: TokenizedAnalysis) => {
          return e.token_action === 'out';
        }
      );
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

