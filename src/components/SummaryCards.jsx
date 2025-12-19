import { useTransactions } from '../context/TransactionContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCards = () => {
    const { getBalance, getIncome, getExpense } = useTransactions();

    const balance = getBalance();
    const income = getIncome();
    const expense = getExpense();

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <div className="summary-cards">
            <motion.div
                className="summary-card balance"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
                <div className="icon-wrapper">
                    <Wallet size={24} />
                </div>
                <div className="summary-content">
                    <h3>Total Balance</h3>
                    <p className="amount">${balance.toFixed(2)}</p>
                </div>
            </motion.div>

            <motion.div
                className="summary-card income"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
                <div className="icon-wrapper">
                    <TrendingUp size={24} />
                </div>
                <div className="summary-content">
                    <h3>Income</h3>
                    <p className="amount">+${income.toFixed(2)}</p>
                </div>
            </motion.div>

            <motion.div
                className="summary-card expense"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
                <div className="icon-wrapper">
                    <TrendingDown size={24} />
                </div>
                <div className="summary-content">
                    <h3>Expense</h3>
                    <p className="amount">-${expense.toFixed(2)}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default SummaryCards;
