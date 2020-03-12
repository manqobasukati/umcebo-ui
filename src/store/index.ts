import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { RootState, User } from '../core/types'
import { ls } from '../core/local_storage_handler'
import { stat } from 'fs'
import state from './module-example/state'



// import example from './module-example'

Vue.use(Vuex)


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export enum GETTERS {
  get_all_transactions = "get_all_transaction",
  get_user_balance = "get_user_balance"

}

export enum MUTATIONS {
  add_transaction = "add_transcation",
  set_user_balance = "set_user_balance",
  edit_transaction = "edit_transaction"
}

export enum ACTIONS {
  add_transaction = "add_transaction"
}


export default function () {
  const Store = new Vuex.Store({
    state: {
      user: null as null | User,
      balance: null as null | number
    } as RootState,
    mutations: {
      [MUTATIONS.add_transaction](state, payload) {

        const add_user = ls.add_transaction(payload);
        if (add_user) {
          state.user = ls.get_user();
          state.balance = ls.get_user_balance();
        }
      },
      [MUTATIONS.set_user_balance](state, payload) {
      
        state.balance = payload;
      },
      [MUTATIONS.edit_transaction](state,payload){
        const add_user = ls.edit_transaction(payload);
        if (add_user) {
          state.user = ls.get_user();
          state.balance = ls.get_user_balance();
        }
      }
    },
    actions: {
      [ACTIONS.add_transaction](context, payload) {

        context.commit(MUTATIONS.add_transaction, payload)
      }
    },
    getters: {
      [GETTERS.get_all_transactions](state) {
        state.user = ls.get_user();
        return state.user //|| { id: 0, name: 'manqoba', transactions: [{ id: 0, description: 'dumb', amount: 0, date: new Date() }] };
      },
      [GETTERS.get_user_balance](state) {
        state.balance = ls.get_user_balance();
        return state.balance;
      }
    },
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.DEV
  })
  return Store;
}

