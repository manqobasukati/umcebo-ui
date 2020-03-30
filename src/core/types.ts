
type action = "in" | "out";

export enum BACKEND_SERVICES {
    get_word_freq_response='get_word_freq_response'
}


export enum localStorageKeys {
    transaction = "transaction",
    user = "user"
}

export interface TokenizedAnalysis{
    token_action?:string,
    token_count?:number,
    token_name?:string,
    token_total_amount?:number
}
export interface User{
    id:number,
    name:string,
    transactions:Transaction[]
}

export interface Transaction{
    id:number;
    date?:Date|string,
    action?:action,
    description?:string,
    amount?:number
}

export interface RootState{
    user:null|User,
    balance:null|number,
    tokenized_analysis:null | TokenizedAnalysis[]
  }
  

export interface localStorageHandler{
    balance:number;
    get_user_balance():number;
    get_user(): null | User;
    add_transaction(transaction:Transaction):Promise<boolean>;
    edit_transaction(data?:Transaction):Promise<boolean>
}


