import { useState } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ComposedChart, Line, Area
} from 'recharts';
import { useTransactions } from '../context/TransactionContext';
import { PieChart as PieIcon, BarChart3, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#8b5cf6', '#ec4899', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const ExpenseChart = () => {
    const { transactions } = useTransactions();
    const [chartType, setChartType] = useState('pie'); // 'pie' | 'bar' | 'trend'

    const expenseData = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => {
            const existing = acc.find((item) => item.name === curr.category);
            if (existing) {
                existing.value += Number(curr.amount);
            } else {
                acc.push({ name: curr.category, value: Number(curr.amount) });
            }
            return acc;
        }, []);

    // Daily trend data for "Candle/Trend" view
    const trendData = transactions
        .reduce((acc, curr) => {
            const date = new Date(curr.date).toLocaleDateString();
            const existing = acc.find(item => item.date === date);
            if (existing) {
                if (curr.type === 'income') existing.income += Number(curr.amount);
                else existing.expense += Number(curr.amount);
            } else {
                acc.push({
                    date,
                    income: curr.type === 'income' ? Number(curr.amount) : 0,
                    expense: curr.type === 'expense' ? Number(curr.amount) : 0
                });
            }
            return acc;
        }, [])
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (expenseData.length === 0) {
        return (
            <div className="no-data">
                <Info size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>No expense data to display yet</p>
            </div>
        );
    }

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <BarChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                );
            case 'trend':
                return (
                    <ComposedChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="income" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" />
                        <Bar dataKey="expense" barSize={20} fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="expense" stroke="#ef4444" dot={false} strokeWidth={2} />
                    </ComposedChart>
                );
            default:
                return (
                    <PieChart>
                        <Pie
                            data={expenseData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                );
        }
    };

    return (
        <div className="expense-chart-container">
            <div className="chart-switcher">
                <button
                    className={chartType === 'pie' ? 'active' : ''}
                    onClick={() => setChartType('pie')}
                    title="Pie Chart"
                >
                    <PieIcon size={18} />
                </button>
                <button
                    className={chartType === 'bar' ? 'active' : ''}
                    onClick={() => setChartType('bar')}
                    title="Bar Graph"
                >
                    <BarChart3 size={18} />
                </button>
                <button
                    className={chartType === 'trend' ? 'active' : ''}
                    onClick={() => setChartType('trend')}
                    title="Trend Analysis"
                >
                    <TrendingUp size={18} />
                </button>
            </div>

            <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={chartType}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {renderChart()}
                        </motion.div>
                    </AnimatePresence>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseChart;
