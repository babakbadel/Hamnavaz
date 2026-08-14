"use client";

import { useEffect, useState } from "react";
import { getMusicians, getInstruments, getMusicianInstruments } from "../lib/api";
import {
  Menu,
  X,
  Search,
  Music2,
  Users,
  Heart,
  MessageCircle,
  Mic2,
  Guitar,
  GraduationCap,
  School,
  Ticket,
  ShoppingBag,
  Headphones,
  Sparkles,
  ChevronLeft,
  MapPin,
  Play,
  Handshake,
  Quote,
  HeartHandshake,
  Radio,
  Disc3,
  UserRoundPlus,
  Trophy,
  Star,
  ArrowLeft,
} from "lucide-react";


// ============================================================
// HAMNAVAZ LIVE VISUAL
// ============================================================

function LiveMusicVisual() {
  const [active, setActive] = useState(0);

  const musicians = [
    { icon: "🎸", name: "گیتار", color: "gold" },
    { icon: "🎹", name: "پیانو", color: "purple" },
    { icon: "🎻", name: "ویولن", color: "pink" },
    { icon: "🥁", name: "درام", color: "cyan" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((v) => (v + 1) % musicians.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="live-music-visual">

      <div className="laser laser-one" />
      <div className="laser laser-two" />
      <div className="laser laser-three" />

      <div className="live-glow" />

      <div className="equalizer">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${(i % 8) * -0.11}s`,
              animationDuration: `${0.65 + (i % 5) * 0.12}s`,
            }}
          />
        ))}
      </div>

      <div className="live-stage">

        <div className="live-stage-label">
          <span className="live-dot" />
          همنوازها در حال ساخت موسیقی
        </div>

        <div className="musician-orbit">

          {musicians.map((m, i) => (
            <div
              key={m.name}
              className={`floating-musician musician-${i} ${
                active === i ? "musician-active" : ""
              }`}
            >
              <div className="musician-instrument">
                {m.icon}
              </div>

              <div className="musician-avatar">
                {m.name.slice(0, 1)}
              </div>

              <small>{m.name}</small>
            </div>
          ))}

          <div className="charity-heart">
            ❤️
          </div>

        </div>

        <div className="live-now-playing">
          <div className="playing-cover">
            {musicians[active].icon}
          </div>

          <div>
            <strong>
              {musicians[active].name} در حال نواختن
            </strong>
            <span>
              یک همکاری برای یک هدف خوب
            </span>
          </div>

          <div className="mini-eq">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

      </div>
    </div>
  );
}

const services = [
  {
    number: "01",
    icon: HeartHandshake,
    title: "اجرای خیریه",
    text: "برای سالمندان، کودکان، بیماران و هر هدف انسانی، نوازنده و گروه پیدا کن.",
    accent: "rose",
  },
  {
    number: "02",
    icon: UserRoundPlus,
    title: "همنوازت را پیدا کن",
    text: "بر اساس ساز، شهر، سبک و سطح مهارت، همنواز مناسب خودت را پیدا کن.",
    accent: "gold",
  },
  {
    number: "03",
    icon: Users,
    title: "گروه موسیقی بساز",
    text: "نوازنده‌های مناسب را کنار هم قرار بده و گروه موسیقی خودت را بساز.",
    accent: "purple",
  },
];

const musicians = [
  {
    name: "آرمان رضایی",
    instrument: "گیتار",
    style: "پاپ",
    city: "تهران",
    level: "متوسط",
    rating: "4.9",
    avatar: "AR",
  },
  {
    name: "سارا نادری",
    instrument: "ویولن",
    style: "کلاسیک",
    city: "اصفهان",
    level: "حرفه‌ای",
    rating: "4.9",
    avatar: "SN",
  },
  {
    name: "کیان مرادی",
    instrument: "پیانو",
    style: "جاز",
    city: "شیراز",
    level: "متوسط",
    rating: "4.8",
    avatar: "KM",
  },
];

const collaborations = [
  {
    title: "تمرین پاپ و ویولن",
    people: "آرمان + سارا",
    city: "تهران",
    status: "همکاری موفق",
    rating: "5.0",
  },
  {
    title: "تشکیل گروه جَز",
    people: "کیان + ۳ همنواز",
    city: "شیراز",
    status: "گروه تشکیل شد",
    rating: "4.9",
  },
  {
    title: "اجرای خیریه",
    people: "۶ نوازنده",
    city: "اصفهان",
    status: "اجرای انجام‌شده",
    rating: "5.0",
  },
];

const comments = [
  {
    name: "مریم",
    text: "بالاخره تونستم برای تمرین، همنوازی با سطح خودم پیدا کنم.",
    type: "تجربه همکاری",
  },
  {
    name: "رضا",
    text: "برای اجرای خیریه گروه خیلی خوبی پیدا کردیم. واقعاً هدف همنواز ارزشمنده.",
    type: "اجرای خیریه",
  },
  {
    name: "سارا",
    text: "از طریق همنواز اعضای گروه جدیدمون رو پیدا کردیم.",
    type: "تشکیل گروه",
  },
];

const instruments = [
  ["🎸", "گیتار"],
  ["🎹", "پیانو"],
  ["🥁", "درام"],
  ["🎻", "ویولن"],
  ["🎷", "ساکسوفون"],
  ["🎺", "ترومپت"],
  ["🪕", "تار"],
  ["🪘", "پرکاشن"],
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="logo-mark">
        <Music2 size={24} />
      </div>

      <div>
        <div className="text-xl font-black">همنواز</div>
        <div className="logo-sub">HAMNAVAZ</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text, icon: Icon }) {
  return (
    <div className="section-title">
      <div>
        <div className="eyebrow">
          <Icon size={17} />
          {eyebrow}
        </div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>

      <button className="see-all">
        مشاهده همه
        <ChevronLeft size={17} />
      </button>
    </div>
  );
}

function Wave() {
  return (
    <div className="wave">
      {Array.from({ length: 45 }).map((_, i) => (
        <span
          key={i}
          style={{
            height: `${18 + Math.abs(Math.sin(i * 0.65)) * 70}%`,
          }}
        />
      ))}
    </div>
  );
}


function DynamicMusicStage() {
  const instruments = [
    { emoji: "🎸", name: "گیتار", color: "gold" },
    { emoji: "🎻", name: "ویولن", color: "violet" },
    { emoji: "🎹", name: "پیانو", color: "cyan" },
    { emoji: "🥁", name: "درام", color: "rose" },
  ];

  const [activeInstrument, setActiveInstrument] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const instrumentTimer = setInterval(() => {
      setActiveInstrument((v) => (v + 1) % instruments.length);
    }, 3200);

    const pulseTimer = setInterval(() => {
      setPulse((v) => v + 1);
    }, 180);

    return () => {
      clearInterval(instrumentTimer);
      clearInterval(pulseTimer);
    };
  }, []);

  const current = instruments[activeInstrument];

  const members = [
    { emoji: "🎸", name: "آرمان", x: "8%", delay: "0s" },
    { emoji: "🎻", name: "سارا", x: "31%", delay: ".25s" },
    { emoji: "🎹", name: "کیان", x: "55%", delay: ".5s" },
    { emoji: "🥁", name: "مریم", x: "78%", delay: ".75s" },
  ];

  return (
    <section className="dynamic-stage-section">
      <div className="dynamic-stage-bg" />
      <div className="laser laser-one" />
      <div className="laser laser-two" />
      <div className="laser laser-three" />

      <div className="dynamic-stage container">

        <div className="stage-heading">
          <div>
            <span className="eyebrow">
              <span className="live-dot" />
              LIVE HAMNAVAZ
            </span>

            <h2>
              موسیقی را فقط نبین؛
              <strong> زنده تجربه‌اش کن.</strong>
            </h2>

            <p>
              همنوازها همین حالا در حال تمرین، همکاری و ساختن موسیقی هستند.
            </p>
          </div>

          <div className="stage-live-counter">
            <span className="counter-dot" />
            <div>
              <strong>۱۲۸۴</strong>
              <small>همنواز آنلاین</small>
            </div>
          </div>
        </div>

        <div className="stage-grid">

          {/* PROFILE */}
          <div className="animated-profile-card">

            <div className="profile-light" />

            <div className="profile-top">
              <span className="profile-status">
                ● در حال تمرین
              </span>

              <span className="profile-location">
                تهران
              </span>
            </div>

            <div className={`animated-musician ${current.color}`}>

              <div className="musician-aura" />

              <div className="musician-head">
                <div className="musician-hair" />
                <div className="musician-face">
                  <span className="eye eye-one" />
                  <span className="eye eye-two" />
                  <span className="smile" />
                </div>
              </div>

              <div className="musician-body">
                <div className="musician-shirt" />
                <div className="musician-arm arm-left" />
                <div className="musician-arm arm-right" />

                <div
                  key={current.name}
                  className="instrument-floating"
                >
                  {current.emoji}
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div>
                <h3>آرمان رضایی</h3>
                <p>
                  نوازنده {current.name} · پاپ
                </p>
              </div>

              <div className="profile-rating">
                ★ ۴.۹
              </div>
            </div>

            <div className="instrument-switcher">
              {instruments.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => setActiveInstrument(i)}
                  className={i === activeInstrument ? "active" : ""}
                  title={item.name}
                >
                  {item.emoji}
                </button>
              ))}
            </div>

          </div>

          {/* GROUP */}
          <div className="animated-band-card">

            <div className="band-card-header">
              <div>
                <span className="eyebrow purple">
                  <span className="live-dot purple-dot" />
                  گروه در حال شکل‌گیری
                </span>

                <h3>
                  یک گروه برای
                  <strong> یک کار خوب</strong>
                </h3>
              </div>

              <span className="band-count">
                ۴ نوازنده
              </span>
            </div>

            <div className="band-stage">

              <div className="stage-floor" />

              <div className="group-lights">
                <span />
                <span />
                <span />
                <span />
              </div>

              {members.map((member) => (
                <div
                  key={member.name}
                  className="band-member"
                  style={{
                    left: member.x,
                    animationDelay: member.delay
                  }}
                >
                  <div className="member-glow" />

                  <div className="member-avatar">
                    <span className="member-face">
                      ●
                    </span>
                  </div>

                  <div className="member-instrument">
                    {member.emoji}
                  </div>

                  <small>{member.name}</small>
                </div>
              ))}

              <div className="charity-heart">
                ❤️
              </div>

              <div className="charity-label">
                اجرای خیریه
              </div>

            </div>

            <div className="band-footer">

              <div className="band-message">
                <span>❤️</span>
                <div>
                  <strong>موسیقی برای یک لبخند</strong>
                  <small>
                    گروه در حال آماده شدن برای اجرای خیریه
                  </small>
                </div>
              </div>

              <button className="stage-action">
                پیوستن به گروه
                <span>←</span>
              </button>

            </div>

          </div>

        </div>

        {/* EQUALIZER */}
        <div className="live-equalizer">

          <div className="eq-label">
            <span className="eq-live">
              LIVE
            </span>
            <span>
              صدای همنوازها
            </span>
          </div>

          <div className="eq-bars">
            {Array.from({ length: 76 }).map((_, i) => (
              <span
                key={i}
                style={{
                  animationDelay: `${(i % 11) * 0.06}s`,
                  animationDuration: `${0.45 + (i % 7) * 0.09}s`
                }}
              />
            ))}
          </div>

          <div className="eq-time">
            00:{String(pulse % 60).padStart(2, "0")}
          </div>

        </div>

      </div>
    </section>
  );
}


/* ============================================================
   HAMNAVAZ LIVE MUSIC VISUAL
   Dynamic musicians / instruments / laser / equalizer
   ============================================================ */

function LiveMusicStage() {
  const [active, setActive] = useState(0);

  const players = [
    {
      name: "آرمان",
      instrument: "🎸",
      label: "گیتار",
      level: "متوسط",
    },
    {
      name: "سارا",
      instrument: "🎻",
      label: "ویولن",
      level: "حرفه‌ای",
    },
    {
      name: "کیان",
      instrument: "🎹",
      label: "پیانو",
      level: "متوسط",
    },
    {
      name: "مهدی",
      instrument: "🥁",
      label: "درام",
      level: "آماتور",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((value) => (value + 1) % players.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="live-music-stage" aria-label="همنوازهای در حال نواختن">
      <div className="laser laser-one" />
      <div className="laser laser-two" />
      <div className="laser laser-three" />

      <div className="stage-glow" />

      <div className="stage-title">
        <span className="live-dot" />
        <span>همین حالا در همنواز</span>
      </div>

      <div className="stage-center">
        <div className="stage-disc">
          <div className="stage-disc-inner">
            <Music2 size={42} />
          </div>
        </div>

        <div className="equalizer">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              style={{
                animationDelay: `${i * -0.08}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="stage-musicians">
        {players.map((player, index) => (
          <div
            key={player.name}
            className={`stage-player ${
              active === index ? "stage-player-active" : ""
            }`}
          >
            <div className="player-ring">
              <div className="player-avatar">
                <span>{player.instrument}</span>
              </div>
            </div>

            <div className="player-info">
              <strong>{player.name}</strong>
              <span>{player.label}</span>
              <small>{player.level}</small>
            </div>

            {active === index && (
              <div className="player-playing">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="group-connection">
        <span />
        <span />
        <span />
        <b>۴ همنواز در حال ساختن موسیقی</b>
      </div>

      <div className="charity-stage-card">
        <div className="charity-stage-icon">❤️</div>
        <div>
          <strong>یک گروه برای یک کار خوب</strong>
          <small>اجرای خیریه · اصفهان</small>
        </div>
        <div className="charity-pulse">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [apiMusicians, setApiMusicians] = useState([]);
  const [apiInstruments, setApiInstruments] = useState([]);
  const [musicianInstrumentMap, setMusicianInstrumentMap] = useState({});
  const [musiciansLoading, setMusiciansLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadMusicians() {
      try {
        const [musiciansData, instrumentsData] = await Promise.all([
          getMusicians(),
          getInstruments(),
        ]);

        if (cancelled) return;

        const musiciansList = Array.isArray(musiciansData)
          ? musiciansData
          : [];

        const instrumentsList = Array.isArray(instrumentsData)
          ? instrumentsData
          : [];

        setApiMusicians(musiciansList);
        setApiInstruments(instrumentsList);

        // Load instrument relationships for each musician.
        const relations = await Promise.all(
          musiciansList.map(async (person) => {
            try {
              const items = await getMusicianInstruments(person.user_id);
              return [
                person.user_id,
                Array.isArray(items) ? items : [],
              ];
            } catch (error) {
              console.error(
                `Musician instrument API error for user ${person.user_id}:`,
                error
              );

              return [person.user_id, []];
            }
          })
        );

        if (cancelled) return;

        setMusicianInstrumentMap(
          Object.fromEntries(relations)
        );
      } catch (error) {
        console.error("Hamnavaz musicians API error:", error);
      } finally {
        if (!cancelled) {
          setMusiciansLoading(false);
        }
      }
    }

    loadMusicians();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayMusicians =
    apiMusicians.length > 0
      ? apiMusicians.map((person, index) => {
          const relations =
            musicianInstrumentMap[person.user_id] || [];

          const primary =
            relations.find((item) => item.is_primary) ||
            relations[0];

          const instrument =
            primary
              ? apiInstruments.find(
                  (item) => item.id === primary.instrument_id
                )
              : null;

          const levelMap = {
            beginner: "مبتدی",
            intermediate: "متوسط",
            advanced: "حرفه‌ای",
            professional: "حرفه‌ای",
          };

          return {
            ...person,

            name:
              person.display_name ||
              `نوازنده ${index + 1}`,

            instrument:
              instrument?.name ||
              "ساز ثبت نشده",

            style:
              instrument?.family ||
              "موسیقی",

            city:
              person.city ||
              "شهر ثبت نشده",

            level:
              levelMap[primary?.level] ||
              primary?.level ||
              "سطح ثبت نشده",

            rating:
              person.rating ||
              "—",

            avatar:
              person.avatar_url ||
              (person.display_name
                ? person.display_name.slice(0, 2)
                : "HN"),

            yearsExperience:
              primary?.years_experience || null,
          };
        })
      : musicians;

  return (
    <main className="site">
      <LiveMusicStage />


      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-inner">
          <Logo />

          <div className="nav-links">
            <a href="#mission">هدف همنواز</a>
            <a href="#musicians">همنوازها</a>
            <a href="#collaborations">همکاری‌ها</a>
            <a href="#music">موسیقی</a>
          </div>

          <div className="nav-actions">
            <button className="icon-button">
              <Heart size={18} />
            </button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow glow-gold" />
        <div className="hero-glow glow-purple" />
        <div className="grid-pattern" />

        <div className="hero-inner">

          <div className="hero-copy">
            <div className="hero-badge">
              <Sparkles size={15} />
              موسیقی وقتی زیباتر است که با هم ساخته شود
            </div>

            <h1>
              موسیقی را
              <br />
              <span>با هم بسازیم.</span>
            </h1>

            <p className="hero-text">
              همنواز جایی است برای پیدا کردن آدم‌های مناسب
              برای تمرین، تشکیل گروه، اجرا و ساختن موسیقی؛
              و مهم‌تر از همه، کنار هم بودن برای یک هدف خوب.
            </p>

            <div className="hero-search">
              <Search size={21} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="نوازنده، ساز، شهر یا سبک موسیقی..."
              />

              <button>جستجو</button>
            </div>

            <div className="search-hints">
              <span>مثلاً:</span>
              <button>گیتاریست تهران</button>
              <button>همنواز پیانو</button>
              <button>گروه جَز</button>
              <button>اجرای خیریه</button>
            </div>
          </div>

          <div className="hero-visual">

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="music-card music-card-one">
              ❤️
              <strong>اجرای خیریه</strong>
            </div>

            <div className="music-card music-card-two">
              🎸
              <strong>همنوازت را پیدا کن</strong>
            </div>

            <div className="music-card music-card-three">
              👥
              <strong>گروه بساز</strong>
            </div>

            <div className="hero-disc">
              <Music2 size={70} />
              <span>HAMNAVAZ</span>
            </div>

            <div className="online-card">
              <span className="online-dot" />
              <div>
                <strong>۱٬۲۸۴ همنواز آنلاین</strong>
                <small>آدم‌هایی که همین حالا موسیقی می‌سازند</small>
              </div>
            </div>

            <Wave />
          </div>
        </div>
      </section>

      {/* MISSION */}
      
        <div className="hamnavaz-live-layer"><LiveMusicVisual /></div>

<section id="mission" className="mission section">
        <div className="container">

          <SectionTitle
            eyebrow="WHY HAMNAVAZ"
            title="سه دلیل اصلی برای ساختن همنواز"
            text="سه مسیر اصلی که همنواز برای آن ساخته شده؛ بقیه امکانات در ادامه این تجربه قرار می‌گیرند."
            icon={HeartHandshake}
          />

          <div className="mission-grid">
            {services.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className={`mission-card ${item.accent}`}
                >
                  <div className="mission-number">
                    {item.number}
                  </div>

                  <div className="mission-icon">
                    <Icon size={28} />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <button>
                    شروع کن
                    <ArrowLeft size={17} />
                  </button>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats-grid">
          <div>
            <strong>۳٬۸۷۰</strong>
            <span>نوازنده</span>
          </div>

          <div>
            <strong>۲۴۶</strong>
            <span>اجرای فعال</span>
          </div>

          <div>
            <strong>۱۸۴</strong>
            <span>همکاری موفق</span>
          </div>

          <div>
            <strong>۴٫۸۹</strong>
            <span>میانگین رضایت</span>
          </div>
        </div>
      </section>

      {/* MUSICIANS */}
      <section id="musicians" className="section">
        <div className="container">

          <SectionTitle
            eyebrow="FIND YOUR PARTNER"
            title="همنواز مناسب خودت را پیدا کن"
            text="سطح، ساز، سبک و شهر را در نظر بگیر تا تمرین با آدم مناسب شکل بگیرد."
            icon={UserRoundPlus}
          />

          <div className="filter-row">
            <button className="filter active">همه</button>
            <button className="filter">مبتدی</button>
            <button className="filter">متوسط</button>
            <button className="filter">حرفه‌ای</button>
            <button className="filter">تهران</button>
            <button className="filter">اصفهان</button>
            <button className="filter">شیراز</button>
          </div>

          <div className="musician-grid">
            {displayMusicians.map((person, index) => (
              <article className="musician-card" key={person.id || person.user_id || person.name || index}>

                <div className="musician-top">
                  <div className="avatar">
                    {person.avatar}
                  </div>

                  <div>
                    <h3>{person.name}</h3>
                    <p>
                      {person.instrument} · {person.style}
                    </p>
                  </div>

                  <button className="heart-small">
                    <Heart size={17} />
                  </button>
                </div>

                <div className="person-tags">
                  <span>{person.level}</span>
                  <span>
                    <MapPin size={13} />
                    {person.city}
                  </span>
                </div>

                <div className="person-bottom">
                  <span className="rating">
                    <Star size={15} fill="currentColor" />
                    {person.rating}
                  </span>

                  <button className="profile-button">
                    مشاهده پروفایل
                    <ChevronLeft size={16} />
                  </button>
                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATIONS */}
      <section id="collaborations" className="section dark-section">
        <div className="container">

          <SectionTitle
            eyebrow="REAL COLLABORATIONS"
            title="همکاری‌هایی که واقعاً شکل گرفته‌اند"
            text="از یک تمرین ساده تا تشکیل گروه و اجرای خیریه."
            icon={Handshake}
          />

          <div className="collaboration-grid">
            {collaborations.map((item) => (
              <article className="collab-card" key={item.title}>

                <div className="collab-icon">
                  <Handshake size={21} />
                </div>

                <div className="collab-status">
                  {item.status}
                </div>

                <h3>{item.title}</h3>

                <p>{item.people}</p>

                <div className="collab-meta">
                  <span>
                    <MapPin size={14} />
                    {item.city}
                  </span>

                  <span className="rating">
                    <Star size={14} fill="currentColor" />
                    {item.rating}
                  </span>
                </div>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* COMMENTS */}
      <section className="section comments-section">
        <div className="container">

          <SectionTitle
            eyebrow="COMMUNITY VOICES"
            title="آدم‌ها درباره تجربه‌شان چه می‌گویند؟"
            text="اعتماد در همنواز از تجربه واقعی کاربران ساخته می‌شود."
            icon={MessageCircle}
          />

          <div className="comments-grid">
            {comments.map((comment) => (
              <article className="comment-card" key={comment.name}>

                <Quote size={27} />

                <p>{comment.text}</p>

                <div className="comment-footer">
                  <div className="comment-avatar">
                    {comment.name[0]}
                  </div>

                  <div>
                    <strong>{comment.name}</strong>
                    <span>{comment.type}</span>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="section music-section">
        <div className="container">

          <SectionTitle
            eyebrow="MUSIC CREATED TOGETHER"
            title="موسیقی‌هایی که با هم ساخته شده‌اند"
            text="همکاری فقط پیدا کردن یک نفر نیست؛ نتیجه‌اش می‌تواند یک قطعه، یک اجرا یا یک خاطره باشد."
            icon={Disc3}
          />

          <div className="music-feature">

            <div className="album-art">
              <Music2 size={75} />
              <span>01</span>
            </div>

            <div className="music-info">
              <span className="music-label">همکاری همنوازها</span>
              <h3>یک قدم با هم</h3>
              <p>
                قطعه‌ای ساخته‌شده از همکاری چهار نوازنده
                از تهران و اصفهان.
              </p>

              <div className="music-actions">
                <button className="play-button">
                  <Play size={18} fill="currentColor" />
                  پخش موسیقی
                </button>

                <button className="outline-button">
                  مشاهده همه موسیقی‌ها
                </button>
              </div>
            </div>

            <div className="music-wave">
              <Wave />
            </div>

          </div>

        </div>
      </section>

      {/* EVENTS */}
      <section className="section">
        <div className="container">

          <SectionTitle
            eyebrow="LIVE"
            title="اجراها و کنسرت‌ها"
            text="جایی که همنوازی از تمرین بیرون می‌آید و روی صحنه می‌رود."
            icon={Mic2}
          />

          <div className="event-grid">

            <article className="event-card charity-event">
              <div className="event-date">
                <strong>۲۴</strong>
                <span>مرداد</span>
              </div>

              <div>
                <span className="event-type">
                  اجرای خیریه
                </span>

                <h3>موسیقی برای یک لبخند</h3>

                <p>
                  اجرای گروهی برای یک مرکز خیریه
                </p>

                <span className="event-place">
                  <MapPin size={14} />
                  تهران
                </span>
              </div>
            </article>

            <article className="event-card">
              <div className="event-date">
                <strong>۰۲</strong>
                <span>شهریور</span>
              </div>

              <div>
                <span className="event-type">
                  کنسرت
                </span>

                <h3>شب جَز همنواز</h3>

                <p>
                  اجرای زنده گروه‌های همنواز
                </p>

                <span className="event-place">
                  <MapPin size={14} />
                  اصفهان
                </span>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* INSTRUMENTS */}
      <section className="section instruments-section">
        <div className="container">

          <SectionTitle
            eyebrow="DISCOVER"
            title="سازها را کشف کن"
            text="هر ساز می‌تواند شروع یک همنوازی تازه باشد."
            icon={Guitar}
          />

          <div className="instrument-grid">
            {instruments.map(([emoji, title]) => (
              <button className="instrument-card" key={title}>
                <span>{emoji}</span>
                <strong>{title}</strong>
                <ChevronLeft size={16} />
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="section other-section">
        <div className="container">

          <SectionTitle
            eyebrow="MORE FROM HAMNAVAZ"
            title="بقیه دنیای همنواز"
            text="همه چیز فقط به پیدا کردن همنواز ختم نمی‌شود."
            icon={Sparkles}
          />

          <div className="other-grid">

            <button>
              <GraduationCap />
              <strong>مدرس‌ها</strong>
              <span>یادگیری موسیقی</span>
            </button>

            <button>
              <School />
              <strong>آموزشگاه‌ها</strong>
              <span>کلاس و آموزش</span>
            </button>

            <button>
              <ShoppingBag />
              <strong>فروشگاه ساز</strong>
              <span>تجهیزات موسیقی</span>
            </button>

            <button>
              <Headphones />
              <strong>فروش موسیقی</strong>
              <span>موسیقی و آثار</span>
            </button>

            <button>
              <MessageCircle />
              <strong>اجتماع همنواز</strong>
              <span>گفت‌وگو و ارتباط</span>
            </button>

            <button>
              <Trophy />
              <strong>آخرین مشارکت‌ها</strong>
              <span>فعالیت‌های جامعه</span>
            </button>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">

          <div className="cta-box">

            <div className="cta-glow" />

            <HeartHandshake size={42} />

            <h2>
              شاید همنواز بعدی تو
              <br />
              همین نزدیکی باشد.
            </h2>

            <p>
              برای تمرین، گروه، اجرا یا یک کار خوب،
              موسیقی را تنها نساز.
            </p>

            <button>
              پیدا کردن همنواز
              <ArrowLeft size={18} />
            </button>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">

          <Logo />

          <div className="footer-links">
            <a href="#mission">درباره همنواز</a>
            <a href="#musicians">نوازنده‌ها</a>
            <a href="#collaborations">همکاری‌ها</a>
            <a href="#music">موسیقی‌ها</a>
          </div>

          <div className="footer-copy">
            موسیقی را با هم بسازیم · © 2026 Hamnavaz
          </div>

        </div>
      </footer>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menu-overlay">

          <button
            className="menu-backdrop"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="side-menu">

            <div className="side-menu-head">
              <Logo />

              <button
                className="icon-button"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </button>
            </div>

            <div className="side-links">

              <a href="#mission" onClick={() => setMenuOpen(false)}>
                <HeartHandshake />
                اجرای خیریه
              </a>

              <a href="#musicians" onClick={() => setMenuOpen(false)}>
                <UserRoundPlus />
                پیدا کردن همنواز
              </a>

              <a href="#collaborations" onClick={() => setMenuOpen(false)}>
                <Users />
                تشکیل گروه
              </a>

              <a href="#collaborations" onClick={() => setMenuOpen(false)}>
                <Handshake />
                همکاری‌ها
              </a>

              <a href="#music" onClick={() => setMenuOpen(false)}>
                <Disc3 />
                موسیقی‌های تولیدشده
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <Mic2 />
                اجراها
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <Ticket />
                کنسرت‌ها
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <Guitar />
                سازها
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <GraduationCap />
                مدرس‌ها
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <School />
                آموزشگاه‌ها
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <ShoppingBag />
                فروشگاه ساز
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <Headphones />
                فروش موسیقی
              </a>

              <a href="#" onClick={() => setMenuOpen(false)}>
                <MessageCircle />
                اجتماع همنواز
              </a>

            </div>

            <div className="side-note">
              <Sparkles size={17} />
              <p>
                همنواز جایی است برای پیدا کردن آدم‌هایی
                که موسیقی را مثل تو دوست دارند.
              </p>
            </div>

          </aside>
        </div>
      )}

    </main>
  );
}
