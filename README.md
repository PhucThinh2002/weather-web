# 🌤️ Weather Forecast App

## 📖 Mô tả dự án
• Ứng dụng hiển thị dự báo thời tiết theo thời gian thực  
• Cung cấp thông tin chi tiết về điều kiện thời tiết hiện tại  
• Dự báo thời tiết 7 ngày với các chỉ số quan trọng  

## 🚀 Công nghệ sử dụng
• [React](https://reactjs.org/) - Thư viện xây dựng UI  
• [Vite](https://vitejs.dev/) - Công cụ build tối ưu tốc độ  
• [Redux Toolkit](https://redux-toolkit.js.org/) - Quản lý state tập trung  
• [Axios](https://axios-http.com/) - Xử lý API requests  
• [WeatherAPI](https://www.weatherapi.com/) - Nguồn dữ liệu thời tiết  

## 🧩 Tính năng chính
• 🌟 **Hiển thị thời tiết hiện tại**  
  ◦ Nhiệt độ (°C)  
  ◦ Trạng thái thời tiết (nắng, mưa, nhiều mây...) 
  ◦ Độ ẩm (%)
  ◦ tốc độ gió (km/h)
  ◦ Chỉ số UV  
• Hiển thị icon thời tiết phù hợp với từng điều kiện

• 🔍 **Tìm kiếm địa điểm**  
  ◦ Tìm bằng tên thành phố/quốc gia  
  ◦ Gợi ý tự động khi nhập (autocomplete)
  ◦ Tìm bằng tọa độ địa lý  

• 📍 **Vị trí hiện tại**  
  ◦ Tự động phát hiện qua Geolocation API  
  ◦ Hiển thị thông tin thời tiết tại vị trí hiện tại

• 📆 **Dự báo 7 ngày**  
  ◦ Nhiệt độ cao/thấp mỗi ngày   

• ❤️ Địa điểm yêu thích
  ◦ Thêm/xóa các địa điểm yêu thích
  ◦ Hiển thị thời tiết nhanh tại các địa điểm đã lưu    

• 📱 Responsive Design
  • Giao diện tối ưu cho mọi thiết bị:
    ◦ Mobile (<= 480px)
    ◦ Tablet (<= 768px)
    ◦ Desktop (> 768px)

## 📦 Cài đặt
1. Clone dự án:
   ```bash
   git clone https://github.com/PhucThinh2002/weather-web

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
├── assets/                # Hình ảnh, icon, fonts
├── components/            # Các component UI
│   ├── Dashboard/         # Trang chính hiển thị thời tiết
│   ├── Header/            # Thanh tìm kiếm
│   └── Navbar/            # Thanh điều hướng
├── features/              # Redux features
│   ├── locations/         # Quản lý địa điểm
│   └── weather/           # Quản lý dữ liệu thời tiết
├── services/              # API services
│   ├── axiosConfig.js     # Cấu hình Axios
│   └── weatherAPI.js      # Weather API calls
├── App.jsx                # Component chính
└── main.jsx               # Entry point
    
### Màn hình
    ![Weather](./src/assets/weatherweb.png)
