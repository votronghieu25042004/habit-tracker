import { Home, Calendar, BarChart3, Settings, Plus, Flame, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function TopNavbar({ onNewHabit, darkMode, totalStreak }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Hôm nay' },
    { path: '/calendar', icon: Calendar, label: 'Lịch' },
    { path: '/statistics', icon: BarChart3, label: 'Thống kê' },
    { path: '/settings', icon: Settings, label: 'Cài đặt' },
  ];

  const bg = darkMode
    ? 'bg-gray-900/95 border-gray-800'
    : 'bg-white/90 border-gray-200/80';
  const logoText = 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent';

  return (
    <header
      className={`sticky top-0 z-50 ${bg} border-b backdrop-blur-md shadow-sm`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4 md:gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-[40px] md:min-w-[140px]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <span className={`text-xl font-bold ${logoText} hidden md:block`}>Habit Tracker</span>
        </div>

        {/* Center Nav (Floating Pill) */}
        <nav className="flex items-center gap-1 flex-1 justify-center">
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                     key={item.path}
                             to={item.path}
  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-violet-600 text-white shadow-md' // Đổi thành màu tím đặc, bo tròn viên thuốc
      : darkMode
      ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
  }`}
  title={item.label}
>
  <Icon className="w-4 h-4 flex-shrink-0" />
  <span className="hidden lg:block">{item.label}</span>
</Link>
              );
            })}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 min-w-[120px] md:min-w-[240px] justify-end">
          {/* Streak Badge */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-sm font-semibold ${
              darkMode
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                : 'bg-orange-50 text-orange-600 border border-orange-200'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>{totalStreak}</span>
            <span className={`text-xs font-normal ${darkMode ? 'text-orange-500/70' : 'text-orange-400'}`}>chuỗi</span>
          </div>

          {/* Bell (Notification) */}
          <button
            className={`hidden sm:flex w-9 h-9 rounded-xl items-center justify-center transition-colors flex-shrink-0 ${
              darkMode
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* New Habit Button */}
          <button
            onClick={onNewHabit}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:block">Thêm mới</span>
          </button>
        </div>
      </div>
    </header>
  );
}