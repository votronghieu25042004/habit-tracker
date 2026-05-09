import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { TopNavbar } from "./components/TopNavbar";
import { AddHabitModal } from "./components/AddHabitModal";
import { TodayPage } from "./pages/TodayPage";
import { CalendarPage } from "./pages/CalendarPage";
import { StatisticsPage } from "./pages/StatisticsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem("habit_tracker_started");
  });

  const [habits, setHabits] = useState([]);
  const [settings, setSettings] = useState({
    darkMode: false,
    privacyLock: false,
    notificationsEnabled: true,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null); // Quản lý Habit đang sửa
  const [isLocked, setIsLocked] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleStartApp = () => {
    localStorage.setItem("habit_tracker_started", "true");
    setIsFirstVisit(false);
  };

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${API_URL}/habits`);
      const dbHabits = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      
      const uiHabits = dbHabits.map((dbHabit) => ({
        id: dbHabit.id,
        name: dbHabit.name || "Chưa có tên",
        description: dbHabit.description || "",
        color: dbHabit.color || "#8B5CF6", 
        type: "check",
        area: dbHabit.description || "general",
        timeOfDay: "anytime",
        frequencyType: "daily",
        streak: 0,
        bestStreak: 0,
        checkIns: [],
        createdAt: dbHabit.created_at || new Date().toISOString().split("T")[0],
      }));
      setHabits(uiHabits);
    } catch (error) {
      console.error("Lỗi lấy API, đang dùng dữ liệu Local:", error);
      const savedHabits = localStorage.getItem("habit_tracker_habits");
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      } else {
        setHabits(getSampleHabits());
      }
    }
  };

  useEffect(() => {
    fetchHabits();
    const savedSettings = localStorage.getItem("habit_tracker_settings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Failed to parse settings:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem("habit_tracker_habits", JSON.stringify(habits));
    }
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("habit_tracker_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.privacyLock) {
      setIsLocked(true);
    }
  }, [settings.privacyLock]);

  const getSampleHabits = () => {
    const today = new Date().toISOString().split("T")[0];
    return [{
      id: 999,
      name: "Đây là data mẫu khi mất kết nối BE",
      color: "#8B5CF6",
      type: "check",
      area: "mindfulness",
      timeOfDay: "morning",
      frequencyType: "daily",
      streak: 1,
      bestStreak: 1,
      checkIns: [{ date: today, status: "none" }],
      createdAt: today,
    }];
  };

  // --- LOGIC LƯU THÓI QUEN (DÙNG CHO CẢ THÊM MỚI VÀ SỬA) ---
  const handleSaveHabit = async (habitData) => {
    if (editingHabit) {
      // 1. Nếu đang Sửa (Edit)
      setHabits(habits.map(h => h.id === editingHabit.id ? { ...h, ...habitData } : h));
      try {
        await axios.put(`${API_URL}/habits/${editingHabit.id}`, { name: habitData.name, description: habitData.area || "" });
      } catch (error) {
        console.error("Lỗi khi sửa thói quen:", error);
      }
    } else {
      // 2. Nếu đang Thêm (Add)
      try {
        await axios.post(`${API_URL}/habits`, { name: habitData.name, description: habitData.area || "" });
        fetchHabits(); 
      } catch (error) {
        console.error("Lỗi khi thêm thói quen:", error);
        alert("Lỗi kết nối tới Server!");
      }
    }
    
    // Đóng Modal và Reset state
    setShowAddModal(false);
    setEditingHabit(null);
  };

  // --- LOGIC XÓA THÓI QUEN ---
  const handleDeleteHabit = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thói quen này không? Hành động này không thể hoàn tác!")) return;
    
    setHabits(habits.filter(h => h.id !== id)); // Xóa UI mượt
    try {
      await axios.delete(`${API_URL}/habits/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleCheckIn = async (habitId, status, value, note) => {
    const today = new Date().toISOString().split("T")[0];

    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          const existingCheckInIndex = habit.checkIns.findIndex((c) => c.date === today);
          const newCheckIns = [...habit.checkIns];

          if (existingCheckInIndex >= 0) {
            newCheckIns[existingCheckInIndex] = {
              date: today, status, value, note: note || newCheckIns[existingCheckInIndex].note,
            };
          } else {
            newCheckIns.push({ date: today, status, value, note });
          }

          let newStreak = 0;
          if (status === "done" || status === "skip") {
            newStreak = calculateStreak(newCheckIns);
          }
          const newBestStreak = Math.max(habit.bestStreak, newStreak);

          return { ...habit, checkIns: newCheckIns, streak: newStreak, bestStreak: newBestStreak };
        }
        return habit;
      })
    );

    try {
      await axios.post(`${API_URL}/habits/${habitId}/checkin`, {
        date: today, status: status, value: value || null, note: note || ""
      });
    } catch (error) {
      console.error("Lỗi khi lưu checkin lên Server:", error);
    }
  };

  const calculateStreak = (checkIns) => {
    const sortedCheckIns = [...checkIns]
      .filter((c) => c.status === "done" || c.status === "skip")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedCheckIns.length === 0) return 0;
    let streak = 0;
    const currentDate = new Date();

    for (let i = 0; i < sortedCheckIns.length; i++) {
      const checkInDate = new Date(sortedCheckIns[i].date);
      const expectedDate = new Date(currentDate);
      expectedDate.setDate(expectedDate.getDate() - i);
      const isSameDay = checkInDate.toISOString().split("T")[0] === expectedDate.toISOString().split("T")[0];
      if (isSameDay) { streak++; } else { break; }
    }
    return streak;
  };

  const handleSettingsChange = (newSettings) => setSettings(newSettings);
  
  const handleClearData = () => {
    setHabits([]);
    localStorage.removeItem("habit_tracker_habits");
    localStorage.removeItem("habit_tracker_started");
    setIsFirstVisit(true); 
  };

  const handleExportData = () => {
    const data = JSON.stringify({ habits, settings }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `habit-tracker-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (data) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.habits) setHabits(parsed.habits);
      if (parsed.settings) setSettings(parsed.settings);
      alert("Dữ liệu đã được nhập thành công!");
    } catch (e) {
      alert("Lỗi khi nhập dữ liệu. Vui lòng kiểm tra file.");
    }
  };

  const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);

  if (isFirstVisit) return <LandingPage onStart={handleStartApp} />;

  if (isLocked && settings.privacyLock) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${settings.darkMode ? "bg-gray-900" : "bg-slate-100"}`}>
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full ${settings.darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className={`text-2xl font-semibold mb-2 ${settings.darkMode ? "text-gray-100" : "text-gray-900"}`}>Ứng dụng đã khóa</h2>
          <p className={`mb-6 ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>Trong môi trường demo này, nhấn nút bên dưới để mở khóa</p>
          <button onClick={() => setIsLocked(false)} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity">
            Mở khóa
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${settings.darkMode ? "dark bg-gray-900" : "bg-slate-100"}`}>
        <TopNavbar onNewHabit={() => setShowAddModal(true)} darkMode={settings.darkMode} totalStreak={totalStreak} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-screen-2xl mx-auto px-6 py-6">
            <Routes>
              <Route
                path="/"
                element={
                  <TodayPage
                    habits={habits}
                    onCheckIn={handleCheckIn}
                    // Truyền 2 hàm onEdit và onDelete vào TodayPage
                    onEdit={(habit) => { setEditingHabit(habit); setShowAddModal(true); }}
                    onDelete={handleDeleteHabit}
                    darkMode={settings.darkMode}
                  />
                }
              />
              <Route path="/calendar" element={<CalendarPage habits={habits} darkMode={settings.darkMode} />} />
              <Route path="/statistics" element={<StatisticsPage habits={habits} darkMode={settings.darkMode} />} />
              <Route path="/settings" element={<SettingsPage settings={settings} onSettingsChange={handleSettingsChange} darkMode={settings.darkMode} onClearData={handleClearData} onExportData={handleExportData} onImportData={handleImportData} />} />
            </Routes>
          </div>
        </main>
      </div>

      {showAddModal && (
        <AddHabitModal
          onClose={() => { setShowAddModal(false); setEditingHabit(null); }}
          onAdd={handleSaveHabit}
          darkMode={settings.darkMode}
          habitToEdit={editingHabit} // Truyền habit đang sửa vào Modal
        />
      )}
    </BrowserRouter>
  );
}