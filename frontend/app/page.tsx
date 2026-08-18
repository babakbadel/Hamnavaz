const instruments = ["گیتار", "پیانو", "ویولن", "دف", "تار", "سه‌تار"];

const features = [
  { title: "پیدا کردن هم‌نواز", text: "نوازنده مناسب را بر اساس ساز، شهر و سبک موسیقی پیدا کن." },
  { title: "پیدا کردن استاد", text: "برای یادگیری ساز، استاد و مسیر مناسب خودت را پیدا کن." },
  { title: "همکاری موسیقی", text: "برای اجرا، تمرین، گروه و پروژه‌های موسیقی همکار پیدا کن." },
];

export default function HomePage() {
  return (
    <main>
      <nav className="nav container">
        <div className="brand"><span>♪</span> همنواز</div>
        <div className="nav-links">
          <a href="#discover">کشف نوازنده‌ها</a>
          <a href="#how">چطور کار می‌کند؟</a>
          <a className="login" href="#login">ورود / ثبت‌نام</a>
        </div>
      </nav>

      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">موسیقی، وقتی بهتر می‌شود که تنها نباشد</p>
          <h1>هم‌نواز خودت را<br /><span>پیدا کن.</span></h1>
          <p className="lead">نوازنده، استاد، گروه یا فضای مناسب برای تمرین و اجرا را پیدا کن و موسیقی را با آدم‌های مناسب ادامه بده.</p>
          <div className="search-box" id="discover">
            <input aria-label="جستجوی نوازنده" placeholder="مثلاً گیتاریست در تهران..." />
            <button>جستجو</button>
          </div>
          <div className="quick-tags">{instruments.map((item) => <button key={item}>{item}</button>)}</div>
        </div>
        <div className="hero-card">
          <div className="music-orb">♫</div>
          <p>فرصت‌های نزدیک به تو</p>
          <strong>نوازنده‌ها و گروه‌های فعال</strong>
          <div className="mini-profile"><span>🎸</span><div><b>گیتاریست</b><small>تهران · پاپ / راک</small></div><i>فعال</i></div>
          <div className="mini-profile"><span>🥁</span><div><b>درامر</b><small>تهران · جَز / راک</small></div><i>فعال</i></div>
        </div>
      </section>

      <section className="features container" id="how">
        {features.map((feature, index) => <article key={feature.title}><span>0{index + 1}</span><h2>{feature.title}</h2><p>{feature.text}</p></article>)}
      </section>

      <section className="cta container">
        <div><p className="eyebrow">شروع کن</p><h2>موسیقی منتظر همنواز توست.</h2></div>
        <button>ساخت پروفایل موسیقی</button>
      </section>
    </main>
  );
}
