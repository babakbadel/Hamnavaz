import Link from "next/link";
import { getMusician } from "../../../lib/api";

export default async function MusicianProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let data: Awaited<ReturnType<typeof getMusician>> | null = null;
  try { data = await getMusician(id); } catch {}
  if (!data) return <main className="container page-shell"><nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link></nav><div className="empty">پروفایل پیدا نشد.</div></main>;
  const p = data.profile;
  return <main className="container page-shell">
    <nav className="nav"><Link className="brand" href="/"><span>♪</span> همنواز</Link><Link className="login" href="/musicians">بازگشت به نوازنده‌ها</Link></nav>
    <section className="profile-hero">
      <div className="avatar avatar-large">{p.avatar_url ? <img src={p.avatar_url} alt=""/> : "♪"}</div>
      <div><p className="eyebrow">پروفایل نوازنده</p><h1>{p.display_name}</h1><p className="lead">{p.city_name || p.city || "شهر ثبت نشده"}</p></div>
      <Link className="primary-action" href={`/collaboration/${id}`}>درخواست همکاری</Link>
    </section>
    <section className="profile-grid"><article className="panel"><h2>درباره من</h2><p>{p.bio || "این نوازنده هنوز توضیحی درباره خودش ثبت نکرده است."}</p></article><article className="panel"><h2>ساز و مهارت</h2>{data.instruments.length ? data.instruments.map((x,i)=><div className="skill" key={i}>{String(x.instrument_id ?? "ساز")}<span>{String(x.level ?? "فعال")}</span></div>) : <p>هنوز سازی ثبت نشده است.</p>}</article></section>
  </main>;
}
