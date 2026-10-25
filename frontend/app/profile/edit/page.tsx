"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ApiError, createProfile, getMyProfile, updateProfile } from "../../../lib/api";

export default function EditProfilePage() {
  const router = useRouter();
  const [displayName,setDisplayName]=useState("");
  const [city,setCity]=useState("");
  const [bio,setBio]=useState("");
  const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [message,setMessage]=useState("");
  const [exists, setExists] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    if (!localStorage.getItem("hamnavaz_token")) { router.replace("/auth/login"); return; }
    getMyProfile().then(profile => {
      if (cancelled) return;
      setExists(true); setDisplayName(profile.display_name); setCity(profile.city || ""); setBio(profile.bio || "");
    }).catch(error => {
      if (cancelled) return;
      if (error instanceof ApiError && error.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login"); }
      else if (!(error instanceof ApiError && error.status === 404)) { setLoadFailed(true); setMessage("دریافت پروفایل ناموفق بود. صفحه را دوباره باز کن."); }
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [router]);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (loadFailed) return;
    setSaving(true); setMessage("");
    const data = { display_name: displayName, city, bio };
    try {
      if (exists) await updateProfile(data); else await createProfile(data);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) { localStorage.removeItem("hamnavaz_token"); router.replace("/auth/login"); }
      else setMessage(error instanceof Error ? error.message : "ذخیره پروفایل ناموفق بود.");
    } finally { setSaving(false); }
  }
  if(loading)return <main className="container page-shell"><div className="empty">در حال بارگذاری...</div></main>;
  return <main className="container page-shell"><nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/dashboard">داشبورد</Link></div></nav><section className="auth-card profile-editor"><p className="eyebrow">پروفایل موسیقی</p><h1>خودت را معرفی کن.</h1><p className="auth-subtitle">اطلاعاتت را کامل کن تا نوازنده‌های مناسب راحت‌تر پیدایت کنند.</p><form className="auth-form" onSubmit={save}><label>نام نمایشی<input maxLength={100} value={displayName} onChange={e=>setDisplayName(e.target.value)} required placeholder="مثلاً بابک کفاش"/></label><label>شهر<input maxLength={100} value={city} onChange={e=>setCity(e.target.value)} placeholder="مثلاً اصفهان"/></label><label>درباره من<textarea maxLength={2000} value={bio} onChange={e=>setBio(e.target.value)} rows={5} placeholder="ساز، سبک، تجربه و چیزی که برای همکاری می‌خواهی..."/></label>{message&&<div className="auth-error success-message">{message}</div>}<button className="primary-action auth-submit" disabled={saving || loadFailed}>{saving?"در حال ذخیره...":"ذخیره پروفایل"}</button></form></section></main>;
}
