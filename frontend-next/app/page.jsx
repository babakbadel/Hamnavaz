"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, Heart, Menu, Music2, Search, Sparkles, Star, Users, X } from "lucide-react";

const musicians = [
  { name: "آرمان رضایی", instrument: "گیتار", city: "تهران", level: "متوسط", avatar: "AR", color: "gold", rating: "4.9", collaboration: "5.0" },
  { name: "سارا نادری", instrument: "ویولن", city: "اصفهان", level: "حرفه‌ای", avatar: "SN", color: "violet", rating: "4.9", collaboration: "4.8" },
  { name: "کیان مرادی", instrument: "پیانو", city: "شیراز", level: "متوسط", avatar: "KM", color: "cyan", rating: "4.8", collaboration: "4.9" },
  { name: "مریم احمدی", instrument: "درام", city: "اصفهان", level: "مقدماتی", avatar: "MA", color: "rose", rating: "4.7", collaboration: "5.0" },
];

const teachers = [
  { name: "امیر کریمی", instrument: "گیتار کلاسیک", city: "تهران", avatar: "AK", rating: "4.9" },
  { name: "نگار موسوی", instrument: "پیانو", city: "اصفهان", avatar: "NM", rating: "5.0" },
  { name: "سامان فرهادی", instrument: "ساز ایرانی", city: "شیراز", avatar: "SF", rating: "4.8" },
];

const requests = [
  { avatar: "RM", title: "دنبال گیتاریست مبتدی", detail: "اصفهان · برای تمرین و پیشرفت گروهی", color: "gold" },
  { avatar: "HN", title: "دنبال نوازنده پیانو", detail: "تهران · سطح متوسط · جَز", color: "violet" },
  { avatar: "SA", title: "گروه در حال تکمیل", detail: "شیراز · یک درامر برای اجرا", color: "cyan" },
];

const bars = [24, 54, 38, 72, 46, 84, 58, 35, 68, 48, 78, 42, 62, 30, 74, 50, 88, 45, 66, 36];

function Avatar({ person, size = "md" }) {
  return <div className={`avatar avatar-${person.color || "gold"} avatar-${size}`}>{person.avatar}</div>;
}

function Rating({ ordinary, collaboration }) {
  return <div className="ratings">
    <span className="rating ordinary" title="امتیاز معمولی؛ نظر و تجربه کاربران درباره این پروفایل">★ {ordinary}</span>
    <span className="rating collab" title="امتیاز همکاری؛ امتیازی که پس از یک همکاری واقعی ثبت می‌شود">★ {collaboration}</span>
  </div>;
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-title">
    <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>
    <button className="see-all">مشاهده همه <ChevronLeft size={16} /></button>
  </div>;
}

