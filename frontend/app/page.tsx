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
    <style jsx global>{`@media(max-width:800px){.nav{height:68px}.menu-toggle{display:flex;width:44px;height:44px;border:1px solid #263144;background:#101827;border-radius:12px;padding:9px;cursor:pointer;flex-direction:column;justify-content:center;gap:5px}.menu-toggle span{display:block;width:100%;height:2px;background:#f5f2ea;border-radius:99px;transition:.2s}.menu-toggle.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.menu-toggle.is-open span:nth-child(2){opacity:0}.menu-toggle.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}.nav-links{display:none;position:absolute;top:68px;right:0;left:0;flex-direction:column;align-items:stretch;gap:6px;padding:12px;background:#0b1320;border:1px solid #263144;border-radius:0 0 18px 18px;box-shadow:0 20px 50px rgba(0,0,0,.35)}.nav-links.mobile-open{display:flex}.nav-links a{padding:14px 16px;border-radius:10px}.nav-links a:hover{background:#101827}.nav-links .login,.nav-links .profile-nav{text-align:center;color:#070d18;background:#d9b45b;margin-top:4px}.hero{grid-template-columns:1fr;gap:25px;padding:55px 0}.hero-card{display:none}.features,.profile-grid,.dashboard-grid{grid-template-columns:1fr;padding-bottom:60px}.cta{flex-direction:column;align-items:flex-start}.container{width:min(100% - 28px,1120px)}h1{letter-spacing:-2px}.profile-hero{grid-template-columns:auto 1fr}.profile-hero .primary-action{grid-column:1/-1;width:100%}.avatar-large{width:84px;height:84px;font-size:40px}.profile-hero h1{font-size:34px}.search-box{flex-direction:column}.search-button{width:100%}.dashboard-head{align-items:flex-start}.dashboard-avatar{width:84px;height:84px;border-radius:22px;font-size:40px}.auth-card{padding:28px 22px}}`}</style>
  </main>;
}
