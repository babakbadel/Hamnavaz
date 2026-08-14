from pathlib import Path
import json

ROOT = Path("frontend-next")

files = {}

files["package.json"] = {
    "name": "hamnavaz-frontend",
    "private": True,
    "version": "1.0.0",
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start"
    },
    "dependencies": {
        "next": "latest",
        "react": "latest",
        "react-dom": "latest",
        "lucide-react": "latest"
    },
    "devDependencies": {
        "tailwindcss": "latest",
        "@tailwindcss/postcss": "latest"
    }
}

files["next.config.mjs"] = """
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

export default nextConfig;
"""

files["postcss.config.mjs"] = """
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
"""

files["app/globals.css"] = r"""
@import "tailwindcss";

:root {
  --bg: #05070d;
  --bg2: #090d17;
  --gold: #f6c94c;
  --gold2: #ffe18a;
  --text: #f7f8fb;
  --muted: #8994a7;
  --line: rgba(255,255,255,.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at 80% 0%, rgba(246,201,76,.10), transparent 28rem),
    radial-gradient(circle at 10% 30%, rgba(80,100,255,.08), transparent 30rem),
    var(--bg);
  color: var(--text);
  font-family:
    Tahoma,
    Arial,
    sans-serif;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

.glass {
  background: rgba(15,20,32,.68);
  border: 1px solid var(--line);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.gold-text {
  background: linear-gradient(135deg,#fff4bd,#f6c94c,#dca72d);
  -webkit-background-clip: text;
  color: transparent;
}

.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 42px 42px;
}

.float {
  animation: float 5s ease-in-out infinite;
}

.float2 {
  animation: float 6s ease-in-out infinite reverse;
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes float {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes pulse {
  0%,100% { opacity:.45; transform:scale(.96); }
  50% { opacity:1; transform:scale(1); }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
}
"""

files["app/layout.jsx"] = r"""
import "./globals.css";

export const metadata = {
  title: "همنواز | موسیقی را با هم بسازیم",
  description:
    "پیدا کردن نوازنده، گروه، مدرس، اجرا و فرصت‌های موسیقی در همنواز",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
"""

