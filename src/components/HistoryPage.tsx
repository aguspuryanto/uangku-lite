import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Search, 
  SlidersHorizontal, 
  Utensils, 
  Briefcase, 
  Car, 
  ShoppingBag, 
  ShoppingCart,
  ChevronRight,
  X,
  Calendar,
  CreditCard,
  Tag,
  StickyNote,
  Clock,
  Loader2,
  AlertCircle,
  Home,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../services/supabase';

interface Transaction {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  category: string;
  paymentMethod: string;
  amount: number;
  time: string;
  date: string;
  isPositive: boolean;
  colorClass: string;
  notes?: string;
}

const TransactionDetailModal = ({ transaction, onClose }: { transaction: Transaction, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="relative p-6 pb-0">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="px-8 pb-10 pt-4 flex flex-col items-center text-center">
        <div className={`size-24 rounded-[32px] flex items-center justify-center mb-6 shadow-lg ${transaction.colorClass}`}>
          <transaction.icon className="size-12" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{transaction.title}</h3>
        <p className="text-slate-500 font-medium mb-6">{transaction.category}</p>
        
        <div className={`text-4xl font-bold mb-10 ${transaction.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {transaction.isPositive ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </div>

        <div className="w-full space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Calendar className="size-4 text-slate-400" />
              </div>
              <span className="text-sm font-bold text-slate-500">Date</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{transaction.date}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Clock className="size-4 text-slate-400" />
              </div>
              <span className="text-sm font-bold text-slate-500">Time</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{transaction.time}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <CreditCard className="size-4 text-slate-400" />
              </div>
              <span className="text-sm font-bold text-slate-500">Payment</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{transaction.paymentMethod}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <StickyNote className="size-4 text-slate-400" />
              </div>
              <span className="text-sm font-bold text-slate-500">Notes</span>
            </div>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              {transaction.notes || 'No notes added to this transaction.'}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-colors"
        >
          Done
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const FilterChip = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button 
    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 shadow-sm transition-all ${
      active 
        ? 'bg-emerald-500 text-white shadow-emerald-100' 
        : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
    }`}
  >
    <p className="text-sm font-semibold">{label}</p>
  </button>
);

interface TransactionGroupProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

const TransactionGroup: React.FC<TransactionGroupProps> = ({ title, date, children }) => (
  <section className="space-y-3">
    <div className="flex justify-between items-center px-1">
      <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{title}</h3>
      <span className="text-slate-400 text-[10px] font-medium">{date}</span>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </section>
);

interface HistoryItemProps {
  transaction: Transaction;
  delay: number;
  onClick: (t: Transaction) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ transaction, delay, onClick }) => {
  const { icon: Icon, title, subtitle, amount, time, isPositive, colorClass } = transaction;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => onClick(transaction)}
      className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50 hover:border-emerald-100 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className={`size-12 rounded-full flex items-center justify-center ${colorClass}`}>
          <Icon className="size-6" />
        </div>
        <div>
          <p className="text-slate-900 font-bold text-sm group-hover:text-emerald-600 transition-colors">{title}</p>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-sm ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositive ? '+' : '-'}${Math.abs(amount).toFixed(2)}
        </p>
        <p className="text-slate-400 text-[10px] mt-0.5 font-medium">{time}</p>
      </div>
    </motion.div>
  );
};

