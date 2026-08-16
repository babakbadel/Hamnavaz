"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GraduationCap, MapPin, Search, Users, Radio, Star, Guitar } from "lucide-react";

const teachers = [
  { name: "سارا نادری", instrument: "ویولن", city: "اصفهان", rating: "4.9", collaboration: "5.0", status: "آنلاین", avatar: "SN" },
  { name: "کیان مرادی", instrument: "پیانو", city: "شیراز", rating: "4.8", collaboration: "4.9", status: "آنلاین", avatar: "KM" },
  { name: "مریم احمدی", instrument: "گیتار", city: "تهران", rating: "5.0", collaboration: "4.9", status: "برتر", avatar: "MA" },
  { name: "رضا کریمی", instrument: "درام", city: "تبریز", rating: "4.8", collaboration: "4.8", status: "برتر", avatar: "RK" },
];

const musicians = [
  { name: "آرمان رضایی", instrument: "گیتار", city: "تهران", level: "متوسط", rating: "4.9", collaboration: "5.0", status: "آنلاین", avatar: "AR" },
  { name: "نگار موسوی", instrument: "پیانو", city: "اصفهان", level: "مبتدی", rating: "4.8", collaboration: "4.9", status: "آنلاین", avatar: "NM" },
  { name: "مهدی شریفی", instrument: "بیس", city: "شیراز", level: "حرفه‌ای", rating: "5.0", collaboration: "4.9", status: "برتر", avatar: "MS" },
  { name: "سینا محمدی", instrument: "ساکسوفون", city: "تهران", level: "متوسط", rating: "4.9", collaboration: "5.0", status: "برتر", avatar: "SM" },
];

const requests = [
  { name: "علی رضایی", city: "اصفهان", instrument: "گیتار", level: "مبتدی", text: "برای تمرین و شروع یک گروه دوستانه دنبال گیتاریست می‌گردد.", avatar: "AR" },
  { name: "نگار موسوی", city: "تهران", instrument: "درامر", level: "متوسط", text: "برای یک گروه در حال شکل‌گیری، جای یک نوازنده خالی است.", avatar: "NM" },
  { name: "مهدی شریفی", city: "شیراز", instrument: "بیس", level: "حرفه‌ای", text: "برای اجرای آینده گروه، دنبال یک نوازنده هم‌سطح می‌گردد.", avatar: "MS" },
];

function Avatar({ value, online }) {
  return (
    <div className="relative h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-orange-400 via-fuchsia-500 to-violet-700 p-[2px] shadow-[0_0_22px_rgba(168,85,247,.22)]">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0b0e16] text-xs font-black text-white">{value}</div>
      {online && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0b0e16] bg-emerald-400" />}
    </div>
  );
}

function Ratings({ normal, collaboration }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
      <span title="امتیاز معمولی؛ امتیازی که کاربران بر اساس شناخت و تجربه خود از این پروفایل ثبت می‌کنند." className="rounded-full bg-amber-400/10 px-2 py-1 text-amber-300">★ {normal} · امتیاز معمولی</span>
      <span title="امتیاز همکاری؛ امتیازی که پس از یک ارتباط یا همکاری واقعی ثبت می‌شود." className="rounded-full bg-violet-500/10 px-2 py-1 text-violet-300">★ {collaboration} · امتیاز همکاری</span>
    </div>
  );
}

function ProfileCard({ person, teacher = false }) {
  return (
    <article className="group rounded-2xl border border-white/[.07] bg-[#0b0e16]/85 p-4 transition duration-300 hover:-translate-y-1 hover:border-orange-400/20 hover:shadow-[0_14px_45px_rgba(0,0,0,.28)]">
      <div className="flex items-center gap-3">
        <Avatar value={person.avatar} online={person.status === "آنلاین"} />
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black text-white">{person.name}</h3>
          <p className="mt-1 text-[11px] text-white/45">{person.instrument} · {person.city}</p>
        </div>
        <span className="mr-auto rounded-full bg-white/5 px-2 py-1 text-[9px] text-white/40">{person.status}</span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-white/40">
        {teacher ? <><GraduationCap size={13} className="text-violet-300" /> مدرس {person.instrument}</> : <><Guitar size={13} className="text-orange-300" /> {person.level}</>}
      </div>
      <Ratings normal={person.rating} collaboration={person.collaboration} />
    </article>
  );
}

