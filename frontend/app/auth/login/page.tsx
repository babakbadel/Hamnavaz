"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const body = new URLSearchParams({ username: email, password });
      const res = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "ایمیل یا رمز عبور نادرست است.");
      const token = data.access_token || data.token;
      if (!token) throw new Error("توکن ورود از سرور دریافت نشد.");
      localStorage.setItem("hamnavaz_token", token);
      if (data.refresh_token) localStorage.setItem("hamnavaz_refresh_token", data.refresh_token);
      router.push("/dashboard");
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "ورود ناموفق بود."); }
    finally { setLoading(false); }
  }

  return <main className="auth-page"><div className="auth-card">
    <Link className="brand" href="/"><span>♪</span> همنواز</Link>
    <p className="eyebrow">ورود به همنواز</p>
    <h1>خوش برگشتی.</h1>
    <p className="auth-subtitle">وارد حساب خودت شو و به فضای شخصی همنواز برو.</p>
    <form onSubmit={submit} className="auth-form">
      <label>ایمیل<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email"/></label>
      <label>رمز عبور<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="رمز عبور" required autoComplete="current-password"/></label>
      {error && <div className="auth-error">{error}</div>}
      <button className="primary-action auth-submit" disabled={loading}>{loading ? "در حال ورود..." : "ورود به حساب"}</button>
    </form>
    <p className="auth-footer">حساب نداری؟ <Link href="/auth/register">ثبت‌نام کن</Link></p>
  </div></main>;
}