export const HistoryPage = ({ onBack }: { onBack?: () => void }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({});

  const iconMap: Record<string, any> = {
    'Utensils': Utensils,
    'Briefcase': Briefcase,
    'Car': Car,
    'ShoppingBag': ShoppingBag,
    'ShoppingCart': ShoppingCart,
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Group by date/day
        const grouped = data.reduce((acc: Record<string, Transaction[]>, item: any) => {
          const createdAt = new Date(item.created_at);
          const dateStr = createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          
          // Determine group key (Today, Yesterday, or Date)
          const now = new Date();
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          
          let groupKey = dateStr;
          if (createdAt.toDateString() === now.toDateString()) groupKey = 'Today';
          else if (createdAt.toDateString() === yesterday.toDateString()) groupKey = 'Yesterday';

          if (!acc[groupKey]) acc[groupKey] = [];
          
          // Map main_category to icon
          let icon = ShoppingCart;
          let colorClass = "bg-slate-50 text-slate-600";
          
          if (item.main_category === 'Pemasukan') {
            icon = Briefcase;
            colorClass = "bg-emerald-50 text-emerald-600";
          } else if (item.main_category === 'Angsuran KPR') {
            icon = Home;
            colorClass = "bg-blue-50 text-blue-600";
          } else if (item.main_category === 'Kebutuhan Harian') {
            icon = Utensils;
            colorClass = "bg-orange-50 text-orange-600";
          } else if (item.main_category === 'Investasi') {
            icon = TrendingUp;
            colorClass = "bg-purple-50 text-purple-600";
          }

          acc[groupKey].push({
            id: item.id.toString(),
            icon: icon,
            title: item.description,
            subtitle: `${item.main_category}${item.sub_category !== 'None' ? ' • ' + item.sub_category : ''}`,
            category: item.main_category,
            paymentMethod: item.type === 'income' ? 'Bank Transfer' : 'Cash/Debit',
            amount: parseFloat(item.amount),
            time: createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            date: dateStr,
            isPositive: item.type === 'income',
            colorClass: colorClass,
            notes: `Category: ${item.main_category}. Sub-category: ${item.sub_category}.`
          });
          return acc;
        }, {});
        setTransactions(grouped);
      } else {
        useMockData();
      }
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
      useMockData(); // Fallback for demo purposes
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    const mockData: Record<string, Transaction[]> = {
      "Today": [
        {
          id: '1',
          icon: Utensils,
          title: "Starbucks Coffee",
          subtitle: "BCA • Food & Drink",
          category: "Food & Drink",
          paymentMethod: "BCA Debit",
          amount: 4.50,
          time: "09:41 AM",
          date: "Oct 26, 2023",
          isPositive: false,
          colorClass: "bg-orange-50 text-orange-600",
          notes: "Morning coffee before work. Caramel Macchiato."
        },
        {
          id: '2',
          icon: Briefcase,
          title: "Monthly Salary",
          subtitle: "BCA • Income",
          category: "Income",
          paymentMethod: "Bank Transfer",
          amount: 2450.00,
          time: "08:00 AM",
          date: "Oct 26, 2023",
          isPositive: true,
          colorClass: "bg-emerald-50 text-emerald-600",
          notes: "October monthly salary from PT. Tech Solutions."
        }
      ],
      "Yesterday": [
        {
          id: '3',
          icon: Car,
          title: "Uber Ride",
          subtitle: "Cash • Transport",
          category: "Transport",
          paymentMethod: "Cash",
          amount: 12.20,
          time: "11:20 PM",
          date: "Oct 25, 2023",
          isPositive: false,
          colorClass: "bg-blue-50 text-blue-600",
          notes: "Ride home from the cinema."
        },
        {
          id: '4',
          icon: ShoppingBag,
          title: "Uniqlo Store",
          subtitle: "BCA • Shopping",
          category: "Shopping",
          paymentMethod: "BCA Credit Card",
          amount: 89.00,
          time: "04:15 PM",
          date: "Oct 25, 2023",
          isPositive: false,
          colorClass: "bg-purple-50 text-purple-600",
          notes: "Bought some winter clothes for the upcoming trip."
        }
      ],
      "October 24": [
        {
          id: '5',
          icon: ShoppingCart,
          title: "Groceries Market",
          subtitle: "Cash • Groceries",
          category: "Groceries",
          paymentMethod: "Cash",
          amount: 34.12,
          time: "02:30 PM",
          date: "Oct 24, 2023",
          isPositive: false,
          colorClass: "bg-green-50 text-green-600",
          notes: "Weekly grocery shopping. Vegetables and fruits."
        }
      ]
    };
    setTransactions(mockData);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#fcfcfd]">
      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetailModal 
            transaction={selectedTransaction} 
            onClose={() => setSelectedTransaction(null)} 
          />
        )}
      </AnimatePresence>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center px-4 py-3 justify-between">
          <button 
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full active:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="size-5 text-slate-700" />
          </button>
          <h1 className="text-base font-bold text-slate-900">Transaction History</h1>
          <button className="flex size-10 items-center justify-center rounded-full bg-emerald-50 active:bg-emerald-100 transition-colors">
            <MoreHorizontal className="size-5 text-emerald-600" />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-[#fcfcfd]/80 backdrop-blur-md sticky top-0 z-30">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transaction History</h2>
          <p className="text-sm text-slate-500">Keep track of every penny you spend and earn.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-64 card-shadow"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-xl font-bold text-sm card-shadow hover:bg-slate-50 transition-colors">
            <SlidersHorizontal className="size-4 text-slate-500" />
            <span>Filters</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 lg:px-8 py-6 space-y-8 max-w-7xl w-full mx-auto pb-32 lg:pb-8">
        {/* Search & Filter (Mobile only) */}
        <div className="lg:hidden space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="block w-full pl-10 pr-4 py-3 bg-white border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/50 shadow-sm"
              />
            </div>
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center active:scale-95 transition-transform">
              <SlidersHorizontal className="size-5 text-slate-900" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <FilterChip label="Current Month" active />
            <FilterChip label="Last Month" />
            <FilterChip label="Last 3 Months" />
          </div>
        </div>

        {/* Desktop Filter Bar */}
        <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 card-shadow mb-8">
          <div className="flex gap-3">
            <FilterChip label="All Time" />
            <FilterChip label="Current Month" active />
            <FilterChip label="Last Month" />
            <FilterChip label="Last 3 Months" />
          </div>
          <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
            <span>Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-emerald-600">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Highest Amount</option>
              <option>Lowest Amount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="size-10 animate-spin mb-4 opacity-20" />
                <p className="text-sm font-medium">Fetching transactions...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-start gap-4">
                <AlertCircle className="size-6 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-red-900 font-bold mb-1">Connection Error</h4>
                  <p className="text-red-700 text-sm mb-4">{error}</p>
                  <button 
                    onClick={fetchTransactions}
                    className="text-xs font-bold text-red-600 underline underline-offset-4"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : Object.keys(transactions).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search className="size-16 mb-4 opacity-10" />
                <p className="font-bold">No transactions found</p>
              </div>
            ) : (
              Object.entries(transactions).map(([group, items]: [string, Transaction[]]) => (
                <TransactionGroup key={group} title={group} date={items[0].date.split(',')[0]}>
                  {items.map((item: Transaction, idx: number) => (
                    <HistoryItem 
                      key={item.id}
                      transaction={item}
                      delay={0.1 * (idx + 1)}
                      onClick={setSelectedTransaction}
                    />
                  ))}
                </TransactionGroup>
              ))
            )}
          </div>

          {/* Desktop Sidebar Summary */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Summary</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-500">Total Transactions</p>
                  <p className="text-sm font-bold text-slate-900">42</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-500">Total Income</p>
                  <p className="text-sm font-bold text-emerald-600">+$4,200.00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-500">Total Expenses</p>
                  <p className="text-sm font-bold text-red-500">-$2,150.00</p>
                </div>
                <div className="pt-6 border-t border-slate-50">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-900">Net Balance</p>
                    <p className="text-lg font-bold text-emerald-600">+$2,050.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-lg font-bold mb-2 relative z-10">Smart Filter</h3>
              <p className="text-sm opacity-80 mb-6 relative z-10">Find transactions by category, amount, or date range instantly.</p>
              <button className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors relative z-10">
                Try Advanced Search
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
