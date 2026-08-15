import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { api } from './lib/api'

const bars = [22, 48, 82, 58, 34, 70, 46, 88, 60, 38, 76, 52]
const quickLinks = [
  ['🎸', 'نوازنده‌ها'], ['🎙️', 'خواننده‌ها'], ['🎼', 'گروه‌ها'], ['🎧', 'تهیه‌کننده‌ها'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState(true)
  const [active, setActive] = useState('خانه')
  const [levels, setLevels] = useState(bars)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [auth, setAuth] = useState({ username: '', email: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [musicians, setMusicians] = useState([])
  const [searchBusy, setSearchBusy] = useState(false)

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setLevels(bars.map((value, index) => Math.max(12, Math.min(96, value + Math.sin(Date.now() / 260 + index * 0.75) * 28))))
    }, 180)
    return () => window.clearInterval(timer)
  }, [playing])

  const statusText = useMemo(() => playing ? 'پخش زنده' : 'متوقف شده', [playing])

  const handleSearch = async (event) => {
    event.preventDefault()
    if (!query.trim()) return
    setActive('جستجو')
    setSearchBusy(true)
    try {
      const data = await api.searchMusicians()
      setMusicians(data.results || [])
      document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (error) {
      setMusicians([])
    } finally {
      setSearchBusy(false)
    }
  }

  const goTo = (label) => { setActive(label); setMenuOpen(false) }

  const submitAuth = async (event) => {
    event.preventDefault()
    setAuthError('')
    setAuthBusy(true)
    try {
      if (authMode === 'register') {
        await api.register(auth)
      }
      await api.login({ email: auth.email, password: auth.password })
      setAuthOpen(false)
      setAuth({ username: '', email: '', password: '' })
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setAuthBusy(false)
    }
  }

  return (
    <div className="app-shell" dir="rtl">
      <div className="grid-glow" /><div className="ambient ambient-one" /><div className="ambient ambient-two" />

      <header className="header">
        <button className={`menu-button ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen((v) => !v)} aria-label="منو"><span /><span /><span /></button>
        <div className="brand"><div className="brand-mark">♫</div><div><strong>همنواز</strong><small>HAMNAVAZ</small></div></div>
        <nav className="desktop-nav">
          {['خانه', 'نوازنده‌ها', 'گروه‌ها', 'همکاری', 'درباره ما'].map((item) => <a href={`#${item}`} key={item} className={active === item ? 'active' : ''} onClick={() => goTo(item)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" title="جستجو" onClick={() => document.querySelector('#search')?.focus()}>⌕</button>
          <button className="avatar-button" title="ورود / ثبت‌نام" onClick={() => setAuthOpen(true)}>ب</button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}><div className="mobile-menu-inner"><div className="mobile-menu-title">منوی همنواز</div>{['خانه', 'نوازنده‌ها', 'گروه‌ها', 'همکاری', 'درباره ما'].map((item) => <a href={`#${item}`} key={item} onClick={() => goTo(item)}><span>♪</span>{item}</a>)}</div></div>

      <main>
        <section className="hero" id="خانه">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> {statusText} • جامعه موسیقی</div>
            <h1>آدم‌های درست را<br /><span>برای موسیقی‌ات</span> پیدا کن.</h1>
            <p>همنواز جایی است برای پیدا کردن نوازنده، خواننده، مدرس و همکار موسیقی؛ از یک تمرین ساده تا ساختن یک گروه واقعی.</p>
            <form className="hero-search" onSubmit={handleSearch}>
              <span className="search-icon">⌕</span><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="مثلاً: گیتاریست جَز در تهران" aria-label="جستجوی موسیقی" /><button type="submit" disabled={searchBusy}>{searchBusy ? 'در حال جستجو...' : 'جستجو'}</button>
            </form>
            <div className="hero-buttons"><button className="primary-btn" onClick={() => goTo('نوازنده‌ها')}>پیدا کردن هم‌نواز <span>←</span></button><button className="ghost-btn" onClick={() => { setAuthMode('register'); setAuthOpen(true) }}>شروع همکاری</button></div>
            <div className="hero-stats"><div><strong>+۱۲۰۰</strong><span>نوازنده فعال</span></div><div><strong>+۳۵۰</strong><span>همکاری شکل‌گرفته</span></div><div><strong>۲۴/۷</strong><span>جامعه موسیقی</span></div></div>
          </div>
          <div className="hero-stage" aria-label="نمایشگر موسیقی همنواز"><div className="stage-orbit orbit-one" /><div className="vinyl"><div className="vinyl-ring" /><div className="vinyl-ring ring-two" /><div className="vinyl-label">♫</div></div><div className="guitar-shape" aria-hidden="true"><div className="guitar-neck" /><div className="guitar-body"><div className="guitar-hole" /></div></div><div className="floating-note note-one">♪</div><div className="floating-note note-two">♫</div><div className="floating-note note-three">♬</div></div>
        </section>

        <section className="quick-section" id="نوازنده‌ها"><div className="section-heading"><div><span className="section-kicker">کشف استعدادها</span><h2>از صدای خودت شروع کن</h2></div><button className="text-link" onClick={async () => { setQuery(''); await handleSearch({ preventDefault() {} }) }}>مشاهده همه ←</button></div><div className="quick-grid">{quickLinks.map(([icon, label], index) => <button className="quick-card" key={label} onClick={() => { goTo(label); if (label === 'نوازنده‌ها') handleSearch({ preventDefault() {} }) }}><span className="quick-icon">{icon}</span><div><strong>{label}</strong><small>{index === 0 ? 'بر اساس ساز، شهر و سبک' : 'پیدا کردن و ارتباط مستقیم'}</small></div><span className="arrow">←</span></button>)}</div></section>

        <section className="feature-section" id="results">
          <div className="feature-card highlighted" style={{ gridColumn: '1 / -1' }}>
            <span>LIVE DATA</span><strong>نوازنده‌های واقعی همنواز</strong>
            {musicians.length === 0 ? <p>{searchBusy ? 'در حال دریافت اطلاعات...' : 'برای دیدن پروفایل‌های واقعی، جستجو را بزن.'}</p> : <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>{musicians.map((m) => <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 14, border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, background: 'rgba(255,255,255,.03)' }}><div><strong>{m.display_name || 'نوازنده همنواز'}</strong><p style={{ margin: '4px 0 0' }}>{m.city_name || m.city || 'شهر ثبت نشده'}{m.bio ? ` • ${m.bio}` : ''}</p></div><span>{m.is_verified ? '✓ تایید شده' : 'نوازنده'}</span></div>)}</div>}
          </div>
        </section>

        <section className="studio-section" id="همکاری"><div className="studio-copy"><span className="section-kicker">استودیوی همنواز</span><h2>موسیقی را <span>زنده</span> ببین.</h2><p>یک نمای تعاملی از ریتم و صدا؛ پایه‌ای برای اکولایزر، پخش‌کننده و ابزارهای موسیقی همنواز.</p><button className="primary-btn" onClick={() => setPlaying((v) => !v)}>{playing ? 'توقف نمایش' : 'شروع نمایش'} <span>{playing ? 'Ⅱ' : '▶'}</span></button></div><div className="equalizer-card"><div className="eq-topline"><span>HAMNAVAZ / LIVE MIX</span><span className="eq-live"><i /> {playing ? 'LIVE' : 'PAUSED'}</span></div><div className="equalizer">{levels.map((height, index) => <div className="eq-track" key={index}><div className="eq-bar" style={{ height: `${height}%` }} /></div>)}</div><div className="eq-controls"><button onClick={() => setPlaying((v) => !v)}>{playing ? 'Ⅱ' : '▶'}</button><div className="eq-progress"><span /></div><span>03:24</span></div></div></section>

        <section className="feature-section" id="گروه‌ها"><div className="feature-card"><span>01</span><strong>پروفایل موسیقایی</strong><p>سازها، مهارت‌ها، سبک، شهر و سابقه همکاری را یکجا نمایش بده.</p></div><div className="feature-card highlighted"><span>02</span><strong>پیدا کردن هم‌نواز</strong><p>با فیلترهای دقیق، آدمی را پیدا کن که واقعاً با موسیقی تو جور است.</p></div><div className="feature-card"><span>03</span><strong>همکاری و ارتباط</strong><p>درخواست همکاری، پیام، علاقه‌مندی و امتیازدهی در یک جریان ساده.</p></div></section>
      </main>

      <footer className="footer"><div className="brand"><div className="brand-mark">♫</div><div><strong>همنواز</strong><small>HAMNAVAZ</small></div></div><span>موسیقی وقتی بهتر است که تنها نباشد.</span><span>© ۲۰۲۶</span></footer>

      {authOpen && <div onClick={() => setAuthOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,.72)', backdropFilter: 'blur(10px)', padding: 20 }}><form onClick={(e) => e.stopPropagation()} onSubmit={submitAuth} style={{ width: 'min(440px,100%)', padding: 28, borderRadius: 24, background: '#0b1220', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 24px 80px rgba(0,0,0,.5)' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}><div><span className="section-kicker">حساب همنواز</span><h2 style={{ margin: '6px 0 0' }}>{authMode === 'login' ? 'ورود' : 'ثبت‌نام'}</h2></div><button type="button" className="icon-button" onClick={() => setAuthOpen(false)}>×</button></div>{authMode === 'register' && <input required placeholder="نام کاربری" value={auth.username} onChange={(e) => setAuth({ ...auth, username: e.target.value })} style={fieldStyle} />}<input required type="email" placeholder="ایمیل" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} style={fieldStyle} /><input required type="password" placeholder="رمز عبور" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} style={fieldStyle} />{authError && <p style={{ color: '#ff8c8c' }}>{authError}</p>}<button className="primary-btn" type="submit" disabled={authBusy} style={{ width: '100%', marginTop: 8 }}>{authBusy ? 'لطفاً صبر کن...' : authMode === 'login' ? 'ورود به همنواز' : 'ثبت‌نام و ورود'}</button><button type="button" className="text-link" style={{ marginTop: 14 }} onClick={() => { setAuthError(''); setAuthMode(authMode === 'login' ? 'register' : 'login') }}>{authMode === 'login' ? 'حساب ندارم؛ ثبت‌نام می‌کنم' : 'حساب دارم؛ وارد می‌شوم'}</button></form></div>}
    </div>
  )
}

const fieldStyle = { width: '100%', boxSizing: 'border-box', marginBottom: 12, padding: '14px 16px', borderRadius: 14, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', color: '#fff', outline: 'none', fontSize: 15 }

export default App
