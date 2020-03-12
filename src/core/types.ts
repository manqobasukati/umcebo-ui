
type action = "in" | "out";



export enum localStorageKeys {
    transaction = "transaction",
    user = "user"
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
    balance:null|number
  }
  

export interface localStorageHandler{
    balance:number;
    get_user_balance():number;
    get_user(): null | User;
    add_transaction(transaction:Transaction):Promise<boolean>;
    edit_transaction(data?:Transaction):Promise<boolean>
}


