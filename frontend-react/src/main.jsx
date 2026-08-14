import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const instruments = [
  { icon: "🎸", name: "گیتار", count: "۲۴۸ نوازنده" },
  { icon: "🎹", name: "پیانو", count: "۱۸۶ نوازنده" },
  { icon: "🥁", name: "درام", count: "۱۲۴ نوازنده" },
  { icon: "🎻", name: "ویولن", count: "۹۸ نوازنده" },
  { icon: "🎷", name: "ساکسوفون", count: "۷۴ نوازنده" },
  { icon: "🎺", name: "ترومپت", count: "۵۶ نوازنده" },
];

const musicians = [
  { name: "آرمان", instrument: "گیتار الکتریک", city: "تهران", rating: "4.9", icon: "🎸" },
  { name: "سارا", instrument: "پیانو", city: "اصفهان", rating: "4.9", icon: "🎹" },
  { name: "رضا", instrument: "ویولن", city: "شیراز", rating: "4.8", icon: "🎻" },
  { name: "نیما", instrument: "درامز", city: "تهران", rating: "4.8", icon: "🥁" },
];

const collaborations = [
  {
    icon: "🎤",
    title: "خواننده برای اجرای زنده",
    meta: "تهران • ۲ ساعت پیش",
    tags: ["پاپ", "اجرای زنده"],
  },
  {
    icon: "🎸",
    title: "گیتاریست برای گروه",
    meta: "اصفهان • ۴ ساعت پیش",
    tags: ["راک", "گروه موسیقی"],
  },
  {
    icon: "🎹",
    title: "پیانیست برای همراهی",
    meta: "شیراز • امروز",
    tags: ["کلاسیک", "همکاری"],
  },
];

