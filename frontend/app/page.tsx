"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const instruments = ["گیتار", "پیانو", "ویولن", "دف", "تار", "سه‌تار"];
const features = [
  { title: "پیدا کردن هم‌نواز", text: "نوازنده مناسب را بر اساس ساز، شهر و سبک موسیقی پیدا کن." },
  { title: "پیدا کردن استاد", text: "برای یادگیری ساز، استاد و مسیر مناسب خودت را پیدا کن." },
  { title: "همکاری موسیقی", text: "برای اجرا، تمرین، گروه و پروژه‌های موسیقی همکار پیدا کن." },
];

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setLoggedIn(Boolean(localStorage.getItem("hamnavaz_token"))); }, []);

  function discover(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    window.location.href = term ? `/musicians?q=${encodeURIComponent(term)}` : "/musicians";
  }

  return <main>
    <nav className="nav container">
      <Link className="brand" href="/" onClick={() => setMenuOpen(false)}><span>♪</span> همنواز</Link>
      <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label="باز کردن منو" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
        <span></span><span></span><span></span>
      </button>
      <div className={`nav-links${menuOpen ? " mobile-open" : ""}`}>
        <Link href="/musicians" onClick={() => setMenuOpen(false)}>کشف نوازنده‌ها</Link>
        <a href="#how" onClick={() => setMenuOpen(false)}>چطور کار می‌کند؟</a>
        {loggedIn ? <Link className="profile-nav" href="/dashboard" onClick={() => setMenuOpen(false)}>پروفایل من</Link> : <Link className="login" href="/auth/login" onClick={() => setMenuOpen(false)}>ورود</Link>}
      </div>
    </nav>

    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">موسیقی، وقتی بهتر می‌شود که تنها نباشد</p>
        <h1>هم‌نواز خودت را<br/><span>پیدا کن.</span></h1>
        <p className="lead">نوازنده، استاد، گروه یا فضای مناسب برای تمرین و اجرا را پیدا کن و موسیقی را با آدم‌های مناسب ادامه بده.</p>
        <form className="search-box" id="discover" onSubmit={discover}>
          <input value={q} onChange={e=>setQ(e.target.value)} aria-label="جستجوی نوازنده" placeholder="مثلاً گیتاریست در تهران..."/>
          <button className="search-button" type="submit">جستجو</button>
        </form>
        <div className="quick-tags">{instruments.map(item => <Link href={`/musicians?q=${encodeURIComponent(item)}`} key={item}>{item}</Link>)}</div>
      </div>
      <div className="hero-card">
        <div className="music-orb">♫</div><p>جامعه موسیقی همنواز</p><strong>آدم مناسب برای موسیقی‌ات را پیدا کن</strong>
        <div className="mini-profile"><span>🎸</span><div><b>هم‌نواز</b><small>تمرین · اجرا · گروه</small></div><i>فعال</i></div>
        <div className="mini-profile"><span>🎓</span><div><b>استاد</b><small>یادگیری · کلاس · مشاوره</small></div><i>فعال</i></div>
      </div>
    </section>
    <section className="features container" id="how">{features.map((feature,index)=><article key={feature.title}><span>0{index+1}</span><h2>{feature.title}</h2><p>{feature.text}</p></article>)}</section>
    <section className="cta container"><div><p className="eyebrow">شروع کن</p><h2>{loggedIn ? "به فضای شخصی همنواز خوش آمدی." : "موسیقی منتظر همنواز توست."}</h2></div><Link className="cta-button" href={loggedIn ? "/dashboard" : "/auth/register"}>{loggedIn ? "ورود به داشبورد" : "ساخت پروفایل موسیقی"}</Link></section>
  </main>;
}
