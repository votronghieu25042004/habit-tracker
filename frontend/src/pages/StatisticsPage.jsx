import { Flame, TrendingUp, Award, Target, Activity } from 'lucide-react';

export function StatisticsPage({ habits, darkMode }) {
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const bgCardClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-100';
  const boxClass = `rounded-3xl border ${borderClass} ${bgCardClass} shadow-sm overflow-hidden transition-all`;

  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last30Days = getLast30Days();
  const last7Days = getLast7Days();

  const getCompletionData = (days) => {
    return days.map(date => {
      const completed = habits.filter(h =>
        (h.checkIns || []).find(c => c.date === date && c.status === 'done')
      ).length;
      return { date, completed, total: habits.length };
    });
  };

  const completionData = getCompletionData(last30Days);
  const weekData = getCompletionData(last7Days);

  const maxCompleted = Math.max(...completionData.map(d => d.completed), 1);

  const thisWeekCompleted = weekData.reduce((sum, d) => sum + d.completed, 0);
  const lastWeekData = getCompletionData(
    last30Days.slice(last30Days.length - 14, last30Days.length - 7)
  );
  const lastWeekCompleted = lastWeekData.reduce((sum, d) => sum + d.completed, 0);
  const weekTrend = thisWeekCompleted - lastWeekCompleted;

  const totalCompleted = habits.reduce((sum, h) =>
    sum + (h.checkIns || []).filter(c => c.status === 'done').length, 0
  );

  const bestHabit = habits.length > 0 
    ? [...habits].sort((a, b) => (b.streak || 0) - (a.streak || 0))[0]
    : null;
    
  const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header section theo phong cách Bento */}
      <div className={`${boxClass} p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
  <div>
    <h2 className={`text-3xl ${textClass} font-extrabold tracking-tight`}>Gương mặt vàng trong làng kỷ luật</h2>
    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
      Phân tích chi tiết về tiến trình và hiệu suất của bạn qua những con số biết nói.
    </p>
  </div>
</div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Cột trái (Chỉ số nhanh + Biểu đồ 30 ngày) chiếm 7 cột */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Lưới 4 ô Bento nhỏ */}
<div className="grid grid-cols-2 gap-4 sm:gap-6">
  <div className={`${boxClass} p-6 flex flex-col gap-4 hover:shadow-md transition-shadow`}>
    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
      <Target className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Tổng hoàn thành</p>
      <p className={`text-3xl sm:text-4xl ${textClass} font-black tracking-tight mt-1`}>{totalCompleted}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>Tất cả thời gian</p>
    </div>
  </div>

  <div className={`${boxClass} p-6 flex flex-col gap-4 hover:shadow-md transition-shadow`}>
    <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
      <Flame className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Tổng chuỗi ngày</p>
      <p className={`text-3xl sm:text-4xl ${textClass} font-black tracking-tight mt-1`}>{totalStreak}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>Ngày liên tiếp</p>
    </div>
  </div>

  <div className={`${boxClass} p-6 flex flex-col gap-4 hover:shadow-md transition-shadow`}>
    <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center">
      <TrendingUp className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Xu hướng tuần</p>
      <p className={`text-3xl sm:text-4xl ${textClass} font-black tracking-tight mt-1`}>
        {weekTrend > 0 ? '+' : ''}{weekTrend}
      </p>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>So với tuần trước</p>
    </div>
  </div>

  <div className={`${boxClass} p-6 flex flex-col gap-4 hover:shadow-md transition-shadow`}>
    <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center">
      <Award className="w-5 h-5 text-white" />
    </div>
    <div className="w-full">
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Top thói quen</p>
      <p className={`text-lg sm:text-xl ${textClass} font-bold tracking-tight mt-1 truncate w-full`} title={bestHabit?.name || 'N/A'}>
        {bestHabit?.name || 'N/A'}
      </p>
      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
        {bestHabit?.streak || 0} ngày chuỗi
      </p>
    </div>
  </div>
</div>

          {/* Biểu đồ 30 ngày (Bento dẹt) */}
          <div className={`${boxClass} p-6 md:p-8`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-xl ${textClass} font-bold`}>Hiệu suất 30 ngày qua</h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Số lượng HT</span>
              </div>
            </div>

            <div className="space-y-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {completionData.length === 0 ? (
                <div className={`text-sm text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Chưa có dữ liệu</div>
              ) : (
                completionData.map((data, idx) => {
                  const percentage = data.total > 0 ? (data.completed / data.total) * 100 : 0;
                  const barHeight = data.total > 0 ? (data.completed / maxCompleted) * 100 : 0;

                  return (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className={`w-14 text-xs font-medium text-right ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-800'} transition-colors`}>
                        {new Date(data.date).toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' })}
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className={`flex-1 h-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
                            style={{ width: `${barHeight}%` }}
                          />
                        </div>
                        <div className={`w-8 text-sm font-bold ${textClass} text-right`}>
                          {data.completed}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Cột phải (Chi tiết từng thói quen) chiếm 5 cột */}
        <div className="xl:col-span-5">
          <div className={`${boxClass} p-6 md:p-8 h-full`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-xl ${textClass} font-bold`}>Phân tích chi tiết</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                {habits.length} Habits
              </span>
            </div>

            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {habits.length === 0 ? (
                <div className={`text-sm text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Hãy bắt đầu tạo thói quen đầu tiên!</div>
              ) : (
                habits.map(habit => {
                  const checkIns = habit.checkIns || [];
                  const completedCount = checkIns.filter(c => c.status === 'done').length;
                  const skipCount = checkIns.filter(c => c.status === 'skip').length;
                  const failCount = checkIns.filter(c => c.status === 'fail').length;
                  const totalCheckins = completedCount + skipCount + failCount;
                  const completionRate = totalCheckins > 0 ? (completedCount / totalCheckins) * 100 : 0;

                  return (
                    <div key={habit.id} className={`p-5 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-750' : 'border-gray-100 bg-gray-50/50 hover:bg-white'} transition-colors`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: habit.color || '#8B5CF6' }}
                          />
                          <h4 className={`${textClass} font-bold text-lg`}>{habit.name}</h4>
                        </div>
                        {habit.area && (
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                            {habit.area}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-900/50' : 'bg-white shadow-sm'}`}>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Chuỗi hiện tại</p>
                          <p className={`text-xl ${textClass} font-bold flex items-center gap-1.5`}>
                            <Flame className="w-4 h-4 text-orange-500" />
                            {habit.streak || 0}
                          </p>
                        </div>
                        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-900/50' : 'bg-white shadow-sm'}`}>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Kỷ lục cao nhất</p>
                          <p className={`text-xl ${textClass} font-bold flex items-center gap-1.5`}>
                            <Award className="w-4 h-4 text-purple-500" />
                            {habit.bestStreak || 0}
                          </p>
                        </div>
                      </div>

                      <div className="mb-5">
                        <div className="flex justify-between text-xs font-medium mb-2">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Tỉ lệ hoàn thành</span>
                          <span className={textClass}>{completionRate.toFixed(0)}%</span>
                        </div>
                        <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${completionRate}%`,
                              backgroundColor: habit.color || '#8B5CF6'
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">{completedCount}</span>
                          <span className="text-[10px] font-medium text-green-600/70 dark:text-green-500/70 uppercase">Done</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                          <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{skipCount}</span>
                          <span className="text-[10px] font-medium text-yellow-600/70 dark:text-yellow-500/70 uppercase">Skip</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                          <span className="text-lg font-bold text-red-600 dark:text-red-400">{failCount}</span>
                          <span className="text-[10px] font-medium text-red-600/70 dark:text-red-500/70 uppercase">Fail</span>
                        </div>
                      </div>
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