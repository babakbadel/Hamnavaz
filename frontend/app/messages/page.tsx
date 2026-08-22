"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, getMessages, Message } from "../../lib/api";

export default function MessagesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hamnavaz_token");
    if (!token) {
      router.replace("/auth/login?next=/messages");
      return;
    }

    getMessages()
      .then(setItems)
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) {
          localStorage.removeItem("hamnavaz_token");
          router.replace("/auth/login?next=/messages");
          return;
        }
        setError(e instanceof Error ? e.message : "دریافت پیام‌ها ناموفق بود.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <main className="container page-shell" dir="rtl">
      <nav className="nav">
        <Link className="brand" href="/"><span>♪</span> همنواز</Link>
        <div className="nav-links">
          <Link href="/dashboard">داشبورد</Link>
          <Link href="/musicians">کشف نوازنده‌ها</Link>
        </div>
      </nav>

      <section className="page-head">
        <p className="eyebrow">ارتباط</p>
        <h1>پیام‌های تو.</h1>
        <p className="lead">درخواست‌های همکاری و گفتگوهای موسیقیایی را از اینجا دنبال کن.</p>
      </section>

      {error && <div className="error">{error}</div>}

      <section className="results-grid">
        {loading ? (
          <div className="empty">در حال دریافت پیام‌ها...</div>
        ) : items.length ? (
          items.map((m) => (
            <article className="panel message-card" key={m.id}>
              <div className="name-row">
                <h2>همنواز</h2>
                {m.created_at && <small>{new Date(m.created_at).toLocaleDateString("fa-IR")}</small>}
              </div>
              <p>{m.text}</p>
              <span className="verified">{m.is_read ? "خوانده شده" : "پیام جدید"}</span>
            </article>
          ))
        ) : (
          <div className="empty">هنوز پیامی نداری. از صفحه نوازنده‌ها یک همکاری شروع کن.</div>
        )}
      </section>
    </main>
  );
}