function App() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [online, setOnline] = useState(127);

  useEffect(() => {
    const timer = setInterval(() => {
      setOnline((value) => value + (Math.random() > 0.5 ? 1 : -1));
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const doSearch = () => {
    if (!search.trim()) return;
    alert(`جستجو برای «${search}»`);
  };

  return (
    <div className="app-shell">

      {/* Ambient background */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-glow" />

      {/* Header */}
      <header className="header">
        <button
          className={`menu-button ${menu ? "active" : ""}`}
          onClick={() => setMenu(!menu)}
          aria-label="منو"
        >
          <span />
          <span />
          <span />
        </button>

        <div className="brand">
          <div className="brand-mark">
            <span>♫</span>
          </div>
          <div>
            <strong>همنواز</strong>
            <small>HAMNAVAZ</small>
          </div>
        </div>

        <nav className="desktop-nav">
          <a href="#discover">کشف</a>
          <a href="#musicians">نوازنده‌ها</a>
          <a href="#instruments">سازها</a>
          <a href="#collaborations">همکاری‌ها</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" title="اعلان‌ها">♢</button>
          <button className="avatar-button">B</button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menu ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-title">منوی همنواز</div>

          {[
            ["⌂", "خانه"],
            ["⌕", "جستجوی نوازنده"],
            ["♬", "سازها"],
            ["★", "نوازنده‌های برتر"],
            ["🤝", "همکاری‌ها"],
            ["🎤", "اجراها"],
            ["🎫", "کنسرت‌ها"],
            ["🏫", "آموزشگاه‌ها"],
            ["🛒", "فروش ساز"],
            ["⚙", "تنظیمات"],
          ].map(([icon, text]) => (
            <a key={text} href="#" onClick={() => setMenu(false)}>
              <span>{icon}</span>
              {text}
            </a>
          ))}
        </div>
      </div>

      <main>

        {/* Hero */}
        <section className="hero" id="discover">

          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" />
              جامعه‌ای برای عاشقان موسیقی
            </div>

            <h1>
              موسیقی را
              <span> با هم </span>
              زندگی کن.
            </h1>

            <p>
              نوازنده، همنواز، مدرس یا گروه موسیقی موردنظرت را پیدا کن.
              ارتباط بگیر، همکاری کن و صدایت را به گوش دنیا برسان.
            </p>

            <div className="hero-search">
              <span className="search-icon">⌕</span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="نوازنده، ساز، شهر یا سبک موسیقی..."
              />

              <button onClick={doSearch}>جستجو</button>
            </div>

            <div className="hero-buttons">
              <button className="primary-btn">
                پیدا کردن همنواز
                <span>←</span>
              </button>

              <button className="ghost-btn">
                کشف دنیای موسیقی
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>+۲,۴۰۰</strong>
                <span>نوازنده</span>
              </div>
              <div>
                <strong>+۱۸۰</strong>
                <span>گروه فعال</span>
              </div>
              <div>
                <strong>+۷۵۰</strong>
                <span>همکاری</span>
              </div>
            </div>
          </div>

          {/* Code generated musical visual */}
          <div className="hero-stage">

            <div className="stage-orbit orbit-one" />
            <div className="stage-orbit orbit-two" />
            <div className="stage-orbit orbit-three" />

            <div className="floating-note note-one">♪</div>
            <div className="floating-note note-two">♫</div>
            <div className="floating-note note-three">♬</div>

            <div className="vinyl">
              <div className="vinyl-ring ring-one" />
              <div className="vinyl-ring ring-two" />
              <div className="vinyl-label">
                <span>♫</span>
              </div>
            </div>

            <div className="guitar-shape">
              <div className="guitar-neck" />
              <div className="guitar-body">
                <div className="guitar-hole" />
              </div>
            </div>

            <div className="floating-card card-online">
              <div className="mini-avatar">🎸</div>
              <div>
                <strong>نوازنده‌ها آنلاین</strong>
                <span><i /> {online} نفر فعال</span>
              </div>
            </div>

            <div className="floating-card card-rating">
              <span className="star">★</span>
              <div>
                <strong>4.9</strong>
                <small>میانگین امتیاز</small>
              </div>
            </div>

          </div>
        </section>

        {/* Quick menu */}
        <section className="quick-menu">
          {[
            ["🎤", "اجراها", "اجراهای نزدیک"],
            ["🎫", "کنسرت‌ها", "رویدادهای موسیقی"],
            ["👨‍🏫", "مدرس‌ها", "یادگیری موسیقی"],
            ["🏫", "آموزشگاه‌ها", "مکان یادگیری"],
            ["🛒", "فروشگاه", "ساز و تجهیزات"],
            ["🎵", "موسیقی", "آثار و آهنگ‌ها"],
          ].map(([icon, title, text]) => (
            <a href="#" className="quick-card" key={title}>
              <div className="quick-icon">{icon}</div>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
              <b>←</b>
            </a>
          ))}
        </section>

        {/* Online */}
        <section className="section" id="online">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <span className="pulse" />
                همین حالا فعال
              </div>
              <h2>نوازنده‌های آنلاین</h2>
            </div>
            <a href="#">مشاهده همه ←</a>
          </div>

          <div className="online-row">
            {[
              ["🎸", "آرمان", "گیتار"],
              ["🎹", "سارا", "پیانو"],
              ["🥁", "نیما", "درام"],
              ["🎻", "رضا", "ویولن"],
              ["🎷", "مانی", "ساکس"],
              ["🎤", "کیان", "خواننده"],
            ].map(([icon, name, instrument]) => (
              <div className="online-user" key={name}>
                <div className="online-avatar">
                  {icon}
                  <i />
                </div>
                <strong>{name}</strong>
                <span>{instrument}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Instruments */}
        <section className="section" id="instruments">
          <div className="section-heading">
            <div>
              <div className="section-kicker">EXPLORE</div>
              <h2>ساز خودت را پیدا کن</h2>
            </div>
            <a href="#">همه سازها ←</a>
          </div>

          <div className="instrument-grid">
            {instruments.map((item, index) => (
              <a href="#" className="instrument-card" key={item.name}>
                <div className={`instrument-number n-${index + 1}`}>
                  0{index + 1}
                </div>
                <div className="instrument-icon">{item.icon}</div>
                <strong>{item.name}</strong>
                <span>{item.count}</span>
                <b>↗</b>
              </a>
            ))}
          </div>
        </section>

        {/* Top musicians */}
        <section className="section" id="musicians">
          <div className="section-heading">
            <div>
              <div className="section-kicker">TOP RATED</div>
              <h2>بالاترین امتیازها</h2>
            </div>
            <a href="#">مشاهده نوازنده‌ها ←</a>
          </div>

          <div className="musician-grid">
            {musicians.map((musician, index) => (
              <article className="musician-card" key={musician.name}>
                <div className="musician-cover">
                  <div className="cover-glow" />
                  <span>{musician.icon}</span>
                  <div className="rank">#{index + 1}</div>
                  <div className="verified">✓</div>
                </div>

                <div className="musician-info">
                  <div className="name-line">
                    <h3>{musician.name}</h3>
                    <span>★ {musician.rating}</span>
                  </div>

                  <p>{musician.instrument}</p>
                  <small>⌖ {musician.city}</small>

                  <button>مشاهده پروفایل ←</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Collaborations */}
        <section className="section collaboration-section" id="collaborations">
          <div className="section-heading">
            <div>
              <div className="section-kicker">COMMUNITY</div>
              <h2>آخرین مشارکت‌ها</h2>
            </div>
            <a href="#">مشاهده همه ←</a>
          </div>

          <div className="collaboration-list">
            {collaborations.map((item) => (
              <article className="collaboration-card" key={item.title}>
                <div className="collab-icon">{item.icon}</div>

                <div className="collab-content">
                  <h3>{item.title}</h3>
                  <span>{item.meta}</span>

                  <div className="tags">
                    {item.tags.map((tag) => (
                      <i key={tag}>{tag}</i>
                    ))}
                  </div>
                </div>

                <button>مشاهده</button>
              </article>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mission">
          <div className="mission-symbol">♫</div>

          <div>
            <div className="section-kicker">HAMNAVAZ MISSION</div>
            <h2>هیچ صدایی نباید تنها بماند.</h2>
            <p>
              همنواز جایی است برای پیدا کردن آدم‌هایی که موسیقی را مثل تو
              دوست دارند؛ برای یادگیری، همکاری، اجرا و ساختن چیزی ماندگار.
            </p>
          </div>

          <button className="primary-btn">
            به همنواز بپیوند
            <span>←</span>
          </button>
        </section>

      </main>

      {/* Snack navigation */}
      <div className="snack-menu">
        <button className="snack-main">+</button>
        <a href="#discover" title="خانه">⌂</a>
        <a href="#musicians" title="نوازنده‌ها">♬</a>
        <a href="#instruments" title="سازها">🎸</a>
        <a href="#collaborations" title="همکاری">🤝</a>
        <a href="#" title="پروفایل">●</a>
      </div>

      <footer>
        <div className="footer-brand">
          <div className="brand-mark"><span>♫</span></div>
          <strong>همنواز</strong>
        </div>

        <span>ساخته شده برای آدم‌هایی که موسیقی را زندگی می‌کنند.</span>

        <span>© 2026 Hamnavaz</span>
      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
