"use client";

import { MapPin, Search, Star, Users, Wifi, Guitar } from "lucide-react";
import { useMemo, useState } from "react";

const people = [
  { initials:"AR", name:"آرمان رضایی", instrument:"گیتار", city:"تهران", skill:"متوسط", ordinary:"4.9", collab:"5.0", online:true, tone:"gold" },
  { initials:"SN", name:"سارا نادری", instrument:"ویولن", city:"اصفهان", skill:"حرفه‌ای", ordinary:"4.9", collab:"4.8", online:true, tone:"violet" },
  { initials:"KM", name:"کیان مرادی", instrument:"پیانو", city:"شیراز", skill:"متوسط", ordinary:"4.8", collab:"4.9", online:true, tone:"cyan" },
  { initials:"MA", name:"مریم احمدی", instrument:"درام", city:"اصفهان", skill:"مقدماتی", ordinary:"4.7", collab:"5.0", online:false, tone:"rose" },
];

const modes = [
  ["online","آنلاین‌ها",Wifi],
  ["top","بیشترین امتیاز",Star],
  ["city","براساس شهر",MapPin],
  ["skill","براساس مهارت",Users],
  ["instrument","براساس ساز",Guitar],
];

export default function HamnavazFinder(){
  const [mode,setMode]=useState("online");
  const [query,setQuery]=useState("");

  const visible = useMemo(()=>{
    let list=[...people];
    if(mode==="online") list=list.filter(p=>p.online);
    if(mode==="top") list.sort((a,b)=>Number(b.collab)-Number(a.collab));
    if(mode==="city") list.sort((a,b)=>a.city.localeCompare(b.city,"fa"));
    if(mode==="skill") list.sort((a,b)=>({"حرفه‌ای":0,"متوسط":1,"مقدماتی":2}[a.skill]??9)-({"حرفه‌ای":0,"متوسط":1,"مقدماتی":2}[b.skill]??9));
    if(mode==="instrument") list.sort((a,b)=>a.instrument.localeCompare(b.instrument,"fa"));
    const q=query.trim();
    if(q) list=list.filter(p=>`${p.name} ${p.instrument} ${p.city} ${p.skill}`.includes(q));
    return list;
  },[mode,query]);

  return <div className="finder">
    <div className="finder-search">
      <Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ساز، شهر، مهارت یا نام نوازنده..."/><button onClick={()=>setQuery("")}>پاک کن</button>
    </div>
    <div className="finder-tabs" role="tablist">
      {modes.map(([id,label,Icon])=><button key={id} className={mode===id?"active":""} onClick={()=>setMode(id)} role="tab" aria-selected={mode===id}><Icon size={15}/>{label}</button>)}
    </div>
    <div className="finder-context"><div><b>{modes.find(x=>x[0]===mode)?.[1]}</b><span>{visible.length} نتیجه قابل مشاهده</span></div><small>فیلترها را عوض کن و آدم مناسب مسیرت را پیدا کن.</small></div>
    <div className="finder-people">
      {visible.map(p=><article className="finder-card" key={p.name}>
        <div className={`avatar ${p.tone} large`}>{p.initials}</div>
        <div className="finder-card-main"><div className="finder-name"><h3>{p.name}</h3>{p.online&&<span className="finder-online"><i/> آنلاین</span>}</div><p>{p.instrument} · {p.skill}</p><small>📍 {p.city}</small></div>
        <div className="finder-ratings"><span className="ordinary">★ {p.ordinary}</span><span className="collab">★ {p.collab}</span></div>
        <button className="finder-profile">پروفایل</button>
      </article>)}
      {!visible.length&&<div className="finder-empty">نوازنده‌ای با این مشخصات پیدا نشد؛ جست‌وجو را کمی بازتر کن.</div>}
    </div>
  </div>;
}
