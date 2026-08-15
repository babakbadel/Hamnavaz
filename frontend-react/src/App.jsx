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
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileBusy, setProfileBusy] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [instrumentCatalog, setInstrumentCatalog] = useState([])

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setLevels(bars.map((value, index) => Math.max(12, Math.min(96, value + Math.sin(Date.now() / 260 + index * 0.75) * 28))))
    }, 180)
    return () => window.clearInterval(timer)
  }, [playing])

  useEffect(() => {
    api.searchInstruments().then(setInstrumentCatalog).catch(() => setInstrumentCatalog([]))
  }, [])

  const statusText = useMemo(() => playing ? 'پخش زنده' : 'متوقف شده', [playing])

  const handleSearch = async (event) => {
    event.preventDefault()
    setActive('جستجو')
    setSearchBusy(true)
    try {
      const data = await api.searchMusicians({})
      setMusicians(data.results || [])
      document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      setMusicians([])
    } finally {
      setSearchBusy(false)
    }
  }

  const openProfile = async (userId) => {
    setProfileOpen(true)
    setProfileBusy(true)
    setSelectedProfile(null)
    try {
      const data = await api.getMusician(userId)
      setSelectedProfile(data)
    } catch (error) {
      setSelectedProfile({ error: error.message })
    } finally {
      setProfileBusy(false)
    }
  }

  const instrumentName = (instrumentId) => {
    const item = instrumentCatalog.find((instrument) => String(instrument.id) === String(instrumentId))
    return item?.name || 'ساز ثبت‌شده'
  }

  const goTo = (label) => { setActive(label); setMenuOpen(false) }

  const submitAuth = async (event) => {
    event.preventDefault()
    setAuthError('')
    setAuthBusy(true)
    try {
      if (authMode === 'register') await api.register(auth)
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
        <div className="header-actions"><button className="icon-button" title="جستجو" onClick={() => document.querySelector('#search')?.focus()}>⌕</button><button className="avatar-button" title="ورود / ثبت‌نام" onClick={() => setAuthOpen(true)}>ب</button></div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}><div className="mobile-menu-inner"><div className="mobile-menu-title">منوی همنواز</div>{['خانه', 'نوازنده‌ها', 'گروه‌ها', 'همکاری', 'درباره ما'].map((item) => <a href={`#${item}`} key={item} onClick={() => goTo(item)}><span>♪</span>{item}</a>)}</div></div>

      <main>
        <section className="hero" id="خانه">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> {statusText} • جامعه موسیقی</div>
            <h1>آدم‌های درست را<br /><span>برای موسیقی‌ات</span> پیدا کن.</h1>
            <p>همنواز جایی است برای پیدا کردن نوازنده، خواننده، مدرس و همکار موسیقی؛ از یک تمرین ساده تا ساختن یک گروه واقعی.</p>
            <form className="hero-search" onSubmit={handleSearch}><span className="search-icon">⌕</span><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="مثلاً: گیتاریست جَز در تهران" aria-label="جستجوی موسیقی" /><button type="submit" disabled={searchBusy}>{searchBusy ? 'در حال جستجو...' : 'جستجو'}</button></form>
            <div className="hero-buttons"><button className="primary-btn" onClick={() => goTo('نوازنده‌ها')}>پیدا کردن هم‌نواز <span>←</span></button><button className="ghost-btn" onClick={() => { setAuthMode('register'); setAuthOpen(true) }}>شروع همکاری</button></div>
            <div className="hero-stats"><div><strong>+۱۲۰۰</strong><span>نوازنده فعال</span></div><div><strong>+۳۵۰</strong><span>همکاری شکل‌گرفته</span></div><div><strong>۲۴/۷</strong><span>جامعه موسیقی</span></div></div>
          </div>
          <div className="hero-stage" aria-label="نمایشگر موسیقی همنواز">
            <div className="laser laser-red" /><div className="laser laser-green" /><div className="laser laser-blue" />
            <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" />
            <div className="vinyl"><div className="vinyl-ring" /><div className="vinyl-ring ring-two" /><div className="vinyl-label">♫</div></div>
            <div className="guitar-shape" aria-hidden="true"><div className="guitar-neck" /><div className="guitar-body"><div className="guitar-hole" /></div></div>
            <div className="floating-musician musician-one">♟<span>🎸</span></div><div className="floating-musician musician-two">♟<span>🎤</span></div><div className="floating-musician musician-three">♟<span>🥁</span></div>
            <div className="floating-instrument instrument-one">🎹</div><div className="floating-instrument instrument-two">🎺</div>
            <div className="floating-note note-one">♪</div><div className="floating-note note-two">♫</div><div className="floating-note note-three">♬</div>
            <div className="pulse-core" />
          </div>
        </section>

        <section className="charity-section" id="خیریه">
          <div className="charity-copy"><span className="section-kicker">رسالت همنواز • 01</span><h2>موسیقی فقط برای شنیدن نیست؛<br /><span>برای ساختن هم هست. ❤️</span></h2><p>اولین رسالت همنواز، وصل کردن موسیقی به یک اثر انسانی واقعی است؛ کمک به کودکان و افراد کم‌برخوردار برای دسترسی به آموزش، ساز و فرصت تجربه موسیقی.</p><div className="charity-actions"><button className="primary-btn">حمایت از یک رویا <span>♥</span></button><button className="ghost-btn">دیدن داستان‌ها ←</button></div></div>
          <div className="charity-stage"><div className="heart-pulse">♥</div><div className="charity-orbit" /><div className="charity-note cn-one">♪</div><div className="charity-note cn-two">♫</div><div className="charity-note cn-three">♬</div><div className="charity-card"><span>HAMNAVAZ CHARITY</span><strong>یک ساز، یک فرصت، یک آینده</strong><small>هر حمایت می‌تواند آغاز یک صدای تازه باشد.</small><div className="charity-progress"><i /></div><div className="charity-meta"><b>۷۴٪</b><span>تا هدف این ماه</span></div></div></div>
        </section>

        <section className="quick-section" id="نوازنده‌ها"><div className="section-heading"><div><span className="section-kicker">کشف استعدادها</span><h2>از صدای خودت شروع کن</h2></div><button className="text-link" onClick={() => handleSearch({ preventDefault() {} })}>مشاهده همه ←</button></div><div className="quick-grid">{quickLinks.map(([icon, label], index) => <button className="quick-card" key={label} onClick={() => { goTo(label); if (label === 'نوازنده‌ها') handleSearch({ preventDefault() {} }) }}><span className="quick-icon">{icon}</span><div><strong>{label}</strong><small>{index === 0 ? 'بر اساس ساز، شهر و سبک' : 'پیدا کردن و ارتباط مستقیم'}</small></div><span className="arrow">←</span></button>)}</div></section>

        <section className="band-section" id="گروه‌ها"><div className="band-card"><div className="band-art"><div className="band-light" /><div className="band-person p1">♟</div><div className="band-person p2">♟</div><div className="band-person p3">♟</div><div className="band-person p4">♟</div><div className="band-eq">{levels.slice(0, 8).map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></div><div className="band-copy"><span className="section-kicker">BAND CARD • LIVE</span><h2>گروه بعدی‌ات را <span>بساز.</span></h2><p>نوازنده‌هایی که دنبال سبک و انرژی مشابه‌اند را پیدا کن و یک گروه واقعی شکل بده.</p><div className="band-tags"><span>🎸 Guitar</span><span>🥁 Drums</span><span>🎹 Keys</span><span>🎤 Vocal</span></div><button className="primary-btn">پیدا کردن اعضای گروه <span>←</span></button></div></div></section>

        <section className="feature-section" id="results"><div className="feature-card highlighted" style={{ gridColumn: '1 / -1' }}><span>LIVE DATA</span><strong>نوازنده‌های واقعی همنواز</strong>{musicians.length === 0 ? <p>{searchBusy ? 'در حال دریافت اطلاعات...' : 'برای دیدن پروفایل‌های واقعی، جستجو را بزن.'}</p> : <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>{musicians.map((m) => <button key={m.user_id || m.id} type="button" onClick={() => openProfile(m.user_id)} style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 14, border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, background: 'rgba(255,255,255,.03)', color: '#fff', cursor: 'pointer' }}><div><strong>{m.display_name || 'نوازنده همنواز'}</strong><p style={{ margin: '4px 0 0' }}>{m.city_name || m.city || 'شهر ثبت نشده'}{m.bio ? ` • ${m.bio}` : ''}</p></div><span>{m.is_verified ? '✓ تایید شده' : 'مشاهده پروفایل ←'}</span></button>)}</div>}</div></section>

        <section className="studio-section" id="همکاری"><div className="studio-copy"><span className="section-kicker">استودیوی همنواز</span><h2>موسیقی را <span>زنده</span> ببین.</h2><p>یک نمای تعاملی از ریتم و صدا؛ پایه‌ای برای اکولایزر، پخش‌کننده و ابزارهای موسیقی همنواز.</p><button className="primary-btn" onClick={() => setPlaying((v) => !v)}>{playing ? 'توقف نمایش' : 'شروع نمایش'} <span>{playing ? 'Ⅱ' : '▶'}</span></button></div><div className="equalizer-card"><div className="eq-topline"><span>HAMNAVAZ / LIVE MIX</span><span className="eq-live"><i /> {playing ? 'LIVE' : 'PAUSED'}</span></div><div className="equalizer">{levels.map((height, index) => <div className="eq-track" key={index}><div className="eq-bar" style={{ height: `${height}%` }} /></div>)}</div><div className="eq-controls"><button onClick={() => setPlaying((v) => !v)}>{playing ? 'Ⅱ' : '▶'}</button><div className="eq-progress"><span /></div><span>03:24</span></div></div></section>

        <section className="feature-section" id="درباره ما"><div className="feature-card"><span>01</span><strong>پروفایل موسیقایی</strong><p>سازها، مهارت‌ها، سبک، شهر و سابقه همکاری را یکجا نمایش بده.</p></div><div className="feature-card highlighted"><span>02</span><strong>پیدا کردن هم‌نواز</strong><p>با فیلترهای دقیق، آدمی را پیدا کن که واقعاً با موسیقی تو جور است.</p></div><div className="feature-card"><span>03</span><strong>همکاری و اثر اجتماعی</strong><p>همکاری، پیام، علاقه‌مندی و خیریه در یک جریان ساده و انسانی.</p></div></section>
      </main>

      <footer className="footer"><div className="brand"><div className="brand-mark">♫</div><div><strong>همنواز</strong><small>HAMNAVAZ</small></div></div><span>موسیقی وقتی بهتر است که تنها نباشد.</span><span>© ۲۰۲۶</span></footer>

      {profileOpen && <div onClick={() => setProfileOpen(false)} style={overlayStyle}><div onClick={(e) => e.stopPropagation()} style={modalStyle}><button type="button" className="icon-button" onClick={() => setProfileOpen(false)} style={{ float: 'left' }}>×</button>{profileBusy ? <div style={{ padding: 40, textAlign: 'center' }}>در حال دریافت پروفایل...</div> : selectedProfile?.error ? <p style={{ color: '#ff8c8c' }}>{selectedProfile.error}</p> : <><div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}><div style={avatarStyle}>{selectedProfile?.profile?.display_name?.slice(0, 1) || '♫'}</div><div><span className="section-kicker">پروفایل نوازنده</span><h2 style={{ margin: '5px 0' }}>{selectedProfile?.profile?.display_name || 'نوازنده همنواز'}</h2><p style={{ margin: 0 }}>{selectedProfile?.profile?.city || 'شهر ثبت نشده'} {selectedProfile?.profile?.is_verified ? ' • ✓ تایید شده' : ''}</p></div></div><div style={profileGrid}><div><small>درباره</small><p>{selectedProfile?.profile?.bio || 'هنوز توضیحی برای این پروفایل ثبت نشده است.'}</p></div><div><small>سازها</small><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{(selectedProfile?.instruments || []).map((item) => <span key={item.id} style={tagStyle}>{instrumentName(item.instrument_id)} • {item.level}{item.years_experience ? ` • ${item.years_experience} سال` : ''}{item.is_primary ? ' • اصلی' : ''}</span>)}</div></div></div><button className="primary-btn" style={{ width: '100%', marginTop: 20 }} onClick={() => { setProfileOpen(false); setAuthMode('login'); setAuthOpen(true) }}>برای همکاری وارد شو</button></>}</div></div>}

      {authOpen && <div onClick={() => setAuthOpen(false)} style={overlayStyle}><form onClick={(e) => e.stopPropagation()} onSubmit={submitAuth} style={modalStyle}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}><div><span className="section-kicker">حساب همنواز</span><h2 style={{ margin: '6px 0 0' }}>{authMode === 'login' ? 'ورود' : 'ثبت‌نام'}</h2></div><button type="button" className="icon-button" onClick={() => setAuthOpen(false)}>×</button></div>{authMode === 'register' && <input required placeholder="نام کاربری" value={auth.username} onChange={(e) => setAuth({ ...auth, username: e.target.value })} style={fieldStyle} />}<input required type="email" placeholder="ایمیل" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} style={fieldStyle} /><input required type="password" placeholder="رمز عبور" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} style={fieldStyle} />{authError && <p style={{ color: '#ff8c8c' }}>{authError}</p>}<button className="primary-btn" type="submit" disabled={authBusy} style={{ width: '100%', marginTop: 8 }}>{authBusy ? 'لطفاً صبر کن...' : authMode === 'login' ? 'ورود به همنواز' : 'ثبت‌نام و ورود'}</button><button type="button" className="text-link" style={{ marginTop: 14 }} onClick={() => { setAuthError(''); setAuthMode(authMode === 'login' ? 'register' : 'login') }}>{authMode === 'login' ? 'حساب ندارم؛ ثبت‌نام می‌کنم' : 'حساب دارم؛ وارد می‌شوم'}</button></form></div>}
    </div>
  )
}

const fieldStyle = { width: '100%', boxSizing: 'border-box', marginBottom: 12, padding: '14px 16px', borderRadius: 14, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', color: '#fff', outline: 'none', fontSize: 15 }
const overlayStyle = { position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,.72)', backdropFilter: 'blur(10px)', padding: 20 }
const modalStyle = { width: 'min(560px,100%)', maxHeight: '90vh', overflow: 'auto', padding: 28, borderRadius: 24, background: '#0b1220', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 24px 80px rgba(0,0,0,.5)' }
const avatarStyle = { width: 64, height: 64, borderRadius: 20, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#d4af37,#765d17)', color: '#0b1220', fontSize: 28, fontWeight: 800 }
const profileGrid = { display: 'grid', gap: 16 }
const tagStyle = { display: 'inline-flex', padding: '8px 10px', borderRadius: 999, background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.25)', color: '#e6c65a', fontSize: 13 }

export default App
