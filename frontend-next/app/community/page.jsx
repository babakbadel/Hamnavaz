"use client";

import { GraduationCap, MapPin, Star, Users, Radio, Search, Guitar, Trophy } from "lucide-react";

const teachers = [
  { name: "سارا نادری", instrument: "ویولن", city: "اصفهان", rating: "4.9", collaboration: "5.0", status: "آنلاین", avatar: "SN" },
  { name: "کیان مرادی", instrument: "پیانو", city: "شیراز", rating: "4.8", collaboration: "4.9", status: "آنلاین", avatar: "KM" },
  { name: "مریم احمدی", instrument: "گیتار", city: "تهران", rating: "5.0", collaboration: "4.9", status: "برتر", avatar: "MA" },
  { name: "رضا کریمی", instrument: "درام", city: "تبریز", rating: "4.8", collaboration: "4.8", status: "برتر", avatar: "RK" },
];

const users = [
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
    <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-orange-400 via-fuchsia-500 to-violet-700 p-[2px] shadow-[0_0_24px_rgba(168,85,247,.25)]">
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#10131c] text-sm font-black text-white">
        {value}
        {online && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#10131c] bg-emerald-400" />}
      </div>
    </div>
  );
}

function Ratings({ normal, collaboration }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-amber-300" title="امتیاز معمولی؛ امتیازی که کاربران بر اساس شناخت و تجربه خود از این پروفایل ثبت می‌کنند.">
        ★ {normal} · امتیاز معمولی
      </span>
      <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-violet-300" title="امتیاز همکاری؛ امتیازی که پس از یک ارتباط یا همکاری واقعی ثبت می‌شود.">
        ★ {collaboration} · امتیاز همکاری
      </span>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#070910] text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-[#12101a] to-[#070910] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-3 py-1 text-xs text-orange-300"><Radio size={14}/> همین حالا در همنواز</span>
              <h1 className="text-3xl font-black sm:text-5xl">آدم‌هایی که موسیقی را به حرکت درمی‌آورند.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">نوازنده‌ها، استادها و آدم‌هایی که همین حالا دنبال یک ارتباط تازه موسیقایی هستند.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm text-white/65"><Users size={18}/> ۱۲۸۴ همنواز آنلاین</div>
          </div>

          <div className="mb-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-violet-400/15 bg-white/[.025] p-6 shadow-2xl shadow-violet-950/10">
              <div className="mb-6 flex items-center justify-between"><div><div className="text-xs text-violet-300">TEACHERS</div><h2 className="mt-1 text-2xl font-black">اساتید آنلاین و برتر</h2></div><GraduationCap className="text-violet-300"/></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {teachers.map((person) => <article key={person.name} className="rounded-2xl border border-white/8 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-violet-400/25">
                  <div className="flex items-center gap-3"><Avatar value={person.avatar} online={person.status === "آنلاین"}/><div className="min-w-0"><h3 className="truncate font-bold">{person.name}</h3><p className="mt-1 text-xs text-white/45">{person.instrument} · {person.city}</p></div></div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-white/45"><span className="rounded-full bg-white/5 px-2 py-1">{person.status}</span><span>مدرس {person.instrument}</span></div>
                  <div className="mt-3"><Ratings normal={person.rating} collaboration={person.collaboration}/></div>
                </article>)}
              </div>
            </div>

            <div className="rounded-3xl border border-orange-400/15 bg-white/[.025] p-6 shadow-2xl shadow-orange-950/10">
              <div className="mb-6 flex items-center justify-between"><div><div className="text-xs text-orange-300">MUSICIANS</div><h2 className="mt-1 text-2xl font-black">نوازنده‌های برتر و آنلاین</h2></div><Trophy className="text-orange-300"/></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {users.map((person) => <article key={person.name} className="rounded-2xl border border-white/8 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-orange-400/25">
                  <div className="flex items-center gap-3"><Avatar value={person.avatar} online={person.status === "آنلاین"}/><div className="min-w-0"><h3 className="truncate font-bold">{person.name}</h3><p className="mt-1 text-xs text-white/45">{person.instrument} · {person.city}</p></div></div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-white/45"><span className="rounded-full bg-white/5 px-2 py-1">{person.level}</span><span>{person.status}</span></div>
                  <div className="mt-3"><Ratings normal={person.rating} collaboration={person.collaboration}/></div>
                </article>)}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[.04] to-violet-500/[.04] p-6 sm:p-8">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><div className="text-xs text-cyan-300">LOOKING FOR</div><h2 className="mt-1 text-2xl font-black sm:text-3xl">آدم‌هایی که دنبال همدیگر می‌گردند</h2><p className="mt-2 text-sm text-white/50">یک نیاز ساده می‌تواند شروع یک گروه خوب باشد.</p></div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/50"><Search size={15}/> جست‌وجوی درخواست‌ها</div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {requests.map((request) => <article key={request.name + request.instrument} className="group rounded-2xl border border-white/8 bg-[#090b12]/80 p-5 transition hover:-translate-y-1 hover:border-cyan-300/25">
                <div className="flex items-start gap-3"><Avatar value={request.avatar} online/><div><h3 className="font-bold">{request.name}</h3><p className="mt-1 text-xs text-white/45"><MapPin size={12} className="mr-1 inline"/>{request.city}</p></div></div>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold"><Guitar size={16} className="text-cyan-300"/>{request.instrument}<span className="text-xs font-normal text-white/40">· {request.level}</span></div>
                <p className="mt-3 text-sm leading-7 text-white/55">{request.text}</p>
                <button className="mt-4 w-full rounded-xl border border-cyan-300/15 bg-cyan-300/5 py-2.5 text-xs font-bold text-cyan-200 transition hover:bg-cyan-300/10">مشاهده و ارتباط</button>
              </article>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