files["app/page.jsx"] = r"""
"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Music2,
  Users,
  Star,
  Guitar,
  Mic2,
  GraduationCap,
  School,
  Ticket,
  ShoppingBag,
  Headphones,
  Heart,
  Bell,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  Play,
  MapPin,
  Plus,
  X,
} from "lucide-react";

const API = "http://127.0.0.1:8000";

const instruments = [
  ["🎸","گیتار"],
  ["🎹","پیانو"],
  ["🥁","درام"],
  ["🎻","ویولن"],
  ["🎷","ساکسوفون"],
  ["🎺","ترومپت"],
  ["🪕","تار"],
  ["🪘","پرکاشن"],
];

const menuItems = [
  ["🎸","سازها"],
  ["🎓","مدرس‌ها"],
  ["🏫","آموزشگاه‌ها"],
  ["🎤","اجراها"],
  ["🎫","کنسرت‌ها"],
  ["🛒","فروشگاه ساز"],
  ["🎧","فروش موسیقی"],
  ["🔎","جستجوی پیشرفته"],
  ["💬","اجتماع همنواز"],
  ["🤝","همکاری‌ها"],
  ["🏆","آخرین مشارکت‌ها"],
];

const musicians = [
  {
    name: "آرمان رضایی",
    instrument: "گیتار · پاپ",
    city: "تهران",
    score: "4.9",
    color: "from-amber-300/30 to-orange-500/10",
    avatar: "AR",
  },
  {
    name: "سارا نادری",
    instrument: "ویولن · کلاسیک",
    city: "اصفهان",
    score: "4.9",
    color: "from-purple-400/30 to-blue-500/10",
    avatar: "SN",
  },
  {
    name: "کیان مرادی",
    instrument: "پیانو · جَز",
    city: "شیراز",
    score: "4.8",
    color: "from-cyan-300/30 to-blue-500/10",
    avatar: "KM",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffe69a] via-[#f6c94c] to-[#b47d15] text-black shadow-[0_0_35px_rgba(246,201,76,.25)]">
        <Music2 size={23} strokeWidth={2.5}/>
        <span className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-[#f6c94c]"/>
      </div>
      <div>
        <div className="text-xl font-black">همنواز</div>
        <div className="text-[10px] tracking-[.25em] text-white/35">
          HAMNAVAZ
        </div>
      </div>
    </div>
  );
}

function Wave() {
  return (
    <div className="flex h-28 items-center justify-center gap-1 opacity-80">
      {Array.from({length:42}).map((_,i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-[#c89420] to-[#ffe38a]"
          style={{
            height: `${18 + Math.abs(Math.sin(i*.72))*65}%`,
            opacity: .25 + Math.abs(Math.sin(i*.5))*.75
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({icon:Icon,title,subtitle}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[#f6c94c]">
          <Icon size={18}/>
          <span className="text-xs font-bold tracking-wider">{subtitle}</span>
        </div>
        <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
      </div>

      <button className="hidden items-center gap-1 text-sm text-white/45 transition hover:text-[#f6c94c] md:flex">
        مشاهده همه
        <ChevronLeft size={17}/>
      </button>
    </div>
  );
}

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [search,setSearch] = useState("");

  return (
    <main className="min-h-screen overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
        <div className="glass mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 shadow-2xl shadow-black/20">

          <Logo/>

          <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
            <a href="#discover" className="transition hover:text-white">کشف همنواز</a>
            <a href="#musicians" className="transition hover:text-white">نوازنده‌ها</a>
            <a href="#instruments" className="transition hover:text-white">سازها</a>
            <a href="#community" className="transition hover:text-white">مشارکت</a>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-xl border border-white/10 p-2.5 text-white/60 hover:text-white sm:block">
              <Bell size={19}/>
            </button>

            <button
              onClick={()=>setMenuOpen(true)}
              className="rounded-xl bg-white/5 p-2.5 text-white transition hover:bg-[#f6c94c] hover:text-black"
            >
              <Menu size={21}/>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative isolate min-h-[760px] overflow-hidden pt-28">
        <div className="absolute inset-0 grid-bg opacity-50"/>

        <div className="absolute right-[-8rem] top-24 h-[30rem] w-[30rem] rounded-full bg-[#f6c94c]/10 blur-[100px]"/>
        <div className="absolute left-[-10rem] bottom-0 h-[25rem] w-[25rem] rounded-full bg-indigo-500/10 blur-[100px]"/>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-[1.05fr_.95fr] md:px-8 lg:py-28">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f6c94c]/20 bg-[#f6c94c]/5 px-4 py-2 text-xs text-[#ffe18a]">
              <Sparkles size={15}/>
              موسیقی وقتی زیباتر است که با هم ساخته شود
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.12] tracking-tight md:text-7xl">
              همنوازت را
              <br/>
              <span className="gold-text">پیدا کن.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/50 md:text-lg">
              نوازنده پیدا کن، گروه بساز، یاد بگیر، اجرا کن
              و در دنیای موسیقی همنوازهایت را پیدا کن.
            </p>

            <div className="glass mt-9 flex max-w-xl items-center gap-3 rounded-2xl p-2 shadow-2xl shadow-black/30">
              <Search className="mr-2 text-white/35" size={21}/>
              <input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="نوازنده، ساز، شهر یا سبک موسیقی..."
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none placeholder:text-white/25"
              />
              <button className="rounded-xl bg-gradient-to-l from-[#f6c94c] to-[#e6ad32] px-5 py-3 text-sm font-black text-black shadow-lg shadow-[#f6c94c]/10">
                جستجو
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/35">
              <span>مثلاً:</span>
              <button className="hover:text-[#f6c94c]">گیتاریست تهران</button>
              <button className="hover:text-[#f6c94c]">گروه جَز</button>
              <button className="hover:text-[#f6c94c]">مدرس پیانو</button>
            </div>
          </div>

          {/* 3D CODE GRAPHIC */}
          <div className="relative mx-auto h-[390px] w-full max-w-[520px]">

            <div className="absolute inset-8 rounded-full border border-[#f6c94c]/10 shadow-[0_0_100px_rgba(246,201,76,.08)]"/>

            <div className="float absolute right-8 top-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl backdrop-blur-xl">
              🎸
            </div>

            <div className="float2 absolute bottom-12 left-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl backdrop-blur-xl">
              🎹
            </div>

            <div className="absolute inset-[15%] flex items-center justify-center">
              <div className="absolute h-56 w-56 rounded-full border border-[#f6c94c]/15 animate-[spin_18s_linear_infinite]"/>
              <div className="absolute h-72 w-72 rounded-full border border-white/5 animate-[spin_28s_linear_infinite_reverse]"/>

              <div className="relative flex h-48 w-48 items-center justify-center rounded-[3rem] border border-[#f6c94c]/25 bg-gradient-to-br from-[#f6c94c]/15 to-white/[.02] shadow-[0_0_100px_rgba(246,201,76,.12)] backdrop-blur-xl">
                <div className="absolute inset-4 rounded-[2.3rem] border border-[#f6c94c]/10"/>
                <Music2 size={65} className="text-[#f6c94c]"/>
              </div>
            </div>

            <div className="absolute bottom-1/2 right-0 translate-y-1/2 rounded-2xl border border-white/10 bg-[#111827]/80 px-4 py-3 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 pulse"/>
                <div>
                  <div className="text-xs font-bold">۱٬۲۸۴ همنواز آنلاین</div>
                  <div className="mt-1 text-[10px] text-white/35">همین الان فعال هستند</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 right-1/2 translate-x-1/2">
              <Wave/>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="border-y border-white/5 bg-white/[.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/5 md:grid-cols-4">

          {[
            [Users,"۱٬۲۸۴","کاربر آنلاین"],
            [Music2,"۳٬۸۷۰","نوازنده"],
            [Star,"۴٫۸۹","میانگین امتیاز"],
            [Mic2,"۲۴۶","اجرای فعال"],
          ].map(([Icon,value,label],i)=>(
            <div key={i} className="flex items-center gap-4 px-5 py-7 md:px-8">
              <div className="rounded-xl bg-[#f6c94c]/10 p-3 text-[#f6c94c]">
                <Icon size={21}/>
              </div>
              <div>
                <div className="text-xl font-black">{value}</div>
                <div className="mt-1 text-xs text-white/35">{label}</div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* DISCOVER */}
      <section id="discover" className="mx-auto max-w-7xl px-5 py-24 md:px-8">

        <SectionTitle
          icon={Sparkles}
          subtitle="DISCOVER"
          title="دنیای موسیقی همنواز"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.slice(0,8).map(([emoji,title],i)=>(
            <button
              key={title}
              className="glass group relative overflow-hidden rounded-3xl p-6 text-right transition duration-300 hover:-translate-y-1 hover:border-[#f6c94c]/20 hover:bg-white/[.06]"
            >
              <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#f6c94c]/5 blur-2xl transition group-hover:bg-[#f6c94c]/10"/>
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                  {emoji}
                </div>
                <div className="font-bold">{title}</div>
                <div className="mt-2 text-xs leading-6 text-white/30">
                  کشف فرصت‌های تازه در دنیای موسیقی
                </div>
                <ChevronLeft className="mt-4 text-white/20 transition group-hover:-translate-x-1 group-hover:text-[#f6c94c]" size={18}/>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* MUSICIANS */}
      <section id="musicians" className="bg-white/[.015]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">

          <SectionTitle
            icon={Star}
            subtitle="TOP RATED"
            title="بالاترین امتیازها"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {musicians.map((m,i)=>(
              <article
                key={m.name}
                className="glass group overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-2"
              >
                <div className={`relative h-44 bg-gradient-to-br ${m.color}`}>
                  <div className="absolute inset-0 opacity-20 grid-bg"/>
                  <div className="absolute bottom-5 right-5 flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-white/20 bg-black/30 text-xl font-black backdrop-blur-xl">
                    {m.avatar}
                  </div>

                  <div className="absolute left-5 top-5 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1.5 text-xs backdrop-blur">
                    <Star size={13} fill="#f6c94c" className="text-[#f6c94c]"/>
                    {m.score}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-black">{m.name}</h3>
                  <p className="mt-2 text-sm text-[#f6c94c]">{m.instrument}</p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-white/35">
                    <MapPin size={13}/>
                    {m.city}
                  </p>

                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-sm font-bold transition hover:bg-[#f6c94c] hover:text-black">
                    مشاهده پروفایل
                    <ChevronLeft size={16}/>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUMENTS */}
      <section id="instruments" className="mx-auto max-w-7xl px-5 py-24 md:px-8">

        <SectionTitle
          icon={Guitar}
          subtitle="INSTRUMENTS"
          title="با چه سازی همنواز می‌شوی؟"
        />

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {instruments.map(([emoji,name],i)=>(
            <button
              key={name}
              className="glass group min-w-[125px] rounded-3xl p-5 text-center transition hover:-translate-y-1 hover:border-[#f6c94c]/25"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[.04] text-4xl transition group-hover:scale-110">
                {emoji}
              </div>
              <div className="mt-4 text-sm font-bold">{name}</div>
              <div className="mt-1 text-[10px] text-white/25">
                نوازنده پیدا کن
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="mx-auto max-w-7xl px-5 pb-28 md:px-8">

        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#f6c94c]/15 bg-gradient-to-br from-[#f6c94c]/10 via-white/[.02] to-transparent p-8 md:p-14">

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#f6c94c]/10 blur-[90px]"/>

          <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-center">

            <div>
              <div className="mb-4 flex items-center gap-2 text-[#f6c94c]">
                <Sparkles size={19}/>
                <span className="text-xs font-bold">HAMNAVAZ COMMUNITY</span>
              </div>

              <h2 className="max-w-2xl text-3xl font-black leading-tight md:text-5xl">
                یک نفر ساز می‌زند،
                <br/>
                <span className="gold-text">چند نفر موسیقی می‌سازند.</span>
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-white/40">
                یک همکاری جدید شروع کن، برای اجرا همنواز پیدا کن
                یا تجربه‌ات را با جامعه موسیقی به اشتراک بگذار.
              </p>

              <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#f6c94c] px-6 py-3.5 font-black text-black">
                شروع همکاری
                <ChevronLeft size={18}/>
              </button>
            </div>

            <div className="relative mx-auto h-52 w-52">
              {[
                ["🎸","right-0 top-0"],
                ["🎹","bottom-0 left-0"],
                ["🎤","right-8 bottom-3"],
                ["🥁","left-3 top-8"],
              ].map(([e,pos],i)=>(
                <div
                  key={i}
                  className={`absolute ${pos} float${i%2+1} flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-2xl shadow-xl backdrop-blur-xl`}
                >
                  {e}
                </div>
              ))}

              <div className="absolute inset-1/4 flex items-center justify-center rounded-full border border-[#f6c94c]/20 bg-[#f6c94c]/10 text-[#f6c94c]">
                <Users size={30}/>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-white/30 md:flex-row md:items-center">
          <Logo/>
          <div>© 2026 Hamnavaz — موسیقی را با هم بسازیم.</div>
        </div>
      </footer>

      {/* MOBILE QUICK MENU */}
      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/10 bg-[#101522]/90 p-1.5 shadow-2xl backdrop-blur-xl md:hidden">
        <button className="rounded-xl p-3 text-[#f6c94c]">
          <Search size={19}/>
        </button>
        <button className="rounded-xl p-3 text-white/60">
          <Heart size={19}/>
        </button>
        <button className="rounded-xl bg-[#f6c94c] p-3 text-black shadow-lg shadow-[#f6c94c]/20">
          <Plus size={20}/>
        </button>
        <button className="rounded-xl p-3 text-white/60">
          <MessageCircle size={19}/>
        </button>
        <button
          onClick={()=>setMenuOpen(true)}
          className="rounded-xl p-3 text-white/60"
        >
          <Menu size={19}/>
        </button>
      </div>

      {/* SIDE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm">
          <aside className="absolute bottom-0 right-0 top-0 w-[88%] max-w-md border-l border-white/10 bg-[#090d16] p-6 shadow-2xl">

            <div className="flex items-center justify-between">
              <Logo/>
              <button
                onClick={()=>setMenuOpen(false)}
                className="rounded-xl bg-white/5 p-2 text-white/60"
              >
                <X size={20}/>
              </button>
            </div>

            <div className="mt-10">
              <div className="mb-4 text-xs text-white/30">منوی همنواز</div>

              <div className="space-y-1">
                {menuItems.map(([emoji,title])=>(
                  <button
                    key={title}
                    onClick={()=>setMenuOpen(false)}
                    className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-right text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    <span className="text-xl">{emoji}</span>
                    <span>{title}</span>
                    <ChevronLeft className="mr-auto text-white/20" size={16}/>
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[#f6c94c]/10 bg-[#f6c94c]/5 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#f6c94c]/10 p-2 text-[#f6c94c]">
                  <Headphones size={18}/>
                </div>
                <div>
                  <div className="text-xs font-bold">همنواز را کشف کن</div>
                  <div className="mt-1 text-[10px] text-white/30">
                    موسیقی همین نزدیکی است.
                  </div>
                </div>
              </div>
            </div>

          </aside>
        </div>
      )}

    </main>
  );
}
"""

for path, content in files.items():
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)

    if isinstance(content, dict):
        content = json.dumps(content, ensure_ascii=False, indent=2)

    p.write_text(content.strip() + "\n", encoding="utf-8")

print("=" * 70)
print("HAMNAVAZ NEXT FRONTEND CREATED")
print("=" * 70)

for p in sorted(ROOT.rglob("*")):
    if p.is_file():
        print(p)

print("=" * 70)
