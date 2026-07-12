# UniEvent Flow Client

Nền tảng Frontend xử lý giao diện đăng ký sự kiện, dashboard quản trị và luồng quét mã QR tốc độ cao cho UniEvent Flow.

## 1. Kiến Trúc Frontend (Bullet-proof Architecture)

Dự án không chấp nhận kiểu thiết kế "chạy được là được". Codebase phải đảm bảo tính mở rộng, an toàn kiểu dữ liệu (Type-safe) và hiệu năng render tối ưu.

- **Core:** React 18 + TypeScript (Strict Mode).
- **Build Tool:** Vite (thay thế Webpack/CRA để tăng tốc độ HMR và Build).
- **Styling:** Tailwind CSS (Atomic CSS, loại bỏ css-in-js gây chậm render).
- **Data Fetching:** Axios + React Query (Quản lý state bất đồng bộ, caching, retry tự động).
- **Biểu đồ & AI Dashboard:** Recharts.
- **Quét QR:** Thư viện quét mã vạch qua WebRTC (vd: html5-qrcode / zxing).

## 2. Các Quyết định Thiết kế (Architecture Decision Records)

| Vấn đề | Giải pháp nghiệp dư | Giải pháp tại UniEvent Flow | Lý do áp dụng |
| :--- | :--- | :--- | :--- |
| **Quản lý Thư viện** | `npm install` thả nổi | **Cài đặt Deterministic (`npm ci`)** | Khoá cứng phiên bản từ `package-lock.json`, đảm bảo môi trường dev đồng nhất 100%, tránh lỗi conflict version khi ráp code. |
| **Giao tiếp API** | Dùng `fetch` / `useEffect` thô | **React Query + Axios Interceptors** | Tự động xử lý lỗi 401, đính kèm JWT Bearer token tự động, cache dữ liệu dashboard không cần gọi lại nhiều lần. |
| **Kiểm soát UI State** | Trộn lẫn Logic & UI | **Custom Hooks Pattern** | Tách biệt hoàn toàn API logic và View. UI component chỉ nhận props và render. |
| **Luồng Quét QR** | Render component liên tục | **Debounce/Throttle Scanner** | Ngăn chặn việc gửi hàng chục request/giây lên backend khi camera vô tình quét qua mã nhiều lần. |

## 3. Hướng dẫn Cài đặt & Khởi chạy (Zero-Friction Setup)

Môi trường được thiết lập sao cho người mới chỉ cần chạy 2 lệnh là có thể bắt đầu code. Không có thao tác thủ công, không yêu cầu cập nhật lại tài liệu khi thêm thư viện.

### Yêu cầu tiên quyết
- **Node.js** (v18.x hoặc cao hơn)
- **Git**

### Các bước khởi chạy

**Bước 1: Thiết lập Biến môi trường**
Sao chép cấu hình mẫu. Chú ý: Không lưu trữ JWT Secret hay API Key trực tiếp trên client. Chỉ lưu các biến public (`VITE_API_BASE_URL`).
```bash
cp .env.example .env.local
```

**Bước 2: Cài đặt Dependency (Bắt buộc dùng `npm ci`)**
TUYỆT ĐỐI KHÔNG SỬ DỤNG `npm install` khi setup dự án lần đầu. Chạy lệnh dưới đây để hệ thống tự đọc file `.lock` và cài đặt chính xác từng byte phiên bản thư viện.
```bash
npm ci
```
*(Quy tắc: Khi 1 dev thêm thư viện mới bằng `npm i <lib>`, họ push cả `package-lock.json` lên Git. Người khác pull code về chỉ việc chạy lại `npm ci` là đồng bộ hoàn toàn. README không bao giờ cần cập nhật lại cho bước này.)*

**Bước 3: Khởi động Development Server**
```bash
npm run dev
```
Truy cập `http://localhost:5173`. Hệ thống tự động Hot-Module-Reload khi có thay đổi.

## 4. Cấu trúc Codebase Chuyên nghiệp

```text
src/
├── assets/          # Hình ảnh, icon, font tĩnh
├── components/      # UI Component dùng chung (Button, Modal, Card)
├── config/          # Cấu hình hằng số, biến môi trường (env wrappers)
├── features/        # Phân chia theo module nghiệp vụ (Events, Scanner, Dashboard)
├── hooks/           # Custom React Hooks (useAuth, useQRScanner)
├── layouts/         # Layout cho Student, Organizer, Public
├── routes/          # Định nghĩa Router (React Router v6)
├── services/        # Định nghĩa Axios instance và các API endpoints
├── types/           # Định nghĩa Type/Interface cho TypeScript
└── utils/           # Helper functions (formatDate, currency, regex)
```

## 5. Tiêu chuẩn Mã nguồn (Strict Quality Gate)
- **TypeScript Only:** Mọi biến, props, response API đều phải có Type/Interface rõ ràng. Cấm sử dụng `any`.
- **Linting & Formatting:** Bắt buộc cài đặt ESLint và Prettier. Code không pass Linting sẽ bị chặn tại pre-commit hook (Husky).
- **Git Workflow:** Tên branch và commit message phải tuân thủ Conventional Commits (ví dụ: `feat: add qr scanner`, `fix: token refresh bug`).
