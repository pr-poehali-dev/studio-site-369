import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV = [
  { label: "Главная", id: "hero" },
  { label: "Услуги", id: "services" },
  { label: "Проекты", id: "projects" },
  { label: "Обучение", id: "edu" },
  { label: "Контакты", id: "contacts" },
];

const DEV_GAMES = [
  {
    emoji: "🐍",
    title: "Игры на Python",
    desc: "Создаём полноценные 2D-игры: платформеры, аркады, головоломки. Pygame, PyGame Zero, Arcade — выбираем под задачу.",
    tags: ["Python", "Pygame", "2D"],
    color: "var(--yellow)",
  },
  {
    emoji: "🐱",
    title: "Игры на Scratch",
    desc: "Визуальные игры и интерактивные истории в Scratch. Отлично для детских проектов, школьных олимпиад и подарков.",
    tags: ["Scratch", "Визуальный код", "Дети"],
    color: "var(--cyan)",
  },
  {
    emoji: "🎮",
    title: "Прототипы и MVP",
    desc: "Быстрый прототип за 1–2 недели. Покажи идею, проверь механику — без огромного бюджета.",
    tags: ["MVP", "Быстро", "Python"],
    color: "var(--purple)",
  },
];

const EDU_COURSES = [
  {
    emoji: "🐍",
    title: "Python с нуля",
    level: "Любой уровень",
    duration: "8–12 недель",
    desc: "Переменные, циклы, функции, ООП — через игровые задачи и реальные мини-проекты. Скучно не будет.",
    color: "var(--yellow)",
    highlights: ["Живые занятия", "Домашки с проверкой", "Финальный проект-игра"],
  },
  {
    emoji: "🐱",
    title: "Scratch для детей",
    level: "7–14 лет",
    duration: "6–8 недель",
    desc: "Первые шаги в программировании через яркие визуальные блоки. Ребёнок сам создаёт своих героев и игровые миры.",
    color: "var(--cyan)",
    highlights: ["Без предварительных знаний", "Групповые и индивидуальные", "Сертификат выпускника"],
  },
];

const WORKS = [
  { emoji: "🏃", title: "Runner Dino", tech: "Python + Pygame", desc: "Бесконечный раннер с препятствиями, счётчиком рекордов и анимированным персонажем", color: "var(--yellow)" },
  { emoji: "🧩", title: "Maze Quest", tech: "Python + Pygame", desc: "Лабиринт-головоломка с процедурной генерацией уровней и системой подсказок", color: "var(--cyan)" },
  { emoji: "🌟", title: "Space Catcher", tech: "Scratch", desc: "Аркада для детей: ловим звёзды и уворачиваемся от метеоритов", color: "var(--purple)" },
  { emoji: "🐸", title: "Frog Jump", tech: "Scratch", desc: "Платформер с уровнями, врагами и сохранением прогресса", color: "var(--pink)" },
];

const STATS = [
  { val: "2+", label: "года студии", emoji: "📅" },
  { val: "30+", label: "игр создано", emoji: "🎮" },
  { val: "50+", label: "учеников", emoji: "🎓" },
  { val: "2", label: "языка", emoji: "💻" },
];

