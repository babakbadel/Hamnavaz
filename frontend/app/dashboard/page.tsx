"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, getMyProfile, Musician } from "../../lib/api";



export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Musician | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hamnavaz_token");
    if (!token) { router.replace("/auth/login"); return; }
    let cancelled = false;
    getMyProfile()
      .then(data => { if (!cancelled) setProfile(data); })
      .catch(error => {
        if (cancelled) return;
        if (error instanceof ApiError && error.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login"); }
        else if (!(error instanceof ApiError && error.status === 404)) setError("دریافت پروفایل ناموفق بود. دوباره تلاش کن.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [router]);

  function logout() { localStorage.removeItem("hamnavaz_token"); localStorage.removeItem("hamnavaz_refresh_token"); router.push("/"); router.refresh(); }

  if (loading) return <main className="container page-shell"><div className="empty">در حال بارگذاری داشبورد...</div></main>;
  return <main className="container page-shell">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/musicians">کشف نوازنده‌ها</Link><button className="logout-button" onClick={logout}>خروج</button></div></nav>
    <section className="dashboard-head"><div><p className="eyebrow">فضای شخصی</p><h1>داشبورد تو</h1><p className="lead">اینجا مرکز مدیریت پروفایل و فعالیت‌های موسیقی توست.</p></div><div className="dashboard-avatar">{profile?.avatar_url ? <img src={profile.avatar_url} alt=""/> : "♪"}</div></section>
    {error && <p role="alert">{error}</p>}
    <section className="dashboard-grid">
      <article className="panel dashboard-profile"><p className="eyebrow">پروفایل</p><h2>{profile?.display_name || "پروفایل نوازنده"}</h2><p>{profile?.city_name || profile?.city || "شهر ثبت نشده"}</p><small>{profile?.bio || "پروفایل خودت را کامل کن تا دیگران راحت‌تر تو را پیدا کنند."}</small><Link className="cta-button" href="/profile/edit">ویرایش پروفایل</Link></article>
      <article className="panel"><p className="eyebrow">فعالیت</p><h2>همکاری‌های من</h2><p>درخواست‌های همکاری، پیام‌ها و فعالیت‌های موسیقی تو اینجا نمایش داده می‌شود.</p><div className="dashboard-actions"><Link href="/musicians">پیدا کردن هم‌نواز</Link><Link href="/messages">پیام‌ها</Link></div></article>
    </section>
  </main>;
}
