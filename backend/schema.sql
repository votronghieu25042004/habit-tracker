-- Tạo bảng habits
CREATE TABLE public.habits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng habit_logs
CREATE TABLE public.habit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_habit_checkin UNIQUE (habit_id, check_in_date)
);

-- Bật RLS (Row Level Security) (Tùy chọn, ở đây ta để public cho dễ test backend API)
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

-- Cấp quyền truy cập (nếu dùng backend service role key thì không cần, nhưng nếu dùng anon key thì cần policy)
-- Policy cho phép mọi người truy cập (Vì việc xác thực được xử lý ở backend)
CREATE POLICY "Allow all on habits" ON public.habits FOR ALL USING (true);
CREATE POLICY "Allow all on habit_logs" ON public.habit_logs FOR ALL USING (true);
