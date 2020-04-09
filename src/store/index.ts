import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { RootState, User, TokenizedAnalysis } from '../core/types'
import { ls } from '../core/local_storage_handler'
import { get_word_freq_response } from  '../core/request_handler'
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
  get_user_balance = "get_user_balance",
  get_word_freq_response='get_word_freq_response'
}

export enum MUTATIONS {
  add_transaction = "add_transcation",
  set_user_balance = "set_user_balance",
  edit_transaction = "edit_transaction",
  set_tokenized_analysis = "set_tokenized_analysis"
}

export enum ACTIONS {
  add_transaction = "add_transaction",
  set_tokenized_analysis = "set_tokenized_analysis"
}


export default function () {
  const Store = new Vuex.Store({
    state: {
      user: null as null | User,
      balance: null as null | number,
      tokenized_analysis:null as null | TokenizedAnalysis[]
    } as RootState,
    mutations: {
      [MUTATIONS.add_transaction](state, payload) {

        const add_user = ls.add_transaction(payload);
        if (add_user) {
          state.user = ls.get_user();
          state.balance = ls.get_user_balance();
        }
      },
      async [MUTATIONS.set_tokenized_analysis](state){
          await state.user?.transactions
          if(state.user?.transactions){
            state.tokenized_analysis = await get_word_freq_response(state.user?.transactions);
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
      },
     [ACTIONS.set_tokenized_analysis](context){
        
       context.commit(MUTATIONS.set_tokenized_analysis)
        
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
      },
      [GETTERS.get_word_freq_response](state){
        return state.tokenized_analysis
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

