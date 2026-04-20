import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV = [
  { label: "Система", id: "hero" },
  { label: "Разработка", id: "services" },
  { label: "Проекты", id: "projects" },
  { label: "Обучение", id: "edu" },
  { label: "Связь", id: "contacts" },
];

const DEV_GAMES = [
  {
    tag: "SYS::PYTHON",
    title: "Игры на Python",
    desc: "Полноценные 2D-игры: платформеры, аркады, головоломки. Pygame, Arcade — выбираем стек под задачу.",
    tags: ["Python", "Pygame", "2D"],
    color: "var(--g)",
  },
  {
    tag: "SYS::SCRATCH",
    title: "Игры на Scratch",
    desc: "Визуальные игры и интерактивные истории. Школьные олимпиады, подарки, первые проекты.",
    tags: ["Scratch", "Визуал", "Дети"],
    color: "var(--c)",
  },
  {
    tag: "SYS::MVP",
    title: "Прототипы",
    desc: "Быстрый прототип за 1–2 недели. Покажи механику инвесторам или протестируй идею.",
    tags: ["MVP", "Быстро", "Python"],
    color: "var(--p)",
  },
];

const EDU_COURSES = [
  {
    tag: "MODULE_01",
    title: "Python с нуля",
    level: "Любой уровень",
    duration: "8–12 нед",
    desc: "Переменные, циклы, функции, ООП — всё через игровые задачи. Финальный проект — твоя первая игра.",
    color: "var(--g)",
    list: ["Живые занятия онлайн", "Домашки с проверкой", "Финальная игра-проект"],
  },
  {
    tag: "MODULE_02",
    title: "Scratch для детей",
    level: "7–14 лет",
    duration: "6–8 нед",
    desc: "Визуальные блоки вместо синтаксиса. Ребёнок сам создаёт героев, уровни и сюжет.",
    color: "var(--c)",
    list: ["Без предварительных знаний", "Группа или индивидуально", "Сертификат выпускника"],
  },
];

const WORKS = [
  { title: "Runner Dino",  tech: "Python · Pygame", desc: "Бесконечный раннер с препятствиями и таблицей рекордов", color: "var(--g)"  },
  { title: "Maze Quest",   tech: "Python · Pygame", desc: "Лабиринт с процедурной генерацией уровней", color: "var(--c)"  },
  { title: "Space Catcher",tech: "Scratch",         desc: "Аркада: ловим звёзды, уворачиваемся от метеоритов",   color: "var(--p)"  },
  { title: "Frog Jump",    tech: "Scratch",         desc: "Платформер с уровнями, врагами и сохранением прогресса", color: "#ff4466" },
];

const STATS = [
  { val: "2+",  label: "года опыта",      sym: "[YRS]" },
  { val: "30+", label: "игр создано",     sym: "[GMS]" },
  { val: "50+", label: "учеников",        sym: "[USR]" },
  { val: "2",   label: "языка программ.", sym: "[LNG]" },
];

function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const chars = "アイウエオカキクケコ01アBCDEF{}[]<>/\\|#@$%^&*!~;:PYTHON_SCRATCH_GAME_CODE_HACK";
    const fs = 13;
    const cols = Math.floor(c.width / fs);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(5,8,5,0.055)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${fs}px 'Share Tech Mono', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const bright = drops[i] * fs < 40;
        ctx.fillStyle = bright ? "rgba(0,255,65,1)" : `rgba(0,255,65,${(Math.random() * 0.4 + 0.15).toFixed(2)})`;
        ctx.fillText(ch, i * fs, drops[i] * fs);
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const id = setInterval(draw, 48);
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} id="matrix-bg" />;
}

function TypingText({ text, speed = 55 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => { setOut(p => p + text[i]); setI(p => p + 1); }, speed);
      return () => clearTimeout(t);
    }
  }, [i, text, speed]);
  return <span>{out}{i < text.length && <span className="blink" style={{ color: "var(--g)" }}>█</span>}</span>;
}

