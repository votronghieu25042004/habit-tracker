// src/pages/CalendarPage.jsx
import { useState } from 'react'; // Import useState
import { Calendar, Activity, Info } from 'lucide-react';
import { DayDetailModal } from '../components/DayDetailModal'; // Import Modal mới (sẽ tạo ở bước 2)

export function CalendarPage({ habits, darkMode }) {
  const [selectedDayDetail, setSelectedDayDetail] = useState(null); // Thêm state

  const getLast84Days = () => {
    const days = [];
    for (let i = 83; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.getMonth(),
        weekday: date.getDay()
      });
    }
    return days;
  };

  const last84Days = getLast84Days();
  const weeks = [];
  for (let i = 0; i < last84Days.length; i += 7) {
    weeks.push(last84Days.slice(i, i + 7));
  }

  const getHeatMapIntensity = (date, habit) => {
    const checkIn = (habit.checkIns || []).find(c => c.date === date);
    if (!checkIn || checkIn.status === 'none') return darkMode ? 'bg-gray-700/50' : 'bg-gray-100';
    if (checkIn.status === 'skip') return darkMode ? 'bg-yellow-900/40' : 'bg-yellow-100';
    if (checkIn.status === 'fail') return darkMode ? 'bg-red-900/40' : 'bg-red-100';
    return darkMode ? 'bg-gray-700' : 'bg-gray-100';
  };

  const getOverallIntensity = (date) => {
    const completed = habits.filter(h => {
      const checkIn = (h.checkIns || []).find(c => c.date === date);
      return checkIn?.status === 'done';
    }).length;

    if (completed === 0) return darkMode ? 'bg-gray-700/50' : 'bg-gray-100'; // Ô trống (trắng)

    // Chuyển sang thang màu tím để đồng bộ với nút bấm
    if (completed === 1) return 'bg-violet-100 dark:bg-violet-950'; // Ô rất nhạt
    if (completed === 2) return 'bg-violet-300 dark:bg-violet-800'; // Ô trung bình
    if (completed >= 3) return 'bg-violet-600 dark:bg-violet-600'; // Ô đậm (max)

    return darkMode ? 'bg-gray-700/50' : 'bg-gray-100';
  };

  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const bgCardClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-100';
  const boxClass = `rounded-3xl p-6 md:p-8 border ${borderClass} ${bgCardClass} shadow-sm`;

  const monthNames = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative"> {/* Thêm relative */}
      {/* Header */}
      <div className={`${boxClass} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div>
          <h2 className={`text-3xl ${textClass} font-extrabold tracking-tight`}>Hành trình của bạn</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Nhìn lại những nỗ lực bạn đã bỏ ra qua biểu đồ nhiệt (Heatmap)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Cột trái: Heatmap Tổng quan chiếm 7 cột */}
        <div className="xl:col-span-8 space-y-6">
          <div className={boxClass}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-xl ${textClass} font-bold`}>Hoạt động tổng quan</h3>
            </div>

            <div className="space-y-1.5 overflow-x-auto pb-4">
              <div className="flex gap-1.5 mb-2 min-w-max">
                <div className="w-8"></div>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex-1 text-center text-xs font-medium text-gray-400">
                    {i % 2 === 0 ? monthNames[new Date(last84Days[i * 7]?.date || '').getMonth()] : ''}
                  </div>
                ))}
              </div>

              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((dayName, dayIdx) => (
                <div key={dayIdx} className="flex gap-1.5 items-center min-w-max">
                  <div className="w-8 text-[10px] font-medium text-gray-400 text-right pr-2">{dayName}</div>
                  {weeks.map((week, weekIdx) => {
                    const day = week[dayIdx];
                    if (!day) return <div key={weekIdx} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;

                    return (
                      <div
                        key={weekIdx}
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md ${getOverallIntensity(day.date)} transition-all duration-200 hover:scale-125 hover:shadow-md cursor-pointer`}
                        title={`${day.date}: ${habits.filter(h => (h.checkIns || []).find(c => c.date === day.date && c.status === 'done')).length} thói quen`}
                        onClick={() => setSelectedDayDetail(day.date)} // Thêm dòng này
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 text-xs font-medium text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-6">
              <span>Ít</span>
              <div className={`w-4 h-4 rounded-sm ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}></div>
              <div className="w-4 h-4 rounded-sm bg-blue-200 dark:bg-blue-900/40"></div>
              <div className="w-4 h-4 rounded-sm bg-blue-400 dark:bg-blue-700/60"></div>
              <div className="w-4 h-4 rounded-sm bg-blue-600 dark:bg-blue-500"></div>
              <span>Nhiều</span>
            </div>
          </div>
        </div>

        {/* Cột phải: Chú thích & Từng thói quen */}
        <div className="xl:col-span-4 space-y-6">
          {/* Legend */}
          <div className={`${boxClass} bg-gradient-to-br dark:to-gray-100`}>
            <div className="flex items-center gap-2 mb-5">
              <Info className="w-4 h-4 text-gray-400" />
              <h4 className={`text-sm ${textClass} font-bold uppercase tracking-wider`}>Chú thích màu sắc</h4>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm font-medium">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-green-500 shadow-sm shadow-green-200 dark:shadow-none"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Hoàn thành</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-md ${darkMode ? 'bg-yellow-900/40' : 'bg-yellow-100'}`}></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Bỏ qua</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-md ${darkMode ? 'bg-red-900/40' : 'bg-red-100'}`}></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Thất bại</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-500'}`}></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Chưa làm</span>
              </div>
            </div>
          </div>

          {/* Individual Habit Heat Maps */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {habits.length === 0 ? (
              <div className={`${boxClass} text-center py-12 text-sm text-gray-500`}>
                Chưa có dữ liệu thói quen.
              </div>
            ) : (
              habits.map(habit => (
                <div key={habit.id} className={`${boxClass} !p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: habit.color || '#8B5CF6' }}
                      />
                      <h4 className={`${textClass} font-semibold truncate max-w-[150px]`}>{habit.name}</h4>
                    </div>
                    <span className="text-xs font-bold text-white bg-gray-100 dark:bg-gray-500 px-2 py-2 rounded-lg">
                      {(habit.checkIns || []).filter(c => c.status === 'done').length} hoàn thành
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-1">
                    {last84Days.map((day, idx) => {
                      const checkIn = (habit.checkIns || []).find(c => c.date === day.date);
                      const isDone = checkIn?.status === 'done';
                      const bgColorClass = isDone ? '' : getHeatMapIntensity(day.date, habit);

                      return (
                        <div
                          key={idx}
                          className={`aspect-square rounded-[4px] transition-transform duration-200 hover:scale-150 cursor-pointer ${bgColorClass}`}
                          style={{
                            backgroundColor: isDone ? (habit.color || '#8B5CF6') : undefined
                          }}
                          title={`${day.date}: ${checkIn?.status || 'Chưa làm'}`}
                          onClick={() => setSelectedDayDetail(day.date)} // Thêm dòng này
                        />
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedDayDetail && (
        <DayDetailModal
          date={selectedDayDetail}
          habits={habits}
          darkMode={darkMode}
          onClose={() => setSelectedDayDetail(null)}
        />
      )}
    </div>
  );
}