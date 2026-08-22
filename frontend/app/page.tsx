"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { searchMusicians, type Musician } from "../../lib/api";

const instruments = ["گیتار", "پیانو", "ویولن", "دف", "تار", "سه‌تار"];
const cities = ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز"];
const skills = ["مبتدی", "متوسط", "حرفه‌ای", "مدرس"];
const styles = ["پاپ", "سنتی", "راک", "کلاسیک", "جاز"];

const teachers = [
  { name: "استاد مهدی", instrument: "گیتار", level: "حرفه‌ای", avatar: "🎸" },
  { name: "استاد نازنین", instrument: "پیانو", level: "مدرس", avatar: "🎹" },
  { name: "استاد علی", instrument: "تار و سه‌تار", level: "مدرس", avatar: "🎵" },
];

const concerts = [
  { title: "شب موسیقی همنواز", place: "تهران · تالار وحدت", date: "۲۸ شهریور", image: "🎤" },
  { title: "آوای اصفهان", place: "اصفهان · سالن سیتی‌سنتر", date: "۴ مهر", image: "🎻" },
  { title: "هم‌صدا", place: "شیراز · سالن حافظ", date: "۱۲ مهر", image: "🎸" },
];

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [instrument, setInstrument] = useState("");
  const [skill, setSkill] = useState("");
  const [style, setStyle] = useState("");
  const [onlineMusicians, setOnlineMusicians] = useState<Musician[]>([]);
  const [onlineLoading, setOnlineLoading] = useState(true);
  const [onlineError, setOnlineError] = useState(false);

  useEffect(() => setLoggedIn(Boolean(localStorage.getItem("hamnavaz_token"))), []);

  useEffect(() => {
    let active = true;
    searchMusicians({ online: true, limit: 4 })
      .then((data) => {
        if (!active) return;
        setOnlineMusicians(data.results.slice(0, 4));
        setOnlineError(false);
      })
      .catch(() => {
        if (!active) return;
        setOnlineMusicians([]);
        setOnlineError(true);
      })
      .finally(() => {
        if (active) setOnlineLoading(false);
      });
    return () => { active = false; };
  }, []);

  function discover(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (city) params.set("city", city);
    if (instrument) params.set("instrument", instrument);
    if (skill) params.set("skill", skill);
    if (style) params.set("style", style);
    window.location.href = `/musicians?${params.toString()}`;
  }

  return <main className="hz-home">
    <style>{`
      .online-grid { display:grid !important; grid-template-columns:repeat(4,minmax(0,1fr)) !important; grid-auto-flow:row !important; grid-auto-columns:unset !important; overflow:visible !important; }
      .online-grid > * { min-width:0 !important; }
      .person-card,.teacher-card,.music-card,.concert-card,.ticket-card,.instrument-grid a { position:relative; border:1px solid rgba(215,181,106,.48) !important; box-shadow:0 0 0 1px rgba(215,181,106,.10),0 0 14px rgba(215,181,106,.16),0 10px 28px rgba(0,0,0,.28) !important; }
      .person-card:before,.teacher-card:before,.music-card:before,.concert-card:before,.ticket-card:before,.instrument-grid a:before { content:"";position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 12px rgba(215,181,106,.08),0 0 8px rgba(215,181,106,.12); }
      .person-card:hover,.teacher-card:hover,.music-card:hover,.concert-card:hover,.ticket-card:hover,.instrument-grid a:hover { border-color:#e7c978 !important; box-shadow:0 0 0 1px rgba(231,201,120,.30),0 0 22px rgba(215,181,106,.34),0 16px 42px rgba(0,0,0,.34) !important; transform:translateY(-3px); }
      .online-grid .person-card { box-shadow:0 0 0 1px rgba(215,181,106,.12),0 0 18px rgba(215,181,106,.22),0 10px 30px rgba(0,0,0,.3) !important; }
      .online-grid .online-dot { text-shadow:0 0 8px rgba(143,208,159,.65); }
      @media (max-width:900px) { .online-grid { grid-template-columns:repeat(2,minmax(0,1fr)) !important; } }
      @media (max-width:600px) { .online-grid { gap:10px !important; } .online-grid .person-card { padding:12px; gap:8px; min-height:86px; } .online-grid .person-card h3 { font-size:14px; } .online-grid .person-card p { font-size:10px; } .online-grid .person-card small { font-size:9px; } .online-grid .online-dot { font-size:8px; } .online-grid .avatar { width:46px; height:46px; font-size:22px; } .person-card,.teacher-card,.music-card,.concert-card,.ticket-card,.instrument-grid a { box-shadow:0 0 0 1px rgba(215,181,106,.10),0 0 12px rgba(215,181,106,.14),0 8px 22px rgba(0,0,0,.25) !important; } }
    `}</style>
    <section className="home-hero container">
      <div className="hero-copy">
        <p className="eyebrow">جامعه‌ای برای آدم‌های موسیقی</p>
        <h1>موسیقی وقتی بهتر می‌شود که <span>تنها نباشد.</span></h1>
        <p className="lead">هم‌نواز، استاد، گروه و فرصت‌های اجرا را پیدا کن؛ از یک جستجوی ساده تا یک همکاری واقعی روی صحنه.</p>
        <form className="discover-panel" onSubmit={discover}>
          <div className="discover-title"><span>🔎</span><div><strong>هم‌نوازت را پیدا کن</strong><small>بر اساس شهر، ساز، مهارت و سبک</small></div></div>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="نام نوازنده، ساز یا سبک..." aria-label="جستجو" />
          <div className="filter-grid">
            <select value={city} onChange={e => setCity(e.target.value)}><option value="">📍 همه شهرها</option>{cities.map(x => <option key={x}>{x}</option>)}</select>
            <select value={instrument} onChange={e => setInstrument(e.target.value)}><option value="">🎸 همه سازها</option>{instruments.map(x => <option key={x}>{x}</option>)}</select>
            <select value={skill} onChange={e => setSkill(e.target.value)}><option value="">⭐ همه مهارت‌ها</option>{skills.map(x => <option key={x}>{x}</option>)}</select>
            <select value={style} onChange={e => setStyle(e.target.value)}><option value="">🎵 همه سبک‌ها</option>{styles.map(x => <option key={x}>{x}</option>)}</select>
          </div>
          <button className="primary-btn" type="submit">پیدا کن <span>←</span></button>
        </form>
      </div>
      <div className="hero-visual"><div className="hero-note">♫</div><strong>یک پیام می‌تواند شروع یک همکاری باشد.</strong><span>تمرین · هم‌نوازی · آموزش · اجرا</span></div>
    </section>

    <section className="section container"><SectionHead title="همین حالا آنلاین‌اند" text="اگر می‌خواهی همین امروز شروع کنی، از نوازنده‌هایی که آنلاین هستند پیدا کن." action="مشاهده همه" href="/musicians?online=true"/><div className="people-grid online-grid">
      {onlineLoading && <div className="person-card"><div><h3>در حال دریافت نوازنده‌ها…</h3><p>اتصال به همنواز</p></div></div>}
      {!onlineLoading && onlineMusicians.map((p) => <Link href={`/musicians/${encodeURIComponent(p.id)}`} className="person-card" key={p.id}>
        <div className="avatar">{p.avatar_url ? <img src={p.avatar_url} alt="" width={52} height={52} /> : "🎵"}</div>
        <div><h3>{p.display_name}</h3><p>نوازنده همنواز</p><small>📍 {p.city_name || p.city || "شهر ثبت نشده"}</small></div>
        <b className="online-dot">● آنلاین</b>
      </Link>)}
      {!onlineLoading && onlineMusicians.length === 0 && <div className="person-card"><div><h3>{onlineError ? "اتصال به سرویس همنواز برقرار نشد" : "نوازنده‌ای آنلاین نیست"}</h3><p>{onlineError ? "لطفاً چند لحظه بعد دوباره تلاش کن." : "وقتی نوازنده‌ها آنلاین شوند اینجا نمایش داده می‌شوند."}</p></div></div>}
    </div></section>

    <section className="section section-soft"><div className="container"><SectionHead title="مدرسان" text="برای یادگیری سازت، مدرس مناسب را پیدا کن و مسیرت را جدی‌تر ادامه بده." action="همه مدرسان" href="/teachers"/><div className="people-grid">{teachers.map(p => <article className="teacher-card" key={p.name}><div className="avatar">{p.avatar}</div><div><h3>{p.name}</h3><p>{p.instrument}</p><small>سطح: {p.level}</small></div><Link href="/teachers">مشاهده</Link></article>)}</div></div></section>

    <section className="section container"><SectionHead title="سازت را انتخاب کن" text="نوازنده‌ها و مدرس‌های ساز موردعلاقه‌ات را سریع‌تر پیدا کن."/><div className="instrument-grid" style={{gridAutoFlow: "row", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridAutoColumns: "unset", overflowX: "visible"}}>{instruments.map(x => <Link href={`/musicians?q=${encodeURIComponent(x)}`} key={x}><span>{instrumentIcon(x)}</span><b>{x}</b><small>پیدا کردن نوازنده</small></Link>)}<Link className="instrument-more" href="/instruments"><span>＋</span><b>همه سازها</b><small>مشاهده سازهای بیشتر</small></Link></div></section>

    <section className="charity-banner container"><div className="charity-avatar">❤️</div><div><p className="eyebrow">موسیقی برای یک لبخند</p><h2>اجراهای خیریه همنواز</h2><p>نوازندگان می‌توانند برای خانه‌های سالمندان، مراکز درمانی و مؤسسه‌های خیریه، اجراهای داوطلبانه برگزار کنند.</p></div><Link href="/charity" className="outline-btn">مشاهده اجراها</Link></section>

    <section className="section section-story"><div className="container story-grid"><div><p className="eyebrow">داستان همنواز</p><h2>آدم‌های موسیقی<br/><span>نباید همدیگر را گم کنند.</span></h2><p>همنواز از یک ایده ساده شروع شد: ساختن جایی که نوازنده، استاد، گروه، برگزارکننده و دوست‌دار موسیقی بتوانند همدیگر را پیدا کنند و یک آشنایی را به یک همکاری واقعی تبدیل کنند.</p><Link href="/about" className="text-link">داستان همنواز را بخوان ←</Link></div><div className="story-card"><span>♪</span><strong>یک ساز</strong><i>+</i><strong>یک آدم</strong><i>=</i><strong>یک موسیقی</strong></div></div></section>

    <section className="section container"><SectionHead title="صدای همنواز" text="موسیقی‌هایی که از همکاری اعضای همنوازی متولد شده‌اند." action="همه موسیقی‌ها" href="/music"/><div className="music-grid">{["اولین تمرین", "کوچه‌های اصفهان", "با هم می‌نوازیم"].map((x,i) => <article className="music-card" key={x}><div className="cover">{["🎧","🎼","🎙️"][i]}</div><div><h3>{x}</h3><p>ساخته‌شده در یک همکاری همنوازی</p></div><button aria-label="پخش">▶</button></article>)}</div></section>

    <section className="section section-soft"><div className="container"><SectionHead title="از آشنایی تا صحنه" text="همکاری‌هایی که در همنواز شروع شدند و به اجرای واقعی رسیدند." action="همه همکاری‌ها" href="/collaborations"/><div className="concert-grid">{concerts.map(c => <article className="concert-card" key={c.title}><div className="concert-cover">{c.image}<span>{c.date}</span></div><div className="concert-body"><h3>{c.title}</h3><p>{c.place}</p><Link href="/concerts">جزئیات اجرا ←</Link></div></article>)}</div></div></section>

    <section className="section container"><SectionHead title="کنسرت‌ها و فروش بلیت" text="اجرای موردعلاقه‌ات را پیدا کن، صندلی‌ات را انتخاب کن و بلیت بخر." action="همه کنسرت‌ها" href="/concerts"/><div className="ticket-row">{concerts.map(c => <article className="ticket-card" key={c.title}><div><small>{c.date}</small><h3>{c.title}</h3><p>{c.place}</p></div><Link href="/concerts">خرید بلیت</Link></article>)}</div></section>

    <section className="final-cta container"><div><p className="eyebrow">شروع همنوازی</p><h2>{loggedIn ? "آماده‌ای همکاری بعدی‌ات را شروع کنی؟" : "موسیقی منتظر همنواز توست."}</h2></div><Link href={loggedIn ? "/musicians" : "/auth/register"} className="primary-btn">{loggedIn ? "پیدا کردن همنواز" : "ساخت پروفایل موسیقی"}</Link></section>
  </main>;
}

function SectionHead({ title, text, action, href }: { title: string; text: string; action?: string; href?: string }) {
  return <div className="section-head"><div><h2>{title}</h2><p>{text}</p></div>{action && href && <Link href={href}>{action} ←</Link>}</div>;
}

function instrumentIcon(name: string) { return ({"گیتار":"🎸","پیانو":"🎹","ویولن":"🎻","دف":"🥁","تار":"🪕","سه‌تار":"🎵"} as Record<string,string>)[name] || "🎵"; }
