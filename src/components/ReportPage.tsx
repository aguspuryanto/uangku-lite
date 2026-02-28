import React from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Info, 
  TrendingUp, 
  Utensils, 
  Car, 
  Zap, 
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

const CategoryItem = ({ color, label, amount, percentage, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center justify-between"
  >
    <div className="flex items-center gap-3">
      <div className={`size-2.5 rounded-full ${color}`}></div>
      <span className="font-medium text-sm text-slate-700">{label}</span>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-slate-900">Rp {amount}</p>
      <p className="text-[10px] font-semibold text-slate-400">{percentage}%</p>
    </div>
  </motion.div>
);

const ComparisonCard = ({ label, amount, percentage, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-5 rounded-2xl border border-slate-100 card-shadow flex-1"
  >
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
    <p className={`text-lg font-bold ${color === 'emerald' ? 'text-emerald-600' : 'text-slate-900'}`}>Rp {amount}</p>
    <div className="mt-4 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ delay: delay + 0.2, duration: 1 }}
        className={`h-full ${color === 'emerald' ? 'bg-emerald-600' : 'bg-slate-300'} rounded-full`}
      ></motion.div>
    </div>
  </motion.div>
);

export const ReportPage = ({ onBack }: { onBack?: () => void }) => {
  return (
    <div className="flex flex-col min-h-full bg-[#fcfcfd]">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center px-4 py-3 justify-between">
          <button 
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full active:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="size-5 text-slate-700" />
          </button>
          <h1 className="text-base font-semibold text-slate-700">Financial Reports</h1>
          <button className="flex size-10 items-center justify-center rounded-full active:bg-slate-100 transition-colors">
            <Share2 className="size-5 text-slate-700" />
          </button>
        </div>
        <div className="overflow-x-auto no-scrollbar border-b border-slate-50">
          <div className="flex px-4 gap-8 whitespace-nowrap">
            {['Current Month', 'Last Month', 'Last 3 Months', 'Custom Range'].map((tab, i) => (
              <button 
                key={tab}
                className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${i === 0 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400'}`}
              >
                <p className={`text-sm ${i === 0 ? 'font-semibold' : 'font-medium'}`}>{tab}</p>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-[#fcfcfd]/80 backdrop-blur-md sticky top-0 z-30">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financial Reports</h2>
          <p className="text-sm text-slate-500">Detailed analysis of your spending habits.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white p-1 rounded-xl border border-slate-100 card-shadow">
            {['Month', 'Quarter', 'Year'].map((period, i) => (
              <button 
                key={period}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${i === 0 ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-xl font-bold text-sm card-shadow hover:bg-slate-50 transition-colors">
            <Share2 className="size-4" />
            <span>Share Report</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 lg:px-8 py-6 space-y-8 max-w-7xl w-full mx-auto pb-32 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Total Spending Section */}
            <section>
              <div className="flex flex-col gap-1 mb-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Spending</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">Rp 5.714.285</h2>
                  <span className="text-red-500 bg-red-50 px-2.5 py-1 rounded-full text-xs font-bold mb-1.5 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    12%
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-8 lg:p-10 border border-slate-100 card-shadow">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-bold text-slate-900">Spending by Category</h3>
                  <button className="text-slate-300 hover:text-slate-400 transition-colors">
                    <Info className="size-5" />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Donut Chart Placeholder */}
                  <div className="relative size-48 lg:size-56 flex items-center justify-center">
                    <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f8fafc" strokeWidth="12" />
                      {/* Food & Dining (35%) */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#059669" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="163.28" strokeLinecap="round" />
                      {/* Transport (20%) */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f87171" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="200.96" className="rotate-[126deg] origin-center" strokeLinecap="round" />
                      {/* Bills (30%) */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fbbf24" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="175.84" className="rotate-[198deg] origin-center" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expenses</p>
                      <p className="text-3xl font-bold text-slate-900">75%</p>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-5">
                    <CategoryItem color="bg-emerald-600" label="Food & Dining" amount="2.000.000" percentage="35" delay={0.1} />
                    <CategoryItem color="bg-red-400" label="Transport" amount="1.142.857" percentage="20" delay={0.2} />
                    <CategoryItem color="bg-amber-400" label="Bills & Utilities" amount="1.714.285" percentage="30" delay={0.3} />
                    <CategoryItem color="bg-slate-200" label="Others" amount="857.143" percentage="15" delay={0.4} />
                  </div>
                </div>
              </div>
            </section>

            {/* Monthly Comparison */}
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Comparison</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <ComparisonCard label="Income" amount="8.500.000" percentage={85} color="emerald" delay={0.5} />
                <ComparisonCard label="Savings" amount="2.785.715" percentage={60} color="slate" delay={0.6} />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Monthly Surplus Tip */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 flex items-start gap-4"
            >
              <div className="size-12 shrink-0 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Monthly Surplus</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Great job! You've saved <span className="text-emerald-600 font-bold">32% more</span> than last month. Keep it up!
                </p>
              </div>
            </motion.div>

            {/* Recommendations Section (Desktop only addition) */}
            <div className="hidden lg:block bg-white rounded-3xl p-8 border border-slate-100 card-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Insights</h3>
              <div className="space-y-6">
                {[
                  { title: 'Dining Out', desc: 'You spent 15% more on food this month.', action: 'Set Limit' },
                  { title: 'Subscription', desc: '3 unused subscriptions detected.', action: 'Review' },
                  { title: 'Savings Goal', desc: 'You are on track for your vacation goal.', action: 'Details' }
                ].map((insight, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{insight.title}</p>
                      <p className="text-xs text-slate-500">{insight.desc}</p>
                    </div>
                    <ChevronRight className="size-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