function LiveVisual() {
  const [active, setActive] = useState(0);
  const instruments = ["🎸", "🎻", "🎹", "🥁"];
  useEffect(() => { const t = setInterval(() => setActive(v => (v + 1) % 4), 2200); return () => clearInterval(t); }, []);
  return <div className="live-visual">
    <div className="laser l1" /><div className="laser l2" /><div className="laser l3" />
    <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
    <div className="visual-core"><Music2 size={58} /><span>HAMNAVAZ</span></div>
    {instruments.map((item, i) => <div key={item} className={`floating-instrument fi-${i} ${active === i ? "active" : ""}`}>{item}<small>{["گیتار", "ویولن", "پیانو", "درام"][i]}</small></div>)}
    <div className="visual-eq">{bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * -0.07}s` }} />)}</div>
    <div className="live-chip"><span />۱۲۸۴ نوازنده آنلاین</div>
  </div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const submit = (e) => { e.preventDefault(); setToast(query ? `جست‌وجوی «${query}» آماده است` : "ساز، شهر یا سطح مهارتت را انتخاب کن"); setTimeout(() => setToast(""), 2200); };

  return <main className="site" dir="rtl">
    <header className="navbar">
      <div className="nav-inner">
        <button className="menu-button mobile-only" onClick={() => setMenu(v => !v)} aria-label="منو">{menu ? <X /> : <Menu />}</button>
        <a className="brand" href="#top"><span className="logo-mark"><Music2 size={23} /></span><span><b>همنواز</b><small>HAMNAVAZ</small></span></a>
        <nav className="nav-links"><a href="#find">همنواز</a><a href="#people">آدم‌ها</a><a href="#groups">گروه‌ها</a><a href="#charity">خیریه</a><a href="#teachers">آموزش</a></nav>
        <div className="nav-actions"><button className="icon-button" aria-label="جست‌وجو" onClick={() => document.getElementById("search")?.focus()}><Search size={18} /></button><a className="gold-button desktop-only" href="#find">شروع کن <ArrowLeft size={16} /></a></div>
      </div>
      {menu && <div className="mobile-menu glass"><a href="#find" onClick={() => setMenu(false)}>🎸 پیدا کردن همنواز</a><a href="#people" onClick={() => setMenu(false)}>👤 آدم‌های آنلاین</a><a href="#groups" onClick={() => setMenu(false)}>👥 گروه‌ها</a><a href="#charity" onClick={() => setMenu(false)}>❤️ اجراهای خیریه</a><a href="#teachers" onClick={() => setMenu(false)}>🎓 اساتید</a></div>}
    </header>

    <section id="top" className="hero container">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot" /> یک جامعه زنده برای موسیقی</div>
        <h1>موسیقی وقتی<br /><em>زنده می‌شود</em> که با هم باشیم.</h1>
        <p>همنواز جایی است برای پیدا کردن آدم درست، ساختن گروه، تمرین کردن، یاد گرفتن و رسیدن از اولین نت تا یک اجرای واقعی.</p>
        <form className="search-box glass" onSubmit={submit}><Search size={19} /><input id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="مثلاً گیتاریست مبتدی در اصفهان" /><button>پیدا کن <ArrowLeft size={16} /></button></form>
        <div className="quick-links"><button onClick={() => setQuery("گیتاریست در اصفهان")}>گیتاریست در اصفهان</button><button onClick={() => setQuery("گروه جَز در تهران")}>گروه جَز در تهران</button><button onClick={() => setQuery("استاد پیانو")}>استاد پیانو</button></div>
        {toast && <div className="toast">{toast}</div>}
      </div>
      <LiveVisual />
    </section>

    <section className="stats container"><div><b>۱٬۲۸۴</b><span>نوازنده آنلاین</span></div><div><b>۸۶</b><span>گروه در حال شکل‌گیری</span></div><div><b>۲۴</b><span>اجرای پیش‌رو</span></div><div><b>۳۱۲</b><span>همکاری موفق</span></div></section>

    <section id="find" className="section container"><SectionTitle eyebrow="START HERE" title={<>اولین <em>همنوازت</em> را پیدا کن.</>} text="از ساز و شهر شروع کن؛ بقیه مسیر با آدم‌های درست شکل می‌گیرد." /><div className="feature-grid"><article className="feature-card accent-gold"><span>01</span><Music2 /><h3>همنواز پیدا کن</h3><p>ساز، شهر، سبک و سطح مهارت را مشخص کن.</p></article><article className="feature-card accent-violet"><span>02</span><Users /><h3>گروه بساز</h3><p>آدم‌هایی را پیدا کن که با مسیر موسیقی تو هم‌جهت‌اند.</p></article><article className="feature-card accent-rose"><span>03</span><Heart /><h3>برای یک دلیل خوب اجرا کن</h3><p>گروه شکل بگیرد، اجرا کنید و موسیقی را به یک خاطره خوب تبدیل کنید.</p></article></div></section>

    <section id="people" className="section section-dark"><div className="container"><SectionTitle eyebrow="PEOPLE IN THE FLOW" title={<>آدم‌هایی که همین حالا <em>اینجا هستند.</em></>} text="پروفایل‌ها فقط کارت نیستند؛ شروع یک ارتباط‌اند." /><div className="people-grid">{musicians.map((m, i) => <article className="person-card glass" key={m.name}><div className="person-top"><div className="online-status"><span /> آنلاین</div><button className="dots">•••</button></div><div className="person-main"><Avatar person={m} size="lg" /><div><h3>{m.name}</h3><p>{m.instrument} · {m.level}</p><small><span>●</span> {m.city}</small></div></div><Rating ordinary={m.rating} collaboration={m.collaboration} /><div className="person-footer"><span>{i % 2 ? "در حال تمرین" : "دنبال همنواز"}</span><button>مشاهده پروفایل <ChevronLeft size={15} /></button></div></article>)}</div></div></section>

    <section id="teachers" className="section container"><SectionTitle eyebrow="TEACHERS" title={<>اساتید برتر و <em>آنلاین</em></>} text="کسی که مسیر را بلد است، پیدا کردنش باید ساده باشد." /><div className="teacher-row">{teachers.map(t => <article className="teacher-card" key={t.name}><Avatar person={{...t, color:"violet"}} size="md" /><div><b>{t.name}</b><span>{t.instrument}</span><small>{t.city} · 🟢 آنلاین</small></div><span className="teacher-star">★ {t.rating}</span></article>)}</div></section>

    <section id="groups" className="section section-dark"><div className="container"><SectionTitle eyebrow="LOOKING FOR SOMEONE" title={<>هر گروه، یک <em>جای خالی</em> دارد.</>} text="شاید همین حالا یک نفر در شهر تو منتظر ساز تو باشد." /><div className="request-grid">{requests.map(r => <article className={`request-card glass ${r.color}`} key={r.title}><Avatar person={{avatar:r.avatar,color:r.color}} size="sm" /><div><h3>{r.title}</h3><p>{r.detail}</p></div><button><ArrowLeft size={17} /></button></article>)}</div></div></section>

    <section id="charity" className="charity container"><div className="charity-main"><div className="eyebrow"><Heart size={16} /> MUSIC × HUMANITY</div><h2>یک گروه شکل بگیرد،<br /><em>یک اجرای ماندگار.</em></h2><p>گروه‌های همنواز می‌توانند برای مؤسسات خیریه، سالمندان، بیماران و مراکز حمایتی اجرا داشته باشند. حمایت مردمی هم در صورت تمایل، مستقیم به همان مجموعه می‌رسد.</p><a className="gold-button" href="#groups">گروه‌های در حال شکل‌گیری <ArrowLeft size={16} /></a></div><div className="charity-art"><Sparkles size={30} /><div className="charity-orbit">♥</div><span>یک نت<br />یک گروه<br />یک اثر</span></div></section>

    <section className="section container"><SectionTitle eyebrow="TRUST & COLLABORATION" title={<>امتیاز فقط یک عدد <em>نیست.</em></>} text="دو نگاه متفاوت به تجربه یک نوازنده." /><div className="rating-explain"><div><span className="big-star gold">★</span><div><h3>امتیاز معمولی</h3><p>نظر و تجربه کاربران درباره پروفایل، مهارت و حضور فرد در جامعه.</p></div></div><div><span className="big-star violet">★</span><div><h3>امتیاز همکاری</h3><p>امتیازی که بعد از ارتباط و همکاری واقعی شکل می‌گیرد.</p></div></div></div></section>

    <section className="section section-dark"><div className="container"><SectionTitle eyebrow="THE NEXT STEP" title={<>از تمرین تا <em>صحنه.</em></>} text="وقتی گروه آماده شد، همنواز مسیر اجرا را هم ساده می‌کند." /><div className="journey"><div><span>01</span><b>پیدا کردن</b><small>نوازنده و استاد</small></div><div><span>02</span><b>ساختن</b><small>گروه و همکاری</small></div><div><span>03</span><b>اجرا</b><small>کنسرت و خیریه</small></div><div><span>04</span><b>رشد</b><small>اعتبار و تجربه</small></div></div></div></section>

    <section className="section container"><SectionTitle eyebrow="MUSIC MARKET" title={<>چیزهای دیگر هم <em>کنار موسیقی</em> می‌آیند.</>} /><div className="secondary-grid"><div>🎸<b>فروش ساز</b><span>برای بعد، کنار هسته اصلی</span></div><div>🎧<b>فروش موسیقی</b><span>آثار گروه‌ها و هنرمندان</span></div><div>🎓<b>آموزشگاه</b><span>پیدا کردن مسیر یادگیری</span></div><div>🎤<b>تهیه‌کننده</b><span>ارتباط شفاف با عوامل اجرا</span></div></div></section>

    <footer className="footer container"><Logo /><span>پیدا کن. بساز. رشد کن. اجرا کن.</span><span>© 2026 Hamnavaz</span></footer>
    <nav className="bottom-nav"><a href="#top">⌂<small>خانه</small></a><a href="#find">🎸<small>همنواز</small></a><a href="#people">👤<small>آدم‌ها</small></a><a href="#groups">👥<small>گروه‌ها</small></a><a href="#teachers">☰<small>بیشتر</small></a></nav>
  </main>;
}
