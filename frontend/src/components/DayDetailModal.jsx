// src/components/DayDetailModal.jsx
import { X, CheckCircle2, Circle } from 'lucide-react';

export function DayDetailModal({ date, habits, darkMode, onClose }) {
  const getCheckInStatus = (habit, date) => {
    const checkIn = (habit.checkIns || []).find(c => c.date === date);
    return checkIn?.status || 'none';
  };

  const completedCount = habits.filter(h => getCheckInStatus(h, date) === 'done').length;
  const totalCount = habits.length;
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-100';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`${cardBg} rounded-3xl w-full max-w-lg shadow-xl border ${borderClass} overflow-hidden`}>
        {/* Header */}
        <div className={`px-6 py-5 border-b ${borderClass} flex items-center justify-between`}>
          <div>
            <h3 className={`text-xl ${textClass} font-bold`}>Chi tiết ngày</h3>
            <p className={`text-sm ${subtextClass} mt-0.5`}>
              {new Date(date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900/50' : 'bg-slate-50'} border ${borderClass}`}>
              <p className={`text-sm ${subtextClass}`}>Hoàn thành</p>
              <p className={`text-2xl ${textClass} font-bold mt-1`}>{completedCount} / {totalCount}</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900/50' : 'bg-slate-50'} border ${borderClass}`}>
              <p className={`text-sm ${subtextClass}`}>Tỉ lệ</p>
              <p className={`text-2xl ${textClass} font-bold mt-1`}>{completionRate.toFixed(0)}%</p>
            </div>
          </div>

          {/* Habit List */}
          <div>
            <h4 className={`text-sm ${textClass} font-bold mb-4 uppercase tracking-wider`}>Thói quen ngày này</h4>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {habits.length === 0 ? (
                <div className={`text-sm ${subtextClass} text-center py-6`}>Không có thói quen nào.</div>
              ) : (
                habits.map(habit => {
                  const status = getCheckInStatus(habit, date);
                  const isDone = status === 'done';
                  const isSkip = status === 'skip';

                  return (
                    <div key={habit.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDone ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : darkMode ? 'bg-gray-900/50' : 'bg-slate-50'} border ${borderClass}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: habit.color || '#8B5CF6' }}>
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className={`w-5 h-5 ${isSkip ? 'text-yellow-400' : 'text-gray-300'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${textClass}`}>{habit.name}</p>
                        <p className={`text-xs ${subtextClass}`}>{habit.area || 'Chung'}</p>
                      </div>
                      {isSkip && (
                        <span className="text-xs px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 font-medium">Bỏ qua</span>
                      ) || status === 'fail' && (
                        <span className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-700 font-medium">Thất bại</span>
                      ) || isDone && (
                        <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700 font-medium">Xong</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}