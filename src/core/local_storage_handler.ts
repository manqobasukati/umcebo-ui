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



        if (transactions) {

            for (let i = 0; i <= transactions.transactions.length - 1; i++) {


                if (transactions.transactions) {

                    if (transactions.transactions[i].action === "in") {

                        // @ts-ignore
                        total_in = total_in + transactions.transactions[i].amount;

                    }
                    if (transactions.transactions[i].action === "out") {
                        // @ts-ignore
                        total_out = total_out + transactions.transactions[i].amount;

                    }


                }

            }
            this.balance = total_in - total_out;
            return this.balance;
        } else {
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

    public async  edit_transaction(data:Transaction):Promise<boolean> {
        //first get user
        const user: User | null = this.get_user();
        if(user !== null){
            user.transactions.forEach((transaction: Transaction) => {

              
                    if (transaction.id == data.id) {
                        
                        transaction.amount = data.amount;
                        transaction.description = data.description;
                        transaction.action = data.action;
                        transaction.date = data.date;
                        
                    }

                
            })
            
            localStorage.setItem(localStorageKeys.user,JSON.stringify(user))
        }


        
      
        return false;
    }


    public async add_transaction(transaction: Transaction): Promise<boolean> {


        const user = localStorage.getItem(localStorageKeys.user);
        if (user) {
            const item: User = JSON.parse(user);
            item.transactions.push(transaction);
            localStorage.setItem(localStorageKeys.user, JSON.stringify(item));
            return true;

        } else {
            const t: User = {
                id: 1,
                name: "Manqoba",
                transactions: [transaction]
            }
            localStorage.setItem(localStorageKeys.user, JSON.stringify(t));
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

        } catch (e) {
            console.error("HERE", e)
        }
    }
}

export const ls: localStorageHandlerClass = new localStorageHandlerClass();


