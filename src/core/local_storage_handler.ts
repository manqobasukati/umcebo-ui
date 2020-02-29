import {
    Transaction,
    localStorageHandler,
    User,
    localStorageKeys
} from "./types";



class localStorageHandlerClass implements localStorageHandler {
    public balance: number = 0;

    public get_user_balance(): number {
        let total_in: number = 0;
        let total_out: number = 0;
        const transactions = this.get_user();

        

        if (transactions !== null ) {
            for (let i = 0; i <= transactions.transactions.length - 1; i++) {
              
                if (transactions.transactions[i].action === "in") {

                    total_in = total_in + transactions.transactions[i].amount;
                    
                }
                if (transactions.transactions[i].action === "out") {

                    total_out = total_out + transactions.transactions[i].amount;
                   
                }
            }
            this.balance = total_in - total_out;
            return this.balance;
        }else{
            return this.balance
        }

        

        //console.log(`Total in = ${total_in}, Total_out = ${total_out} and balance = ${this.balance}`)
       
    }
    public get_user(): null | User {

        const user_as_string = localStorage.getItem(localStorageKeys.user);
        if (user_as_string) {
            const transactions: User = JSON.parse(user_as_string);
            return transactions;
        }
        return null;
    };

    public async add_transaction(transaction: Transaction):Promise<boolean>{

        
        const user = localStorage.getItem(localStorageKeys.user);
        if (user) {
            const item: User = JSON.parse(user);
            item.transactions.push(transaction);
            localStorage.setItem(localStorageKeys.user, JSON.stringify(item));
            return true;
            
        }else{
            const t: User = {
                id: 1,
                name: "Manqoba",
                transactions: [transaction]
            }
            localStorage.setItem(localStorageKeys.user,  JSON.stringify(t));
            return true;
        }

        return false;
    }

    public add_dumby() {

        const t: User = {
            id: 1,
            name: "Manqoba",
            transactions: [
                {
                    id: 1,
                    date: new Date(),
                    action: "in",
                    description: "salary",
                    amount: 3000

                }
            ]
        }
        try {

            localStorage.setItem(localStorageKeys.user, JSON.stringify(t));
            // console.log("I am here")
        } catch (e) {
            console.error("HERE", e)
        }
    }
}

export const ls: localStorageHandlerClass = new localStorageHandlerClass();