export default function Index() {
  const [active, setActive] = useState("hero");
  const [menu, setMenu] = useState(false);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  useEffect(() => {
    const h = () => {
      for (const n of [...NAV].reverse()) {
        const el = document.getElementById(n.id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(n.id); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="min-h-screen hack-grid" style={{ background: "var(--bg)" }}>
      <MatrixCanvas />
      <div className="scanlines" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3.5"
        style={{ background: "rgba(5,8,5,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,255,65,0.1)" }}>
        <button onClick={() => go("hero")} className="font-orb font-black text-base tracking-widest"
          style={{ color: "var(--g)", textShadow: "0 0 10px rgba(0,255,65,0.6)" }}>
          GAME<span style={{ color: "var(--c)" }}>CODE</span><span className="blink" style={{ color: "var(--g)" }}>_</span>
        </button>
        <div className="hidden md:flex gap-8">
          {NAV.map(n => (
            <button key={n.id} className={`nav-link ${active === n.id ? "active" : ""}`} onClick={() => go(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
        <button className="hidden md:block btn-hack px-5 py-2 rounded-none" onClick={() => go("contacts")}>
          Связаться
        </button>
        <button className="md:hidden" onClick={() => setMenu(!menu)} style={{ color: "var(--g)" }}>
          <Icon name={menu ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menu && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(5,8,5,0.97)", backdropFilter: "blur(20px)" }}>
          {NAV.map(n => (
            <button key={n.id} className="nav-link text-base" onClick={() => go(n.id)}>{n.label}</button>
          ))}
          <button className="btn-hack px-10 py-3 mt-4 rounded-none" onClick={() => go("contacts")}>СВЯЗАТЬСЯ</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, var(--g) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--c) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        {/* floating symbols */}
        <div className="absolute top-36 left-[7%] font-ibm text-2xl flt1 select-none opacity-15" style={{ color: "var(--g)" }}>{"</>"}</div>
        <div className="absolute top-48 right-[8%] font-ibm text-xl flt2 select-none opacity-15" style={{ color: "var(--c)" }}>{"{ }"}</div>
        <div className="absolute bottom-36 left-[12%] font-ibm text-xl flt2 select-none opacity-10" style={{ color: "var(--g)" }}>{">>_"}</div>
        <div className="absolute bottom-44 right-[10%] font-ibm text-xl flt1 select-none opacity-10" style={{ color: "var(--p)" }}>{"#!"}</div>

        <div className="relative z-10 max-w-3xl">
          <div className="fu fu-1 sys-label mb-6">
            ▸ GAMECODE_STUDIO :: BOOT_2024 :: STATUS_ONLINE
          </div>

          <div className="fu fu-2 mb-2">
            <h1 className="glitch font-orb font-black"
              data-text="GAMECODE"
              style={{
                fontSize: "clamp(2.8rem, 10vw, 7rem)",
                lineHeight: 1,
                color: "var(--g)",
                textShadow: "0 0 20px var(--g), 0 0 50px rgba(0,255,65,0.35), 0 0 100px rgba(0,255,65,0.15)",
              }}>
              GAMECODE
            </h1>
          </div>

          <div className="fu fu-3 mt-4 mb-2">
            <p className="font-ibm text-lg" style={{ color: "var(--c)", textShadow: "0 0 10px rgba(0,229,255,0.4)" }}>
              <TypingText text="// Разработка игр · Python · Scratch · Обучение" />
            </p>
          </div>

          <div className="fu fu-4 mt-4 mb-10">
            <p className="max-w-lg mx-auto text-sm leading-relaxed font-ibm"
              style={{ color: "rgba(0,255,65,0.55)", lineHeight: 1.85 }}>
              Создаём игры и обучаем программированию с 2024 года.
              Взламываем скуку — пишем код, который живёт и дышит.
            </p>
          </div>

          <div className="fu fu-5 flex flex-wrap gap-4 justify-center mb-14">
            <button className="btn-hack px-8 py-3.5 rounded-none" onClick={() => go("services")}>
              [ ЗАКАЗАТЬ ИГРУ ]
            </button>
            <button className="btn-hack-c px-8 py-3.5 rounded-none" onClick={() => go("edu")}>
              [ ЗАПИСАТЬСЯ ]
            </button>
          </div>

          {/* STATS */}
          <div className="fu fu-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="hack-card p-4 text-center">
                <div className="sys-label mb-1">{s.sym}</div>
                <div className="font-orb font-black text-2xl neon-g mb-1">{s.val}</div>
                <div className="text-xs font-ibm" style={{ color: "rgba(0,255,65,0.38)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          onClick={() => go("services")} style={{ color: "rgba(0,255,65,0.3)" }}>
          <Icon name="ChevronDown" size={24} />
        </button>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="sys-label mb-3">// MODULE_01 :: РАЗРАБОТКА_ИГР</p>
            <h2 className="font-orb font-black text-3xl md:text-4xl neon-g mb-3">
              Создаём игры
            </h2>
            <p className="font-ibm text-sm" style={{ color: "rgba(0,255,65,0.45)" }}>
              Python и Scratch — наш стек. От аркады до многоуровневой головоломки.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {DEV_GAMES.map(g => (
              <div key={g.title} className="hack-card p-6">
                <div className="sys-label mb-3">{g.tag}</div>
                <h3 className="font-orb font-bold text-base mb-3" style={{ color: g.color, textShadow: `0 0 10px ${g.color}55` }}>
                  {g.title}
                </h3>
                <p className="text-sm font-ibm leading-relaxed mb-5" style={{ color: "rgba(0,255,65,0.5)" }}>
                  {g.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.tags.map(t => (
                    <span key={t} className="text-xs font-ibm px-2 py-0.5"
                      style={{ background: `${g.color}12`, color: g.color, border: `1px solid ${g.color}30` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button className="btn-hack px-10 py-3.5 rounded-none" onClick={() => go("contacts")}>
              [ ОБСУДИТЬ ПРОЕКТ → ]
            </button>
          </div>
        </div>
      </section>

      <hr className="hack-divider mx-6" />

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="sys-label mb-3">// MODULE_02 :: ПОРТФОЛИО</p>
            <h2 className="font-orb font-black text-3xl md:text-4xl neon-c mb-3">Наши работы</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {WORKS.map(w => (
              <div key={w.title} className="hack-card p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 font-ibm text-xs"
                    style={{ color: w.color, background: `${w.color}12`, border: `1px solid ${w.color}30`, padding: "2px 8px" }}>
                    {w.tech}
                  </div>
                </div>
                <h3 className="font-orb font-bold mt-2 mb-1 text-sm"
                  style={{ color: w.color, textShadow: `0 0 8px ${w.color}50` }}>
                  {w.title}
                </h3>
                <p className="text-sm font-ibm" style={{ color: "rgba(0,255,65,0.45)" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hack-divider mx-6" />

      {/* ── SCRATCH STUDIO ── */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="sys-label mb-3">// MODULE_02b :: SCRATCH_STUDIO</p>
            <h2 className="font-orb font-black text-2xl md:text-3xl neon-c mb-3">Наша студия на Scratch</h2>
          </div>

          <a
            href="https://scratch.mit.edu/studios/51408504"
            target="_blank"
            rel="noopener noreferrer"
            className="hack-card block p-0 overflow-hidden no-underline"
            style={{ borderColor: "rgba(0,229,255,0.25)" }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Scratch logo side */}
              <div className="flex-shrink-0 flex items-center justify-center md:w-48 py-8 px-6"
                style={{ background: "rgba(0,229,255,0.04)", borderRight: "1px solid rgba(0,229,255,0.12)" }}>
                <div className="text-center">
                  <div className="text-5xl mb-2">🐱</div>
                  <div className="font-orb font-black text-xs tracking-widest" style={{ color: "var(--c)" }}>SCRATCH</div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-6 md:p-8">
                <div className="sys-label mb-2">СТУДИЯ :: VERIFIED</div>
                <h3 className="font-orb font-black text-xl mb-2" style={{ color: "var(--c)", textShadow: "0 0 12px rgba(0,229,255,0.4)" }}>
                  Программисты 369
                </h3>
                <p className="font-ibm text-sm mb-5" style={{ color: "rgba(0,255,65,0.5)" }}>
                  Официальная студия GameCode на платформе Scratch. Здесь собраны все наши проекты — можешь поиграть прямо в браузере.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {[
                    { val: "22", label: "проекта", color: "var(--g)" },
                    { val: "5",  label: "участников", color: "var(--c)" },
                    { val: "5",  label: "подписчиков", color: "var(--p)" },
                  ].map(s => (
                    <div key={s.label} className="text-center px-4 py-2"
                      style={{ border: `1px solid ${s.color}25`, background: `${s.color}08` }}>
                      <div className="font-orb font-black text-lg" style={{ color: s.color }}>{s.val}</div>
                      <div className="sys-label text-xs" style={{ opacity: 0.6 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 font-ibm text-sm"
                  style={{ color: "var(--c)", textShadow: "0 0 8px rgba(0,229,255,0.4)" }}>
                  <Icon name="ExternalLink" size={14} />
                  scratch.mit.edu/studios/51408504
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-2.5 flex items-center justify-between"
              style={{ background: "rgba(0,229,255,0.04)", borderTop: "1px solid rgba(0,229,255,0.1)" }}>
              <span className="sys-label text-xs">▸ НАЖМИ ЧТОБЫ ОТКРЫТЬ СТУДИЮ</span>
              <Icon name="ArrowRight" size={14} style={{ color: "var(--c)" }} />
            </div>
          </a>
        </div>
      </section>

      <hr className="hack-divider mx-6" />

      {/* ── EDUCATION ── */}
      <section id="edu" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="sys-label mb-3">// MODULE_03 :: ОБУЧЕНИЕ</p>
            <h2 className="font-orb font-black text-3xl md:text-4xl neon-p mb-3">Учим программировать</h2>
            <p className="font-ibm text-sm" style={{ color: "rgba(0,255,65,0.45)" }}>
              Python и Scratch — через игровые задачи и реальные проекты. Скучных лекций нет.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {EDU_COURSES.map(c => (
              <div key={c.title} className="hack-card p-7">
                <div className="sys-label mb-3">{c.tag}</div>
                <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                  <h3 className="font-orb font-black text-lg"
                    style={{ color: c.color, textShadow: `0 0 12px ${c.color}55` }}>
                    {c.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <span className="font-ibm text-xs px-2 py-0.5"
                      style={{ border: "1px solid rgba(0,255,65,0.15)", color: "rgba(0,255,65,0.4)" }}>
                      {c.level}
                    </span>
                    <span className="font-ibm text-xs px-2 py-0.5"
                      style={{ background: `${c.color}12`, color: c.color, border: `1px solid ${c.color}30` }}>
                      {c.duration}
                    </span>
                  </div>
                </div>
                <p className="font-ibm text-sm leading-relaxed mb-5" style={{ color: "rgba(0,255,65,0.5)" }}>
                  {c.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {c.list.map(h => (
                    <li key={h} className="font-ibm text-sm flex items-center gap-2"
                      style={{ color: "rgba(0,255,65,0.65)" }}>
                      <span style={{ color: c.color }}>▸</span> {h}
                    </li>
                  ))}
                </ul>
                <button className="btn-hack w-full py-3 rounded-none" onClick={() => go("contacts")}>
                  [ ЗАПИСАТЬСЯ ]
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hack-divider mx-6" />

      {/* ── ABOUT ── */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto terminal-box p-8 pt-10">
          <p className="sys-label mb-4">// ABOUT :: GAMECODE_STUDIO</p>
          <p className="font-ibm text-sm leading-relaxed" style={{ color: "rgba(0,255,65,0.65)", lineHeight: 1.9 }}>
            <span style={{ color: "var(--g)" }}>{">"}</span> GAMECODE_STUDIO :: запущена в{" "}
            <span className="neon-g">2024</span>.{" "}
            Стаж <span className="neon-g">2 года</span>. Специализация:{" "}
            <span style={{ color: "var(--g)" }}>Python</span> +{" "}
            <span style={{ color: "var(--c)" }}>Scratch</span>.
            <br />
            <span style={{ color: "var(--g)" }}>{">"}</span> Разрабатываем игры и обучаем детей и взрослых
            программированию через реальные проекты.
            <br />
            <span style={{ color: "var(--g)" }}>{">"}</span> Миссия: сделать код понятным,
            а игры — твоими.{" "}
            <span className="blink" style={{ color: "var(--g)" }}>█</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {["Python", "Scratch", "Pygame", "Game Dev", "Обучение", "С 2024"].map(t => (
              <span key={t} className="font-ibm text-xs px-3 py-1"
                style={{ border: "1px solid rgba(0,255,65,0.2)", color: "rgba(0,255,65,0.55)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 px-6 relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="sys-label mb-3">// MODULE_04 :: СВЯЗЬ</p>
            <h2 className="font-orb font-black text-3xl md:text-4xl neon-g mb-3">
              Взломаем задачу вместе
            </h2>
            <p className="font-ibm text-sm" style={{ color: "rgba(0,255,65,0.45)" }}>
              Хочешь заказать игру или записаться на курс? Пиши — ответим в течение дня.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <a href="mailto:zuravkovplaton@gmail.com"
              className="hack-card p-5 flex items-center gap-3 no-underline group cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ border: "1px solid rgba(0,255,65,0.3)", background: "rgba(0,255,65,0.05)" }}>
                <Icon name="Mail" size={16} style={{ color: "var(--g)" }} />
              </div>
              <div>
                <div className="sys-label mb-0.5">EMAIL</div>
                <div className="font-ibm text-xs neon-g break-all">zuravkovplaton@gmail.com</div>
              </div>
            </a>
            <a href="tel:+79112540094"
              className="hack-card p-5 flex items-center gap-3 no-underline group cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ border: "1px solid rgba(0,229,255,0.3)", background: "rgba(0,229,255,0.05)" }}>
                <Icon name="Phone" size={16} style={{ color: "var(--c)" }} />
              </div>
              <div>
                <div className="sys-label mb-0.5">ТЕЛЕФОН</div>
                <div className="font-ibm text-xs neon-c">+7 911 254 00 94</div>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="hack-card p-7">
            <p className="sys-label mb-5">// ОТПРАВИТЬ_СООБЩЕНИЕ</p>
            <div className="flex flex-col gap-4 mb-5">
              <div>
                <label className="sys-label block mb-2">ИМЯ</label>
                <input className="hack-input w-full px-4 py-3 text-sm" placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="sys-label block mb-2">ТЕЛЕФОН / EMAIL</label>
                <input className="hack-input w-full px-4 py-3 text-sm" placeholder="+7 911 254 00 94" />
              </div>
              <div>
                <label className="sys-label block mb-2">СООБЩЕНИЕ</label>
                <textarea className="hack-input w-full px-4 py-3 text-sm resize-none" rows={4}
                  placeholder="Хочу заказать игру / записаться на Python / другой вопрос..." />
              </div>
            </div>
            <button className="btn-hack w-full py-4 rounded-none font-orb"
              onClick={() => alert("Форма будет настроена — свяжитесь напрямую: zuravkovplaton@gmail.com")}>
              [ ОТПРАВИТЬ ЗАПРОС → ]
            </button>
            <p className="font-ibm text-xs text-center mt-4" style={{ color: "rgba(0,255,65,0.25)" }}>
              или напишите напрямую: zuravkovplaton@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-7 px-6 text-center relative z-10"
        style={{ borderTop: "1px solid rgba(0,255,65,0.07)" }}>
        <p className="font-ibm text-xs" style={{ color: "rgba(0,255,65,0.2)" }}>
          © 2024–2026 GAMECODE_STUDIO :: PYTHON :: SCRATCH :: GAMES :: ALL_SYSTEMS_ONLINE
        </p>
      </footer>
    </div>
  );
}