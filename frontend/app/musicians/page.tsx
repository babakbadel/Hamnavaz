"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Musician, searchMusicians } from "../../lib/api";

export default function MusiciansPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try { setItems((await searchMusicians({ limit: 30 })).results); }
    catch { setError("ارتباط با سرور برقرار نشد. Backend را اجرا کنید."); }
    finally { setLoading(false); }
  }

  return <main className="container page-shell">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><Link className="login" href="/">خانه</Link></nav>
    <header className="page-head"><p className="eyebrow">کشف جامعه موسیقی</p><h1>نوازنده <span>مناسبت</span> را پیدا کن.</h1><p className="lead">ساز، شهر و سبک خودت را انتخاب کن و آدم‌هایی را پیدا کن که برای تمرین، اجرا یا همکاری آماده‌اند.</p></header>
    <form className="search-box" onSubmit={submit}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="نام، ساز یا شهر..." aria-label="جستجو"/><button>{loading ? "در حال جستجو..." : "جستجو"}</button></form>
    {error && <p className="error">{error}</p>}
    <section className="results-grid">
      {items.map(m => <Link className="musician-card" key={m.id} href={`/musicians/${m.user_id}`}>
        <div className="avatar">{m.avatar_url ? <img src={m.avatar_url} alt=""/> : "♪"}</div><div className="card-body"><div className="name-row"><h2>{m.display_name}</h2>{m.is_verified && <span className="verified">تأییدشده</span>}</div><p>{m.city_name || m.city || "شهر ثبت نشده"}</p><small>{m.bio || "برای مشاهده پروفایل و اطلاعات همکاری وارد شوید."}</small></div><span className="arrow">←</span>
      </Link>)}
      {!loading && !items.length && <div className="empty">برای شروع روی «جستجو» بزن.</div>}
    </section>
  </main>;
}
