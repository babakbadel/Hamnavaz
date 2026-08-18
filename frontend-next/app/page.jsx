"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  Guitar,
  Heart,
  MapPin,
  Menu,
  Music2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
} from "lucide-react";

const searchModes = [
  {
    id: "city",
    number: "01",
    icon: MapPin,
    title: "براساس شهر",
    text: "همنوازهای نزدیکت را پیدا کن",
    hint: "تهران، اصفهان، شیراز...",
    tone: "gold",
  },
  {
    id: "instrument",
    number: "02",
    icon: Guitar,
    title: "براساس ساز",
    text: "دنبال نوازنده چه سازی هستی؟",
    hint: "گیتار، پیانو، ویولن...",
    tone: "violet",
  },
  {
    id: "online",
    number: "03",
    icon: Wifi,
    title: "براساس آنلاین",
    text: "همین حالا آماده همکاری آنلاین",
    hint: "بدون محدودیت شهر",
    tone: "cyan",
  },
  {
    id: "skill",
    number: "04",
    icon: Sparkles,
    title: "براساس مهارت",
    text: "هم‌سطح خودت را پیدا کن",
    hint: "مبتدی تا حرفه‌ای",
    tone: "rose",
  },
  {
    id: "trust",
    number: "05",
    icon: ShieldCheck,
    title: "براساس اعتبار",
    text: "نوازنده‌های قابل اعتماد را ببین",
    hint: "امتیاز و سابقه همکاری",
    tone: "green",
  },
  {
    id: "combined",
    number: "06",
    icon: SlidersHorizontal,
    title: "جستجوی ترکیبی",
    text: "شهر، ساز، مهارت و اعتبار را با هم انتخاب کن",
    hint: "دقیقاً همان همنواز موردنظرت",
    tone: "gradient",
  },
];

const musicians = [
  { name: "آرمان رضایی", instrument: "گیتار", city: "تهران", level: "متوسط", avatar: "AR", rating: "4.9", collaboration: "5.0", tone: "gold" },
  { name: "سارا نادری", instrument: "ویولن", city: "اصفهان", level: "حرفه‌ای", avatar: "SN", rating: "4.9", collaboration: "4.8", tone: "violet" },
  { name: "کیان مرادی", instrument: "پیانو", city: "شیراز", level: "متوسط", avatar: "KM", rating: "4.8", collaboration: "4.9", tone: "cyan" },
  { name: "مریم احمدی", instrument: "درام", city: "اصفهان", level: "مقدماتی", avatar: "MA", rating: "4.7", collaboration: "5.0", tone: "rose" },
];

const requests = [
  { avatar: "RM", title: "دنبال گیتاریست مبتدی", detail: "اصفهان · تمرین و پیشرفت گروهی", tone: "gold" },
  { avatar: "HN", title: "دنبال نوازنده پیانو", detail: "تهران · سطح متوسط · جَز", tone: "violet" },
  { avatar: "SA", title: "گروه در حال تکمیل", detail: "شیراز · یک درامر برای اجرا", tone: "cyan" },
];

function Avatar({ person, size = "md" }) {
  return <div className={`avatar avatar-${person.tone || "gold"} avatar-${size}`}>{person.avatar}</div>;
}

function Rating({ ordinary, collaboration }) {
  return (
    <div className="ratings">
      <span className="rating ordinary"><Star size={12} fill="currentColor" /> {ordinary}</span>
      <span className="rating collab"><ShieldCheck size={12} /> {collaboration}</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      <a className="see-all" href="#find">مشاهده همه <ChevronLeft size={16} /></a>
    </div>
  );
}

