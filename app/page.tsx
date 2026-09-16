'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

interface Job {
  id: string
  title: string
  category: string
  description: string
  budget: number
  contact_info: string | null
  is_featured: boolean
  created_at: string
}

const CATEGORIES = [
  'โปรแกรมมิ่ง & เว็บไซต์ & Automation',
  'วิดีโอสั้น (TikTok/Reels) & คอนเทนต์',
  'สอนพิเศษ & ติวเตอร์เฉพาะทาง',
]

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // สถานะฟอร์มลงประกาศงาน
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchJobs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (!error && data) {
      setJobs(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !budget || !contactInfo) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('jobs').insert([
      {
        title,
        category,
        description,
        budget: Number(budget),
        contact_info: contactInfo,
        status: 'open',
        is_featured: false,
      },
    ])

    if (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message)
    } else {
      alert('โพสต์ประกาศงานเรียบร้อยแล้ว!')
      setTitle('')
      setDescription('')
      setBudget('')
      setContactInfo('')
      fetchJobs()
    }
    setSubmitting(false)
  }

  // ระบบกรองข้อมูล: กรองทั้งหมวดหมู่ และ คีย์เวิร์ดค้นหา
  const filteredJobs = jobs.filter((job) => {
    const matchCategory =
      selectedCategory === 'ทั้งหมด' || job.category === selectedCategory
    const matchSearch =
      searchQuery.trim() === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* ส่วนหัวของเว็บ */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600">
            Freelance Hub
          </h1>
          <p className="text-slate-600 mt-2 text-base md:text-lg">
            ตลาดงานเฉพาะทาง: โปรแกรมมิ่ง &bull; คลิปสั้นคอนเทนต์ &bull; ติวเตอร์สอนพิเศษ
          </p>
        </header>

        {/* ช่องค้นหา (Search Bar) */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 ค้นหางานตามคีย์เวิร์ด เช่น Python, ตัดต่อคลิป, ภาษาจีน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            />
            <span className="absolute left-4 top-3.5 text-slate-400 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full px-2 py-1"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* ฟิลเตอร์หมวดหมู่ */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory('ทั้งหมด')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === 'ทั้งหมด'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            ทั้งหมด ({jobs.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ฝั่งซ้าย: ฟอร์มลงประกาศรับสมัครงาน */}
          <section className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
              📝 ประกาศรับสมัครฟรีแลนซ์
            </h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  หัวข้องานที่ต้องการจ้าง
                </label>
                <input
                  type="text"
                  placeholder="เช่น ทำสคริปต์ดึงข้อมูล, ตัดคลิป Reels"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  หมวดหมู่งาน
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  งบประมาณที่ตั้งไว้ (บาท)
                </label>
                <input
                  type="number"
                  placeholder="เช่น 3500"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ช่องทางติดต่อ (Line ID หรือ เบอร์โทร)
                </label>
                <input
                  type="text"
                  placeholder="เช่น mylineid หรือ 0812345678"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  รายละเอียดขอบเขตงาน
                </label>
                <textarea
                  rows={4}
                  placeholder="ระบุสิ่งที่ต้องทำ ระยะเวลาส่งงาน หรือเงื่อนไขสำคัญ"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow text-sm transition disabled:opacity-50"
              >
                {submitting ? 'กำลังบันทึก...' : 'ลงประกาศทันที (ฟรี)'}
              </button>
            </form>
          </section>

          {/* ฝั่งขวา: กระดานงาน */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                💼 งานที่เปิดรับ ({filteredJobs.length})
              </h2>
              <button
                onClick={fetchJobs}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                รีเฟรช
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-400">กำลังโหลดรายการงาน...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                ไม่พบงานที่ตรงกับคำค้นหาหรือหมวดหมู่นี้
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const isPhone =
                    job.contact_info &&
                    /^0\d{8,9}$/.test(job.contact_info.replace(/[-\s]/g, ''))
                  const contactClean = job.contact_info
                    ? job.contact_info.replace(/[^a-zA-Z0-9._-]/g, '')
                    : ''
                  const contactUrl = isPhone
                    ? `tel:${job.contact_info}`
                    : `https://line.me/R/ti/p/~${contactClean}`

                  return (
                    <div
                      key={job.id}
                      className={`p-6 rounded-2xl shadow-sm border transition ${
                        job.is_featured
                          ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200'
                          : 'bg-white border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                            {job.category}
                          </span>
                          {job.is_featured && (
                            <span className="text-xs font-bold px-2 py-0.5 bg-amber-500 text-white rounded-md shadow-sm">
                              🔥 งานด่วน
                            </span>
                          )}
                        </div>
                        <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">
                          ฿{job.budget.toLocaleString()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {job.title}
                      </h3>

                      <p className="text-slate-600 text-sm mb-4 whitespace-pre-line">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap justify-between items-center pt-3 border-t border-slate-100 gap-2">
                        <div className="text-xs text-slate-500">
                          ติดต่อ: <span className="font-semibold text-slate-800">{job.contact_info || 'ไม่ระบุ'}</span>
                        </div>

                        {job.contact_info ? (
                          <a
                            href={contactUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition inline-flex items-center gap-1.5"
                          >
                            <span>ทักรับงานนี้</span>
                            <span className="text-[10px] opacity-80">({isPhone ? 'โทร' : 'Line'})</span>
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                            รออัปเดตช่องทางติดต่อ
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}