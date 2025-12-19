import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { PlusCircle } from 'lucide-react';

const TransactionForm = () => {
    const { addTransaction } = useTransactions();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('General');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        addTransaction({
            description,
            amount: Number(amount),
            type,
            category,
            date: new Date().toISOString(),
        });

        setDescription('');
        setAmount('');
        setCategory('General');
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                />
            </div>

            <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="General">General</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Salary">Salary</option>
                        <option value="Investment">Investment</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="submit-btn">
                <PlusCircle size={20} />
                Add Transaction
            </button>
        </form>
    );
};

export default TransactionForm;
