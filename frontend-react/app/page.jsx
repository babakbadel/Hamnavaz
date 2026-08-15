'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpLeft, Heart, Menu, Mic2, Music2, Search, Sparkles, Users, X, Zap } from 'lucide-react'
import { api } from '../src/lib/api'

const seedBars = [32, 68, 46, 88, 54, 76, 38, 92, 58, 74, 44, 84, 52, 72, 36, 86, 48, 66, 42, 78]
const quick = [
  { icon: '🎸', title: 'نوازنده‌ها', text: 'ساز، شهر، سبک و سطح' },
  { icon: '🎙️', title: 'خواننده‌ها', text: 'پیدا کردن صدای مناسب' },
  { icon: '🥁', title: 'گروه‌ها', text: 'ساختن ترکیب بعدی' },
  { icon: '🎧', title: 'همکاری', text: 'پروژه‌های واقعی موسیقی' },
]

function Equalizer({ bars, compact = false }) {
  return (
    <div className={`eq ${compact ? 'eq-compact' : ''}`} aria-hidden="true">
      {bars.map((height, index) => <i key={index} style={{ height: `${height}%`, animationDelay: `${index * -70}ms` }} />)}
    </div>
  )
}

function FloatingNotes() {
  return <div className="notes" aria-hidden="true">{['♪', '♫', '♬', '♩', '♪', '♭', '♫'].map((note, i) => <span key={i} style={{ '--i': i }}>{note}</span>)}</div>
}

