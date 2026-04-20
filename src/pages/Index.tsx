import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const TEAM = [
  {
    name: "Алекс Волков",
    role: "Lead Developer",
    stack: ["React", "Node.js", "TypeScript"],
    color: "var(--neon-green)",
  },
  {
    name: "Мария Кодова",
    role: "Backend Architect",
    stack: ["Python", "PostgreSQL", "Redis"],
    color: "var(--neon-cyan)",
  },
  {
    name: "Дмитрий Нейро",
    role: "AI / ML Engineer",
    stack: ["Python", "TensorFlow", "Torch"],
    color: "var(--neon-purple)",
  },
  {
    name: "Ева Системс",
    role: "DevOps Engineer",
    stack: ["Docker", "K8s", "AWS"],
    color: "var(--neon-pink)",
  },
];

const PROJECTS = [
  {
    title: "NeuroShop",
    desc: "Маркетплейс с ИИ-рекомендациями и автоматизированной аналитикой продаж",
    tech: ["React", "Python", "ML"],
    year: "2024",
    color: "var(--neon-green)",
  },
  {
    title: "CryptoTrack",
    desc: "Платформа мониторинга криптовалют в реальном времени с умными алертами",
    tech: ["TypeScript", "WebSocket", "Redis"],
    year: "2024",
    color: "var(--neon-cyan)",
  },
  {
    title: "MedCore",
    desc: "Система управления медицинской документацией с защитой HIPAA",
    tech: ["Python", "PostgreSQL", "Docker"],
    year: "2023",
    color: "var(--neon-purple)",
  },
  {
    title: "LogiBot",
    desc: "Автоматизация логистики с маршрутизацией на основе машинного обучения",
    tech: ["Python", "TensorFlow", "API"],
    year: "2023",
    color: "var(--neon-pink)",
  },
];

