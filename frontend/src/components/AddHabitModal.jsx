import { useState, useEffect } from 'react';
import { X, Clock, Hash, CheckSquare } from 'lucide-react';

export function AddHabitModal({ onClose, onAdd, darkMode, habitToEdit }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('check');
  const [color, setColor] = useState('#3B82F6');
  const [area, setArea] = useState('health');
  const [timeOfDay, setTimeOfDay] = useState('anytime');
  const [frequencyType, setFrequencyType] = useState('daily');
  const [weekDays, setWeekDays] = useState([1, 2, 3, 4, 5]);
  const [timesPerWeek, setTimesPerWeek] = useState(3);
  const [targetValue, setTargetValue] = useState(1);
  const [targetUnit, setTargetUnit] = useState('times');
  const [timerDuration, setTimerDuration] = useState(15);
  const [reminderTime, setReminderTime] = useState('');

  // Tự động điền dữ liệu cũ nếu đang ở chế độ Sửa
  useEffect(() => {
    if (habitToEdit) {
      setName(habitToEdit.name || '');
      setType(habitToEdit.type || 'check');
      setColor(habitToEdit.color || '#3B82F6');
      setArea(habitToEdit.area || 'health');
      setTimeOfDay(habitToEdit.timeOfDay || 'anytime');
      setFrequencyType(habitToEdit.frequencyType || 'daily');
    }
  }, [habitToEdit]);

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
    '#EF4444', '#06B6D4', '#EC4899', '#6366F1'
  ];

  const areas = [
    { value: 'health', label: 'Sức khỏe' },
    { value: 'fitness', label: 'Thể dục' },
    { value: 'learning', label: 'Học tập' },
    { value: 'work', label: 'Công việc' },
    { value: 'mindfulness', label: 'Tâm trí' },
    { value: 'social', label: 'Xã hội' }
  ];

  const times = [
    { value: 'morning', label: 'Buổi sáng' },
    { value: 'afternoon', label: 'Buổi chiều' },
    { value: 'evening', label: 'Buổi tối' },
    { value: 'anytime', label: 'Bất kỳ' }
  ];

  const weekDayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const toggleWeekDay = (day) => {
    if (weekDays.includes(day)) {
      setWeekDays(weekDays.filter(d => d !== day));
    } else {
      setWeekDays([...weekDays, day].sort());
    }
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd({
        name,
        type,
        color,
        area,
        timeOfDay,
        frequencyType,
        weekDays: frequencyType === 'weekly' ? weekDays : undefined,
        timesPerWeek: frequencyType === 'custom' ? timesPerWeek : undefined,
        targetValue: type === 'number' ? targetValue : undefined,
        targetUnit: type === 'number' ? targetUnit : undefined,
        timerDuration: type === 'timer' ? timerDuration * 60 : undefined,
        reminderTime: reminderTime || undefined,
        streak: habitToEdit ? habitToEdit.streak : 0,
        bestStreak: habitToEdit ? habitToEdit.bestStreak : 0
      });
    }
  };

  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const inputBgClass = darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className={`${bgClass} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`sticky top-0 ${bgClass} p-6 border-b ${borderClass} flex items-center justify-between z-10`}>
          <h2 className={`text-2xl ${textClass} font-semibold`}>
            {habitToEdit ? 'Sửa thói quen' : 'Tạo thói quen mới'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Habit Name */}
          <div>
            <label className={`block text-sm ${textClass} mb-2 font-medium`}>Tên thói quen</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Đọc sách 30 phút"
              className={`w-full px-4 py-3 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoFocus
            />
          </div>

          {/* Habit Type */}
          <div>
            <label className={`block text-sm ${textClass} mb-3 font-medium`}>Loại thói quen</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setType('check')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === 'check'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : `${borderClass} hover:border-gray-400`
                }`}
              >
                <CheckSquare className={`w-6 h-6 mx-auto mb-2 ${type === 'check' ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${textClass}`}>Đánh dấu</p>
              </button>

              <button
                onClick={() => setType('number')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === 'number'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : `${borderClass} hover:border-gray-400`
                }`}
              >
                <Hash className={`w-6 h-6 mx-auto mb-2 ${type === 'number' ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${textClass}`}>Số lượng</p>
              </button>

              <button
                onClick={() => setType('timer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === 'timer'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : `${borderClass} hover:border-gray-400`
                }`}
              >
                <Clock className={`w-6 h-6 mx-auto mb-2 ${type === 'timer' ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${textClass}`}>Bấm giờ</p>
              </button>
            </div>
          </div>

          {/* Type-specific settings */}
          {type === 'number' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm ${textClass} mb-2 font-medium`}>Mục tiêu</label>
                <input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                  className={`w-full px-4 py-3 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  min="1"
                />
              </div>
              <div>
                <label className={`block text-sm ${textClass} mb-2 font-medium`}>Đơn vị</label>
                <input
                  type="text"
                  value={targetUnit}
                  onChange={(e) => setTargetUnit(e.target.value)}
                  placeholder="VD: ly nước, trang sách"
                  className={`w-full px-4 py-3 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          )}

          {type === 'timer' && (
            <div>
              <label className={`block text-sm ${textClass} mb-2 font-medium`}>Thời gian (phút)</label>
              <input
                type="number"
                value={timerDuration}
                onChange={(e) => setTimerDuration(Number(e.target.value))}
                className={`w-full px-4 py-3 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                min="1"
              />
            </div>
          )}

          {/* Area */}
          <div>
            <label className={`block text-sm ${textClass} mb-2 font-medium`}>Lĩnh vực</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={`w-full px-4 py-3 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {areas.map(a => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>

          {/* Time of Day */}
          <div>
            <label className={`block text-sm ${textClass} mb-2 font-medium`}>Thời điểm</label>
            <div className="grid grid-cols-4 gap-2">
              {times.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTimeOfDay(t.value)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    timeOfDay === t.value
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className={`block text-sm ${textClass} mb-2 font-medium`}>Tần suất</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setFrequencyType('daily')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                    frequencyType === 'daily'
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hàng ngày
                </button>
                <button
                  onClick={() => setFrequencyType('weekly')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                    frequencyType === 'weekly'
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Các ngày trong tuần
                </button>
                <button
                  onClick={() => setFrequencyType('custom')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                    frequencyType === 'custom'
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tùy chỉnh
                </button>
              </div>

              {frequencyType === 'weekly' && (
                <div className="flex gap-2 justify-center">
                  {weekDayNames.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleWeekDay(idx)}
                      className={`w-10 h-10 rounded-full text-sm transition-all ${
                        weekDays.includes(idx)
                          ? 'bg-blue-600 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              )}

              {frequencyType === 'custom' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={timesPerWeek}
                    onChange={(e) => setTimesPerWeek(Number(e.target.value))}
                    className={`w-20 px-3 py-2 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    min="1"
                    max="7"
                  />
                  <span className={textClass}>lần/tuần</span>
                </div>
              )}
            </div>
          </div>

          {/* Reminder */}
          <div>
            <label className={`block text-sm ${textClass} mb-2 font-medium`}>Nhắc nhở (tùy chọn)</label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className={`w-full px-4 py-3 border ${borderClass} ${inputBgClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Color */}
          <div>
            <label className={`block text-sm ${textClass} mb-3 font-medium`}>Màu sắc</label>
            <div className="flex gap-3">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg transition-transform ${
                    color === c ? 'ring-4 ring-offset-2 ring-gray-300 scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`sticky bottom-0 ${bgClass} p-6 border-t ${borderClass} flex gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3 border ${borderClass} ${textClass} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium`}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
          >
            {habitToEdit ? 'Lưu thay đổi' : 'Tạo thói quen'}
          </button>
        </div>
      </div>
    </div>
  );
}