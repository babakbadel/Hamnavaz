'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, Menu, Music2, Search, Sparkles, Users, X } from 'lucide-react'
import { api } from '../src/lib/api'

const stats = [
  ['۱٬۲۸۴', 'نوازنده آنلاین'], ['۸۶', 'گروه در حال تشکیل'], ['۲۴', 'اجرای پیش‌رو'], ['۳۱۲', 'همکاری موفق'],
]
const quick = [
  ['🎸', 'همنواز پیدا کن', 'ساز، شهر، سبک و سطح'], ['👥', 'گروه بساز', 'عضو مناسب گروهت را پیدا کن'],
  ['🎓', 'استاد و آموزشگاه', 'آموزش و مسیر رشد'], ['🎤', 'اجرا و کنسرت', 'از تمرین تا صحنه'],
]

export default function Home() {
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [musicians, setMusicians] = useState([])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)

  async function search(e) {
    e?.preventDefault?.(); setLoading(true)
    try { const data = await api.searchMusicians({}); setMusicians(data.results || []) }
    catch { setMusicians([]) }
    finally { setLoading(false); document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }) }
  }

  return <main className="site" dir="rtl">
    <header className="nav-wrap"><div className="nav glass">
      <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="منو">{menu ? <X/> : <Menu/>}</button>
      <a className="logo" href="#top"><span className="logo-icon"><Music2/></span><span><b>همنواز</b><small>HAMNAVAZ</small></span></a>
      <nav className="nav-links"><a href="#discover">همنواز</a><a href="#bands">گروه‌ها</a><a href="#concerts">اجراها</a><a href="#charity">خیریه</a><a href="#education">آموزش</a></nav>
      <div className="nav-actions"><button className="round-btn" onClick={() => document.getElementById('search')?.focus()}><Search/></button><button className="orange-btn small" onClick={() => document.getElementById('discover')?.scrollIntoView({behavior:'smooth'})}>شروع کن <ArrowLeft/></button></div>
    </div>{menu && <div className="mobile-nav glass"><a href="#discover" onClick={()=>setMenu(false)}>🎸 پیدا کردن همنواز</a><a href="#bands" onClick={()=>setMenu(false)}>👥 گروه‌ها</a><a href="#concerts" onClick={()=>setMenu(false)}>🎤 اجرا و کنسرت</a><a href="#charity" onClick={()=>setMenu(false)}>❤️ خیریه</a><a href="#education" onClick={()=>setMenu(false)}>🎓 آموزش</a><a href="#market" onClick={()=>setMenu(false)}>🛒 بازار موسیقی</a></div>}</header>

    <section id="top" className="hero">
      <div className="hero-copy"><span className="eyebrow orange">یک جامعه برای موسیقی</span><h1>موسیقی را<br/><em>تنها نساز.</em></h1><p>همنواز آدم‌هایی را که ساز می‌زنند، یاد می‌گیرند و رشد می‌کنند به هم می‌رساند؛ از اولین تمرین تا ساختن یک گروه واقعی و رفتن روی صحنه.</p>
        <form className="searchbar glass" onSubmit={search}><Search/><input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="چه همنوازی پیدا می‌کنی؟ مثلاً گیتاریست جَز در تهران"/><button disabled={loading}>{loading?'...':'پیدا کن'} <ArrowLeft/></button></form>
        <div className="hero-cta"><button className="orange-btn" onClick={search}>همنوازم را پیدا کن <ArrowLeft/></button><a href="#story">داستان همنواز</a></div>
      </div>
      <div className="hero-visual" aria-hidden="true"><div className="hero-ring ring1"/><div className="hero-ring ring2"/><div className="hero-core"><Music2/></div><div className="hero-node n1">🎸</div><div className="hero-node n2">🎹</div><div className="hero-node n3">🥁</div><div className="hero-node n4">🎤</div><div className="hero-line l1"/><div className="hero-line l2"/><div className="hero-line l3"/><div className="mini-eq">{[35,70,48,88,54,76,43,65,50,80,45].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div>
    </section>

    <section className="live-stats section-shell"><div className="stats-grid">{stats.map(([n,t])=><div className="stat" key={t}><b>{n}</b><span>{t}</span></div>)}</div></section>

    <section id="discover" className="section-shell discover"><div className="section-head"><div><span className="eyebrow">START HERE</span><h2>اول <em>همنوازت</em> را پیدا کن.</h2></div><span className="section-note">از همین‌جا شروع می‌شود.</span></div><div className="quick-grid">{quick.map(([icon,title,text])=><button className="quick glass" key={title} onClick={search}><strong>{icon}</strong><span><b>{title}</b><small>{text}</small></span><ArrowLeft/></button>)}</div><div className="results-grid">{musicians.length?musicians.map(m=><button className="musician-card glass" key={m.user_id||m.id} onClick={()=>setProfile(m)}><span className="avatar">{(m.display_name||'ه').slice(0,1)}</span><span><b>{m.display_name||'نوازنده همنواز'}</b><small>{m.city_name||m.city||'شهر ثبت نشده'}</small></span><span className="verified">{m.is_verified?'✓':'→'}</span></button>):<div className="empty glass"><Users/><b>جامعه‌ات را پیدا کن</b><span>یک ساز، شهر یا سبک را جستجو کن و اولین ارتباطت را بساز.</span></div>}</div></section>

    <section id="bands" className="section-shell story-row"><div className="story-copy"><span className="eyebrow">BUILD TOGETHER</span><h2>یک نفر شروع می‌کند.<br/><em>گروه رشد می‌کند.</em></h2><p>تازه‌کاری که دنبال تمرین است، نوازنده‌ای که می‌خواهد قوی‌تر شود یا گروه حرفه‌ای که دنبال عضو جدید است؛ همه یک نقطه مشترک دارند: با آدم‌های درست سریع‌تر پیش می‌روند.</p><div className="pill-row"><span>تمرین</span><span>تشکیل گروه</span><span>فضای تمرین</span><span>همکاری</span></div></div><div className="band-visual glass"><div className="band-label">GROUP / 04</div><div className="band-person bp1">🎸</div><div className="band-person bp2">🎹</div><div className="band-person bp3">🥁</div><div className="band-person bp4">🎤</div><div className="connect c1"/><div className="connect c2"/><div className="connect c3"/></div></section>

    <section id="concerts" className="section-shell flow"><div className="section-head"><div><span className="eyebrow">FROM PRACTICE TO STAGE</span><h2>وقتی آماده شدی، <em>اجرا کن.</em></h2></div></div><div className="flow-grid"><article className="flow-card"><span>01</span><b>تمرین</b><p>گروه، عضوها و مسیر تمرین مشخص است.</p></article><article className="flow-card"><span>02</span><b>کنسرت</b><p>اجرا را ثبت کن و بلیت را در همنواز بفروش.</p></article><article className="flow-card featured"><span>03</span><b>تقسیم شفاف</b><p>درآمد جمع می‌شود، سهم کوچک همنواز کسر می‌شود و باقی بین نوازنده‌ها و عوامل دارای پروفایل تقسیم می‌شود.</p></article></div></section>

    <section id="charity" className="section-shell charity"><div className="charity-card"><Heart fill="currentColor"/><span>موسیقی برای یک دلیل بزرگ‌تر</span><h2>برای کسانی اجرا کن<br/><em>که به یک حال خوب نیاز دارند.</em></h2><p>گروه‌های همنواز می‌توانند برای مؤسسات خیریه، سالمندان، بیماران سرطانی و مراکز حمایتی اجرا داشته باشند. مردم هم در صورت تمایل، مستقیم از همان مجموعه حمایت می‌کنند.</p><button className="orange-btn">دیدن اجراهای خیریه <ArrowLeft/></button></div><div className="charity-side"><b>❤️</b><span>Music × Humanity</span><small>یک اجرای خوب فقط صدا تولید نمی‌کند؛ ارتباط می‌سازد.</small></div></section>

    <section id="education" className="section-shell education"><div><span className="eyebrow">LEARN & GROW</span><h2>استاد، آموزشگاه،<br/><em>مسیر رشد.</em></h2><p>پروفایل استادها، آموزشگاه‌ها، مهارت‌ها، شاگردها و ارتباطاتشان در یک جامعه موسیقی قابل پیدا کردن می‌شود.</p></div><div className="edu-grid"><div>🎓<b>مدرسان برتر</b><small>اعتبار و امتیاز</small></div><div>🏫<b>آموزشگاه‌ها</b><small>پیدا کردن نزدیک‌ترین مسیر</small></div><div>⭐<b>اعتبار</b><small>بر اساس تجربه واقعی</small></div></div></section>

    <section id="market" className="section-shell secondary"><div className="secondary-card glass"><span>بعد از هسته اصلی</span><h2>بازار موسیقی هم همین‌جاست.</h2><div className="secondary-items"><b>🎸 فروش ساز</b><b>🎧 فروش موسیقی</b><b>🛍️ فروشگاه‌ها</b><b>🎼 آثار گروه‌ها</b></div></div></section>

    <section id="story" className="section-shell mission"><div className="mission-card glass"><Sparkles/><span>HAMNAVAZ</span><h2>پیدا کن. بساز. رشد کن.<br/><em>اجرا کن. اثر بگذار.</em></h2><p>همه چیز از پیدا کردن یک آدم شروع می‌شود.</p></div></section>

    <footer className="footer"><div className="logo"><span className="logo-icon"><Music2/></span><span><b>همنواز</b><small>HAMNAVAZ</small></span></div><span>موسیقی، انسان، همدلی.</span><span>© 2026 Hamnavaz</span></footer>
    <nav className="bottom-nav"><a href="#top">⌂<small>خانه</small></a><a className="active" href="#discover">🎸<small>همنواز</small></a><a href="#bands">👥<small>گروه‌ها</small></a><a href="#concerts">🎤<small>اجرا</small></a><a href="#market">☰<small>بیشتر</small></a></nav>

    {profile&&<div className="modal-backdrop" onClick={()=>setProfile(null)}><div className="profile-modal glass" onClick={e=>e.stopPropagation()}><button onClick={()=>setProfile(null)}><X/></button><span className="profile-avatar">{(profile.display_name||'ه').slice(0,1)}</span><h3>{profile.display_name||'نوازنده همنواز'}</h3><p>{profile.city_name||profile.city||'شهر ثبت نشده'}</p><div className="profile-line">{profile.bio||'برای این نوازنده هنوز توضیحی ثبت نشده است.'}</div><button className="orange-btn">شروع همکاری <ArrowLeft/></button></div></div>}
  </main>
}