export default function Home() {
  const [bars, setBars] = useState(seedBars)
  const [playing, setPlaying] = useState(true)
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [musicians, setMusicians] = useState([])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setBars(seedBars.map((v, i) => Math.max(14, Math.min(98, v + Math.sin(Date.now() / 190 + i * .9) * 30))))
    }, 130)
    return () => clearInterval(timer)
  }, [playing])

  const pulse = useMemo(() => playing ? 'LIVE' : 'PAUSED', [playing])

  async function search(event) {
    event?.preventDefault?.()
    setLoading(true)
    try {
      const data = await api.searchMusicians({})
      setMusicians(data.results || [])
      setTimeout(() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }), 40)
    } catch {
      setMusicians([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="site" dir="rtl">
      <div className="noise" />
      <div className="scanline" />
      <div className="ambient a1" /><div className="ambient a2" /><div className="ambient a3" />

      <header className="nav-wrap">
        <div className="nav glass">
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="منو">{menu ? <X /> : <Menu />}</button>
          <a className="logo" href="#top"><span className="logo-icon"><Music2 /></span><span><b>همنواز</b><small>HAMNAVAZ</small></span></a>
          <nav className="nav-links">
            <a href="#charity">خیریه</a><a href="#discover">همنواز پیدا کن</a><a href="#bands">گروه‌ها</a><a href="#mission">رسالت ما</a>
          </nav>
          <div className="nav-actions"><button className="round-btn" onClick={() => document.getElementById('search')?.focus()}><Search /></button><button className="orange-btn small" onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}>شروع کن <ArrowLeft /></button></div>
        </div>
        {menu && <div className="mobile-nav glass"><a href="#charity" onClick={() => setMenu(false)}>خیریه</a><a href="#discover" onClick={() => setMenu(false)}>پیدا کردن همنواز</a><a href="#bands" onClick={() => setMenu(false)}>گروه‌ها</a><a href="#mission" onClick={() => setMenu(false)}>رسالت ما</a></div>}
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <div className="live-pill"><span /> {pulse} MUSIC <b>۰۱</b></div>
          <h1>موسیقی را<br /><em>با آدم‌های</em><br />درست بساز.</h1>
          <p>همنواز، جایی برای پیدا کردن همنواز، ساختن گروه و تبدیل موسیقی به یک اثر انسانی واقعی است.</p>
          <form className="searchbar glass" onSubmit={search}>
            <Search /><input id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="مثلاً گیتاریست جَز در تهران..." /><button disabled={loading}>{loading ? '...' : 'کشف کن'} <ArrowLeft /></button>
          </form>
          <div className="hero-cta"><button className="orange-btn" onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}>پیدا کردن همنواز <ArrowLeft /></button><a href="#charity">❤️ رسالت خیریه ما</a></div>
          <div className="mini-proof"><span><b>+۱۲۰۰</b> نوازنده</span><i /><span><b>+۳۵۰</b> همکاری</span><i /><span><b>۲۴/۷</b> موسیقی</span></div>
        </div>

        <div className="hero-visual">
          <div className="laser red" /><div className="laser orange" /><div className="laser violet" />
          <div className="orbital o1" /><div className="orbital o2" /><div className="orbital o3" />
          <div className="disc"><div className="disc-hole" /><div className="disc-label">♫</div></div>
          <div className="hero-eq"><Equalizer bars={bars} /></div>
          <div className="hero-chip chip1"><Music2 /> LIVE STAGE</div>
          <div className="hero-chip chip2"><Zap /> 128 BPM</div>
          <div className="person p1">👤<b>🎸</b></div><div className="person p2">👤<b>🎤</b></div><div className="person p3">👤<b>🥁</b></div>
          <div className="instrument inst1">🎹</div><div className="instrument inst2">🎺</div><div className="instrument inst3">🎸</div>
          <div className="core"><span /><span /><span /></div>
          <FloatingNotes />
        </div>
      </section>

      <section id="charity" className="charity section-shell">
        <div className="charity-art glass">
          <div className="charity-grid" /><div className="charity-orbit" /><div className="heart"><Heart fill="currentColor" /></div>
          <div className="charity-glow" /><div className="charity-label">HAMNAVAZ<br /><b>CHARITY</b></div>
          <div className="charity-stat"><b>۷۴٪</b><span>هدف این ماه</span><div><i /></div></div>
        </div>
        <div className="charity-copy">
          <span className="eyebrow orange">رسالت اول همنواز</span>
          <h2>یک ساز می‌تواند<br /><em>یک زندگی</em> را تغییر دهد.</h2>
          <p>ما می‌خواهیم موسیقی فقط سرگرمی نباشد. بخشی از درآمد و توان جامعه همنواز برای رساندن ساز، آموزش و فرصت موسیقی به کودکان و افراد کم‌برخوردار اختصاص پیدا می‌کند.</p>
          <div className="charity-actions"><button className="orange-btn">حمایت از یک رویا <Heart /></button><a href="#mission">داستان همنواز <ArrowUpLeft /></a></div>
        </div>
      </section>

      <section id="discover" className="discover section-shell">
        <div className="section-head"><div><span className="eyebrow">DISCOVER YOUR SOUND</span><h2>همنواز بعدی‌ات <em>اینجاست.</em></h2></div><button onClick={search}>مشاهده همه <ArrowLeft /></button></div>
        <div className="quick-grid">{quick.map(item => <button className="quick glass" key={item.title} onClick={search}><span className="quick-icon">{item.icon}</span><span><b>{item.title}</b><small>{item.text}</small></span><ArrowLeft /></button>)}</div>
        <div className="results-grid">{musicians.length ? musicians.map(m => <button className="musician-card glass" key={m.user_id || m.id} onClick={() => setProfile(m)}><span className="avatar">{(m.display_name || 'ه').slice(0, 1)}</span><span><b>{m.display_name || 'نوازنده همنواز'}</b><small>{m.city_name || m.city || 'شهر ثبت نشده'}</small></span><span className="verified">{m.is_verified ? '✓' : '→'}</span></button>) : <div className="empty glass"><Users /><b>هنوز جستجو نکرده‌ای</b><span>یک ساز، شهر یا سبک را جستجو کن و وارد دنیای همنواز شو.</span></div>}</div>
      </section>

      <section id="bands" className="bands section-shell">
        <div className="band-copy"><span className="eyebrow">BUILD A BAND</span><h2>چهار نفر.<br /><em>یک صدا.</em></h2><p>از نوازنده‌های پراکنده، یک گروه واقعی بساز. همنواز آدم‌ها را بر اساس ساز، شهر، سطح و سبک به هم نزدیک می‌کند.</p><button className="orange-btn">ساختن گروه <Users /></button></div>
        <div className="band-stage glass"><div className="band-rays" /><div className="band-member bm1">👤<b>🎸</b></div><div className="band-member bm2">👤<b>🥁</b></div><div className="band-member bm3">👤<b>🎹</b></div><div className="band-member bm4">👤<b>🎤</b></div><div className="band-title"><span>NEW BAND</span><b>NOISE / 04</b></div><div className="band-eq"><Equalizer bars={bars.slice(0, 14)} compact /></div></div>
      </section>

      <section id="mission" className="mission section-shell">
        <div className="mission-card glass"><Sparkles /><span>همنواز فقط یک اپ نیست.</span><h2>یک شبکه از صدا، آدم و <em>همدلی.</em></h2><p>از پیدا کردن یک همنواز تا حمایت از یک کودک برای لمس اولین ساز؛ همه‌چیز از یک ارتباط شروع می‌شود.</p><div className="mission-pills"><span>🎵 Music</span><span>❤️ Charity</span><span>🤝 Collaboration</span><span>🌱 Growth</span></div></div>
      </section>

      <footer className="footer"><div className="logo"><span className="logo-icon"><Music2 /></span><span><b>همنواز</b><small>HAMNAVAZ</small></span></div><span>موسیقی، انسان، همدلی.</span><span>© 2026 Hamnavaz</span></footer>

      {profile && <div className="modal-backdrop" onClick={() => setProfile(null)}><div className="profile-modal glass" onClick={e => e.stopPropagation()}><button onClick={() => setProfile(null)}><X /></button><span className="profile-avatar">{(profile.display_name || 'ه').slice(0, 1)}</span><h3>{profile.display_name || 'نوازنده همنواز'}</h3><p>{profile.city_name || profile.city || 'شهر ثبت نشده'}</p><div className="profile-line">{profile.bio || 'برای این نوازنده هنوز توضیحی ثبت نشده است.'}</div><button className="orange-btn">شروع همکاری <ArrowLeft /></button></div></div>}
    </main>
  )
}
