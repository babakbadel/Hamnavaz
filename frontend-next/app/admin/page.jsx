"use client";

import { useEffect, useMemo, useState } from "react";
import { ImagePlus, LayoutDashboard, Save, Trash2, Upload, Eye, CheckCircle2, Home, Settings, Users, Music2 } from "lucide-react";

const defaults = [
  { id: "hero", title: "تصویر Hero", description: "تصویر اصلی بالای صفحه Home", src: "", alt: "تصویر اصلی همنواز" },
  { id: "city", title: "براساس شهر", description: "تصویر کارت جستجو بر اساس شهر", src: "", alt: "جستجوی همنواز بر اساس شهر" },
  { id: "instrument", title: "براساس ساز", description: "تصویر کارت جستجو بر اساس ساز", src: "", alt: "جستجوی همنواز بر اساس ساز" },
  { id: "online", title: "براساس آنلاین", description: "تصویر کارت نوازنده‌های آنلاین", src: "", alt: "همنوازهای آنلاین" },
  { id: "skill", title: "براساس مهارت", description: "تصویر کارت جستجو بر اساس مهارت", src: "", alt: "جستجو بر اساس مهارت" },
  { id: "trust", title: "براساس اعتبار", description: "تصویر کارت اعتبار و امتیاز", src: "", alt: "جستجو بر اساس اعتبار" },
  { id: "combined", title: "جستجوی ترکیبی", description: "تصویر کارت ویژه جستجوی ترکیبی", src: "", alt: "جستجوی ترکیبی همنواز" },
];

