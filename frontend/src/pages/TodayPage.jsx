import { useState } from 'react';
import { Check, Flame, Target, TrendingUp, Award, Edit2, Trash2, MoreHorizontal } from 'lucide-react';

export function TodayPage({ habits, onCheckIn, onEdit, onDelete, darkMode }) {
  const today = new Date().toISOString().split('T')[0];
  const [activeTab, setActiveTab] = useState('all');

  const getTodayCheckIn = (habit) => {
    return (habit.checkIns || []).find(c => c.date === today);
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
        dayNum: date.getDate(),
      });
    }
    return days;
  };

  const completedToday = habits.filter(h => getTodayCheckIn(h)?.status === 'done').length;
  const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
  const completionRate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;
  


  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const text = darkMode ? 'text-gray-100' : 'text-gray-900';
  const subtext = darkMode ? 'text-gray-400' : 'text-gray-500';
  const rowBg = darkMode ? 'bg-gray-700/50' : 'bg-slate-50';
  const todayHighlight = darkMode ? 'bg-blue-900/30 border-blue-500/40' : 'bg-blue-50 border-blue-200';

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Chào buổi sáng' : currentHour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  const filteredHabits = activeTab === 'all'
    ? habits
    : habits.filter(h => (h.timeOfDay || 'anytime') === activeTab);

  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference * (1 - completionRate / 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`rounded-2xl p-6 border ${card} shadow-sm`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className={`text-sm ${subtext} mb-1`}>
              {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className={`text-3xl font-semibold ${text}`}>{greeting}! 👋</h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-100'}`}>
              <span className="text-2xl font-bold text-blue-600">{completedToday}</span>
              <span className={`text-sm ${subtext}`}>Hoàn thành</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-50 border border-purple-100'}`}>
              <span className="text-2xl font-bold text-purple-600">{completionRate}%</span>
              <span className={`text-sm ${subtext}`}>Tỉ lệ</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-orange-600/20 border border-orange-500/30' : 'bg-orange-50 border border-orange-100'}`}>
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">{totalStreak}</span>
              <span className={`text-sm ${subtext}`}>Chuỗi</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-200'}`}>
              <span className={`text-2xl font-bold ${text}`}>{habits.length}</span>
              <span className={`text-sm ${subtext}`}>Thói quen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* LEFT COLUMN */}
        <div className="xl:col-span-3 space-y-5">
          {/* Progress Circle Card */}
          <div className={`rounded-2xl p-6 border ${card} shadow-sm`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`font-semibold ${text}`}>Tiến độ hôm nay</h3>
              <Target className="w-4 h-4 text-blue-500" />
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="10" fill="none"
                    className={darkMode ? 'text-gray-700' : 'text-gray-100'} />
                  <circle cx="60" cy="60" r="52" stroke="url(#prog-gradient)" strokeWidth="10" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                  <defs>
                    <linearGradient id="prog-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {completionRate}%
                  </span>
                  <span className={`text-xs ${subtext}`}>done</span>
                </div>
              </div>

              <p className={`text-sm ${subtext} mb-5`}>{completedToday} / {habits.length} thói quen</p>

              <div className="w-full space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={subtext}>Hoàn thành</span>
                    <span className="text-green-500 font-medium">{completedToday}</span>
                  </div>
                  <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
                      style={{ width: `${completionRate}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={subtext}>Còn lại</span>
                    <span className={`${text} font-medium`}>{habits.length - completedToday}</span>
                  </div>
                  <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-gray-300 to-gray-400 transition-all"
                      style={{ width: `${100 - completionRate}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Streak Card */}
          <div className={`rounded-2xl p-5 border ${card} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${text}`}>Top Streak</h3>
              <Award className="w-4 h-4 text-purple-500" />
            </div>
            <div className="space-y-3">
              {habits.length > 0 ? (
                [...habits].sort((a, b) => (b.streak || 0) - (a.streak || 0)).slice(0, 3).map((h, idx) => (
                  <div key={h.id} className={`flex items-center gap-3 p-3 rounded-xl ${rowBg}`}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: (h.color || '#8B5CF6') + '30', color: h.color || '#8B5CF6' }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${text} truncate`}>{h.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span className="text-sm font-bold text-orange-500">{h.streak || 0}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-sm ${subtext} text-center py-2`}>Chưa có dữ liệu</div>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="xl:col-span-5 space-y-5">
          <div className={`rounded-2xl p-6 border ${card} shadow-sm`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className={`font-semibold ${text}`}>Tiến độ 7 ngày</h3>
                <p className={`text-xs ${subtext} mt-0.5`}>Số thói quen hoàn thành mỗi ngày</p>
              </div>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>

            <div className="flex items-end justify-between gap-2 h-36">
              {getLast7Days().map((day, idx) => {
                const completedOnDay = habits.filter(h =>
                  (h.checkIns || []).find(c => c.date === day.date && c.status === 'done')
                ).length;
                const percentage = habits.length > 0 ? (completedOnDay / habits.length) * 100 : 0;
                const isToday = day.date === today;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    {completedOnDay > 0 && (
                      <span className={`text-xs font-medium ${isToday ? 'text-blue-500' : subtext}`}>
                        {completedOnDay}
                      </span>
                    )}
                    <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                      <div
                        className={`w-full rounded-t-xl transition-all ${isToday ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-gradient-to-t from-blue-600/60 to-purple-500/60'}`}
                        style={{ height: `${Math.max(percentage, 4)}%`, minHeight: '4px' }}
                      />
                    </div>
                    <span className={`text-xs ${isToday ? 'text-blue-500 font-semibold' : subtext}`}>
                      {day.day}
                    </span>
                    {isToday && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`rounded-2xl p-6 border ${card} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${text}`}>Lịch tuần này</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()}
              </span>
            </div>

            <div className="space-y-2">
              {getLast7Days().map((day, idx) => {
                const date = new Date(day.date);
                const isToday = day.date === today;
                const completedOnDay = habits.filter(h =>
                  (h.checkIns || []).find(c => c.date === day.date && c.status === 'done')
                );

                return (
                  <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${isToday ? todayHighlight : `${rowBg} border-transparent`}`}>
                    <div className="text-center min-w-[52px]">
                      <p className={`text-xs ${subtext} uppercase`}>{date.toLocaleDateString('vi-VN', { weekday: 'short' })}</p>
                      <p className={`text-xl font-bold ${isToday ? 'text-blue-600' : text}`}>{day.dayNum}</p>
                    </div>

                    <div className="flex-1 flex items-center gap-1.5 overflow-x-auto">
                      {completedOnDay.length > 0 ? (
                        completedOnDay.map((habit) => (
                          <div key={habit.id} className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: habit.color || '#8B5CF6' }}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ))
                      ) : (
                        <span className={`text-xs ${subtext}`}>Chưa có hoạt động</span>
                      )}
                    </div>
                    <span className={`text-xs font-semibold flex-shrink-0 ${isToday ? 'text-blue-600' : subtext}`}>
                      {completedOnDay.length}/{habits.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-5">
          <div className={`rounded-2xl border ${card} shadow-sm overflow-hidden`}>
            <div className={`flex items-center justify-between px-5 pt-5 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <h3 className={`font-semibold ${text}`}>Danh sách thói quen</h3>
                <p className={`text-xs ${subtext} mt-0.5`}>{completedToday}/{habits.length} hoàn thành</p>
              </div>
              <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                <MoreHorizontal className={`w-4 h-4 ${subtext}`} />
              </button>
            </div>

            <div className={`flex gap-1 px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'morning', label: 'Sáng' },
                { key: 'afternoon', label: 'Chiều' },
                { key: 'evening', label: 'Tối' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-violet-600 text-white'
                      : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[480px] overflow-y-auto">
              {filteredHabits.length === 0 ? (
                <div className={`px-5 py-8 text-center ${subtext} text-sm`}>Không có thói quen nào</div>
              ) : (
                filteredHabits.map(habit => {
                  const checkIn = getTodayCheckIn(habit);
                  const status = checkIn?.status || 'none';
                  const isDone = status === 'done';

                  return (
                    <div key={habit.id} className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${isDone ? darkMode ? 'bg-green-900/10' : 'bg-green-50/60' : darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-slate-50'}`}>
                      <button
                        onClick={() => onCheckIn(habit.id, isDone ? 'none' : 'done')}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isDone ? 'border-transparent scale-105' : darkMode ? 'border-gray-600 hover:border-gray-400' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: isDone ? (habit.color || '#8B5CF6') : 'transparent' }}
                      >
                        {isDone && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </button>

                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: habit.color || '#8B5CF6' }} />

                      <div className="flex-1 min-w-0">
                        {/* ĐÃ XÓA DÒNG HIỂN THỊ CHỮ GENERAL TẠI ĐÂY */}
                        <p className={`text-sm font-medium truncate ${isDone ? 'line-through opacity-50' : ''} ${text}`}>
                          {habit.name}
                        </p>
                      </div>

                      {/* Các nút hành động (Sửa / Xóa) thay cho mũi tên > */}
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group hover:opacity-100 sm:opacity-100">
                        <button 
                          onClick={() => onEdit(habit)}
                          className={`p-1.5 rounded-md transition-colors ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onDelete(habit.id)}
                          className={`p-1.5 rounded-md transition-colors ${darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className={`px-5 py-3 border-t ${darkMode ? 'border-gray-700 bg-gray-800/60' : 'border-gray-100 bg-gray-50/80'}`}>
              <div className={`h-1.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${completionRate}%` }} />
              </div>
              <p className={`text-xs ${subtext} text-center mt-1.5`}>{completionRate}% hoàn thành hôm nay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}