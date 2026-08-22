"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getMessages,
  getMyMatches,
  getNotifications,
  markNotificationRead,
  MatchResult,
  Message,
  Notification,
} from "../../lib/api";

export default function ActivityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.all([getNotifications(), getMessages(), getMyMatches()])
      .then(([n, m, x]) => {
        if (cancelled) return;
        setNotifications(n);
        setMessages(m);
        setMatches(x);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "خطا در دریافت فعالیت‌ها");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function read(id: number) {
    await markNotificationRead(id);
    setNotifications((items) => items.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }

  return (
    <main className="container" dir="rtl" style={{ padding: "48px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p className="eyebrow">داشبورد همنواز</p>
          <h1>فعالیت‌های من</h1>
          <p>پیام‌ها، اعلان‌ها و هم‌نوازهای پیشنهادی در یکجا.</p>
        </div>
        <Link href="/" className="outline-btn">خانه</Link>
      </div>

      {error && <div className="person-card" style={{ marginTop: 20, padding: 16 }}>{error}</div>}

      <section className="section" style={{ paddingTop: 28 }}>
        <h2>هم‌نوازهای پیشنهادی</h2>
        <div className="people-grid">
          {matches.map((x) => (
            <article className="person-card" key={x.profile_id}>
              <div className="avatar">🎵</div>
              <div>
                <h3>{x.display_name}</h3>
                <p>{x.city || "شهر نامشخص"}</p>
                <small>{x.match_score}% تطابق</small>
              </div>
              <Link className="outline-btn" href={`/musicians/${x.user_id}`}>پروفایل</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <h2>اعلان‌ها</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {notifications.map((n) => (
            <article className="person-card" key={n.id} style={{ padding: 18, opacity: n.is_read ? 0.65 : 1 }}>
              <strong>{n.title}</strong>
              <p>{n.text}</p>
              <small>{new Date(n.created_at).toLocaleString("fa-IR")}</small>
              {!n.is_read && <button className="outline-btn" onClick={() => read(n.id)} style={{ marginRight: 10 }}>خواندم</button>}
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <h2>پیام‌ها</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {messages.map((m) => (
            <article className="person-card" key={m.id} style={{ padding: 18 }}>
              <p>{m.text}</p>
              <small>{m.is_read ? "خوانده شده" : "جدید"}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
