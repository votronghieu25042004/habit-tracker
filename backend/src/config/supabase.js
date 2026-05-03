const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
// Dùng service_role key ở backend để bỏ qua RLS và có full quyền
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('YOUR_SUPABASE')) {
  console.warn("⚠️ Chú ý: Chưa cấu hình đúng SUPABASE_URL hoặc SUPABASE_KEY trong file .env");
}

let finalUrl = supabaseUrl;
let finalKey = supabaseKey;

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  finalUrl = 'https://placeholder.supabase.co';
}

if (!supabaseKey || supabaseKey.includes('YOUR_SUPABASE')) {
  finalKey = 'placeholder';
}

const supabase = createClient(finalUrl, finalKey);

module.exports = supabase;
