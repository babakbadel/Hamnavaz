"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export default function RegisterPage(){
 const router=useRouter(); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setError("");setBusy(true);const f=new FormData(e.currentTarget);const email=String(f.get("email"));const password=String(f.get("password"));const name=String(f.get("name"));
  try{const r=await fetch(`${API_URL}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password,display_name:name})});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.detail||"ثبت‌نام ناموفق بود");
   const login=await fetch(`${API_URL}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});const ld=await login.json().catch(()=>({}));if(!login.ok)throw new Error(ld.detail||"ورود پس از ثبت‌نام ناموفق بود");localStorage.setItem("hamnavaz_token",ld.access_token);router.replace("/dashboard");
  }catch(x){setError(x instanceof Error?x.message:"خطای غیرمنتظره");}finally{setBusy(false)}}
 return <main className="auth-page"><div className="auth-card"><Link className="brand" href="/">♪ همنواز</Link><p className="eyebrow">شروع مسیر موسیقی</p><h1>پروفایل همنوازت را بساز</h1><p className="muted">ثبت‌نام کن و وارد فضای شخصی خودت شو.</p><form onSubmit={submit}><label>نام نمایشی<input name="name" required placeholder="مثلاً بابک"/></label><label>ایمیل<input name="email" type="email" required placeholder="you@example.com"/></label><label>رمز عبور<input name="password" type="password" minLength={8} required placeholder="حداقل ۸ کاراکتر"/></label>{error&&<div className="form-error">{error}</div>}<button className="search-button" disabled={busy}>{busy?"در حال ساخت حساب…":"ثبت‌نام و ورود"}</button></form><p className="muted">قبلاً عضو شدی؟ <Link href="/auth/login">ورود</Link></p></div></main>;
}