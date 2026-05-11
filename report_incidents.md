# BÁO CÁO SỰ CỐ (INCIDENT LOGS)

Dưới đây là 3 lỗi thực tế đã xảy ra trong quá trình phát triển và vận hành hệ thống, được ghi nhận lại trong `backend-error.log`.

---

### Incident 1: Lỗi kết nối Supabase (fetch failed)
- **Hiện tượng:** Frontend không thể lấy danh sách thói quen (Habits) khi gọi API, giao diện bị treo ở trạng thái loading hoặc báo lỗi mạng.
- **Log:**
  ```text
  [2026-05-11T08:16:39.255Z] TypeError: fetch failed
  ::1 - - [11/May/2026:08:16:39 +0000] "GET /api/habits HTTP/1.1" 500 56 "http://localhost:5173/" 
  ```
- **Layer:** L3: Backend (và L2: Database)
- **Nguyên nhân:** File `.env` chứa `SUPABASE_URL` và `SUPABASE_KEY` bị đặt sai vị trí (đặt ở thư mục gốc của project thay vì thư mục `backend`). Thư viện `dotenv` khi chạy `npm start` trong thư mục `backend` không tìm thấy file `.env`, dẫn đến việc không có cấu hình kết nối database, làm hàm fetch nội bộ của thư viện Supabase bị lỗi.
- **Cách fix:** Copy/di chuyển file `.env` vào đúng thư mục `backend` và khởi động lại server. (Đã thực hiện tự động qua CI/CD và Docker compose file nội bộ).
- **Cách phòng tránh:** Khai báo rõ đường dẫn đọc cấu hình (ví dụ `require('dotenv').config({ path: '../.env' })` hoặc đảm bảo file `.env` luôn được đặt đúng chỗ theo tài liệu setup. Kiểm tra biến môi trường lúc khởi động server và văng lỗi sớm nếu thiếu.
- **Hình minh họa:** *(Bạn tự chèn ảnh chụp màn hình log backend báo lỗi `⚠️ Chú ý: Chưa cấu hình đúng...` vào đây)*

---

### Incident 2: Lỗi Check-in Habit (Bad Request 400)
- **Hiện tượng:** User click vào nút check-in cho một thói quen trong ngày, nhưng không có thông báo thành công và dữ liệu không được cập nhật.
- **Log:**
  ```text
  ::1 - - [11/May/2026:08:20:58 +0000] "POST /api/habits/e4652f45-d68a-4653-a74f-45978a3d1b74/checkin HTTP/1.1" 400 67 "http://localhost:5173/" 
  ```
- **Layer:** L3: Backend
- **Nguyên nhân:** Lỗi 400 Bad Request thường do dữ liệu gửi từ frontend không hợp lệ hoặc thiếu payload bắt buộc (ví dụ thiếu ngày tháng, định dạng UUID sai) khiến controller của Backend từ chối xử lý request. 
- **Cách fix:** Bổ sung validation middleware ở Backend để log chi tiết field nào bị thiếu. Phía Frontend cần kiểm tra kỹ payload trước khi fetch (ví dụ xem có truyền body JSON chứa `date` không).
- **Cách phòng tránh:** Xây dựng schema validation chặt chẽ bằng thư viện như Joi hoặc Zod ở backend, đồng thời định nghĩa TypeScript/PropTypes ở frontend để đồng bộ cấu trúc dữ liệu.
- **Hình minh họa:** *(Bạn tự chèn ảnh Network Tab trên trình duyệt báo đỏ API checkin)*

---

### Incident 3: Conflict Cổng Mạng (Port Binding Error) khi chạy Docker
- **Hiện tượng:** Chạy lệnh `docker compose up -d` thất bại, container backend và frontend không thể khởi động.
- **Log:**
  ```text
  Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint habit-tracker-backend-1: Bind for 0.0.0.0:3000 failed: port is already allocated
  ```
- **Layer:** L1: Infrastructure (Docker / Hệ điều hành)
- **Nguyên nhân:** Cổng 3000 và 8080 trên máy host đã bị phần mềm khác chiếm dụng (Cụ thể: cổng 3000 bị chiếm do backend đang chạy ngầm trên Node.js `npm start`). Docker không thể map port từ container ra ngoài máy host.
- **Cách fix:** Đã chỉnh sửa lại file `docker-compose.yml`, đổi port của backend thành `3001` (`3001:3000`) và frontend thành `8081` (`8081:80`) để tránh hoàn toàn xung đột với môi trường dev local.
- **Cách phòng tránh:** Có script kiểm tra port khả dụng trước khi chạy, hoặc sử dụng các dải port đặc thù ít bị trùng lặp cho các dịch vụ Docker thay vì dùng dải mặc định (3000, 80, 8080).
- **Hình minh họa:** *(Bạn tự chèn ảnh terminal báo lỗi port is already allocated)*
