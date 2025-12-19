import { useTransactions } from '../context/TransactionContext';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = () => {
    const { transactions, deleteTransaction } = useTransactions();

    if (transactions.length === 0) {
        return (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-transactions"
            >
                No transactions yet.
            </motion.p>
        );
    }

    return (
        <motion.div className="transaction-list" layout>
            <AnimatePresence mode='popLayout'>
                {transactions.map((transaction) => (
                    <motion.div
                        key={transaction.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                        className="transaction-item"
                    >
                        <div className="transaction-info">
                            <span className="transaction-desc">{transaction.description}</span>
                            <span className="transaction-meta">
                                {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                            </span>
                        </div>
                        <div className="transaction-actions">
                            <span className={`transaction-amount ${transaction.type}`}>
                                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTransaction(transaction.id)}
                                aria-label="Delete transaction"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default TransactionList;