const SERVICES = [
  {
    icon: "Code2",
    title: "Разработка",
    items: [
      "Веб-приложения (React, Vue, Angular)",
      "Мобильные приложения (iOS, Android)",
      "Backend API и микросервисы",
      "Интеграции и автоматизация",
      "Нагрузочное тестирование",
    ],
    color: "var(--neon-green)",
  },
  {
    icon: "BrainCircuit",
    title: "Консультации",
    items: [
      "Архитектурный аудит проекта",
      "Code Review и оптимизация",
      "Выбор технологического стека",
      "Планирование MVP за 2 недели",
      "Due Diligence для инвесторов",
    ],
    color: "var(--neon-cyan)",
  },
  {
    icon: "GraduationCap",
    title: "Обучение",
    items: [
      "Интенсивы по JavaScript / TypeScript",
      "Курс Python для бизнеса",
      "Корпоративные воркшопы",
      "Менторинг junior-разработчиков",
      "Ревью и обратная связь по коду",
    ],
    color: "var(--neon-purple)",
  },
];

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "О студии", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Команда", href: "#team" },
  { label: "Контакты", href: "#contacts" },
];

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]()=+/*&^%$#@!~;:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(6, 10, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle =
          drops[i] * fontSize < 50
            ? "rgba(0, 255, 136, 0.9)"
            : `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.2})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="matrix-canvas" />;
}

function TypingText({ text, speed = 60 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[idx]);
        setIdx((p) => p + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [idx, text, speed]);

  return (
    <span>
      {displayed}
      {idx < text.length && (
        <span className="cursor-blink" style={{ color: "var(--neon-green)" }}>
          _
        </span>
      )}
    </span>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id: string) => {
    document.getElementById(id.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "projects", "team", "contacts"];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--dark-bg)", color: "var(--neon-green)" }}>
      <MatrixCanvas />
      <div className="scanlines" />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(6, 10, 15, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 255, 136, 0.15)",
        }}
      >
        <div
          className="font-black text-xl tracking-widest"
          style={{ fontFamily: "'Exo 2', sans-serif", color: "var(--neon-green)" }}
        >
          <span className="neon-text-green">CYBER</span>
          <span style={{ color: "var(--neon-cyan)" }}>CODE</span>
          <span className="cursor-blink" style={{ color: "var(--neon-green)" }}>_</span>
        </div>

        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              className="nav-link"
              onClick={() => scrollTo(item.href)}
              style={{
                color:
                  activeSection === item.href.replace("#", "")
                    ? "var(--neon-green)"
                    : "rgba(0, 255, 136, 0.5)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--neon-green)" }}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: "rgba(6, 10, 15, 0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              className="nav-link text-lg"
              onClick={() => scrollTo(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20"
      >
        <div className="fade-in-up fade-in-up-1">
          <p className="section-tag mb-6">
            <span style={{ color: "var(--neon-cyan)" }}>// </span>
            ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...
          </p>
        </div>

        <div className="fade-in-up fade-in-up-2">
          <h1
            className="glitch-text font-black mb-4"
            data-text="CYBERCODE"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 1,
              color: "var(--neon-green)",
              textShadow:
                "0 0 20px var(--neon-green), 0 0 40px var(--neon-green), 0 0 80px rgba(0, 255, 136, 0.5)",
            }}
          >
            CYBERCODE
          </h1>
        </div>

        <div className="fade-in-up fade-in-up-3">
          <p
            className="text-xl md:text-2xl mb-2 font-light"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--neon-cyan)",
            }}
          >
            <TypingText text="Студия программистов нового поколения" />
          </p>
        </div>

        <div className="fade-in-up fade-in-up-4 mt-6 mb-10">
          <p
            className="max-w-xl text-base font-light"
            style={{ color: "rgba(0, 255, 136, 0.6)", lineHeight: 1.8 }}
          >
            Разрабатываем, консультируем и обучаем. Превращаем идеи в цифровые
            продукты, которые работают на скорости света.
          </p>
        </div>

        <div className="fade-in-up fade-in-up-5 flex flex-wrap gap-4 justify-center">
          <button className="neon-btn px-8 py-3 text-sm rounded" onClick={() => scrollTo("#services")}>
            Наши услуги
          </button>
          <button
            className="neon-btn-cyan px-8 py-3 text-sm rounded font-mono font-bold tracking-widest uppercase"
            onClick={() => scrollTo("#contacts")}
          >
            Связаться
          </button>
        </div>

        <div className="mt-20 flex flex-wrap gap-8 justify-center fade-in-up fade-in-up-5">
          {[
            { val: "50+", label: "Проектов" },
            { val: "4", label: "Года опыта" },
            { val: "98%", label: "Довольных клиентов" },
            { val: "12", label: "Технологий" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl font-black neon-text-green"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                {s.val}
              </div>
              <div
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "rgba(0, 255, 136, 0.5)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          onClick={() => scrollTo("#about")}
          style={{ color: "rgba(0, 255, 136, 0.4)" }}
        >
          <Icon name="ChevronDown" size={28} className="animate-bounce" />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-tag mb-4">// 01_О СТУДИИ</p>
          <h2
            className="text-4xl md:text-5xl font-black mb-12"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              color: "var(--neon-green)",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
            }}
          >
            Кто мы такие
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(0, 255, 136, 0.7)" }}>
                CYBERCODE — это команда разработчиков-энтузиастов, которые живут
                кодом. Мы основаны в 2020 году и за это время реализовали более
                50 проектов: от стартап-MVP до корпоративных платформ.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(0, 255, 136, 0.7)" }}>
                Наша философия: код должен быть чистым, архитектура — масштабируемой,
                а дедлайны — не нарушаться. Мы не просто пишем код — мы строим
                цифровую инфраструктуру для вашего бизнеса.
              </p>

              {[
                { label: "Frontend", val: 95 },
                { label: "Backend", val: 90 },
                { label: "DevOps", val: 80 },
                { label: "AI / ML", val: 75 },
              ].map((skill) => (
                <div key={skill.label} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-cyan)" }}
                    >
                      {skill.label}
                    </span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-green)" }}
                    >
                      {skill.val}%
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(0, 255, 136, 0.1)" }}
                  >
                    <div
                      className="h-full progress-bar rounded-full"
                      style={{
                        width: `${skill.val}%`,
                        background: "linear-gradient(90deg, var(--neon-green), var(--neon-cyan))",
                        boxShadow: "0 0 8px var(--neon-green)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/e78463c9-c455-4117-8591-74c076d3ec68/files/801785ea-ba24-45f0-8292-c6940df3de53.jpg"
                alt="Команда CYBERCODE"
                className="w-full rounded"
                style={{
                  border: "1px solid rgba(0, 255, 136, 0.3)",
                  boxShadow: "0 0 30px rgba(0, 255, 136, 0.15)",
                }}
              />
              <div
                className="absolute -bottom-3 -right-3 px-4 py-2 text-xs"
                style={{
                  background: "var(--dark-bg)",
                  border: "1px solid var(--neon-green)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--neon-green)",
                  boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)",
                }}
              >
                EST. 2020 // CYBERCODE.IO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-tag mb-4">// 02_УСЛУГИ</p>
          <h2
            className="text-4xl md:text-5xl font-black mb-12"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              color: "var(--neon-green)",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
            }}
          >
            Что мы делаем
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="cyber-card rounded p-6">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(0, 255, 136, 0.08)",
                    border: `1px solid ${svc.color}`,
                    boxShadow: `0 0 12px ${svc.color}30`,
                  }}
                >
                  <Icon name={svc.icon} size={22} style={{ color: svc.color }} />
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    color: svc.color,
                    textShadow: `0 0 10px ${svc.color}60`,
                  }}
                >
                  {svc.title}
                </h3>
                <ul className="space-y-2">
                  {svc.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "rgba(0, 255, 136, 0.65)" }}
                    >
                      <span style={{ color: svc.color }} className="mt-0.5 flex-shrink-0">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-6 w-full py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded"
                  style={{
                    border: `1px solid ${svc.color}`,
                    color: svc.color,
                    background: "transparent",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = `${svc.color}15`;
                    (e.target as HTMLElement).style.boxShadow = `0 0 15px ${svc.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.boxShadow = "none";
                  }}
                  onClick={() => scrollTo("#contacts")}
                >
                  Узнать больше →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-tag mb-4">// 03_ПРОЕКТЫ</p>
          <h2
            className="text-4xl md:text-5xl font-black mb-12"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              color: "var(--neon-green)",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
            }}
          >
            Наши работы
          </h2>

          <div
            className="mb-8 w-full h-48 rounded overflow-hidden"
            style={{ border: "1px solid rgba(0, 229, 255, 0.2)" }}
          >
            <img
              src="https://cdn.poehali.dev/projects/e78463c9-c455-4117-8591-74c076d3ec68/files/d97569e3-d0bc-4f0b-9bb3-6bc0153cb20f.jpg"
              alt="Cyberpunk cityscape"
              className="w-full h-full object-cover"
              style={{ opacity: 0.6 }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <div key={proj.title} className="cyber-card rounded p-6 cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-xl font-black"
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      color: proj.color,
                      textShadow: `0 0 10px ${proj.color}60`,
                    }}
                  >
                    {proj.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      border: `1px solid ${proj.color}40`,
                      color: proj.color,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {proj.year}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(0, 255, 136, 0.6)" }}>
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: `${proj.color}10`,
                        border: `1px solid ${proj.color}30`,
                        color: proj.color,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-tag mb-4">// 04_КОМАНДА</p>
          <h2
            className="text-4xl md:text-5xl font-black mb-12"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              color: "var(--neon-green)",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
            }}
          >
            Наш отряд
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="cyber-card rounded p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black"
                  style={{
                    border: `2px solid ${member.color}`,
                    boxShadow: `0 0 20px ${member.color}40`,
                    background: `${member.color}10`,
                    fontFamily: "'Exo 2', sans-serif",
                    color: member.color,
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ fontFamily: "'Exo 2', sans-serif", color: member.color }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "rgba(0, 255, 136, 0.5)",
                  }}
                >
                  {member.role}
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  {member.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded"
                      style={{
                        background: `${member.color}10`,
                        border: `1px solid ${member.color}30`,
                        color: member.color,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-tag mb-4">// 05_КОНТАКТЫ</p>
          <h2
            className="text-4xl md:text-5xl font-black mb-6"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              color: "var(--neon-green)",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
            }}
          >
            Начнём проект?
          </h2>
          <p className="mb-12 text-base" style={{ color: "rgba(0, 255, 136, 0.6)" }}>
            Расскажите о вашей идее — мы ответим в течение 24 часов и предложим
            конкретный план действий.
          </p>

          <div
            className="rounded p-8 text-left"
            style={{
              background: "var(--dark-card)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-xs mb-2 tracking-widest uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-green)" }}
                >
                  Имя
                </label>
                <input
                  className="w-full rounded px-4 py-3 text-sm outline-none transition-all duration-300"
                  placeholder="Иван Иванов"
                  style={{
                    background: "rgba(0, 255, 136, 0.04)",
                    border: "1px solid rgba(0, 255, 136, 0.2)",
                    color: "var(--neon-green)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--neon-green)";
                    e.target.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0, 255, 136, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs mb-2 tracking-widest uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-green)" }}
                >
                  Email
                </label>
                <input
                  className="w-full rounded px-4 py-3 text-sm outline-none transition-all duration-300"
                  placeholder="ivan@example.com"
                  style={{
                    background: "rgba(0, 255, 136, 0.04)",
                    border: "1px solid rgba(0, 255, 136, 0.2)",
                    color: "var(--neon-green)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--neon-green)";
                    e.target.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0, 255, 136, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-xs mb-2 tracking-widest uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-green)" }}
              >
                Сообщение
              </label>
              <textarea
                rows={4}
                className="w-full rounded px-4 py-3 text-sm outline-none transition-all duration-300 resize-none"
                placeholder="Опишите ваш проект или задачу..."
                style={{
                  background: "rgba(0, 255, 136, 0.04)",
                  border: "1px solid rgba(0, 255, 136, 0.2)",
                  color: "var(--neon-green)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--neon-green)";
                  e.target.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0, 255, 136, 0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <button
              className="neon-btn w-full py-4 rounded"
              onClick={() => alert("Форма отправки будет настроена!")}
            >
              Отправить сообщение →
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { icon: "Mail", label: "hello@cybercode.io", color: "var(--neon-green)" },
              { icon: "Phone", label: "+7 (999) 123-45-67", color: "var(--neon-cyan)" },
              { icon: "MapPin", label: "Москва, Россия", color: "var(--neon-purple)" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <Icon name={c.icon} size={16} style={{ color: c.color }} />
                <span
                  className="text-sm"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: c.color }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative z-10 py-8 px-6 text-center"
        style={{ borderTop: "1px solid rgba(0, 255, 136, 0.1)" }}
      >
        <p
          className="text-xs tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0, 255, 136, 0.3)" }}
        >
          © 2024 CYBERCODE // ALL SYSTEMS OPERATIONAL // v2.0.24
        </p>
      </footer>
    </div>
  );
}