function LiveVisual() {
  const bars = [24, 52, 35, 70, 44, 86, 58, 38, 72, 46, 78, 34, 64, 30, 74, 49, 88, 43, 67, 36];
  return (
    <div className="live-visual">
      <div className="visual-glow glow-one" />
      <div className="visual-glow glow-two" />
      <div className="visual-orbit orbit-a" />
      <div className="visual-orbit orbit-b" />
      <div className="visual-core"><Music2 size={48} /><span>HAMNAVAZ</span></div>
      <div className="floating-note note-one"><Guitar size={22} /></div>
      <div className="floating-note note-two"><Music2 size={22} /></div>
      <div className="floating-note note-three"><Users size={22} /></div>
      <div className="visual-eq">{bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * -0.08}s` }} />)}</div>
      <div className="live-chip"><span /> ۱۲۸۴ نوازنده آنلاین</div>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [activeMode, setActiveMode] = useState("combined");
  const [toast, setToast] = useState("");

  const chooseMode = (mode) => {
    setActiveMode(mode.id);
    const prompts = {
      city: "همنواز در اصفهان",
      instrument: "گیتاریست",
      online: "همنواز آنلاین",
      skill: "همنواز حرفه‌ای",
      trust: "همنواز با امتیاز بالا",
      combined: "همنواز مناسب من",
    };
    setQuery(prompts[mode.id]);
    document.getElementById("search")?.focus();
  };

  const submit = (e) => {
    e.preventDefault();
    setToast(query ? `جست‌وجوی «${query}» آماده است` : "یکی از روش‌های جست‌وجو را انتخاب کن");
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <main className="site" dir="rtl">
      <header className="navbar">
        <div className="nav-inner container">
          <button className="menu-button mobile-only" onClick={() => setMenu(v => !v)} aria-label="باز کردن منو">
            {menu ? <X /> : <Menu />}
          </button>
          <a className="brand" href="#top" aria-label="همنواز">
            <span className="logo-mark"><Music2 size={23} /></span>
            <span><b>همنواز</b><small>HAMNAVAZ</small></span>
          </a>
          <nav className="nav-links" aria-label="ناوبری اصلی">
            <a href="#find">پیدا کردن همنواز</a>
            <a href="#people">آدم‌ها</a>
            <a href="#groups">گروه‌ها</a>
            <a href="#charity">خیریه</a>
            <a href="#teachers">آموزش</a>
          </nav>
          <div className="nav-actions">
            <button className="icon-button" aria-label="رفتن به جست‌وجو" onClick={() => document.getElementById("search")?.focus()}><Search size={18} /></button>
            <a className="gold-button desktop-only" href="#find">شروع کن <ArrowLeft size={16} /></a>
          </div>
        </div>
        {menu && <div className="mobile-menu glass">
          <a href="#find" onClick={() => setMenu(false)}>پیدا کردن همنواز</a>
          <a href="#people" onClick={() => setMenu(false)}>آدم‌های آنلاین</a>
          <a href="#groups" onClick={() => setMenu(false)}>گروه‌ها</a>
          <a href="#charity" onClick={() => setMenu(false)}>اجراهای خیریه</a>
          <a href="#teachers" onClick={() => setMenu(false)}>اساتید</a>
        </div>}
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> یک جامعه زنده برای موسیقی</div>
          <h1>موسیقی وقتی<br /><em>زنده می‌شود</em> که با هم باشیم.</h1>
          <p>همنواز جایی است برای پیدا کردن آدم درست، ساختن گروه، تمرین کردن، یاد گرفتن و رسیدن از اولین نت تا یک اجرای واقعی.</p>
          <form className="search-box glass" onSubmit={submit}>
            <Search size={19} />
            <input id="search" value={query} onChange={e => setQuery(e.target.value)} aria-label="جست‌وجوی همنواز" placeholder="مثلاً گیتاریست مبتدی در اصفهان" />
            <button type="submit">پیدا کن <ArrowLeft size={16} /></button>
          </form>
          <div className="quick-links">
            <button type="button" onClick={() => setQuery("گیتاریست در اصفهان")}>گیتاریست در اصفهان</button>
            <button type="button" onClick={() => setQuery("گروه جَز در تهران")}>گروه جَز در تهران</button>
            <button type="button" onClick={() => setQuery("استاد پیانو")}>استاد پیانو</button>
          </div>
          {toast && <div className="toast" role="status">{toast}</div>}
        </div>
        <LiveVisual />
      </section>

      <section className="stats container" aria-label="آمار همنواز">
        <div><b>۱٬۲۸۴</b><span>نوازنده آنلاین</span></div>
        <div><b>۸۶</b><span>گروه در حال شکل‌گیری</span></div>
        <div><b>۲۴</b><span>اجرای پیش‌رو</span></div>
        <div><b>۳۱۲</b><span>همکاری موفق</span></div>
      </section>

      <section id="find" className="section search-methods container">
        <SectionTitle eyebrow="FIND YOUR MATCH" title={<>این بار، <em>خودِ جست‌وجو</em> را انتخاب کن.</>} text="هر مسیری که راحت‌تری را انتخاب کن؛ همنواز فیلتر مناسب همان مسیر را برایت می‌سازد." />
        <div className="search-method-grid">
          {searchModes.map(mode => {
            const Icon = mode.icon;
            const active = activeMode === mode.id;
            return (
              <button key={mode.id} type="button" className={`search-method-card tone-${mode.tone} ${active ? "is-active" : ""} ${mode.id === "combined" ? "combined-card" : ""}`} onClick={() => chooseMode(mode)} aria-pressed={active}>
                <span className="method-number">{mode.number}</span>
                <span className="method-icon"><Icon size={23} strokeWidth={1.8} /></span>
                <span className="method-copy"><strong>{mode.title}</strong><span>{mode.text}</span><small>{mode.hint}</small></span>
                <span className="method-arrow"><ArrowLeft size={17} /></span>
              </button>
            );
          })}
        </div>
        <div className="active-search-bar glass">
          <div className="active-search-info"><span className="active-dot" /><div><small>مسیر انتخاب‌شده</small><strong>{searchModes.find(x => x.id === activeMode)?.title}</strong></div></div>
          <div className="active-search-summary">{query || "هنوز چیزی انتخاب نشده"}</div>
          <a href="#people" className="gold-button">نمایش نتایج <ArrowLeft size={16} /></a>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionTitle eyebrow="START HERE" title={<>از یک نفر شروع کن، <em>به موسیقی برس.</em></>} text="همنواز فقط جست‌وجو نیست؛ یک مسیر برای تبدیل آشنایی به همکاری واقعی است." />
          <div className="feature-grid">
            <article className="feature-card accent-gold"><span>01</span><Music2 /><h3>همنواز پیدا کن</h3><p>ساز، شهر، سبک و سطح مهارت را مشخص کن و آدم مناسب را پیدا کن.</p></article>
            <article className="feature-card accent-violet"><span>02</span><Users /><h3>گروه بساز</h3><p>آدم‌هایی را پیدا کن که با مسیر موسیقی تو هم‌جهت‌اند.</p></article>
            <article className="feature-card accent-rose"><span>03</span><Heart /><h3>برای یک دلیل خوب اجرا کن</h3><p>گروه شکل بگیرد، اجرا کنید و موسیقی را به یک خاطره خوب تبدیل کنید.</p></article>
          </div>
        </div>
      </section>

      <section id="people" className="section container">
        <SectionTitle eyebrow="PEOPLE IN THE FLOW" title={<>آدم‌هایی که همین حالا <em>اینجا هستند.</em></>} text="پروفایل‌ها فقط کارت نیستند؛ شروع یک ارتباط‌اند." />
        <div className="people-grid">{musicians.map(m => <article className="person-card glass" key={m.name}>
          <div className="person-top"><div className="online-status"><span /> آنلاین</div><button className="dots" aria-label="گزینه‌های بیشتر">•••</button></div>
          <div className="person-main"><Avatar person={m} size="lg" /><div><h3>{m.name}</h3><p>{m.instrument} · {m.level}</p><small><MapPin size={12} /> {m.city}</small></div></div>
          <Rating ordinary={m.rating} collaboration={m.collaboration} />
          <div className="person-footer"><span>دنبال همنواز</span><a href="#find">مشاهده پروفایل <ChevronLeft size={15} /></a></div>
        </article>)}</div>
      </section>

      <section id="teachers" className="section section-soft">
        <div className="container">
          <SectionTitle eyebrow="TEACHERS" title={<>اساتید برتر و <em>آنلاین</em></>} text="کسی که مسیر را بلد است، پیدا کردنش باید ساده باشد." />
          <div className="teacher-row">
            {[
              { name: "امیر کریمی", instrument: "گیتار کلاسیک", city: "تهران", avatar: "AK", rating: "4.9" },
              { name: "نگار موسوی", instrument: "پیانو", city: "اصفهان", avatar: "NM", rating: "5.0" },
              { name: "سامان فرهادی", instrument: "ساز ایرانی", city: "شیراز", avatar: "SF", rating: "4.8" },
            ].map(t => <article className="teacher-card" key={t.name}><Avatar person={{ ...t, tone: "violet" }} size="md" /><div><b>{t.name}</b><span>{t.instrument}</span><small>{t.city} · آنلاین</small></div><span className="teacher-star"><Star size={13} fill="currentColor" /> {t.rating}</span></article>)}
          </div>
        </div>
      </section>

      <section id="groups" className="section section-dark">
        <div className="container">
          <SectionTitle eyebrow="LOOKING FOR SOMEONE" title={<>هر گروه، یک <em>جای خالی</em> دارد.</>} text="شاید همین حالا یک نفر در شهر تو منتظر ساز تو باشد." />
          <div className="request-grid">{requests.map(r => <article className={`request-card glass ${r.tone}`} key={r.title}><Avatar person={{ avatar: r.avatar, tone: r.tone }} size="sm" /><div><h3>{r.title}</h3><p>{r.detail}</p></div><a href="#find" aria-label={`مشاهده ${r.title}`}><ArrowLeft size={17} /></a></article>)}</div>
        </div>
      </section>

      <section id="charity" className="charity container">
        <div className="charity-main"><div className="eyebrow"><Heart size={16} /> MUSIC × HUMANITY</div><h2>یک گروه شکل بگیرد،<br /><em>یک اجرای ماندگار.</em></h2><p>گروه‌های همنواز می‌توانند برای مؤسسات خیریه، سالمندان، بیماران و مراکز حمایتی اجرا داشته باشند. موسیقی می‌تواند یک تجربه مشترک واقعی بسازد.</p><a className="gold-button" href="#groups">گروه‌های در حال شکل‌گیری <ArrowLeft size={16} /></a></div>
        <div className="charity-art"><Sparkles size={28} /><div className="charity-orbit"><Heart size={28} fill="currentColor" /></div><span>یک نت<br />یک گروه<br />یک اثر</span></div>
      </section>

      <section className="section container">
        <SectionTitle eyebrow="TRUST & COLLABORATION" title={<>امتیاز فقط یک عدد <em>نیست.</em></>} text="دو نگاه متفاوت به تجربه یک نوازنده." />
        <div className="rating-explain">
          <div><span className="big-star gold"><Star size={25} fill="currentColor" /></span><div><h3>امتیاز معمولی</h3><p>نظر و تجربه کاربران درباره پروفایل، مهارت و حضور فرد در جامعه.</p></div></div>
          <div><span className="big-star violet"><ShieldCheck size={25} /></span><div><h3>امتیاز همکاری</h3><p>امتیازی که بعد از یک همکاری واقعی ثبت می‌شود و اعتماد را دقیق‌تر نشان می‌دهد.</p></div></div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner"><div><a className="brand" href="#top"><span className="logo-mark"><Music2 size={21} /></span><span><b>همنواز</b><small>HAMNAVAZ</small></span></a><p>آدم درست را برای موسیقی درست پیدا کن.</p></div><div className="footer-links"><a href="#find">پیدا کردن همنواز</a><a href="#people">نوازنده‌ها</a><a href="#groups">گروه‌ها</a><a href="#charity">خیریه</a></div><div className="footer-copy">© همنواز · موسیقی را تنها اجرا نکن.</div></div>
      </footer>

      <style jsx global>{`
        :root{--bg:#070d18;--panel:#0d1524;--panel2:#111c2d;--text:#f5f7fb;--muted:#8e9bad;--gold:#e7b451;--violet:#9d8cff;--cyan:#5ed5e8;--rose:#ff7fa9;--green:#67d49a;--line:rgba(255,255,255,.08)}
        *{box-sizing:border-box}.site{min-height:100vh;background:#f7f8fb;color:#162033;font-family:var(--font-sans,Arial,sans-serif)}
        .site a{text-decoration:none;color:inherit}.container{width:min(1180px,92%);margin-inline:auto}.mobile-only{display:none}
        .navbar{position:sticky;top:0;z-index:50;background:rgba(7,13,24,.82);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.06);color:#fff}.nav-inner{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;align-items:center;gap:10px;color:#fff}.brand>b,.brand span b{font-weight:900}.brand span:last-child{display:flex;flex-direction:column;line-height:1}.brand small{font-size:8px;letter-spacing:2px;color:#7e8a9c;margin-top:5px}.logo-mark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#f4ca70,#b97818);color:#111827;box-shadow:0 8px 25px rgba(231,180,81,.2)}
        .nav-links{display:flex;gap:25px}.nav-links a{font-size:12px;color:#aeb8c7;transition:.2s}.nav-links a:hover{color:#fff}.nav-actions{display:flex;align-items:center;gap:10px}.icon-button,.menu-button{width:42px;height:42px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.04);color:#fff;display:grid;place-items:center;cursor:pointer}.gold-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--gold);color:#101827!important;border:0;border-radius:11px;padding:12px 17px;font-size:11px;font-weight:800;min-height:44px}.mobile-menu{position:absolute;left:4%;right:4%;top:70px;padding:12px;border:1px solid var(--line);display:grid;gap:5px}.mobile-menu a{padding:14px;border-radius:10px;color:#fff}.mobile-menu a:hover{background:rgba(255,255,255,.06)}
        .hero{min-height:650px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:30px;background:radial-gradient(circle at 75% 35%,rgba(120,87,220,.12),transparent 30%),#070d18;color:#fff;padding-top:50px;padding-bottom:60px;position:relative}.hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,black,transparent);pointer-events:none}.hero-copy{position:relative;z-index:2}.eyebrow{font-size:10px;letter-spacing:1.5px;color:var(--gold);font-weight:800;display:flex;align-items:center;gap:8px}.live-dot{width:7px;height:7px;background:#62df9b;border-radius:50%;box-shadow:0 0 0 5px rgba(98,223,155,.08)}.hero h1{font-size:clamp(45px,6vw,76px);line-height:1.07;letter-spacing:-2px;margin:20px 0;font-weight:950}.hero h1 em,.section-title em,.charity h2 em{font-style:normal;color:var(--gold)}.hero p{max-width:630px;color:#aeb8c7;line-height:2;font-size:14px}.glass{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);box-shadow:0 20px 70px rgba(0,0,0,.18);backdrop-filter:blur(14px)}.search-box{display:flex;align-items:center;gap:10px;padding:6px 6px 6px 16px;border-radius:15px;max-width:670px;margin-top:25px;color:#8d99aa}.search-box input{min-width:0;flex:1;background:transparent;border:0;outline:0;color:#fff;font:inherit;font-size:12px;height:48px}.search-box input::placeholder{color:#687588}.search-box button{border:0;background:var(--gold);color:#111827;border-radius:11px;min-height:48px;padding:0 20px;font-family:inherit;font-weight:800;display:flex;align-items:center;gap:7px;cursor:pointer}.quick-links{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px}.quick-links button{border:1px solid rgba(255,255,255,.09);background:transparent;color:#8895a7;border-radius:30px;padding:8px 11px;font:inherit;font-size:9px;cursor:pointer}.quick-links button:hover{color:#fff;border-color:rgba(231,180,81,.35)}.toast{margin-top:12px;display:inline-block;padding:10px 13px;border-radius:10px;background:#101b2a;border:1px solid rgba(231,180,81,.22);font-size:10px;color:#e9edf3}
        .live-visual{min-height:470px;position:relative;display:grid;place-items:center}.visual-glow{position:absolute;border-radius:50%;filter:blur(50px);opacity:.4}.glow-one{width:220px;height:220px;background:#7659db;right:18%;top:22%}.glow-two{width:160px;height:160px;background:#e7b451;left:17%;bottom:20%}.visual-orbit{position:absolute;border:1px solid rgba(255,255,255,.08);border-radius:50%;transform:rotate(-18deg)}.orbit-a{width:390px;height:210px}.orbit-b{width:260px;height:410px;transform:rotate(62deg)}.visual-core{width:155px;height:155px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(circle at 35% 30%,#26365c,#0d1525 65%);border:1px solid rgba(231,180,81,.35);box-shadow:0 0 70px rgba(231,180,81,.14),inset 0 0 40px rgba(255,255,255,.04);color:var(--gold);z-index:2}.visual-core span{font-size:8px;letter-spacing:3px;color:#77859a}.floating-note{position:absolute;width:56px;height:56px;border-radius:17px;display:grid;place-items:center;background:#111d30;border:1px solid rgba(255,255,255,.09);color:#fff;box-shadow:0 15px 35px rgba(0,0,0,.2);z-index:3;animation:float 4s ease-in-out infinite}.note-one{right:8%;top:25%;color:var(--gold)}.note-two{left:12%;top:39%;color:var(--violet);animation-delay:-1.2s}.note-three{right:18%;bottom:17%;color:var(--cyan);animation-delay:-2.1s}.visual-eq{position:absolute;bottom:14%;left:50%;transform:translateX(-50%);width:210px;height:50px;display:flex;align-items:end;justify-content:center;gap:4px;opacity:.65}.visual-eq i{width:5px;border-radius:4px;background:linear-gradient(to top,var(--gold),rgba(157,140,255,.5));animation:eq 1.2s ease-in-out infinite alternate}.live-chip{position:absolute;right:3%;bottom:4%;padding:9px 12px;border-radius:30px;background:#101b2a;border:1px solid rgba(255,255,255,.08);font-size:9px;color:#aab5c4}.live-chip span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#67d49a;margin-left:6px;box-shadow:0 0 0 4px rgba(103,212,154,.08)}@keyframes float{50%{transform:translateY(-10px) rotate(2deg)}}@keyframes eq{to{transform:scaleY(.35)}}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border:1px solid #e9edf3;border-radius:18px;margin-top:-28px;position:relative;z-index:5;box-shadow:0 20px 60px rgba(20,31,50,.08)}.stats div{padding:23px;text-align:center;border-left:1px solid #edf0f5}.stats div:last-child{border-left:0}.stats b{display:block;font-size:24px;color:#101827}.stats span{display:block;color:#8c97a7;font-size:9px;margin-top:5px}
        .section{padding:92px 0}.section-dark{background:#0a1220;color:#fff}.section-soft{background:#f1f3f7}.section-title{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:30px}.section-title h2{font-size:32px;line-height:1.25;margin:8px 0 0;font-weight:950;letter-spacing:-.8px}.section-title p{max-width:580px;color:#8792a2;font-size:11px;line-height:1.9;margin:8px 0 0}.section-dark .section-title p{color:#778498}.see-all{display:flex;align-items:center;gap:5px;color:#9a6d17!important;font-size:10px;font-weight:800;white-space:nowrap}
        .search-methods{padding-top:100px}.search-method-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.search-method-card{position:relative;min-height:205px;text-align:right;padding:25px;border-radius:20px;border:1px solid #e5eaf1;background:#fff;color:#152033;cursor:pointer;overflow:hidden;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.search-method-card:before{content:"";position:absolute;inset:auto -25% -55% 20%;height:180px;background:radial-gradient(circle,var(--accent),transparent 65%);opacity:.07;transition:.25s}.search-method-card:hover,.search-method-card:focus-visible{transform:translateY(-5px);border-color:color-mix(in srgb,var(--accent),#fff 55%);box-shadow:0 20px 55px rgba(20,31,50,.11);outline:none}.search-method-card.is-active{border-color:var(--accent);box-shadow:0 18px 50px color-mix(in srgb,var(--accent),transparent 84%)}.search-method-card.is-active:after{content:"";position:absolute;right:0;top:0;bottom:0;width:3px;background:var(--accent)}.method-number{position:absolute;top:20px;left:21px;font-size:9px;color:#a2acba;letter-spacing:1px}.method-icon{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;background:color-mix(in srgb,var(--accent),white 88%);color:var(--accent);margin-bottom:24px}.method-copy{display:flex;flex-direction:column;gap:6px}.method-copy strong{font-size:17px}.method-copy span{font-size:11px;color:#536176}.method-copy small{font-size:9px;color:#a0a9b6}.method-arrow{position:absolute;bottom:22px;left:22px;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#f4f6f9;color:#697587;transition:.2s}.search-method-card:hover .method-arrow,.search-method-card.is-active .method-arrow{background:var(--accent);color:#fff}.tone-gold{--accent:var(--gold)}.tone-violet{--accent:var(--violet)}.tone-cyan{--accent:var(--cyan)}.tone-rose{--accent:var(--rose)}.tone-green{--accent:var(--green)}.tone-gradient{--accent:#b18cff;background:linear-gradient(135deg,#111827,#18233a);color:#fff;border-color:rgba(177,140,255,.28);grid-column:span 2}.tone-gradient .method-copy span{color:#c0c8d5}.tone-gradient .method-copy small{color:#8996aa}.tone-gradient .method-icon{background:rgba(177,140,255,.13)}.tone-gradient .method-arrow{background:rgba(255,255,255,.08);color:#fff}.active-search-bar{margin-top:14px;padding:12px 14px;border-radius:15px;display:flex;align-items:center;gap:15px;background:#0d1625;color:#fff}.active-search-info{display:flex;align-items:center;gap:9px;min-width:170px}.active-search-info small{display:block;color:#768398;font-size:8px}.active-search-info strong{display:block;font-size:11px;margin-top:3px}.active-dot{width:7px;height:7px;background:var(--green);border-radius:50%;box-shadow:0 0 0 5px rgba(103,212,154,.08)}.active-search-summary{flex:1;color:#b9c2ce;font-size:10px}.active-search-bar .gold-button{margin-right:auto}
        .feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.feature-card{position:relative;min-height:255px;padding:28px;border-radius:20px;background:#101a2a;border:1px solid rgba(255,255,255,.07);overflow:hidden}.feature-card:before{content:"";position:absolute;width:160px;height:160px;left:-50px;bottom:-70px;background:var(--accent);filter:blur(55px);opacity:.12}.feature-card>span{font-size:9px;color:#68758a}.feature-card svg{display:block;margin:28px 0 18px;color:var(--accent)}.feature-card h3{font-size:19px;margin:0 0 8px}.feature-card p{font-size:10px;line-height:1.9;color:#8995a8}.accent-gold{--accent:var(--gold)}.accent-violet{--accent:var(--violet)}.accent-rose{--accent:var(--rose)}
        .people-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.person-card{border-radius:18px;padding:18px;background:#fff;border:1px solid #e8edf3;box-shadow:0 14px 40px rgba(20,31,50,.05);color:#152033}.person-top,.person-footer{display:flex;align-items:center;justify-content:space-between}.online-status{font-size:8px;color:#48a877;display:flex;align-items:center;gap:5px}.online-status span{width:6px;height:6px;background:#62d698;border-radius:50%}.dots{border:0;background:transparent;color:#9ca6b4;cursor:pointer}.person-main{display:flex;align-items:center;gap:11px;margin:23px 0}.person-main h3{font-size:14px;margin:0 0 5px}.person-main p{font-size:9px;color:#667286;margin:0 0 7px}.person-main small{font-size:8px;color:#98a2af;display:flex;align-items:center;gap:3px}.avatar{display:grid;place-items:center;font-weight:900;flex:0 0 auto}.avatar-lg{width:55px;height:55px;border-radius:17px;font-size:12px}.avatar-md{width:48px;height:48px;border-radius:14px;font-size:11px}.avatar-sm{width:40px;height:40px;border-radius:12px;font-size:10px}.avatar-gold{background:#f8ecd2;color:#a8741b}.avatar-violet{background:#eeeafd;color:#7566cf}.avatar-cyan{background:#ddf4f7;color:#348e9e}.avatar-rose{background:#ffe5ed;color:#c75d7d}.avatar-green{background:#e2f5eb;color:#3e9d6d}.ratings{display:flex;gap:7px;padding:11px 0;border-top:1px solid #edf0f4;border-bottom:1px solid #edf0f4}.rating{font-size:8px;display:flex;align-items:center;gap:3px}.ordinary{color:#b57c1c}.collab{color:#7164c8}.person-footer{padding-top:12px}.person-footer>span{font-size:8px;color:#8c96a5}.person-footer a{font-size:9px;color:#8c651c;display:flex;align-items:center;gap:2px}
        .teacher-row{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.teacher-card{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e7ebf1;border-radius:16px;padding:15px}.teacher-card>div:nth-child(2){flex:1}.teacher-card b,.teacher-card span,.teacher-card small{display:block}.teacher-card b{font-size:11px}.teacher-card div span{font-size:9px;color:#687589;margin-top:4px}.teacher-card small{font-size:8px;color:#98a2b0;margin-top:5px}.teacher-star{color:#b57c1c;font-size:9px;display:flex!important;align-items:center;gap:3px;white-space:nowrap}
        .request-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.request-card{padding:17px;border-radius:17px;display:flex;align-items:center;gap:12px}.request-card>div:nth-child(2){flex:1}.request-card h3{font-size:12px;margin:0 0 5px}.request-card p{font-size:8px;color:#7f8b9d;margin:0}.request-card>a{width:38px;height:38px;display:grid;place-items:center;border-radius:11px;background:rgba(255,255,255,.06);color:#fff}.request-card.gold{--accent:var(--gold)}.request-card.violet{--accent:var(--violet)}.request-card.cyan{--accent:var(--cyan)}.request-card{border-color:color-mix(in srgb,var(--accent),transparent 84%)}
        .charity{margin-top:92px;margin-bottom:92px;border-radius:25px;min-height:420px;padding:55px;display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:30px;background:radial-gradient(circle at 78% 45%,rgba(157,140,255,.2),transparent 30%),linear-gradient(135deg,#0b1422,#121b2d);color:#fff;overflow:hidden}.charity h2{font-size:42px;line-height:1.2;margin:15px 0}.charity p{max-width:610px;color:#9ba8ba;font-size:11px;line-height:2;margin-bottom:22px}.charity-art{height:280px;position:relative;display:grid;place-items:center;color:var(--gold)}.charity-orbit{width:150px;height:150px;border:1px solid rgba(231,180,81,.3);border-radius:50%;display:grid;place-items:center;box-shadow:0 0 70px rgba(231,180,81,.1)}.charity-art>span{position:absolute;bottom:5%;right:5%;font-size:10px;line-height:2;color:#768499}.rating-explain{display:grid;grid-template-columns:1fr 1fr;gap:14px}.rating-explain>div{display:flex;gap:15px;padding:25px;border:1px solid #e6eaf0;border-radius:18px;background:#fff}.big-star{width:55px;height:55px;border-radius:16px;display:grid;place-items:center;flex:0 0 auto}.big-star.gold{background:#faefd9;color:#b47c1b}.big-star.violet{background:#eeeafd;color:#7667cc}.rating-explain h3{font-size:15px;margin:0 0 7px}.rating-explain p{font-size:10px;line-height:1.9;color:#7f8a9a;margin:0}
        .footer{background:#070d18;color:#fff;padding:45px 0 25px}.footer-inner{display:grid;grid-template-columns:1.3fr 1fr auto;align-items:end;gap:30px}.footer p{font-size:10px;color:#667386;margin:13px 0 0}.footer-links{display:flex;gap:18px;flex-wrap:wrap}.footer-links a{font-size:9px;color:#8792a3}.footer-copy{font-size:8px;color:#586578;white-space:nowrap}
        @media(max-width:1000px){.hero{grid-template-columns:1fr}.live-visual{min-height:390px}.nav-links{display:none}.mobile-only{display:grid}.desktop-only{display:none}.search-method-grid{grid-template-columns:repeat(2,1fr)}.tone-gradient{grid-column:span 2}.people-grid{grid-template-columns:repeat(2,1fr)}.teacher-row,.request-grid{grid-template-columns:1fr}.footer-inner{grid-template-columns:1fr 1fr}}
        @media(max-width:650px){.nav-inner{height:68px}.hero{padding-top:55px}.hero h1{font-size:45px;letter-spacing:-1.2px}.live-visual{min-height:340px}.visual-orbit{transform:scale(.8)}.stats{grid-template-columns:repeat(2,1fr);margin-top:-15px}.stats div:nth-child(2){border-left:0}.stats div{border-bottom:1px solid #edf0f5}.section{padding:65px 0}.section-title{display:block}.section-title h2{font-size:27px}.see-all{margin-top:12px}.search-method-grid{grid-template-columns:1fr}.tone-gradient{grid-column:auto}.search-method-card{min-height:180px}.active-search-bar{flex-wrap:wrap}.active-search-summary{width:100%;flex:0 0 100%;order:3}.active-search-bar .gold-button{margin-right:0}.feature-grid,.people-grid,.rating-explain{grid-template-columns:1fr}.charity{margin:60px auto;padding:32px;grid-template-columns:1fr}.charity h2{font-size:34px}.charity-art{min-height:220px}.footer-inner{grid-template-columns:1fr}.footer-copy{white-space:normal}.footer-links{margin-top:10px}}
        @media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
      `}</style>
    </main>
  );
}
