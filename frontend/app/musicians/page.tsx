"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Musician, searchMusicians } from "../../lib/api";

const filters = [
  ["همه سازها", "ساز"],
  ["همه شهرها", "شهر"],
  ["همه سبک‌ها", "سبک"],
] as const;

export default function MusiciansPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("همه سازها");

  async function runSearch(term = q) {
    setLoading(true);
    setError("");
    try {
      setItems((await searchMusicians({ q: term, limit: 30 })).results);
    } catch {
      setError("ارتباط با سرور برقرار نشد. Backend را اجرا کنید.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const term = new URLSearchParams(window.location.search).get("q") || "";
    setQ(term);
    if (term) void runSearch(term);
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    window.history.replaceState(null, "", term ? `/musicians?q=${encodeURIComponent(term)}` : "/musicians");
    void runSearch(term);
  }

  return (
    <main className="musicians-page">
      <div className="musicians-wrap">
        <header className="musicians-topbar">
          <Link href="/" className="mini-brand"><b>♪</b><span>همنواز</span></Link>
          <Link href="/" className="back-home">خانه <span>←</span></Link>
        </header>

        <section className="discover-hero">
          <div className="hero-copy">
            <p className="eyebrow">DISCOVER • HAMNAVAZ</p>
            <h1>هم‌نواز بعدی<br /><span>تو کیه؟</span></h1>
            <p className="hero-lead">نوازنده‌ها، مدرس‌ها و آدم‌های هم‌مسیر موسیقی را برای تمرین، اجرا و همکاری پیدا کن.</p>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <span>♫</span><i>♪</i><em>♬</em>
          </div>
        </section>

        <section className="search-panel" aria-label="جستجوی نوازندگان">
          <form onSubmit={submit}>
            <div className="search-input-wrap">
              <span>⌕</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="نام، ساز، شهر یا سبک موسیقی..." aria-label="جستجوی نوازنده" />
              {q && <button type="button" className="clear" onClick={() => { setQ(""); window.history.replaceState(null, "", "/musicians"); void runSearch(""); }}>×</button>}
            </div>
            <button className="search-button" type="submit" disabled={loading}>{loading ? "در حال جستجو…" : "پیدا کن"}</button>
          </form>
          <div className="filter-row">
            {filters.map(([label, icon]) => (
              <button key={label} type="button" className={activeFilter === label ? "filter active" : "filter"} onClick={() => setActiveFilter(label)}>
                <span>{icon}</span>{label}<b>⌄</b>
              </button>
            ))}
            <button type="button" className="online-filter"><span>●</span> فقط آنلاین</button>
          </div>
        </section>

        {error && <div className="error-box">{error}</div>}

        <section className="results-section">
          <div className="results-head">
            <div><p className="eyebrow">MUSIC COMMUNITY</p><h2>{items.length ? `${items.length} نتیجه برای تو` : "نوازنده‌های همنواز"}</h2></div>
            <span className="status"><i /> فعال در همنواز</span>
          </div>

          <div className="results-grid">
            {items.map(m => (
              <Link className="musician-card" key={m.id} href={`/musicians/${m.user_id}`}>
                <div className="card-avatar">{m.avatar_url ? <img src={m.avatar_url} alt="" /> : <span>♪</span>}</div>
                <div className="card-body">
                  <div className="name-row"><h3>{m.display_name}</h3>{m.is_verified && <span className="verified">✓ تأییدشده</span>}</div>
                  <p className="location">⌖ {m.city_name || m.city || "شهر ثبت نشده"}</p>
                  <p className="bio">{m.bio || "برای مشاهده پروفایل و اطلاعات همکاری وارد شوید."}</p>
                </div>
                <span className="card-arrow">←</span>
              </Link>
            ))}
          </div>

          {!loading && !items.length && !error && (
            <div className="empty-state">
              <div className="empty-note">♫</div>
              <h3>هنوز جستجو نکرده‌ای</h3>
              <p>یک نام، ساز یا شهر وارد کن تا همنوازهای مناسب را پیدا کنیم.</p>
              <button onClick={() => { setQ(""); void runSearch(""); }}>نمایش همه نوازنده‌ها</button>
            </div>
          )}
        </section>

        <section className="bottom-cta">
          <div><p className="eyebrow">YOUR MUSIC, YOUR PEOPLE</p><h2>همنواز خودت را پیدا نکردی؟</h2><p>پروفایل خودت را بساز تا دیگران هم بتوانند تو را پیدا کنند.</p></div>
          <Link href="/auth/register">ساخت پروفایل <span>←</span></Link>
        </section>
      </div>

      <style jsx>{`
        .musicians-page{min-height:100vh;background:radial-gradient(circle at 82% 5%,rgba(37,59,91,.3),transparent 31%),#070d18;color:#f5f2ea;padding-bottom:80px}.musicians-wrap{width:min(1120px,calc(100% - 32px));margin:auto}.musicians-topbar{height:76px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.055)}.mini-brand{display:flex;align-items:center;gap:8px;font-weight:900;font-size:21px}.mini-brand b{color:#d9b45b;font-size:26px}.back-home{color:#8f9aac;font-size:12px}.back-home span{color:#d9b45b;margin-right:6px}.discover-hero{min-height:330px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden}.eyebrow{margin:0;color:#d9b45b;font-size:10px;font-weight:900;letter-spacing:.13em}.hero-copy{position:relative;z-index:2}.hero-copy h1{font-family:Estedad,Vazirmatn,sans-serif;font-size:clamp(45px,7vw,74px);line-height:1.08;letter-spacing:-.05em;margin:15px 0}.hero-copy h1 span{color:#d9b45b}.hero-lead{max-width:570px;color:#9ca8ba;line-height:2;font-size:15px}.hero-orbit{width:300px;height:300px;border:1px solid rgba(217,180,91,.13);border-radius:50%;position:relative;margin-left:45px;flex:none;background:radial-gradient(circle,rgba(31,49,75,.42),transparent 66%);box-shadow:inset 0 0 80px rgba(217,180,91,.025)}.hero-orbit:before,.hero-orbit:after{content:"";position:absolute;border:1px solid rgba(255,255,255,.055);border-radius:50%;inset:38px}.hero-orbit:after{inset:82px}.hero-orbit span,.hero-orbit i,.hero-orbit em{position:absolute;color:#d9b45b;font-style:normal}.hero-orbit span{font-size:70px;top:105px;right:105px}.hero-orbit i{font-size:35px;top:35px;left:65px}.hero-orbit em{font-size:42px;bottom:55px;right:42px}.search-panel{padding:18px;background:rgba(11,19,32,.88);border:1px solid rgba(255,255,255,.075);border-radius:22px;box-shadow:0 28px 80px rgba(0,0,0,.25);position:relative;z-index:3}.search-panel form{display:grid;grid-template-columns:1fr 120px;gap:10px}.search-input-wrap{display:flex;align-items:center;background:#080f1a;border:1px solid #263144;border-radius:14px;padding:0 15px}.search-input-wrap>span{font-size:24px;color:#d9b45b}.search-input-wrap input{width:100%;border:0;outline:0;background:transparent;color:#fff;padding:14px 10px;font-size:14px}.clear{border:0;background:transparent;color:#7d899c;font-size:20px;cursor:pointer}.search-button{border:0;border-radius:14px;background:#d9b45b;color:#11151c;font-weight:900;cursor:pointer}.search-button:disabled{opacity:.7}.filter-row{display:flex;gap:8px;margin-top:10px;overflow:auto;scrollbar-width:none}.filter-row::-webkit-scrollbar{display:none}.filter,.online-filter{height:38px;white-space:nowrap;border:1px solid #263144;background:#0c1523;color:#aeb7c5;border-radius:11px;padding:0 12px;cursor:pointer;font-size:11px}.filter span{color:#d9b45b;margin-left:7px}.filter b{margin-right:10px;color:#69768a}.filter.active{border-color:rgba(217,180,91,.45);color:#e9dfc9;background:#111b2a}.online-filter{margin-right:auto}.online-filter span{color:#79b987;font-size:8px;margin-left:7px}.error-box{margin-top:16px;border:1px solid rgba(220,100,100,.25);background:#21151a;color:#dba6aa;border-radius:13px;padding:13px;font-size:12px}.results-section{padding:65px 0 35px}.results-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:22px}.results-head h2{font-family:Estedad,Vazirmatn,sans-serif;font-size:29px;margin:8px 0 0;letter-spacing:-.03em}.status{font-size:11px;color:#7f8c9f;display:flex;align-items:center;gap:7px}.status i{width:7px;height:7px;border-radius:50%;background:#79b987;box-shadow:0 0 12px rgba(121,185,135,.4)}.results-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.musician-card{min-height:124px;display:flex;align-items:center;gap:14px;padding:16px;background:linear-gradient(145deg,#0c1421,#0a111c);border:1px solid rgba(255,255,255,.065);border-radius:19px;transition:.2s}.musician-card:hover{transform:translateY(-2px);border-color:rgba(217,180,91,.3);box-shadow:0 18px 42px rgba(0,0,0,.25)}.card-avatar{width:70px;height:70px;flex:none;display:grid;place-items:center;border-radius:18px;overflow:hidden;background:linear-gradient(145deg,#17263c,#0e1725);border:1px solid rgba(217,180,91,.15);color:#d9b45b;font-size:32px}.card-avatar img{width:100%;height:100%;object-fit:cover}.card-body{min-width:0;flex:1}.name-row{display:flex;align-items:center;gap:8px}.name-row h3{font-size:16px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.verified{font-size:8px;color:#d9b45b;border:1px solid rgba(217,180,91,.25);border-radius:7px;padding:3px 5px;white-space:nowrap}.location{color:#9ca8ba;font-size:11px;margin:7px 0 4px}.bio{color:#69778b;font-size:10px;line-height:1.7;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.card-arrow{color:#d9b45b;font-size:20px;margin-right:auto}.empty-state{border:1px dashed #2b394d;border-radius:22px;padding:45px 20px;text-align:center;background:rgba(10,17,28,.55)}.empty-note{color:#d9b45b;font-size:44px}.empty-state h3{margin:10px 0 7px;font-size:18px}.empty-state p{margin:0 auto 18px;color:#778397;font-size:12px}.empty-state button{border:1px solid rgba(217,180,91,.4);background:transparent;color:#d9b45b;border-radius:11px;padding:10px 16px;cursor:pointer;font-weight:800;font-size:11px}.bottom-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 30px;border:1px solid rgba(217,180,91,.18);border-radius:22px;background:linear-gradient(110deg,#15140f,#0b1421)}.bottom-cta h2{font-family:Estedad,Vazirmatn,sans-serif;margin:8px 0 4px;font-size:22px}.bottom-cta p:last-child{color:#7f8c9f;font-size:11px;margin:0}.bottom-cta>a{background:#d9b45b;color:#10131b;border-radius:11px;padding:12px 17px;font-size:11px;font-weight:900;white-space:nowrap}.bottom-cta>a span{margin-right:7px}
        @media(max-width:800px){.discover-hero{min-height:280px}.hero-orbit{width:210px;height:210px;margin-left:-40px;margin-right:-25px;opacity:.75}.hero-orbit:before{inset:28px}.hero-orbit:after{inset:58px}.hero-orbit span{font-size:48px;top:76px;right:76px}.hero-orbit i{font-size:25px;top:27px;left:45px}.hero-orbit em{font-size:30px;bottom:38px;right:27px}.hero-copy h1{font-size:49px}.hero-lead{font-size:13px;max-width:400px}.results-grid{grid-template-columns:1fr}.bottom-cta{display:block}.bottom-cta>a{display:inline-block;margin-top:18px}}
        @media(max-width:560px){.musicians-wrap{width:min(100% - 24px,1120px)}.musicians-topbar{height:65px}.discover-hero{min-height:360px;display:block;padding-top:45px}.hero-orbit{position:absolute;left:-28px;bottom:-80px;width:235px;height:235px;opacity:.55}.hero-copy{max-width:100%}.hero-copy h1{font-size:46px}.hero-lead{max-width:310px}.search-panel{padding:12px;border-radius:18px}.search-panel form{grid-template-columns:1fr;gap:8px}.search-button{height:46px}.filter-row{padding-bottom:2px}.filter{flex:none}.online-filter{margin-right:0;flex:none}.results-section{padding-top:48px}.results-head{align-items:start}.results-head h2{font-size:24px}.status{margin-top:20px}.musician-card{min-height:110px;padding:13px}.card-avatar{width:58px;height:58px;border-radius:15px}.bottom-cta{padding:22px;margin-bottom:20px}}
      `}</style>
    </main>
  );
}
