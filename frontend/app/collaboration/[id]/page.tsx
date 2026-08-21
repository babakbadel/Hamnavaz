"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { sendCollaboration } from "../../../lib/api-client";

export default function CollaborationRequest({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [message, setMessage] = useState("سلام، برای یک همکاری موسیقی با شما علاقه‌مندم.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("hamnavaz_token");
    const { id } = await params;
    if (!token) {
      router.push(`/auth/login?next=/collaboration/${id}`);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await sendCollaboration(id, message);
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "ارسال درخواست ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container page-shell" dir="rtl">
      <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><Link className="login" href="/musicians">نوازنده‌ها</Link></nav>
      <section className="auth-card collaboration-card">
        <p className="eyebrow">شروع همکاری</p>
        <h1>یک پیام موسیقیایی بفرست.</h1>
        {done ? <><div className="success-message">درخواست همکاری با موفقیت ارسال شد. 🎵</div><Link className="cta-button" href="/messages">رفتن به پیام‌ها</Link></> : <form className="auth-form" onSubmit={submit}>
          <label>پیام شما<textarea value={message} onChange={e => setMessage(e.target.value)} rows={7} maxLength={2000} required /></label>
          {error && <div className="auth-error">{error}</div>}
          <button className="primary-action auth-submit" disabled={loading}>{loading ? "در حال ارسال..." : "ارسال درخواست همکاری"}</button>
        </form>}
      </section>
    </main>
  );
}
