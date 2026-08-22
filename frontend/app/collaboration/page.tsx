"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { acceptCollaboration, ApiError, CollaborationRequest, getCollaborationInbox, rejectCollaboration } from "../../lib/api";

export default function CollaborationInboxPage() {
  const router = useRouter();
  const [items, setItems] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hamnavaz_token");
    if (!token) { router.replace("/auth/login?next=/collaboration"); return; }
    getCollaborationInbox().catch((e) => {
      if (e instanceof ApiError && e.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login?next=/collaboration"); return []; }
      setError(e instanceof Error ? e.message : "دریافت درخواست‌ها ناموفق بود."); return [];
    }).then(setItems).finally(() => setLoading(false));
  }, [router]);

  async function decide(id: string, action: "accept" | "reject") {
    setBusy(id); setError("");
    try {
      const result = action === "accept" ? await acceptCollaboration(id) : await rejectCollaboration(id);
      setItems((current) => current.map((item) => item.id === id ? { ...item, status: result.status } : item));
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login?next=/collaboration"); return; }
      setError(e instanceof Error ? e.message : "تغییر وضعیت درخواست ناموفق بود.");
    } finally { setBusy(""); }
  }

  return <main className="container page-shell" dir="rtl">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/dashboard">داشبورد</Link><Link href="/messages">پیام‌ها</Link><Link href="/musicians">نوازنده‌ها</Link></div></nav>
    <section className="page-head"><p className="eyebrow">همکاری</p><h1>درخواست‌های همکاری.</h1><p className="lead">درخواست‌های واقعی را ببین و مستقیماً پاسخ بده.</p></section>
    {error && <div className="error">{error}</div>}
    <section className="results-grid">
      {loading ? <div className="empty">در حال دریافت درخواست‌ها...</div> : items.length ? items.map((item) => <article className="panel" key={item.id}><div className="name-row"><h2>درخواست همکاری</h2><span className="verified">{item.status}</span></div><p>{item.message || "برای همکاری با شما درخواست ارسال شده است."}</p>{item.status === "pending" && <div className="actions"><button className="primary-action" disabled={busy === item.id} onClick={() => void decide(item.id, "accept")}>{busy === item.id ? "..." : "پذیرش"}</button><button className="secondary-action" disabled={busy === item.id} onClick={() => void decide(item.id, "reject")}>رد کردن</button></div>}</article>) : <div className="empty">درخواست همکاری جدیدی نداری.</div>}
    </section>
  </main>;
}
