🌤️ Weather Forecast App

📖 Mô tả dự án
Ứng dụng hiển thị dự báo thời tiết theo thời gian thực dựa trên vị trí hiện tại hoặc địa điểm người dùng nhập vào.

## 🚀 Công nghệ sử dụng

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Công cụ build siêu nhanh
- [Axios](https://axios-http.com/) - Gọi API
- [Weather API](https://www.weatherapi.com/) - API dự báo thời tiết

---

🧩 Tính năng
    ✅ Hiển thị thời tiết hiện tại (nhiệt độ, trạng thái, độ ẩm, tốc độ gió,…)
    🔍 Tìm kiếm địa điểm và xem dự báo
    📌 Thêm và xoá các địa điểm yêu thích
    📍 Lấy vị trí hiện tại bằng Geolocation API
    📆 Hiển thị dự báo thời tiết 7 ngày
    🧱 Responsive: Tương thích desktop & mobile
    🔧 Axios interceptor
    🗂️ Quản lý state với Redux Toolkit


## 📦 Cài đặt và chạy dự án

### 1. Clone dự án:
    ```bash
    git clone https://github.com/PhucThinh2002/weather-web
    ```

### 2. Cài đặt dependencies:
    npm install

### 3. Chạy ứng dụng:
    npm run dev



## 🔐 API Key WeatherAPI
    Đăng ký tại https://www.weatherapi.com
    Hoặc dùng tạm key: 1f6ced3bfab143cda1e44028240205
    Lưu ý: Nếu key hết hạn, vui lòng tự tạo tài khoản và lấy key mới.

🧱 Cấu trúc thư mục cơ bản (Web)
src/
├── assets/                # Hình ảnh, icon
├── components/            # Component giao diện
│   ├── Header.jsx
│   └── Dashboard.jsx
├── redux/                 # Redux Toolkit (slice, store)
│   ├── locationSlice.js
│   └── weatherSlice.js
├── services/              # Cấu hình Axios & API call
│   └── axios.js
├── App.jsx
└── main.jsx
    
### Màn hình
    ![Weather](./src/assets/weatherweb.png)
