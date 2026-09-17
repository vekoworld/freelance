'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../supabaseClient'

export default function AuthPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        alert('สมัครสมาชิกสำเร็จ! กำลังนำคุณเข้าสู่หน้าตั้งค่าโปรไฟล์...')
        router.push('/profile')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        router.push('/profile')
      }
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="flex justify-end gap-3 mb-4">
  <a
    href="/profile"
    className="text-xs font-semibold px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 transition shadow-sm"
  >
    👤 โปรไฟล์ฟรีแลนซ์ / เข้าสู่ระบบ
  </a>
</div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
          {isSignUp ? 'สมัครสมาชิกฟรีแลนซ์' : 'เข้าสู่ระบบ'}
        </h1>
        <p className="text-slate-500 text-xs text-center mb-6">
          {isSignUp ? 'สร้างโปรไฟล์เพื่อรับงานตรงจากผู้ว่าจ้าง' : 'ยินดีต้อนรับกลับเข้าสู่ระบบ'}
        </p>

        {errorMsg && (
          <div className="p-3 mb-4 text-xs bg-red-50 text-red-600 rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                ชื่อ-นามสกุล หรือ นามแฝง
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="เช่น สมชาย สายโค้ด"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              อีเมล
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              รหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'กำลังประมวลผล...' : isSignUp ? 'สร้างบัญชีสมาชิก' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          {isSignUp ? 'มีบัญชีอยู่แล้ว?' : 'ยังไม่มีบัญชีสมาชิก?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setErrorMsg('')
            }}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            {isSignUp ? 'เข้าสู่ระบบที่นี่' : 'สมัครสมาชิกฟรีแลนซ์'}
          </button>
        </div>
      </div>
    </main>
  )
}