export default function Index() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = () => {
      for (const n of [...NAV].reverse()) {
        const el = document.getElementById(n.id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(n.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen pixel-grid" style={{ background: "var(--bg)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(14,17,23,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => goto("hero")} className="flex items-center gap-2">
          <span className="text-lg" style={{ lineHeight: 1 }}>🎮</span>
          <span className="font-bold text-base" style={{ fontFamily: "'Nunito', sans-serif", color: "#E8EAF0" }}>
            Game<span style={{ color: "var(--yellow)" }}>Code</span>
          </span>
        </button>
        <div className="hidden md:flex gap-7">
          {NAV.map(n => (
            <button key={n.id} className={`nav-item ${active === n.id ? "active" : ""}`} onClick={() => goto(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => goto("contacts")}
          className="hidden md:block btn-primary px-5 py-2 text-sm"
        >
          Написать нам
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#E8EAF0" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 md:hidden"
          style={{ background: "rgba(14,17,23,0.97)", backdropFilter: "blur(20px)" }}>
          {NAV.map(n => (
            <button key={n.id} className="nav-item text-lg" onClick={() => goto(n.id)}>{n.label}</button>
          ))}
          <button className="btn-primary px-8 py-3 mt-4" onClick={() => goto("contacts")}>Написать нам</button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Floating emojis */}
        <div className="absolute top-32 left-[8%] text-5xl float-1 select-none opacity-30">🐍</div>
        <div className="absolute top-40 right-[10%] text-4xl float-2 select-none opacity-30">🐱</div>
        <div className="absolute bottom-32 left-[15%] text-4xl float-3 select-none opacity-25">🎮</div>
        <div className="absolute bottom-40 right-[12%] text-3xl float-1 select-none opacity-25">⭐</div>
        <div className="absolute top-[55%] left-[4%] text-3xl float-2 select-none opacity-20">🏆</div>
        <div className="absolute top-[45%] right-[5%] text-3xl float-3 select-none opacity-20">🧩</div>

        {/* Glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--yellow) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="relative z-10 max-w-3xl">
          <div className="fade-up fade-up-1 flex items-center justify-center gap-3 mb-6">
            <span className="section-label">// студия с 2024 года</span>
          </div>

          <div className="fade-up fade-up-2">
            <h1 className="font-bold mb-2" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(2.4rem, 7vw, 5rem)", lineHeight: 1.1, color: "#E8EAF0" }}>
              Делаем <span style={{ color: "var(--yellow)" }}>игры</span><br />
              и учим <span style={{ color: "var(--cyan)" }}>программировать</span>
            </h1>
          </div>

          <div className="fade-up fade-up-3 mt-5 mb-8">
            <p className="text-lg font-light max-w-xl mx-auto" style={{ color: "rgba(232,234,240,0.65)", lineHeight: 1.75 }}>
              Разрабатываем игры на <span style={{ color: "var(--yellow)" }}>Python</span> и{" "}
              <span style={{ color: "var(--cyan)" }}>Scratch</span>. Обучаем детей и взрослых
              с нуля до первой игры.
            </p>
          </div>

          <div className="fade-up fade-up-4 flex flex-wrap gap-4 justify-center">
            <button className="btn-primary px-8 py-3.5 text-base" onClick={() => goto("services")}>
              🎮 Заказать игру
            </button>
            <button className="btn-outline px-8 py-3.5 text-base" onClick={() => goto("edu")}>
              🎓 Записаться учиться
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up fade-up-5 mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="game-card p-4 text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="text-2xl font-extrabold mb-0.5" style={{ color: "var(--yellow)", fontFamily: "'Nunito', sans-serif" }}>
                  {s.val}
                </div>
                <div className="text-xs font-semibold" style={{ color: "rgba(232,234,240,0.45)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" onClick={() => goto("services")} style={{ color: "rgba(232,234,240,0.3)" }}>
          <Icon name="ChevronDown" size={26} />
        </button>
      </section>

      {/* SERVICES — Разработка */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">// 01 — Разработка</p>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#E8EAF0", fontFamily: "'Nunito', sans-serif" }}>
              Создаём <span style={{ color: "var(--yellow)" }}>игры</span>
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "rgba(232,234,240,0.5)" }}>
              Python и Scratch — наша специализация. От простой аркады до многоуровневой головоломки.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEV_GAMES.map((g) => (
              <div key={g.title} className="game-card p-6">
                <div className="text-4xl mb-4">{g.emoji}</div>
                <h3 className="text-lg font-extrabold mb-2" style={{ color: g.color, fontFamily: "'Nunito', sans-serif" }}>
                  {g.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(232,234,240,0.6)" }}>
                  {g.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md font-bold font-mono-code"
                      style={{ background: `${g.color}18`, color: g.color, border: `1px solid ${g.color}30` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="btn-primary px-10 py-3.5 text-base" onClick={() => goto("contacts")}>
              Обсудить проект →
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">// 02 — Портфолио</p>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#E8EAF0", fontFamily: "'Nunito', sans-serif" }}>
              Наши <span style={{ color: "var(--cyan)" }}>работы</span>
            </h2>
          </div>

          {/* Hero image */}
          <div className="mb-8 rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)", maxHeight: "260px" }}>
            <img src="https://cdn.poehali.dev/projects/e78463c9-c455-4117-8591-74c076d3ec68/files/014b3606-e001-4751-a47d-cfb1a254256e.jpg"
              alt="Наши игровые проекты" className="w-full object-cover" style={{ maxHeight: "260px", opacity: 0.75 }} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {WORKS.map((w) => (
              <div key={w.title} className="game-card p-5 flex gap-4">
                <div className="text-3xl flex-shrink-0 mt-0.5">{w.emoji}</div>
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-extrabold text-base" style={{ color: "#E8EAF0", fontFamily: "'Nunito', sans-serif" }}>
                      {w.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded font-mono-code font-semibold"
                      style={{ background: `${w.color}18`, color: w.color }}>
                      {w.tech}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,234,240,0.55)" }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="edu" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">// 03 — Обучение</p>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#E8EAF0", fontFamily: "'Nunito', sans-serif" }}>
              Учим <span style={{ color: "var(--purple)" }}>программировать</span>
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "rgba(232,234,240,0.5)" }}>
              Python и Scratch — обучаем через игры и реальные проекты. Скучных лекций нет.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {EDU_COURSES.map((c) => (
              <div key={c.title} className="game-card p-7">
                <div className="text-4xl mb-4">{c.emoji}</div>
                <div className="flex items-start justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="text-xl font-extrabold" style={{ color: c.color, fontFamily: "'Nunito', sans-serif" }}>
                    {c.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-1 rounded-md font-bold"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(232,234,240,0.6)" }}>
                      {c.level}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-md font-bold"
                      style={{ background: `${c.color}18`, color: c.color }}>
                      {c.duration}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(232,234,240,0.6)" }}>
                  {c.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {c.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "rgba(232,234,240,0.75)" }}>
                      <span style={{ color: c.color }}>✓</span> {h}
                    </li>
                  ))}
                </ul>
                <button className="btn-primary w-full py-3 text-sm" onClick={() => goto("contacts")}>
                  Записаться →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-16 px-6" style={{ background: "rgba(255,210,63,0.04)", borderTop: "1px solid rgba(255,210,63,0.1)", borderBottom: "1px solid rgba(255,210,63,0.1)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="text-6xl flex-shrink-0 float-1">👾</div>
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: "#E8EAF0", fontFamily: "'Nunito', sans-serif" }}>
              О нас
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "rgba(232,234,240,0.6)" }}>
              GameCode Studio работает с <strong style={{ color: "var(--yellow)" }}>2024 года</strong> — 
              уже 2 года мы создаём игры и обучаем программированию. 
              Специализируемся на <strong style={{ color: "var(--yellow)" }}>Python</strong> и{" "}
              <strong style={{ color: "var(--cyan)" }}>Scratch</strong>. 
              Наша цель — сделать программирование понятным и увлекательным для каждого.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="section-label mb-3">// 04 — Контакты</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "#E8EAF0", fontFamily: "'Nunito', sans-serif" }}>
            Напишите нам <span style={{ color: "var(--yellow)" }}>🎮</span>
          </h2>
          <p className="text-base mb-10" style={{ color: "rgba(232,234,240,0.5)" }}>
            Хотите заказать игру или записаться на обучение? Оставьте сообщение — ответим в течение дня.
          </p>

          <div className="game-card p-8 text-left">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 font-mono-code" style={{ color: "rgba(232,234,240,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Ваше имя</label>
                <input className="game-input w-full px-4 py-3 text-sm" placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 font-mono-code" style={{ color: "rgba(232,234,240,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Телефон или email</label>
                <input className="game-input w-full px-4 py-3 text-sm" placeholder="+7 999 000-00-00" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 font-mono-code" style={{ color: "rgba(232,234,240,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Что вас интересует?</label>
                <textarea className="game-input w-full px-4 py-3 text-sm resize-none" rows={4}
                  placeholder="Хочу заказать игру на Python / записаться на курс Scratch..." />
              </div>
            </div>
            <button className="btn-primary w-full py-4 text-base" onClick={() => alert("Скоро настроим отправку!")}>
              Отправить сообщение 🚀
            </button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            {[
              { icon: "Mail", label: "hello@gamecode.ru", color: "var(--yellow)" },
              { icon: "MessageCircle", label: "Telegram", color: "var(--cyan)" },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-2">
                <Icon name={c.icon} size={15} style={{ color: c.color }} />
                <span className="text-sm font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: c.color }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-7 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs font-semibold font-mono-code" style={{ color: "rgba(232,234,240,0.25)" }}>
          © 2024–2026 GameCode Studio · Python · Scratch · Игры · Обучение
        </p>
      </footer>

    </div>
  );
}
