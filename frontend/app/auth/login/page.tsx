"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError, login } from "../../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email.trim(), password);
      localStorage.setItem("hamnavaz_token", data.access_token);
      const next = searchParams.get("next");
      router.replace(next?.startsWith("/") ? next : "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError && err.status === 401 ? "ایمیل یا رمز عبور نادرست است." : err instanceof Error ? err.message : "ورود ناموفق بود.");
    } finally {
      setLoading(false);
    }
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