export default function HomeCommunityInjector() {
  const [mount, setMount] = useState(null);

  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const target = document.getElementById("mission") || document.getElementById("musicians");
    if (!target || !target.parentNode) return;
    const node = document.createElement("div");
    node.setAttribute("data-hamnavaz-community", "true");
    target.parentNode.insertBefore(node, target);
    setMount(node);
    return () => node.remove();
  }, []);

  if (!mount) return null;

  return createPortal(
    <section dir="rtl" className="relative z-10 overflow-hidden border-y border-white/[.06] bg-[#070910] px-4 py-14 text-white sm:px-8">
      <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-widest text-cyan-300"><Radio size={14} /> همین حالا در همنواز</div>
            <h2 className="text-2xl font-black sm:text-3xl">آدم‌هایی که همین حالا دنبال یک مسیر موسیقایی‌اند</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/45">اساتید، نوازنده‌ها و درخواست‌هایی که می‌توانند شروع یک ارتباط تازه باشند.</p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-3 py-2 text-xs text-white/50"><Users size={15} /> ۱۲۸۴ همنواز آنلاین</div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-violet-400/10 bg-white/[.018] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between"><div><span className="text-[10px] font-bold tracking-widest text-violet-300">TEACHERS</span><h3 className="mt-1 text-xl font-black">اساتید آنلاین و برتر</h3></div><GraduationCap className="text-violet-300" size={22} /></div>
            <div className="grid gap-3 sm:grid-cols-2">{teachers.map((p) => <ProfileCard key={p.name} person={p} teacher />)}</div>
          </div>

          <div className="rounded-3xl border border-orange-400/10 bg-white/[.018] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between"><div><span className="text-[10px] font-bold tracking-widest text-orange-300">MUSICIANS</span><h3 className="mt-1 text-xl font-black">نوازنده‌های آنلاین و برتر</h3></div><Star className="text-orange-300" size={21} fill="currentColor" /></div>
            <div className="grid gap-3 sm:grid-cols-2">{musicians.map((p) => <ProfileCard key={p.name} person={p} />)}</div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[.035] to-violet-500/[.035] p-5 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><span className="text-[10px] font-bold tracking-widest text-cyan-300">LOOKING FOR</span><h3 className="mt-1 text-xl font-black sm:text-2xl">چه کسی دنبال چه کسی است؟</h3><p className="mt-2 text-xs text-white/45">گاهی یک درخواست ساده، شروع یک گروه خوب است.</p></div>
            <button className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/50"><Search size={14} /> جست‌وجوی درخواست‌ها</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {requests.map((r) => <article key={r.name + r.instrument} className="rounded-2xl border border-white/[.07] bg-[#090b12]/80 p-4 transition hover:-translate-y-1 hover:border-cyan-300/20">
              <div className="flex items-center gap-3"><Avatar value={r.avatar} online /><div><h4 className="text-sm font-black">{r.name}</h4><p className="mt-1 flex items-center gap-1 text-[10px] text-white/40"><MapPin size={11} /> {r.city}</p></div></div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold"><Guitar size={14} className="text-cyan-300" /> {r.instrument}<span className="font-normal text-white/35">· {r.level}</span></div>
              <p className="mt-2 text-xs leading-6 text-white/50">{r.text}</p>
              <button className="mt-3 w-full rounded-xl border border-cyan-300/10 bg-cyan-300/5 py-2 text-[11px] font-bold text-cyan-200">مشاهده و ارتباط</button>
            </article>)}
          </div>
        </div>
      </div>
    </section>,
    mount
  );
}
