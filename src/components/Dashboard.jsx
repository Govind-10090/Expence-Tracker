import { useTransactions } from '../context/TransactionContext';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import SummaryCards from './SummaryCards';
import ExpenseChart from './ExpenseChart';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { transactions } = useTransactions();

    const exportCSV = () => {
        if (transactions.length === 0) return;

        const headers = ['ID', 'Date', 'Description', 'Amount', 'Type', 'Category'];
        const csvContent = [
            headers.join(','),
            ...transactions.map(t =>
                [t.id, t.date, `"${t.description}"`, t.amount, t.type, t.category].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="dashboard-header">
                <SummaryCards />
                <div className="header-actions">
                    <button onClick={exportCSV} className="export-btn">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                <motion.div className="form-section card" variants={itemVariants}>
                    <h2>Add Transaction</h2>
                    <TransactionForm />
                </motion.div>

                <motion.div className="chart-section card" variants={itemVariants}>
                    <h2>Expense Breakdown</h2>
                    <ExpenseChart />
                </motion.div>
            </div>

            <motion.div className="list-section card" variants={itemVariants}>
                <h2>Recent Transactions</h2>
                <TransactionList />
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
