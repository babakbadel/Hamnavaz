import { useEffect, useMemo, useState } from 'react'
import './App.css'

const bars = [22, 48, 82, 58, 34, 70, 46, 88, 60, 38, 76, 52]

const quickLinks = [
  ['🎸', 'نوازنده‌ها'],
  ['🎙️', 'خواننده‌ها'],
  ['🎼', 'گروه‌ها'],
  ['🎧', 'تهیه‌کننده‌ها'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState(true)
  const [active, setActive] = useState('خانه')
  const [levels, setLevels] = useState(bars)

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setLevels(bars.map((value, index) => {
        const wave = Math.sin(Date.now() / 260 + index * 0.75) * 28
        return Math.max(12, Math.min(96, value + wave))
      }))
    }, 180)
    return () => window.clearInterval(timer)
  }, [playing])

  const statusText = useMemo(() => playing ? 'پخش زنده' : 'متوقف شده', [playing])

  const handleSearch = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    setActive('جستجو')
  }

  const goTo = (label) => {
    setActive(label)
    setMenuOpen(false)
  }

  return (
    <div className="app-shell" dir="rtl">
      <div className="grid-glow" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="header">
        <button
          className={`menu-button ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="منو"
        >
          <span /><span /><span />
        </button>

        <div className="brand">
          <div className="brand-mark">♫</div>
          <div>
            <strong>همنواز</strong>
            <small>HAMNAVAZ</small>
          </div>
        </div>

        <nav className="desktop-nav">
          {['خانه', 'نوازنده‌ها', 'گروه‌ها', 'همکاری', 'درباره ما'].map((item) => (
            <a
              href={`#${item}`}
              key={item}
              className={active === item ? 'active' : ''}
              onClick={() => goTo(item)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" title="جستجو" onClick={() => document.querySelector('#search')?.focus()}>⌕</button>
          <button className="avatar-button" title="حساب کاربری">ب</button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-title">منوی همنواز</div>
          {['خانه', 'نوازنده‌ها', 'گروه‌ها', 'همکاری', 'درباره ما'].map((item) => (
            <a href={`#${item}`} key={item} onClick={() => goTo(item)}>
              <span>♪</span>{item}
            </a>
          ))}
        </div>
      </div>

      <main>
        <section className="hero" id="خانه">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> {statusText} • جامعه موسیقی</div>
            <h1>آدم‌های درست را<br /><span>برای موسیقی‌ات</span> پیدا کن.</h1>
            <p>
              همنواز جایی است برای پیدا کردن نوازنده، خواننده، مدرس و همکار موسیقی؛
              از یک تمرین ساده تا ساختن یک گروه واقعی.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <span className="search-icon">⌕</span>
              <input
                id="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="مثلاً: گیتاریست جَز در تهران"
                aria-label="جستجوی موسیقی"
              />
              <button type="submit">جستجو</button>
            </form>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => goTo('نوازنده‌ها')}>پیدا کردن هم‌نواز <span>←</span></button>
              <button className="ghost-btn" onClick={() => goTo('همکاری')}>شروع همکاری</button>
            </div>

            <div className="hero-stats">
              <div><strong>+۱۲۰۰</strong><span>نوازنده فعال</span></div>
              <div><strong>+۳۵۰</strong><span>همکاری شکل‌گرفته</span></div>
              <div><strong>۲۴/۷</strong><span>جامعه موسیقی</span></div>
            </div>
          </div>

          <div className="hero-stage" aria-label="نمایشگر موسیقی همنواز">
            <div className="stage-orbit orbit-one" />
            <div className="vinyl">
              <div className="vinyl-ring" />
              <div className="vinyl-ring ring-two" />
              <div className="vinyl-label">♫</div>
            </div>

            <div className="guitar-shape" aria-hidden="true">
              <div className="guitar-neck" />
              <div className="guitar-body"><div className="guitar-hole" /></div>
            </div>

            <div className="floating-note note-one">♪</div>
            <div className="floating-note note-two">♫</div>
            <div className="floating-note note-three">♬</div>
          </div>
        </section>

        <section className="quick-section" id="نوازنده‌ها">
          <div className="section-heading">
            <div><span className="section-kicker">کشف استعدادها</span><h2>از صدای خودت شروع کن</h2></div>
            <button className="text-link" onClick={() => goTo('جستجو')}>مشاهده همه ←</button>
          </div>
          <div className="quick-grid">
            {quickLinks.map(([icon, label], index) => (
              <button className="quick-card" key={label} onClick={() => goTo(label)}>
                <span className="quick-icon">{icon}</span>
                <div><strong>{label}</strong><small>{index === 0 ? 'بر اساس ساز، شهر و سبک' : 'پیدا کردن و ارتباط مستقیم'}</small></div>
                <span className="arrow">←</span>
              </button>
            ))}
          </div>
        </section>

        <section className="studio-section" id="همکاری">
          <div className="studio-copy">
            <span className="section-kicker">استودیوی همنواز</span>
            <h2>موسیقی را <span>زنده</span> ببین.</h2>
            <p>یک نمای تعاملی از ریتم و صدا؛ پایه‌ای برای اکولایزر، پخش‌کننده و ابزارهای موسیقی همنواز.</p>
            <button className="primary-btn" onClick={() => setPlaying((value) => !value)}>
              {playing ? 'توقف نمایش' : 'شروع نمایش'} <span>{playing ? 'Ⅱ' : '▶'}</span>
            </button>
          </div>

          <div className="equalizer-card">
            <div className="eq-topline"><span>HAMNAVAZ / LIVE MIX</span><span className="eq-live"><i /> {playing ? 'LIVE' : 'PAUSED'}</span></div>
            <div className="equalizer">
              {levels.map((height, index) => (
                <div className="eq-track" key={index}>
                  <div className="eq-bar" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
            <div className="eq-controls">
              <button onClick={() => setPlaying((value) => !value)}>{playing ? 'Ⅱ' : '▶'}</button>
              <div className="eq-progress"><span /></div>
              <span>03:24</span>
            </div>
          </div>
        </section>

        <section className="feature-section" id="گروه‌ها">
          <div className="feature-card">
            <span>01</span><strong>پروفایل موسیقایی</strong><p>سازها، مهارت‌ها، سبک، شهر و سابقه همکاری را یکجا نمایش بده.</p>
          </div>
          <div className="feature-card highlighted">
            <span>02</span><strong>پیدا کردن هم‌نواز</strong><p>با فیلترهای دقیق، آدمی را پیدا کن که واقعاً با موسیقی تو جور است.</p>
          </div>
          <div className="feature-card">
            <span>03</span><strong>همکاری و ارتباط</strong><p>درخواست همکاری، پیام، علاقه‌مندی و امتیازدهی در یک جریان ساده.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand"><div className="brand-mark">♫</div><div><strong>همنواز</strong><small>HAMNAVAZ</small></div></div>
        <span>موسیقی وقتی بهتر است که تنها نباشد.</span>
        <span>© ۲۰۲۶</span>
      </footer>
    </div>
  )
}

export default App
