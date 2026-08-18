"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const instruments = ["گیتار", "پیانو", "ویولن", "دف", "تار", "سه‌تار"];
const features = [
  { title: "پیدا کردن هم‌نواز", text: "نوازنده مناسب را بر اساس ساز، شهر و سبک موسیقی پیدا کن." },
  { title: "پیدا کردن استاد", text: "برای یادگیری ساز، استاد و مسیر مناسب خودت را پیدا کن." },
  { title: "همکاری موسیقی", text: "برای اجرا، تمرین، گروه و پروژه‌های موسیقی همکار پیدا کن." },
];

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem("hamnavaz_token")));
  }, []);

  return <main>
    <nav className="nav container">
      <Link className="brand" href="/"><span>♪</span> همنواز</Link>
      <div className="nav-links">
        <Link href="/musicians">کشف نوازنده‌ها</Link>
        <a href="#how">چطور کار می‌کند؟</a>
        {loggedIn ? (
          <Link className="profile-nav" href="/dashboard">پروفایل من</Link>
        ) : (
          <Link className="login" href="/auth/login">ورود</Link>
        )}
      </div>
    </nav>

    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">موسیقی، وقتی بهتر می‌شود که تنها نباشد</p>
        <h1>هم‌نواز خودت را<br/><span>پیدا کن.</span></h1>
        <p className="lead">نوازنده، استاد، گروه یا فضای مناسب برای تمرین و اجرا را پیدا کن و موسیقی را با آدم‌های مناسب ادامه بده.</p>
        <div className="search-box" id="discover">
          <input aria-label="جستجوی نوازنده" placeholder="مثلاً گیتاریست در تهران..."/>
          <Link className="search-button" href="/musicians">جستجو</Link>
        </div>
        <div className="quick-tags">{instruments.map(item => <Link href="/musicians" key={item}>{item}</Link>)}</div>
      </div>
      <div className="hero-card">
        <div className="music-orb">♫</div>
        <p>جامعه موسیقی همنواز</p>
        <strong>آدم مناسب برای موسیقی‌ات را پیدا کن</strong>
        <div className="mini-profile"><span>🎸</span><div><b>هم‌نواز</b><small>تمرین · اجرا · گروه</small></div><i>فعال</i></div>
        <div className="mini-profile"><span>🎓</span><div><b>استاد</b><small>یادگیری · کلاس · مشاوره</small></div><i>فعال</i></div>
      </div>
    </section>

    <section className="features container" id="how">{features.map((feature,index)=><article key={feature.title}><span>0{index+1}</span><h2>{feature.title}</h2><p>{feature.text}</p></article>)}</section>
    <section className="cta container"><div><p className="eyebrow">شروع کن</p><h2>{loggedIn ? "به فضای شخصی همنواز خوش آمدی." : "موسیقی منتظر همنواز توست."}</h2></div><Link className="cta-button" href={loggedIn ? "/dashboard" : "/auth/register"}>{loggedIn ? "ورود به داشبورد" : "ساخت پروفایل موسیقی"}</Link></section>
  </main>;
}
