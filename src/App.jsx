import Dashboard from './components/Dashboard';
import { motion } from 'framer-motion';

function App() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="app-container"
        >
            <h1>Expense Tracker</h1>
            <Dashboard />
        </motion.div>
    )
}

export default App
