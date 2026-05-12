import { ArrowRight, Target, TrendingUp, Zap, Flame, Smile, CheckCircle2 } from 'lucide-react';

export function LandingPage({ onStart }) {
  // Biến dùng chung cho style các ô
  const boxClass = "bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col";
  const titleClass = "text-xl font-bold text-gray-900 mb-3";
  const descClass = "text-gray-600 text-sm leading-relaxed flex-1";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 sm:p-10 font-sans">
      <div className="max-w-7xl w-full">
        
        {/* Cấu trúc lưới Bento Box 12 cột */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Ô 1: Hero Section (Ô Lớn Nhất - Chiếm 8 cột trên desktop) */}
          <div className={`${boxClass} col-span-12 md:col-span-8 space-y-6 justify-center bg-gradient-to-br from-white via-white to-blue-50/50`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white text-xs font-medium self-start animate-fade-in-down">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Gen Z - Khó Quá Thì Thôi Bỏ</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Đời Của Tôi,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Luật Của Tôi
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Habit Tracker giúp bạn xây dựng thói quen tốt, loại bỏ thói quen xấu và theo dõi tiến trình mỗi ngày một cách trực quan nhất.
            </p>

            <div className="pt-4 self-start">
              <button
                onClick={onStart}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <span className="relative z-10">Bắt đầu hành trình</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Ô 2: Thống kê nhanh (Ô nhỏ - 4 cột) - Chứa UI giả lập */}
          <div className={`${boxClass} col-span-12 md:col-span-4 justify-between`}>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className={titleClass}>Thống kê trực quan</h3>
              <p className={descClass}>Biểu đồ Heatmap và xu hướng giúp bạn nhìn thấy rõ sự nỗ lực.</p>
            </div>
            
            {/* UI Giả lập: Progress Circle */}
            <div className="mt-6 flex items-center justify-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200"/>
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="176" strokeDashoffset="44" className="text-purple-600" strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">75%</div>
                </div>
                <div className="text-xs text-gray-500">Tiến độ tuần này<br/>(Giả lập)</div>
            </div>
          </div>

          {/* Ô 3: Chuỗi ngày (Ô vừa - 4 cột) - Chứa UI giả lập */}
          <div className={`${boxClass} col-span-12 md:col-span-4 justify-between`}>
            <div>
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                    <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className={titleClass}>Giữ vững động lực</h3>
                <p className={descClass}>Hệ thống chuỗi ngày (Streak) khích lệ bạn không bỏ cuộc.</p>
            </div>

            {/* UI Giả lập: Streak Banners */}
            <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between bg-orange-50 p-3 rounded-xl border border-orange-100">
                    <span className="text-sm font-medium text-orange-700">Đọc sách</span>
                    <span className="text-xs font-bold text-orange-600 bg-white px-2 py-0.5 rounded-full shadow-sm">🔥 12 ngày</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl opacity-60">
                    <span className="text-sm font-medium text-gray-700">Tập thể dục</span>
                    <span className="text-xs font-bold text-gray-500 bg-white px-2 py-0.5 rounded-full">🔥 0 ngày</span>
                </div>
            </div>
          </div>

          {/* Ô 4: Danh sách Task (Ô lớn vừa - 8 cột) - Chứa UI giả lập */}
          <div className={`${boxClass} col-span-12 md:col-span-8`}>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className={titleClass + " mb-0"}>Theo dõi dễ dàng</h3>
                    <p className={descClass}>Ghi nhận tiến độ hàng ngày chỉ với một cú chạm.</p>
                </div>
            </div>

            {/* UI Giả lập: Danh sách Task dạng List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    <span className="font-medium text-gray-900">Thiền định (15 phút)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    <span className="font-medium text-gray-900">Uống 2 lít nước</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-colors cursor-pointer opacity-50">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                    <span className="font-medium text-gray-700">Học từ mới (English)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-colors cursor-pointer opacity-50">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                    <span className="font-medium text-gray-700">Viết nhật ký</span>
                </div>
            </div>
          </div>
          
          {/* Ô 5: Footer/About (Ô dài dưới cùng - 12 cột) */}
          <div className={`${boxClass} col-span-12 flex-row items-center justify-between py-5 px-8 opacity-70 hover:opacity-100`}>
            <p className="text-sm text-gray-500">© 2026 Habit Tracker. Được xây dựng bởi Team Supabase.</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Smile className="w-4 h-4 text-green-500" />
                <span>Chúc bạn một ngày làm việc năng suất!</span>
            </div>
          </div>

        </div> {/* Kết thúc Grid */}
      </div>
    </div>
  );
}