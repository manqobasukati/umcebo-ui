import { Transaction } from "./types";

enum action {
    in = "in",
    out = "out"
}

function insert_dummy_transaction(): null | Transaction[] {
    const transaction: Transaction = {
        id:1,
        date: new Date(),
        action: action.in,
        description: "Salary",
        amount: 7000
    }
    const transaction_2: Transaction = {
        id:2,
        date: new Date(),
        action: action.out,
        description: "Buy garden utilities",
        amount: 200
    }
    const transactions: Transaction[] = [];
    transactions.push(transaction);
    transactions.push(transaction_2);
    return transactions;
}

export function getAllTransactions(): null | Transaction[] {
    const transactions = insert_dummy_transaction();
    return transactions;
}