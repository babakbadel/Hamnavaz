"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { register, login, ApiError } from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const username = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      await register(username, email, password);
      const auth = await login(email, password);
      localStorage.setItem("hamnavaz_token", auth.access_token);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : err instanceof Error ? err.message : "خطای غیرمنتظره");
    } finally {
      setBusy(false);
    }
  }

  return <main className="auth-page"><div className="auth-card">
    <Link className="brand" href="/">♪ همنواز</Link>
    <p className="eyebrow">شروع مسیر موسیقی</p>
    <h1>پروفایل همنوازت را بساز</h1>
    <p className="muted">ثبت‌نام کن و وارد فضای شخصی خودت شو.</p>
    <form onSubmit={submit} className="auth-form">
      <label>نام نمایشی<input name="name" required placeholder="مثلاً بابک" autoComplete="nickname"/></label>
      <label>ایمیل<input name="email" type="email" required placeholder="you@example.com" autoComplete="email"/></label>
      <label>رمز عبور<input name="password" type="password" minLength={8} required placeholder="حداقل ۸ کاراکتر" autoComplete="new-password"/></label>
      {error&&<div className="form-error">{error}</div>}
      <button className="search-button" disabled={busy}>{busy?"در حال ساخت حساب…":"ثبت‌نام و ورود"}</button>
    </form>
    <p className="muted">قبلاً عضو شدی؟ <Link href="/auth/login">ورود</Link></p>
  </div></main>;
}