export default function AdminHomeMedia() {
  const [items, setItems] = useState(defaults);
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hamnavaz-home-media");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const current = useMemo(() => items.find((x) => x.id === active) || items[0], [items, active]);

  const update = (id, patch) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const chooseFile = (event, id) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => update(id, { src: String(reader.result), fileName: file.name });
    reader.readAsDataURL(file);
  };

  const save = () => {
    localStorage.setItem("hamnavaz-home-media", JSON.stringify(items));
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const clearImage = (id) => update(id, { src: "", fileName: "" });

  return (
    <main className="admin-page" dir="rtl">
      <style>{`
        .admin-page{min-height:100vh;background:#030407;color:#f7f8fb;font-family:Vazirmatn,Tahoma,system-ui,sans-serif;display:flex}
        .admin-sidebar{width:250px;border-left:1px solid rgba(255,255,255,.07);background:#070910;padding:24px 16px;position:fixed;inset:0 auto 0 0;z-index:5}
        .admin-brand{display:flex;align-items:center;gap:10px;padding:8px 10px 28px;border-bottom:1px solid rgba(255,255,255,.07);font-weight:900}
        .admin-logo{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#ffe89a,#ffb52e);color:#111}
        .admin-brand small{display:block;color:#555;font-size:8px;letter-spacing:.2em;margin-top:2px}
        .admin-nav{padding-top:22px;display:grid;gap:7px}.admin-nav button{width:100%;display:flex;align-items:center;gap:11px;border:0;background:transparent;color:#777;padding:12px 13px;border-radius:12px;text-align:right;font-size:12px}.admin-nav button.active,.admin-nav button:hover{background:rgba(255,181,46,.08);color:#ffd66b}.admin-nav svg{width:17px}
        .admin-main{width:calc(100% - 250px);margin-right:250px;padding:32px;max-width:1500px}.admin-top{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}.admin-kicker{color:#ffcf5a;font-size:10px;font-weight:800;letter-spacing:.15em}.admin-title{font-size:32px;font-weight:900;margin:6px 0}.admin-sub{color:#666;font-size:11px;margin:0}.admin-actions{display:flex;gap:9px}.admin-btn{border:1px solid rgba(255,255,255,.08);background:#0c1018;color:#ddd;border-radius:12px;padding:11px 15px;display:flex;align-items:center;gap:7px;font-size:11px}.admin-btn.primary{background:linear-gradient(135deg,#ffe89a,#ffb52e);color:#111;border:0;font-weight:900}.admin-btn svg{width:15px}
        .admin-layout{display:grid;grid-template-columns:390px 1fr;gap:18px}.admin-list,.admin-editor{border:1px solid rgba(255,255,255,.07);background:#080b12;border-radius:22px;overflow:hidden}.admin-list-head,.editor-head{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.07)}.admin-list-head b,.editor-head b{font-size:13px}.admin-list-head span{display:block;color:#555;font-size:9px;margin-top:4px}.media-row{display:flex;align-items:center;gap:12px;width:100%;border:0;border-bottom:1px solid rgba(255,255,255,.05);background:transparent;color:white;padding:12px;text-align:right}.media-row:hover,.media-row.active{background:rgba(255,181,46,.055)}.media-thumb{width:62px;height:52px;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#111827,#07080d);border:1px solid rgba(255,255,255,.07);display:grid;place-items:center;color:#555;flex:none}.media-thumb img{width:100%;height:100%;object-fit:cover}.media-info{min-width:0;flex:1}.media-info b{display:block;font-size:11px}.media-info span{display:block;color:#555;font-size:9px;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.media-status{font-size:8px;color:#666}.media-status.ok{color:#65f3a1}
        .editor-body{padding:22px}.editor-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.field label{display:block;color:#aaa;font-size:10px;font-weight:800;margin-bottom:8px}.field input{width:100%;background:#05070b;border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:12px;color:white;outline:0;font-size:11px}.field input:focus{border-color:rgba(255,181,46,.45)}.field.full{grid-column:1/-1}.upload-zone{margin-top:18px;min-height:310px;border:1px dashed rgba(255,181,46,.25);border-radius:18px;background:radial-gradient(circle at center,rgba(255,181,46,.06),transparent 65%);display:grid;place-items:center;overflow:hidden;position:relative}.upload-zone img{width:100%;height:310px;object-fit:cover}.upload-empty{text-align:center;color:#666}.upload-empty svg{color:#ffb52e;margin:auto}.upload-empty b{display:block;color:#bbb;font-size:12px;margin-top:10px}.upload-empty span{display:block;font-size:9px;margin-top:5px}.upload-label{display:inline-flex;align-items:center;gap:7px;margin-top:14px;padding:10px 14px;border-radius:11px;background:#121721;color:#ddd;font-size:10px;cursor:pointer}.upload-label input{display:none}.editor-footer{display:flex;justify-content:space-between;align-items:center;margin-top:18px}.danger{border:0;background:transparent;color:#777;font-size:10px;display:flex;align-items:center;gap:5px}.danger:hover{color:#ff6d88}.saved{display:flex;align-items:center;gap:6px;color:#69f2a4;font-size:10px}.preview-note{padding:13px 15px;margin-top:18px;border-radius:13px;background:rgba(57,217,255,.045);border:1px solid rgba(57,217,255,.1);color:#74dff3;font-size:9px;line-height:1.9}
        @media(max-width:950px){.admin-sidebar{width:72px;padding:18px 10px}.admin-brand span,.admin-nav button span{display:none}.admin-brand{justify-content:center}.admin-nav button{justify-content:center}.admin-main{width:calc(100% - 72px);margin-right:72px;padding:20px}.admin-layout{grid-template-columns:1fr}.admin-list{order:2}.admin-editor{order:1}}
        @media(max-width:620px){.admin-top{align-items:flex-start;flex-direction:column}.admin-title{font-size:25px}.admin-actions{width:100%}.admin-actions .admin-btn{flex:1;justify-content:center}.editor-grid{grid-template-columns:1fr}.field.full{grid-column:auto}.admin-main{padding:14px}.admin-sidebar{width:58px}.admin-main{width:calc(100% - 58px);margin-right:58px}}
      `}</style>

      <aside className="admin-sidebar">
        <div className="admin-brand"><div className="admin-logo"><Music2 size={21}/></div><span>همنواز<small>ADMIN PANEL</small></span></div>
        <nav className="admin-nav">
          <button className="active"><LayoutDashboard/><span>داشبورد</span></button>
          <button><Home/><span>مدیریت Home</span></button>
          <button><ImagePlus/><span>رسانه و تصاویر</span></button>
          <button><Users/><span>کاربران</span></button>
          <button><Music2/><span>موسیقی و سازها</span></button>
          <button><Settings/><span>تنظیمات</span></button>
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-top">
          <div><div className="admin-kicker">HAMNAVAZ 6 · ADMIN</div><h1 className="admin-title">مدیریت گرافیک Home</h1><p className="admin-sub">تصاویر و محتوای بصری صفحه اصلی را از یک نقطه مدیریت کن.</p></div>
          <div className="admin-actions"><a className="admin-btn" href="/Hamnavaz/"><Eye/> مشاهده Home</a><button className="admin-btn primary" onClick={save}><Save/> ذخیره تغییرات</button></div>
        </header>

        <div className="admin-layout">
          <section className="admin-list">
            <div className="admin-list-head"><b>کتابخانه تصاویر Home</b><span>{items.length} جایگاه قابل مدیریت</span></div>
            {items.map((item)=><button className={`media-row ${item.id===active?"active":""}`} key={item.id} onClick={()=>setActive(item.id)}><div className="media-thumb">{item.src?<img src={item.src} alt=""/>:<ImagePlus size={19}/>}</div><div className="media-info"><b>{item.title}</b><span>{item.description}</span></div><span className={`media-status ${item.src?"ok":""}`}>{item.src?"آماده":"بدون تصویر"}</span></button>)}
          </section>

          <section className="admin-editor">
            <div className="editor-head"><b>{current.title}</b></div>
            <div className="editor-body">
              <div className="editor-grid">
                <div className="field"><label>عنوان نمایش</label><input value={current.title} onChange={(e)=>update(current.id,{title:e.target.value})}/></div>
                <div className="field"><label>متن جایگزین تصویر (ALT)</label><input value={current.alt} onChange={(e)=>update(current.id,{alt:e.target.value})}/></div>
                <div className="field full"><label>توضیح</label><input value={current.description} onChange={(e)=>update(current.id,{description:e.target.value})}/></div>
              </div>
              <div className="upload-zone">{current.src?<img src={current.src} alt={current.alt}/>:<div className="upload-empty"><Upload size={32}/><b>تصویر این بخش را انتخاب کن</b><span>JPG، PNG یا WebP · برای بهترین نتیجه تصویر باکیفیت انتخاب کن</span><label className="upload-label"><Upload size={14}/> انتخاب تصویر<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>chooseFile(e,current.id)}/></label></div>}</div>
              {current.src&&<div className="editor-footer"><button className="danger" onClick={()=>clearImage(current.id)}><Trash2 size={14}/> حذف تصویر</button><label className="admin-btn"><Upload/> تعویض تصویر<input style={{display:"none"}} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>chooseFile(e,current.id)}/></label></div>}
              <div className="preview-note">پیش‌نمایش فعلاً در مرورگر ذخیره می‌شود. مرحله بعدی، اتصال همین داشبورد به API و فضای ذخیره‌سازی همنواز است تا تصویر بعد از آپلود برای همه کاربران Home نمایش داده شود.</div>
            </div>
          </section>
        </div>

        {saved&&<div className="saved" style={{position:"fixed",bottom:24,left:24,background:"#0c1510",border:"1px solid rgba(105,242,164,.2)",padding:"12px 16px",borderRadius:12}}><CheckCircle2 size={16}/> تغییرات در این مرورگر ذخیره شد</div>}
      </section>
    </main>
  );
}
