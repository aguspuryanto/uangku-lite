import React from 'react';
import { 
  Wallet, 
  Bell, 
  TrendingUp, 
  ArrowDown, 
  ArrowUp, 
  Utensils, 
  Car, 
  Briefcase, 
  Home, 
  Receipt, 
  BarChart3, 
  User, 
  Plus,
  Search,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
  <a 
    href="#" 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
    }`}
  >
    <Icon className={`size-5 ${active ? 'text-white' : 'group-hover:text-emerald-600'}`} />
    <span className="font-semibold text-sm tracking-wide">{label}</span>
    {active && <ChevronRight className="ml-auto size-4 opacity-50" />}
  </a>
);

const Sidebar = () => (
  <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-100 h-screen sticky top-0 p-6">
    <div className="flex items-center gap-3 mb-10 px-2">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
        <Wallet className="text-emerald-600 size-6" />
      </div>
      <h1 className="text-slate-900 text-xl font-bold tracking-tight">Uangku</h1>
    </div>

    <nav className="flex-1 space-y-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Main Menu</p>
      <SidebarItem icon={Home} label="Dashboard" active />
      <SidebarItem icon={Receipt} label="History" />
      <SidebarItem icon={BarChart3} label="Reports" />
      <SidebarItem icon={User} label="Profile" />
      
      <div className="pt-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Preferences</p>
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={Bell} label="Notifications" />
      </div>
    </nav>

    <div className="mt-auto pt-6 border-t border-slate-50">
      <div className="flex items-center gap-3 px-4 py-4 mb-4 bg-slate-50 rounded-2xl">
        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
          AF
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">Alex Fletcher</p>
          <p className="text-xs text-slate-500 truncate">Pro Plan</p>
        </div>
      </div>
      <SidebarItem icon={LogOut} label="Sign Out" />
    </div>
  </aside>
);

const DesktopHeader = () => (
  <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-[#fcfcfd]/80 backdrop-blur-md sticky top-0 z-30">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">Welcome back, Alex!</h2>
      <p className="text-sm text-slate-500">Here's what's happening with your money today.</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-64 card-shadow"
        />
      </div>
      <button className="flex size-10 items-center justify-center rounded-xl bg-white border border-slate-100 card-shadow hover:bg-slate-50 transition-colors">
        <Bell className="text-slate-500 size-5" />
      </button>
      <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors">
        <Plus className="size-4" />
        <span>Add Transaction</span>
      </button>
    </div>
  </header>
);

const MobileHeader = () => (
  <header className="lg:hidden flex items-center bg-white/80 backdrop-blur-md px-5 py-4 sticky top-0 z-30 border-b border-slate-100">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 mr-3">
      <Wallet className="text-emerald-600 size-5" />
    </div>
    <div className="flex-1">
      <h1 className="text-slate-900 text-[17px] font-bold tracking-tight">Uangku</h1>
      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Hi, Alex Fletcher</p>
    </div>
    <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-50 transition-colors relative">
      <Bell className="text-slate-500 size-5" />
      <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
    </button>
  </header>
);

const BalanceCard = () => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-[32px] bg-emerald-600 p-8 lg:p-10 text-white card-shadow"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
    
    <div className="relative z-10">
      <p className="text-[14px] font-semibold opacity-80 uppercase tracking-widest mb-2">Total Balance</p>
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8">
        <p className="text-[40px] lg:text-[56px] font-bold tracking-tight leading-none">$12,450.00</p>
        <div className="flex items-center gap-2 bg-white/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md mb-2">
          <TrendingUp className="size-4" />
          <p className="text-[13px] font-bold">+5.2% this month</p>
        </div>
      </div>
    </div>
  </motion.section>
);

const StatsGrid = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col gap-1 rounded-[24px] p-6 bg-white border border-slate-100 card-shadow group hover:border-emerald-100 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
          <ArrowDown className="text-emerald-600 size-5" strokeWidth={3} />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Income</p>
          <p className="text-xl font-bold text-slate-900">$4,200.00</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+12.0%</span>
        <span className="text-[11px] text-slate-400">vs last month</span>
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col gap-1 rounded-[24px] p-6 bg-white border border-slate-100 card-shadow group hover:border-red-100 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
          <ArrowUp className="text-red-500 size-5" strokeWidth={3} />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Expenses</p>
          <p className="text-xl font-bold text-slate-900">$2,150.00</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">-3.5%</span>
        <span className="text-[11px] text-slate-400">vs last month</span>
      </div>
    </motion.div>
  </section>
);

const TrendChart = () => (
  <motion.section 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
    className="rounded-[32px] bg-white border border-slate-100 p-8 card-shadow"
  >
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-slate-900 text-lg font-bold">Financial Performance</h2>
        <p className="text-sm text-slate-500">Monthly performance tracking across 3 months</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors">Analysis</button>
        <button className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">Export</button>
      </div>
    </div>
    
    <div className="flex items-end justify-around h-56 max-w-2xl mx-auto">
      {[
        { label: '3M AGO', inc: 60, exp: 40 },
        { label: 'LAST MO', inc: 80, exp: 55 },
        { label: 'CURRENT', inc: 95, exp: 30, active: true }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-4 group">
          <div className="flex items-end gap-3 h-40">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${item.inc}%` }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`w-5 rounded-t-lg ${item.active ? 'bg-emerald-600 shadow-[0_4px_15px_rgba(5,150,105,0.3)]' : 'bg-emerald-600/20'}`}
            ></motion.div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${item.exp}%` }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`w-5 rounded-t-lg ${item.active ? 'bg-red-500 shadow-[0_4px_15px_rgba(248,113,113,0.3)]' : 'bg-red-500/20'}`}
            ></motion.div>
          </div>
          <p className={`text-[10px] font-bold tracking-widest ${item.active ? 'text-emerald-600' : 'text-slate-400'}`}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
    
    <div className="flex gap-8 mt-12 justify-center border-t border-slate-50 pt-6">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-emerald-600"></div>
        <span className="text-sm font-semibold text-slate-600">Income</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500"></div>
        <span className="text-sm font-semibold text-slate-600">Expenses</span>
      </div>
    </div>
  </motion.section>
);

const TransactionItem = ({ icon: Icon, title, category, date, amount, isPositive, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center gap-4 p-5 bg-white rounded-[24px] border border-slate-100 card-shadow transition-all hover:border-emerald-100 hover:translate-x-1 cursor-pointer"
  >
    <div className={`size-12 flex items-center justify-center rounded-2xl ${isPositive ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-100'}`}>
      <Icon className={`size-6 ${isPositive ? 'text-emerald-600' : 'text-slate-500'}`} />
    </div>
    <div className="flex-1">
      <p className="text-[15px] font-bold text-slate-900">{title}</p>
      <p className="text-xs font-medium text-slate-500">{category} • {date}</p>
    </div>
    <div className="text-right">
      <p className={`text-[15px] font-bold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
        {isPositive ? '+' : '-'}${Math.abs(amount).toFixed(2)}
      </p>
      <p className="text-[10px] text-slate-400 font-medium">Completed</p>
    </div>
  </motion.div>
);

const TransactionList = () => (
  <section className="pb-6">
    <div className="flex items-center justify-between mb-6 px-1">
      <h2 className="text-slate-900 text-lg font-bold">Recent Transactions</h2>
      <button className="text-emerald-600 text-sm font-bold px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors">View All History</button>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <TransactionItem 
        icon={Utensils} 
        title="Starbucks Coffee" 
        category="Food & Drink" 
        date="Today, 10:45 AM" 
        amount={12.50} 
        isPositive={false}
        delay={0.3}
      />
      <TransactionItem 
        icon={Car} 
        title="Uber Trip" 
        category="Transport" 
        date="Yesterday, 08:20 PM" 
        amount={24.80} 
        isPositive={false}
        delay={0.4}
      />
      <TransactionItem 
        icon={Briefcase} 
        title="Monthly Salary" 
        category="Work" 
        date="3 Days Ago" 
        amount={4200.00} 
        isPositive={true}
        delay={0.5}
      />
      <TransactionItem 
        icon={Home} 
        title="Apartment Rent" 
        category="Housing" 
        date="5 Days Ago" 
        amount={1200.00} 
        isPositive={false}
        delay={0.6}
      />
    </div>
  </section>
);

const BottomNav = () => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
    <div className="relative flex items-center justify-around bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 pb-9 pt-3 nav-shadow">
      <a className="flex flex-col items-center gap-1.5 text-emerald-600 w-1/5" href="#">
        <Home className="size-6 fill-emerald-600/10" />
        <p className="text-[9px] font-bold uppercase tracking-widest">Home</p>
      </a>
      <a className="flex flex-col items-center gap-1.5 text-slate-400 w-1/5" href="#">
        <Receipt className="size-6" />
        <p className="text-[9px] font-bold uppercase tracking-widest">History</p>
      </a>
      <div className="relative flex justify-center w-1/5 -mt-10">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="size-16 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-200 flex items-center justify-center border-[6px] border-[#fcfcfd]"
        >
          <Plus className="size-8 stroke-[3]" />
        </motion.button>
      </div>
      <a className="flex flex-col items-center gap-1.5 text-slate-400 w-1/5" href="#">
        <BarChart3 className="size-6" />
        <p className="text-[9px] font-bold uppercase tracking-widest">Reports</p>
      </a>
      <a className="flex flex-col items-center gap-1.5 text-slate-400 w-1/5" href="#">
        <User className="size-6" />
        <p className="text-[9px] font-bold uppercase tracking-widest">Profile</p>
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader />
        <DesktopHeader />
        
        <main className="flex-1 px-5 lg:px-8 py-4 lg:py-2 space-y-8 max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BalanceCard />
              <StatsGrid />
              <TrendChart />
            </div>
            <div className="space-y-8">
              <div className="hidden lg:block">
                <TransactionList />
              </div>
              <div className="lg:hidden">
                <TransactionList />
              </div>
            </div>
          </div>
        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}
