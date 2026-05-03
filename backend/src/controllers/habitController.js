const supabase = require('../config/supabase');

exports.getHabits = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('habits')
      .select('*, habit_logs(*)');
      
    if (error) throw error;
    
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.getHabitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('habits')
      .select('*, habit_logs(*)')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Không tìm thấy thói quen' });
      }
      throw error;
    }
    
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.createHabit = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Tên thói quen là bắt buộc' });
    }

    const { data, error } = await supabase
      .from('habits')
      .insert([{ name, description }])
      .select()
      .single();
      
    if (error) throw error;
    
    res.status(201).json({ message: 'Tạo thói quen thành công', data });
  } catch (error) {
    next(error);
  }
};

exports.updateHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const { data, error } = await supabase
      .from('habits')
      .update({ name, description, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    res.status(200).json({ message: 'Cập nhật thành công', data });
  } catch (error) {
    next(error);
  }
};

exports.deleteHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    res.status(200).json({ message: 'Xóa thói quen thành công' });
  } catch (error) {
    next(error);
  }
};

exports.checkIn = async (req, res, next) => {
  try {
    const { id } = req.params; // habit_id
    
    // Kiểm tra xem habit có tồn tại không
    const { data: habit, error: habitError } = await supabase
      .from('habits')
      .select('id')
      .eq('id', id)
      .single();
      
    if (habitError || !habit) {
      return res.status(404).json({ error: 'Không tìm thấy thói quen' });
    }

    // Lấy ngày hiện tại (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Thực hiện check-in (nhờ constraint UNIQUE ở Database, nếu trùng nó sẽ quăng lỗi)
    const { data, error } = await supabase
      .from('habit_logs')
      .insert([{ habit_id: id, check_in_date: today }])
      .select()
      .single();

    if (error) {
      // 23505 là mã lỗi unique_violation của PostgreSQL
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Bạn đã check-in cho thói quen này hôm nay rồi.' });
      }
      throw error;
    }

    res.status(200).json({ message: 'Check-in thành công', data });
  } catch (error) {
    next(error);
  }
};
