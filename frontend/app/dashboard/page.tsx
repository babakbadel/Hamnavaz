"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Profile = { display_name?: string; bio?: string; city_name?: string; city?: string; avatar_url?: string; instruments?: unknown[] };

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hamnavaz_token");
    if (!token) { router.replace("/auth/login"); return; }
    fetch(`${API_URL}/musician/me`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" })
      .then(async r => { if (r.status === 401) throw new Error("unauthorized"); if (!r.ok) throw new Error("profile"); return r.json(); })
      .then(data => setProfile(data.profile || data))
      .catch(err => { if (err.message === "unauthorized") { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login"); } })
      .finally(() => setLoading(false));
  }, [router]);

  function logout() { localStorage.removeItem("hamnavaz_token"); localStorage.removeItem("hamnavaz_refresh_token"); router.push("/"); router.refresh(); }

  if (loading) return <main className="container page-shell"><div className="empty">در حال بارگذاری داشبورد...</div></main>;
  return <main className="container page-shell">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/musicians">کشف نوازنده‌ها</Link><button className="logout-button" onClick={logout}>خروج</button></div></nav>
    <section className="dashboard-head"><div><p className="eyebrow">فضای شخصی</p><h1>داشبورد تو</h1><p className="lead">اینجا مرکز مدیریت پروفایل و فعالیت‌های موسیقی توست.</p></div><div className="dashboard-avatar">{profile?.avatar_url ? <img src={profile.avatar_url} alt=""/> : "♪"}</div></section>
    <section className="dashboard-grid">
      <article className="panel dashboard-profile"><p className="eyebrow">پروفایل</p><h2>{profile?.display_name || "پروفایل نوازنده"}</h2><p>{profile?.city_name || profile?.city || "شهر ثبت نشده"}</p><small>{profile?.bio || "پروفایل خودت را کامل کن تا دیگران راحت‌تر تو را پیدا کنند."}</small><Link className="cta-button" href="/profile/edit">ویرایش پروفایل</Link></article>
      <article className="panel"><p className="eyebrow">فعالیت</p><h2>همکاری‌های من</h2><p>درخواست‌های همکاری، پیام‌ها و فعالیت‌های موسیقی تو اینجا نمایش داده می‌شود.</p><div className="dashboard-actions"><Link href="/musicians">پیدا کردن هم‌نواز</Link><Link href="/messages">پیام‌ها</Link></div></article>
    </section>
  </main>;
}
