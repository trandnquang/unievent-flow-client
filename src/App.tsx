export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-4 tracking-tight">
          Hệ thống Đã Lên Mạng
        </h1>
        <p className="text-gray-600 font-medium leading-relaxed">
          Tailwind CSS v4 đã được biên dịch thành công. Các class tiện ích đang hoạt động với độ trễ bằng không.
        </p>
        <button className="mt-6 w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors duration-200">
          Xác nhận Check-in
        </button>
      </div>
    </div>
  )
}