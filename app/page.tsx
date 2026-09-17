import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation Bar */}
      <nav className="w-full bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            🚀 FreelanceHub
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="text-xs md:text-sm font-semibold px-3 py-1.5 text-slate-700 hover:text-blue-600 transition"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/auth"
              className="text-xs md:text-sm font-semibold px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm transition"
            >
              สมัครเป็นฟรีแลนซ์
            </Link>
            <Link
              href="/profile"
              className="text-xs md:text-sm font-semibold px-3 py-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              👤 โปรไฟล์
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          แหล่งรวมฟรีแลนซ์คุณภาพ & ประกาศงาน
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto mb-8">
          สร้างโปรไฟล์แสดงผลงานรับงานตรงจากผู้ว่าจ้าง หรือค้นหาฟรีแลนซ์มืออาชีพได้ทันที
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/auth"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow transition"
          >
            สร้างโปรไฟล์ฟรีแลนซ์
          </Link>
          <Link
            href="/profile"
            className="px-6 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold rounded-xl text-sm transition"
          >
            จัดการข้อมูลส่วนตัว
          </Link>
        </div>
      </section>

      {/* Jobs / Content Section */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-4">💼 งานล่าสุด</h2>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-slate-500 text-sm">
          ยินดีต้อนรับสู่ FreelanceHub! คุณสามารถเข้าสู่ระบบและสร้างโปรไฟล์ฟรีแลนซ์ได้ทันทีผ่านปุ่มด้านบน
        </div>
      </section>
    </main>
  )
}