import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
    return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        setTransactions((prev) => [
            { id: crypto.randomUUID(), date: new Date().toISOString(), ...transaction },
            ...prev,
        ]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const editTransaction = (id, updatedTransaction) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
        );
    };

    const getBalance = () => {
        return transactions.reduce((acc, curr) => {
            return curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount);
        }, 0);
    };

    const getIncome = () => {
        return transactions
            .filter((t) => t.type === 'income')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    };

    const getExpense = () => {
        return transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                editTransaction,
                getBalance,
                getIncome,
                getExpense,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
