"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function EditProfilePage() {
  const router = useRouter();
  const [displayName,setDisplayName]=useState("");
  const [city,setCity]=useState("");
  const [bio,setBio]=useState("");
  const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [message,setMessage]=useState("");
  useEffect(()=>{const token=localStorage.getItem("hamnavaz_token");if(!token){router.replace("/auth/login");return;}fetch(`${API_URL}/musician/me`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.ok?r.json():null).then(d=>{const p=d?.profile||d||{};setDisplayName(p.display_name||"");setCity(p.city_name||p.city||"");setBio(p.bio||"");}).finally(()=>setLoading(false));},[router]);
  async function save(e:FormEvent){e.preventDefault();const token=localStorage.getItem("hamnavaz_token");if(!token)return;setSaving(true);setMessage("");try{const res=await fetch(`${API_URL}/musician/profile`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({display_name:displayName,city_name:city,bio})});if(!res.ok)throw new Error();setMessage("پروفایل با موفقیت ذخیره شد.");setTimeout(()=>router.push("/dashboard"),700);}catch{setMessage("ذخیره پروفایل ناموفق بود. اطلاعات را بررسی کن.");}finally{setSaving(false);}}
  if(loading)return <main className="container page-shell"><div className="empty">در حال بارگذاری...</div></main>;
  return <main className="container page-shell"><nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><div className="nav-links"><Link href="/dashboard">داشبورد</Link></div></nav><section className="auth-card profile-editor"><p className="eyebrow">پروفایل موسیقی</p><h1>خودت را معرفی کن.</h1><p className="auth-subtitle">اطلاعاتت را کامل کن تا نوازنده‌های مناسب راحت‌تر پیدایت کنند.</p><form className="auth-form" onSubmit={save}><label>نام نمایشی<input value={displayName} onChange={e=>setDisplayName(e.target.value)} required placeholder="مثلاً بابک کفاش"/></label><label>شهر<input value={city} onChange={e=>setCity(e.target.value)} placeholder="مثلاً اصفهان"/></label><label>درباره من<textarea value={bio} onChange={e=>setBio(e.target.value)} rows={5} placeholder="ساز، سبک، تجربه و چیزی که برای همکاری می‌خواهی..."/></label>{message&&<div className="auth-error success-message">{message}</div>}<button className="primary-action auth-submit" disabled={saving}>{saving?"در حال ذخیره...":"ذخیره پروفایل"}</button></form></section></main>;
}
