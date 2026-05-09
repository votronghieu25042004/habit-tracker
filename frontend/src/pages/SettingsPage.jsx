import { Moon, Sun, Lock, Bell, Trash2, Download, Upload, ShieldCheck, PaintBucket, Database, Info } from 'lucide-react';

export function SettingsPage({
  settings,
  onSettingsChange,
  darkMode,
  onClearData,
  onExportData,
  onImportData
}) {
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const bgCardClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-100';
  const boxClass = `rounded-3xl border ${borderClass} ${bgCardClass} shadow-sm overflow-hidden transition-all`;

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        onImportData(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header section theo phong cách Bento */}
      <div className={`${boxClass} p-6 md:p-8`}>
  <h2 className={`text-3xl ${textClass} font-extrabold tracking-tight`}>Cài đặt hệ thống</h2>
  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
    Tùy chỉnh trải nghiệm Habit Tracker theo cách riêng của bạn.
  </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cột trái */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className={boxClass}>
           <div className={`px-6 py-5 border-b ${borderClass} flex items-center gap-3`}>
              <PaintBucket className="w-5 h-5 text-blue-500" />
              <h3 className={`text-lg ${textClass} font-bold`}>Giao diện</h3>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-yellow-100 text-yellow-600'}`}>
                    {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`${textClass} font-semibold`}>Chế độ tối (Dark Mode)</p>
                    <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Bảo vệ mắt trong điều kiện thiếu sáng
                    </p>
                  </div>
                </div>
                {/* Custom Toggle Switch */}
                <button
                  onClick={() => onSettingsChange({ ...settings, darkMode: !settings.darkMode })}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 flex items-center justify-center ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className={boxClass}>
            <div className={`px-6 py-5 border-b ${borderClass} flex items-center gap-3`}>
              <Lock className="w-5 h-5 text-red-500" />
              <h3 className={`text-lg ${textClass} font-bold`}>Bảo mật & Riêng tư</h3>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-100 flex items-center justify-center text-red-600 dark:text-red-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`${textClass} font-semibold`}>Khóa ứng dụng</p>
                    <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Yêu cầu xác thực khi mở web
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onSettingsChange({ ...settings, privacyLock: !settings.privacyLock })}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner ${
                    settings.privacyLock ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                      settings.privacyLock ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {settings.privacyLock && (
                <div className={`p-4 rounded-2xl text-sm ${darkMode ? 'bg-blue-900/20 text-blue-300 border border-blue-800/50' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                  🔒 Tính năng này hiện mang tính minh họa trên trình duyệt. Bạn sẽ được yêu cầu click mở khóa ở màn hình chờ.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className={boxClass}>
            <div className={`px-6 py-5 border-b ${borderClass} flex items-center gap-3`}>
              <Bell className="w-5 h-5 text-green-500" />
              <h3 className={`text-lg ${textClass} font-bold`}>Thông báo</h3>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-100 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`${textClass} font-semibold`}>Bật nhắc nhở</p>
                    <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Nhận thông báo cho các thói quen
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onSettingsChange({ ...settings, notificationsEnabled: !settings.notificationsEnabled })}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner ${
                    settings.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                      settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className={boxClass}>
            <div className={`px-6 py-5 border-b ${borderClass} flex items-center gap-3`}>
              <Database className="w-5 h-5 text-orange-500" />
              <h3 className={`text-lg ${textClass} font-bold`}>Quản lý dữ liệu</h3>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={onExportData}
                className={`w-full flex items-center gap-3 px-5 py-4 border-2 border-dashed ${borderClass} rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-semibold ${textClass}`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-100 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Download className="w-4 h-4" />
                </div>
                <span>Tải dữ liệu xuống (.json)</span>
              </button>

              <label className={`w-full flex items-center gap-3 px-5 py-4 border-2 border-dashed ${borderClass} rounded-2xl hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-semibold cursor-pointer ${textClass}`}>
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-100 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Upload className="w-4 h-4" />
                </div>
                <span>Phục hồi dữ liệu từ file</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác!')) {
                      onClearData();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-2xl hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Xóa trắng hệ thống</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Box - Trải dài 2 cột */}
      <div className={`${boxClass} p-8 bg-gradient-to-r from-gray-500 to-gray-500 text-white border-none`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Habit Tracker</h3>
            <p className="text-gray-400 text-sm">Phiên bản 1.0.0 (Beta)</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
          Ứng dụng theo dõi và xây dựng thói quen được thiết kế theo phong cách tối giản, hiện đại.
          Phát triển với React, Tailwind CSS và hệ thống Backend mạnh mẽ.
        </p>
      </div>
    </div>
  );
}