"use client";

import Link from "next/link";
import { useState } from "react";

const mainItems = [
  ["⌂", "خانه", "/"],
  ["♟", "پروفایل", "/dashboard"],
  ["♬", "ساز", "/instruments"],
  ["♫", "همنواز", "/musicians"],
  ["✉", "پیام‌ها", "/messages"],
  ["↔", "همکاری‌ها", "/collaborations"],
  ["◈", "مالی", "/finance"],
] as const;

export default function HamnavazNav() {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);

  function close() { setOpen(false); setSnack(false); }

  return (
    <>
      <header className="hz-header">
        <div className="hz-header-inner">
          <button className={`hz-menu ${open ? "open" : ""}`} onClick={() => setOpen(v => !v)} aria-label="منوی اصلی" aria-expanded={open}>
            <span /><span /><span />
          </button>
          <Link href="/" className="hz-brand" onClick={close}><b>♪</b> همنواز</Link>
          <div className="hz-actions">
            <button className="hz-snack-trigger" onClick={() => setSnack(v => !v)} aria-label="منوی سریع">＋</button>
            <Link href="/dashboard" className="hz-avatar" onClick={close} aria-label="پروفایل">♟</Link>
          </div>
        </div>
      </header>

      {open && <button className="hz-backdrop" aria-label="بستن منو" onClick={close} />}
      <aside className={`hz-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="hz-drawer-title"><span>♪ همنواز</span><button onClick={close}>×</button></div>
        <nav>
          {mainItems.map(([icon, label, href]) => <Link key={href} href={href} onClick={close}><span>{icon}</span>{label}</Link>)}
          <Link className="hz-auth" href="/auth/login" onClick={close}>↪ ورود / خروج</Link>
        </nav>
      </aside>

      {snack && <>
        <button className="hz-snack-backdrop" aria-label="بستن منوی سریع" onClick={() => setSnack(false)} />
        <div className="hz-snack">
          <b>دسترسی سریع</b>
          <Link href="/musicians" onClick={close}>🎸 پیدا کردن همنواز</Link>
          <Link href="/musicians" onClick={close}>🎓 پیدا کردن مدرس</Link>
          <Link href="/collaborations" onClick={close}>🤝 درخواست همکاری</Link>
          <Link href="/charity" onClick={close}>❤️ اجرای خیریه</Link>
        </div>
      </>}

      <nav className="hz-bottom-nav" aria-label="ناوبری موبایل">
        <Link href="/"><span>⌂</span>خانه</Link>
        <Link href="/musicians"><span>♫</span>همنواز</Link>
        <Link href="/messages"><span>✉</span>پیام</Link>
        <Link href="/dashboard"><span>♟</span>پروفایل</Link>
      </nav>

      <style jsx>{`
        .hz-header{position:relative;z-index:60;background:#070d18;border-bottom:1px solid rgba(255,255,255,.07)}
        .hz-header-inner{width:min(1120px,calc(100% - 28px));height:72px;margin:auto;display:flex;align-items:center;justify-content:space-between}
        .hz-brand{font-size:23px;font-weight:900}.hz-brand b{color:#d9b45b;margin-left:8px}
        .hz-menu{width:44px;height:44px;border:1px solid #263144;background:#101827;border-radius:12px;display:flex;flex-direction:column;justify-content:center;gap:5px;padding:10px;cursor:pointer}
        .hz-menu span{height:2px;width:100%;background:#f5f2ea;border-radius:4px;transition:.2s}.hz-menu.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.hz-menu.open span:nth-child(2){opacity:0}.hz-menu.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
        .hz-actions{display:flex;gap:8px;align-items:center}.hz-snack-trigger,.hz-avatar{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;border:1px solid #263144;background:#101827;color:#d9b45b;font-size:22px;cursor:pointer}.hz-avatar{font-size:17px;text-decoration:none}
        .hz-backdrop,.hz-snack-backdrop{position:fixed;inset:0;z-index:45;border:0;background:rgba(0,0,0,.48)}
        .hz-drawer{position:fixed;z-index:55;top:72px;right:0;width:min(340px,88vw);height:calc(100vh - 72px);padding:18px;background:#0b1320;border-left:1px solid #263144;transform:translateX(105%);transition:.25s;box-shadow:-25px 0 70px rgba(0,0,0,.3)}.hz-drawer.open{transform:translateX(0)}
        .hz-drawer-title{display:flex;justify-content:space-between;align-items:center;padding:8px 6px 18px;font-size:20px;font-weight:900}.hz-drawer-title span:first-letter{color:#d9b45b}.hz-drawer-title button{border:0;background:transparent;color:#aeb6c5;font-size:30px;cursor:pointer}
        .hz-drawer nav{display:grid;gap:7px}.hz-drawer nav a{display:flex;align-items:center;gap:13px;padding:14px;border-radius:13px;color:#cbd2de}.hz-drawer nav a:hover{background:#101827;color:#d9b45b}.hz-drawer nav a span{width:25px;color:#d9b45b}.hz-drawer .hz-auth{margin-top:10px;background:#d9b45b;color:#10131b;justify-content:center;font-weight:900}
        .hz-snack{position:fixed;z-index:70;top:65px;left:14px;width:min(280px,calc(100vw - 28px));padding:14px;border:1px solid #29364b;border-radius:18px;background:#0b1320;box-shadow:0 25px 70px rgba(0,0,0,.45);display:grid;gap:6px}.hz-snack b{padding:8px;color:#d9b45b}.hz-snack a{padding:12px;border-radius:11px;color:#cbd2de}.hz-snack a:hover{background:#101827}
        .hz-bottom-nav{display:none}
        @media(min-width:801px){.hz-menu{order:3}.hz-brand{order:1}.hz-actions{order:2}.hz-header-inner{direction:ltr}.hz-drawer{top:72px}.hz-snack{top:65px}}
        @media(max-width:800px){.hz-header-inner{direction:ltr}.hz-brand{direction:rtl}.hz-bottom-nav{position:fixed;z-index:50;display:grid;grid-template-columns:repeat(4,1fr);bottom:0;left:0;right:0;height:64px;background:rgba(7,13,24,.96);border-top:1px solid #263144;padding-bottom:env(safe-area-inset-bottom)}.hz-bottom-nav a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#8f9bad;font-size:11px}.hz-bottom-nav span{font-size:18px;color:#d9b45b}.hz-drawer{width:min(360px,92vw)}body{padding-bottom:64px}}
      `}</style>
    </>
  );
}
