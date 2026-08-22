"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, getMessages, Message, sendMessage } from "../../lib/api";

export default function MessagesPage() {
  const router = useRouter();
  const [receiver, setReceiver] = useState("");
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReceiver(params.get("user") || "");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("hamnavaz_token");
    if (!token) { router.replace(`/auth/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`); return; }
    getMessages().then(setItems).catch((e) => {
      if (e instanceof ApiError && e.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login?next=/messages"); return; }
      setError(e instanceof Error ? e.message : "دریافت پیام‌ها ناموفق بود.");
    }).finally(() => setLoading(false));
  }, [router]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!receiver || !text.trim()) return;
    setSending(true); setError("");
    try { const created = await sendMessage(receiver, text.trim()); setItems((current) => [...current, created]); setText(""); }
    catch (e) { if (e instanceof ApiError && e.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login?next=/messages"); return; } setError(e instanceof Error ? e.message : "ارسال پیام ناموفق بود."); }
    finally { setSending(false); }
  }

  return <main className="container page-shell" dir="rtl">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/dashboard">داشبورد</Link><Link href="/musicians">کشف نوازنده‌ها</Link></div></nav>
    <section className="page-head"><p className="eyebrow">ارتباط</p><h1>پیام‌های تو.</h1><p className="lead">گفتگوهای واقعی همنواز را از اینجا دنبال کن.</p></section>
    {error && <div className="error">{error}</div>}
    {receiver ? <form className="panel message-composer" onSubmit={submit}><label htmlFor="message">پیام جدید</label><textarea id="message" value={text} onChange={(e) => setText(e.target.value)} rows={4} maxLength={2000} placeholder="پیام خودت را بنویس..." required /><button className="primary-action" disabled={sending || !text.trim()}>{sending ? "در حال ارسال..." : "ارسال پیام"}</button></form> : <div className="panel composer-hint">برای ارسال پیام، ابتدا از صفحه یک نوازنده وارد «ارسال پیام» شو.</div>}
    <section className="results-grid">{loading ? <div className="empty">در حال دریافت پیام‌ها...</div> : items.length ? items.map((m) => <article className="panel message-card" key={m.id}><div className="name-row"><h2>گفتگو</h2>{m.created_at && <small>{new Date(m.created_at).toLocaleDateString("fa-IR")}</small>}</div><p>{m.text}</p><span className="verified">{m.is_read ? "خوانده شده" : "پیام جدید"}</span></article>) : <div className="empty">هنوز پیامی نداری. از صفحه نوازنده‌ها یک همکاری شروع کن.</div>}</section>
  </main>;
}
