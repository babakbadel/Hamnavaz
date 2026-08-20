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

const quickItems = [
  ["♫", "پیدا کردن همنواز", "/musicians"],
  ["♙", "پیدا کردن مدرس", "/musicians"],
  ["↔", "درخواست همکاری", "/collaborations"],
  ["♥", "اجرای خیریه", "/charity"],
] as const;

export default function HamnavazNav() {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const close = () => { setOpen(false); setSnack(false); };

  return <>
    <header className="hz-header">
      <div className="hz-header-inner">
        <button className={`hz-menu ${open ? "open" : ""}`} onClick={() => { setOpen(v => !v); setSnack(false); }} aria-label="منوی اصلی" aria-expanded={open}>
          <span /><span /><span />
        </button>
        <Link href="/" className="hz-brand" onClick={close}><b>♪</b> همنواز</Link>
        <div className="hz-actions">
          <button className={`hz-snack-trigger ${snack ? "active" : ""}`} onClick={() => { setSnack(v => !v); setOpen(false); }} aria-label="دسترسی سریع">＋</button>
          <Link href="/dashboard" className="hz-avatar" onClick={close} aria-label="پروفایل">♟</Link>
        </div>
      </div>
    </header>

    {open && <button className="hz-backdrop" aria-label="بستن منو" onClick={close} />}
    <aside className={`hz-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="hz-drawer-title"><div><b>♪</b><span>همنواز</span><small>فضای موسیقی و هم‌نوازی</small></div><button onClick={close}>×</button></div>
      <nav>{mainItems.map(([icon, label, href]) => <Link key={href} href={href} onClick={close}><span>{icon}</span>{label}</Link>)}<Link className="hz-auth" href="/auth/login" onClick={close}>↪ ورود / خروج</Link></nav>
    </aside>

    {snack && <>
      <button className="hz-snack-backdrop" aria-label="بستن دسترسی سریع" onClick={() => setSnack(false)} />
      <div className="hz-snack">
        <div className="hz-snack-head"><div><b>دسترسی سریع</b><small>شروع یک مسیر تازه در همنواز</small></div><button onClick={() => setSnack(false)}>×</button></div>
        {quickItems.map(([icon, label, href]) => <Link href={href} key={label} onClick={close}><span>{icon}</span><strong>{label}</strong></Link>)}
      </div>
    </>}

    <nav className="hz-bottom-nav" aria-label="ناوبری موبایل">
      <Link href="/"><span>⌂</span>خانه</Link>
      <Link href="/instruments"><span>♬</span>سازها</Link>
      <Link href="/musicians"><span>♫</span>همنواز</Link>
      <Link href="/messages"><span>✉</span>پیام‌ها</Link>
      <Link href="/dashboard"><span>♟</span>پروفایل</Link>
    </nav>

    <style jsx>{`
      .hz-header{position:relative;z-index:60;background:rgba(7,13,24,.94);border-bottom:1px solid rgba(255,255,255,.06);backdrop-filter:blur(18px)}
      .hz-header-inner{width:min(1180px,calc(100% - 32px));height:76px;margin:auto;display:flex;align-items:center;justify-content:space-between}
      .hz-brand{font-size:24px;font-weight:900;letter-spacing:-.5px}.hz-brand b,.hz-drawer-title b{color:#d9b45b;margin-left:8px}.hz-menu{width:44px;height:44px;border:1px solid #263144;background:#0e1725;border-radius:13px;display:flex;flex-direction:column;justify-content:center;gap:5px;padding:10px;cursor:pointer}.hz-menu span{height:2px;width:100%;background:#f5f2ea;border-radius:4px;transition:.2s}.hz-menu.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.hz-menu.open span:nth-child(2){opacity:0}.hz-menu.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
      .hz-actions{display:flex;gap:8px;align-items:center}.hz-snack-trigger,.hz-avatar{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;border:1px solid #263144;background:#0e1725;color:#d9b45b;font-size:22px;cursor:pointer}.hz-snack-trigger.active{background:#d9b45b;color:#10131b}.hz-avatar{font-size:17px;text-decoration:none}
      .hz-backdrop,.hz-snack-backdrop{position:fixed;inset:0;z-index:45;border:0;background:rgba(0,0,0,.52)}
      .hz-drawer{position:fixed;z-index:55;top:76px;right:0;width:min(350px,90vw);height:calc(100vh - 76px);padding:20px;background:#0a121f;border-left:1px solid #263144;transform:translateX(105%);transition:.25s;box-shadow:-25px 0 80px rgba(0,0,0,.38)}.hz-drawer.open{transform:translateX(0)}.hz-drawer-title{display:flex;justify-content:space-between;align-items:center;padding:4px 6px 20px;border-bottom:1px solid #1d293a}.hz-drawer-title div{display:grid;grid-template-columns:auto 1fr;align-items:center}.hz-drawer-title span{font-size:20px;font-weight:900}.hz-drawer-title small{grid-column:2;color:#778397;font-size:11px;margin-top:3px}.hz-drawer-title button,.hz-snack-head button{border:0;background:transparent;color:#9ba6b8;font-size:28px;cursor:pointer}.hz-drawer nav{display:grid;gap:6px;padding-top:15px}.hz-drawer nav a{display:flex;align-items:center;gap:13px;padding:14px;border-radius:13px;color:#cbd2de}.hz-drawer nav a:hover{background:#101827;color:#d9b45b}.hz-drawer nav a span{width:25px;color:#d9b45b}.hz-drawer .hz-auth{margin-top:12px;background:#d9b45b;color:#10131b;justify-content:center;font-weight:900}
      .hz-snack{position:fixed;z-index:70;top:64px;left:16px;width:min(310px,calc(100vw - 32px));padding:16px;border:1px solid #29364b;border-radius:20px;background:#0a121f;box-shadow:0 28px 80px rgba(0,0,0,.48);display:grid;gap:5px}.hz-snack-head{display:flex;justify-content:space-between;align-items:start;padding:4px 4px 12px;border-bottom:1px solid #1d293a}.hz-snack-head div{display:grid}.hz-snack-head b{color:#d9b45b;font-size:16px}.hz-snack-head small{color:#778397;font-size:10px;margin-top:4px}.hz-snack a{display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;color:#cbd2de}.hz-snack a:hover{background:#101827}.hz-snack a span{width:26px;color:#d9b45b;font-size:19px}
      .hz-bottom-nav{display:none}
      @media(max-width:800px){.hz-header-inner{direction:ltr}.hz-brand{direction:rtl}.hz-bottom-nav{position:fixed;z-index:50;display:grid;grid-template-columns:repeat(5,1fr);bottom:0;left:0;right:0;min-height:66px;background:rgba(7,13,24,.97);border-top:1px solid #263144;padding-bottom:env(safe-area-inset-bottom);backdrop-filter:blur(16px)}.hz-bottom-nav a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#8f9bad;font-size:10px}.hz-bottom-nav a:active{color:#f5f2ea}.hz-bottom-nav span{font-size:17px;color:#d9b45b}.hz-drawer{width:min(370px,92vw)}body{padding-bottom:66px}.hz-snack{top:62px}}
      @media(min-width:801px){.hz-header-inner{direction:ltr}.hz-brand{order:1}.hz-actions{order:2}.hz-menu{order:3}}
    `}</style>
  </>;
}
