import { Home, Calendar, BarChart3, Settings, Plus, X, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar({ isOpen, onToggle, onNewHabit, darkMode }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Của Tôi' },
    { path: '/calendar', icon: Calendar, label: 'Lịch' },
    { path: '/statistics', icon: BarChart3, label: 'Phân Tích' },
    { path: '/settings', icon: Settings, label: 'Cài Đặt' }
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 left-6 z-50 lg:hidden ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 ${
          isOpen ? 'w-64' : 'w-0 lg:w-0'
        } ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        } border-r transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            HABIT TRACKER
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={onNewHabit}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Thêm Mới
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}