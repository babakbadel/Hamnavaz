"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getInstruments, Instrument } from "../../lib/api";

export default function InstrumentsPage() {
  const [items, setItems] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    getInstruments().then(data => { if (!cancelled) setItems(data); })
      .catch(() => { if (!cancelled) setError("دریافت سازها ناموفق بود. دوباره تلاش کن."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);
  return <main className="container page-shell">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/musicians">نوازنده‌ها</Link><Link href="/dashboard">داشبورد</Link></div></nav>
    <section className="page-head"><p className="eyebrow">کشف ساز</p><h1>ساز مورد علاقه‌ات را پیدا کن.</h1><p className="lead">سازها را ببین و از آن‌ها برای پیدا کردن نوازنده مناسب استفاده کن.</p></section>
    <div className="results-grid">{loading ? <div className="empty">در حال بارگذاری سازها...</div> : error ? <div className="empty" role="alert">{error}</div> : items.length ? items.map(item => <article className="panel" key={item.id}><h2>{item.name}</h2><p>{item.description || "نوازنده‌های این ساز را پیدا کن."}</p><Link className="cta-button" href="/musicians">پیدا کردن نوازنده</Link></article>) : <div className="empty">هنوز سازی ثبت نشده است.</div>}</div>
  </main>;
}
