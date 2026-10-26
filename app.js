(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const assetBase = document.body.dataset.assetBase || "assets";
  const asset = (path) => `${assetBase}/${path.replace(/^\//, "")}`;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const svg = (content) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;
  const brandSvg = (width, height, path) => `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false" fill="currentColor"><path d="${path}"/></svg>`;
  const iconSvgs = {
    "☾": svg('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>'),
    "☀": svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>'),
    "☰": svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    "×": svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    "✦": svg('<path d="m12 3 1.2 4.3a5 5 0 0 0 3.5 3.5L21 12l-4.3 1.2a5 5 0 0 0-3.5 3.5L12 21l-1.2-4.3a5 5 0 0 0-3.5-3.5L3 12l4.3-1.2a5 5 0 0 0 3.5-3.5L12 3Z"/>'),
    "✚": svg('<path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>'),
    "⌁": svg('<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>'),
    "✓": svg('<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>'),
    "◉": svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>'),
    "◌": svg('<path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.8-4.5A8.4 8.4 0 1 1 21 11.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>'),
    "→": svg('<path d="M5 12h14M14 7l5 5-5 5"/>'),
    "□": svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'),
    "◯": svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    "▣": svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>'),
    "▤": svg('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'),
    "▥": svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    "▶": svg('<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>'),
    "◎": svg('<path d="M12 5a3 3 0 1 0-6 .125 4 4 0 0 0-2.52 5.77 4 4 0 0 0 .55 6.59A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4M6 5.12A3 3 0 0 0 6.4 6.5M3.48 10.9a4 4 0 0 1 .58-.4M6 18a4 4 0 0 1-1.97-.52M12 13h4M12 18h6a2 2 0 0 1 2 2v1M12 8h8M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5" fill="currentColor"/><circle cx="18" cy="3" r=".5" fill="currentColor"/><circle cx="20" cy="21" r=".5" fill="currentColor"/><circle cx="20" cy="8" r=".5" fill="currentColor"/>'),
    "≈": svg('<path d="M2 12q2.5 2 5 0t5 0 5 0 5 0M2 19q2.5 2 5 0t5 0 5 0 5 0M2 5q2.5 2 5 0t5 0 5 0 5 0"/>'),
    "◒": svg('<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>'),
    "↗": svg('<path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>'),
    "＋": svg('<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>'),
    "◇": svg('<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"/>'),
    "Ⅱ": svg('<path d="M9 7v10M15 7v10"/>')
    ,"message-circle": svg('<path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.8-4.5A8.4 8.4 0 1 1 21 11.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>')
    ,"instagram": brandSvg(448, 512, 'M224.3 141a115 115 0 1 0-.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1-.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1-53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z')
    ,"youtube": brandSvg(576, 512, 'M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6V175.2l142.7 81.2-142.7 81.2z')
    ,"tiktok": brandSvg(448, 512, 'M448.5 209.9c-44 .1-87-13.6-122.8-39.2v178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16v89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8V0h88c-.1 7.4.6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1v87.4z')
    ,"facebook": brandSvg(320, 512, 'M80 299.3V512h116V299.3h86.5l18-97.8H196v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4.4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8h66z')
    ,"whatsapp": brandSvg(448, 512, 'M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z')
  };

  function renderIcon(element, key) {
    if (!element || !iconSvgs[key]) return;
    element.dataset.icon = key;
    element.innerHTML = iconSvgs[key];
  }

  function hydrateIcons(root = document) {
    $$(".icon-glyph", root).forEach((element) => {
      const key = element.dataset.icon || element.textContent.trim();
      renderIcon(element, key);
    });
  }

  const services = [
    {
      number: "01", icon: "✚", title: "Consulta de fisiatría", tag: "Online y presencial",
      short: "Valoración médica del dolor, el movimiento y la función para orientar una conducta clara.",
      image: "ana-maria-corporate-v2.webp",
      lead: "Una valoración integral para comprender cómo una condición musculoesquelética, neurológica o funcional afecta la vida diaria y qué ruta de manejo puede ser pertinente.",
      evaluates: ["Historia clínica y objetivos funcionales", "Dolor, movilidad, fuerza y autonomía", "Necesidad de estudios, rehabilitación o ayudas técnicas"],
      modality: "Consulta presencial o teleconsulta, según pertinencia clínica.",
      preparation: "Ten disponibles estudios previos, fórmulas, lista de medicamentos y un resumen de la evolución de los síntomas."
    },
    {
      number: "02", icon: "⌁", title: "Electromiografía", tag: "Estudio presencial",
      short: "Registro de actividad eléctrica muscular como apoyo al diagnóstico neuromuscular.",
      image: "services/electromiografia.webp",
      lead: "Estudio electrodiagnóstico que analiza la actividad de músculos seleccionados y se interpreta junto con la historia y el examen clínico.",
      evaluates: ["Actividad eléctrica muscular", "Patrones de compromiso neuromuscular", "Distribución y características de los hallazgos"],
      modality: "Presencial, con equipo especializado y solicitud médica cuando aplique.",
      preparation: "Evita cremas o aceites e informa anticoagulantes, dispositivos implantados o condiciones relevantes."
    },
    {
      number: "03", icon: "≈", title: "Neuroconducción", tag: "Estudio presencial",
      short: "Evaluación funcional de nervios periféricos mediante estímulos eléctricos controlados.",
      image: "services/neuroconduccion.webp",
      lead: "Mide parámetros de conducción de nervios periféricos y aporta información objetiva para analizar síntomas sensitivos o motores.",
      evaluates: ["Velocidad y amplitud de conducción", "Respuesta motora y sensitiva", "Localización funcional del posible compromiso"],
      modality: "Presencial; con frecuencia se complementa con electromiografía.",
      preparation: "Acude con la piel limpia, ropa cómoda y estudios previos relacionados con el motivo del examen."
    },
    {
      number: "04", icon: "◎", title: "Potenciales evocados", tag: "Estudio presencial",
      short: "Análisis de respuestas del sistema nervioso frente a estímulos específicos.",
      image: "services/potenciales-evocados.webp",
      lead: "Exploración neurofisiológica que registra la respuesta del sistema nervioso ante un estímulo y apoya preguntas diagnósticas concretas.",
      evaluates: ["Integridad funcional de vías seleccionadas", "Latencia y características de la respuesta", "Correlación con hallazgos clínicos"],
      modality: "Presencial, de acuerdo con la indicación y el protocolo requerido.",
      preparation: "Las instrucciones específicas dependen del tipo de potencial y se confirman antes de la cita."
    },
    {
      number: "05", icon: "◇", title: "Prótesis y órtesis", tag: "Valoración especializada",
      short: "Orientación médica para la indicación, adaptación y seguimiento de ayudas funcionales.",
      image: "services/protesis-ortesis.webp",
      lead: "La valoración conecta la necesidad clínica con las actividades que la persona busca recuperar y con los requerimientos de adaptación del dispositivo.",
      evaluates: ["Objetivo funcional y entorno de uso", "Condiciones físicas para adaptación", "Necesidad de entrenamiento y seguimiento"],
      modality: "Valoración presencial; algunos controles pueden definirse de forma remota.",
      preparation: "Lleva fórmulas, conceptos previos y el dispositivo actual si ya cuentas con uno."
    },
    {
      number: "06", icon: "✓", title: "Plan de rehabilitación", tag: "Seguimiento personalizado",
      short: "Objetivos, indicaciones y seguimiento progresivo coordinados desde la visión médica.",
      image: "services/plan-rehabilitacion.webp",
      lead: "Un plan organizado por objetivos funcionales que puede articular fisioterapia, ejercicio terapéutico y controles médicos.",
      evaluates: ["Metas funcionales medibles", "Progresión y tolerancia al plan", "Necesidad de ajustes o nuevas valoraciones"],
      modality: "Seguimiento presencial o remoto según el plan definido.",
      preparation: "Registra cambios relevantes, dificultades con el plan y actividades que has podido recuperar."
    }
  ];

  const reasons = [
    ["01", "◒", "Dolor y movimiento", "Cuando el dolor limita caminar, trabajar, descansar o realizar actividad física."],
    ["02", "⌁", "Hormigueo y adormecimiento", "Síntomas persistentes en brazos o piernas que pueden requerir valoración de los nervios."],
    ["03", "↗", "Debilidad o pérdida de fuerza", "Cuando disminuye la capacidad para moverse o realizar actividades cotidianas."],
    ["04", "＋", "Recuperación después de una lesión o cirugía", "Para definir objetivos y orientar una rehabilitación segura y progresiva."],
    ["05", "◎", "Alteraciones neurológicas", "Cuando una condición afecta el equilibrio, la coordinación, el movimiento o la autonomía."],
    ["06", "◇", "Prótesis, órtesis y ayudas funcionales", "Valoración para orientar su indicación, adaptación y seguimiento."]
  ];

  const institutions = [
    ["Centro diagnóstico", "institutions/centro-diagnostico.png"],
    ["VIVA 1A IPS", "institutions/viva-1a.png"],
    ["Sonrisa IPS", "institutions/sonrisa-ips.png"],
    ["IPS Santa Marta", "institutions/ips-santa-marta.png"],
    ["Red ambulatoria", "institutions/red-ambulatoria.png"],
    ["IPS Esperanza de Vida", "institutions/ips-esperanza-vida.png"],
    ["Fisiatrics IPS", "institutions/fisiatrics.png"]
  ];

  const approachVideos = [
    { title: "Movilidad y función", label: "Capacidad funcional", text: "Progresiones adaptadas al punto de partida y a los objetivos definidos.", src: "media/movilidad-senior.mp4" },
    { title: "Control de movilidad", label: "Movimiento terapéutico", text: "Ejecución observada, tolerancia y ajustes según la respuesta funcional.", src: "media/movilidad-cadera.mp4" },
    { title: "Control motor", label: "Seguimiento", text: "Indicaciones claras para acompañar el trabajo entre controles.", src: "media/control-escapular.mp4" }
  ];

  const ipsMedia = [
    { type: "image", src: "ana-maria-corporate-v2.webp", label: "Dirección médica", alt: "Ana María Granados López" },
    { type: "image", src: "media/ips-atencion-ana.webp", label: "Atención médica", alt: "Ana durante una atención médica" },
    { type: "signal", label: "Señales clínicas" },
    { type: "image", src: "media/ips-electrodiagnostico.webp", label: "Electrodiagnóstico", alt: "Atención con equipo de electrodiagnóstico" },
    { type: "video", src: "media/ips-clinical.mp4", label: "Operación clínica" },
    { type: "video", src: "media/control-escapular.mp4", label: "Continuidad del cuidado" }
  ];

  function setScrollLock() {
    const modalOpen = $$('[data-payment-modal]:not([hidden]), [data-service-layer]:not([hidden]), [data-ips-layer]:not([hidden])').length > 0;
    document.body.style.overflow = modalOpen ? "hidden" : "";
  }

  function initTheme() {
    const button = $("[data-theme-toggle]");
    if (!button) return;
    let saved = null;
    try { saved = localStorage.getItem("ana-theme"); } catch (_) {}
    const initial = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const paint = (theme) => {
      document.documentElement.dataset.theme = theme;
      const dark = theme === "dark";
      button.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
      renderIcon($(".icon-glyph", button), dark ? "☀" : "☾");
    };
    paint(initial);
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      paint(next);
      try { localStorage.setItem("ana-theme", next); } catch (_) {}
    });
  }

  function initNavigation() {
    const button = $(".menu-button");
    const nav = $(".nav-links");
    if (!button || !nav) return;
    const close = () => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menú");
      renderIcon($(".icon-glyph", button), "☰");
    };
    button.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      renderIcon($(".icon-glyph", button), open ? "×" : "☰");
    });
    $$('a[href^="#"]', nav).forEach((link) => link.addEventListener("click", close));
    window.addEventListener("resize", () => { if (window.innerWidth > 980) close(); });
  }

  function initProgressAndReveal() {
    const progress = $(".scroll-progress");
    const update = () => {
      if (!progress) return;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    if (reducedMotion || !("IntersectionObserver" in window)) {
      $$(".reveal").forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((item) => observer.observe(item));
  }

  function initTypewriter() {
    const element = $("[data-typewriter]");
    if (!element || reducedMotion) return;
    const phrases = ["Consulta privada", "Estudios especializados", "Rehabilitación funcional"];
    let phrase = 0;
    let length = phrases[0].length;
    let deleting = true;
    const cursor = document.createElement("i");
    const tick = () => {
      const current = phrases[phrase];
      element.textContent = current.slice(0, length);
      element.append(cursor);
      if (deleting) {
        length -= 1;
        if (length < 1) { deleting = false; phrase = (phrase + 1) % phrases.length; }
      } else {
        length += 1;
        if (length > phrases[phrase].length) { length = phrases[phrase].length; deleting = true; return setTimeout(tick, 1500); }
      }
      setTimeout(tick, deleting ? 48 : 72);
    };
    setTimeout(tick, 1400);
  }

  function renderInstitutions() {
    const track = $("[data-institutions]");
    if (!track) return;
    for (let set = 0; set < 4; set += 1) {
      const group = document.createElement("div");
      group.className = "marquee-set";
      group.setAttribute("aria-hidden", set ? "true" : "false");
      institutions.forEach(([name, src]) => {
        const item = document.createElement("div");
        item.className = "institution-item";
        item.innerHTML = `<img class="institution-logo" src="${asset(src)}" alt="${set ? "" : name}"><span>${name}</span>`;
        group.append(item);
      });
      track.append(group);
    }
  }

  function initServices() {
    const grid = $("[data-services]");
    const layer = $("[data-service-layer]");
    const drawer = $("[data-service-drawer]");
    if (!grid || !layer || !drawer) return;
    services.forEach((service, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "service-card reveal";
      button.style.transitionDelay = `${index * 45}ms`;
      button.innerHTML = `<span class="service-number">${service.number} / 06</span><span class="service-icon icon-glyph">${service.icon}</span><h3>${service.title}</h3><p>${service.short}</p><span class="service-footer"><small>${service.tag}</small><span class="icon-glyph" aria-hidden="true">→</span></span>`;
      button.addEventListener("click", () => open(service));
      grid.append(button);
    });
    if (reducedMotion || !("IntersectionObserver" in window)) $$(".reveal", grid).forEach((item) => item.classList.add("is-visible"));
    else {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }), { threshold: 0.1 });
      $$(".reveal", grid).forEach((item) => observer.observe(item));
    }
    const open = (service) => {
      drawer.className = "service-drawer";
      if (service.number === "01") drawer.classList.add("service-drawer--portrait");
      if (["02", "03"].includes(service.number)) drawer.classList.add("service-drawer--electrodiagnostic");
      $("[data-drawer-image]", drawer).src = asset(service.image);
      $("[data-drawer-image]", drawer).alt = service.title;
      $("[data-drawer-number]", drawer).textContent = service.number;
      renderIcon($("[data-drawer-icon]", drawer), service.icon);
      $("[data-drawer-tag]", drawer).textContent = service.tag;
      const title = $("[data-drawer-title]", drawer);
      title.textContent = service.title;
      title.classList.toggle("drawer-title-long", service.title.length > 20);
      $("[data-drawer-lead]", drawer).textContent = service.lead;
      $("[data-drawer-list]", drawer).innerHTML = service.evaluates.map((item) => `<li>${item}</li>`).join("");
      $("[data-drawer-modality]", drawer).textContent = service.modality;
      $("[data-drawer-preparation]", drawer).textContent = service.preparation;
      layer.hidden = false;
      requestAnimationFrame(() => layer.classList.add("is-open"));
      setScrollLock();
      $("[data-close-service]", drawer)?.focus();
    };
    const close = () => {
      layer.classList.remove("is-open");
      window.setTimeout(() => { layer.hidden = true; setScrollLock(); }, reducedMotion ? 0 : 320);
    };
    $$("[data-close-service]", layer).forEach((button) => button.addEventListener("click", close));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !layer.hidden) close(); });
  }

  function initReasons() {
    const track = $("[data-reasons-track]");
    const viewport = $("[data-reasons-viewport]");
    const counter = $("[data-reason-count]");
    const pause = $("[data-reasons-pause]");
    if (!track || !viewport || !counter || !pause) return;
    const looped = [reasons[reasons.length - 1], ...reasons, reasons[0]];
    looped.forEach(([number, icon, title, text]) => {
      const card = document.createElement("article");
      card.className = "reason-card";
      card.innerHTML = `<span class="reason-illustration icon-glyph" aria-hidden="true">${icon}</span><div><span class="reason-number">${number}</span><h3>${title}</h3><p>${text}</p></div>`;
      track.append(card);
    });
    let center = 1;
    let drag = 0;
    let startY = null;
    let paused = reducedMotion;
    let timer = null;
    let resetTimer = null;
    let firstDelay = true;
    const update = (animate = true) => {
      track.classList.toggle("is-animated", animate && !reducedMotion);
      const desktop = -(center * 166) + 166;
      const mobile = -(center * 216);
      track.style.setProperty("--reason-desktop-shift", `${desktop}px`);
      track.style.setProperty("--reason-mobile-shift", `${mobile}px`);
      track.style.setProperty("--reason-drag-offset", `${drag}px`);
      const real = ((center - 1 + reasons.length) % reasons.length);
      counter.textContent = `${String(real + 1).padStart(2, "0")} / ${String(reasons.length).padStart(2, "0")}`;
      $$(".reason-card", track).forEach((card, index) => {
        const active = index === center;
        card.toggleAttribute("data-active", active);
        card.setAttribute("aria-hidden", String(!active));
      });
    };
    const finishLoop = () => {
      window.clearTimeout(resetTimer);
      const atEnd = center === reasons.length + 1;
      const atStart = center === 0;
      if (!atEnd && !atStart) {
        if (!paused) schedule();
        return;
      }
      resetTimer = window.setTimeout(() => {
        center = atEnd ? 1 : reasons.length;
        drag = 0;
        update(false);
        if (!paused) schedule();
      }, reducedMotion ? 0 : 620);
    };
    const advance = (direction) => {
      window.clearTimeout(timer);
      center = Math.max(0, Math.min(reasons.length + 1, center + direction));
      drag = 0;
      update();
      finishLoop();
    };
    const schedule = () => {
      window.clearTimeout(timer);
      if (paused) return;
      timer = window.setTimeout(() => advance(1), firstDelay ? 700 : 2800);
      firstDelay = false;
    };
    viewport.addEventListener("touchstart", (event) => {
      window.clearTimeout(timer);
      window.clearTimeout(resetTimer);
      if (center === reasons.length + 1 || center === 0) {
        center = center === 0 ? reasons.length : 1;
        update(false);
      }
      startY = event.touches[0].clientY;
      drag = 0;
      track.classList.remove("is-animated");
    }, { passive: true });
    viewport.addEventListener("touchmove", (event) => {
      if (startY === null) return;
      drag = Math.max(-120, Math.min(120, event.touches[0].clientY - startY));
      update(false);
    }, { passive: true });
    const endDrag = () => {
      if (startY === null) return;
      const direction = Math.abs(drag) > 42 ? (drag < 0 ? 1 : -1) : 0;
      drag = 0;
      startY = null;
      if (direction) advance(direction);
      else {
        update();
        if (!paused) schedule();
      }
    };
    viewport.addEventListener("touchend", endDrag);
    viewport.addEventListener("touchcancel", endDrag);
    pause.addEventListener("click", () => {
      paused = !paused;
      pause.setAttribute("aria-pressed", String(paused));
      renderIcon($(".icon-glyph", pause), paused ? "▶" : "Ⅱ");
      $("span:last-child", pause).textContent = paused ? "Reanudar" : "Pausar";
      if (paused) window.clearTimeout(timer);
      else {
        firstDelay = false;
        if (center === reasons.length + 1 || center === 0) finishLoop();
        else schedule();
      }
    });
    update(false);
    schedule();
  }

  function initApproach() {
    const root = $("[data-approach]");
    if (!root) return;
    const video = $("video", root);
    const pagination = $("[data-approach-pagination]", root);
    let active = 0;
    let timer = null;
    const show = (index) => {
      active = (index + approachVideos.length) % approachVideos.length;
      const item = approachVideos[active];
      video.src = asset(item.src);
      video.load();
      video.play().catch(() => {});
      $("[data-approach-label]", root).textContent = item.label;
      $("[data-approach-title]", root).textContent = item.title;
      $("[data-approach-text]", root).textContent = item.text;
      $$('button', pagination).forEach((button, i) => button.classList.toggle("is-active", i === active));
      window.clearTimeout(timer);
      if (!reducedMotion) timer = window.setTimeout(() => show(active + 1), 7000);
    };
    approachVideos.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Mostrar video ${index + 1}`);
      button.append(document.createElement("i"));
      button.addEventListener("click", () => show(index));
      pagination.append(button);
    });
    video.addEventListener("ended", () => show(active + 1));
    show(0);
  }

  function initBooking() {
    const root = $("[data-booking]");
    if (!root) return;
    const steps = $$('[data-booking-step]', root);
    const progress = $$(".booking-progress span", root);
    const summary = $("[data-booking-summary]", root);
    const payment = $("[data-payment-modal]");
    let current = 1;
    const data = {};
    const show = (step) => {
      current = step;
      steps.forEach((panel) => { panel.hidden = Number(panel.dataset.bookingStep) !== current; });
      progress.forEach((item, index) => item.classList.toggle("is-active", index < current));
      $(".booking-progress", root).setAttribute("aria-label", `Paso ${current} de 3`);
    };
    const formOne = $('[data-booking-step="1"]', root);
    const formTwo = $('[data-booking-step="2"]', root);
    formOne.addEventListener("submit", (event) => {
      event.preventDefault();
      Object.assign(data, Object.fromEntries(new FormData(formOne)));
      show(2);
    });
    formTwo.addEventListener("submit", (event) => {
      event.preventDefault();
      Object.assign(data, Object.fromEntries(new FormData(formTwo)));
      const labels = [["Servicio", data.service], ["Modalidad", data.modality], ["Fecha y hora", `${data.date || "Por definir"} · ${data.time || "Por definir"}`], ["Paciente", data.name], ["Contacto", `${data.email} · ${data.phone}`]];
      summary.replaceChildren(...labels.map(([term, value]) => {
        const wrap = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = term;
        dd.textContent = value;
        wrap.append(dt, dd);
        return wrap;
      }));
      show(3);
    });
    $$("[data-booking-back]", root).forEach((button) => button.addEventListener("click", () => show(Math.max(1, current - 1))));
    const openPayment = () => {
      if (!payment) return;
      payment.hidden = false;
      requestAnimationFrame(() => payment.classList.add("is-open"));
      setScrollLock();
      $("[data-close-payment]", payment)?.focus();
    };
    const closePayment = () => {
      if (!payment) return;
      payment.classList.remove("is-open");
      window.setTimeout(() => { payment.hidden = true; setScrollLock(); }, reducedMotion ? 0 : 220);
    };
    $("[data-open-payment]", root)?.addEventListener("click", openPayment);
    $$('[data-close-payment]', payment || document).forEach((button) => button.addEventListener("click", closePayment));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && payment && !payment.hidden) closePayment(); });
    show(1);
  }

  function initIpsModal() {
    const layer = $("[data-ips-layer]");
    if (!layer) return;
    const media = $("[data-ips-media]", layer);
    const progress = $("[data-ips-progress]", layer);
    const reel = $("[data-ips-reel]", layer);
    let active = 0;
    let touchX = null;
    const render = (index) => {
      active = (index + ipsMedia.length) % ipsMedia.length;
      const item = ipsMedia[active];
      media.replaceChildren();
      if (item.type === "image") {
        const image = document.createElement("img");
        image.src = asset(item.src);
        image.alt = item.alt || "";
        if (active === 0) image.className = "ips-ana-direction-image";
        media.append(image);
      } else if (item.type === "video") {
        const video = document.createElement("video");
        video.src = asset(item.src);
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        media.append(video);
        video.play().catch(() => {});
      } else {
        const signal = document.createElement("div");
        signal.className = "ips-signal-slide";
        signal.innerHTML = '<svg viewBox="0 0 900 420" role="img" aria-label="Representación de una señal neurofisiológica"><path d="M0 220 L120 220 L150 210 L175 235 L205 150 L230 295 L258 220 L390 220 L420 210 L445 230 L475 165 L500 280 L530 220 L660 220 L690 208 L715 236 L745 145 L770 298 L800 220 L900 220"/></svg>';
        media.append(signal);
      }
      $("[data-ips-number]", layer).textContent = String(active + 1).padStart(2, "0");
      $("[data-ips-label]", layer).textContent = item.label;
      $$('button', progress).forEach((button, i) => button.classList.toggle("is-active", i === active));
    };
    ipsMedia.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Mostrar contenido ${index + 1}`);
      button.append(document.createElement("i"));
      button.addEventListener("click", () => render(index));
      progress.append(button);
    });
    reel.addEventListener("touchstart", (event) => { touchX = event.touches[0].clientX; }, { passive: true });
    reel.addEventListener("touchend", (event) => {
      if (touchX === null) return;
      const distance = event.changedTouches[0].clientX - touchX;
      if (Math.abs(distance) > 45) render(active + (distance < 0 ? 1 : -1));
      touchX = null;
    });
    const open = () => {
      layer.hidden = false;
      render(0);
      requestAnimationFrame(() => layer.classList.add("is-open"));
      setScrollLock();
      $("[data-close-ips]", layer)?.focus();
    };
    const close = () => {
      layer.classList.remove("is-open");
      window.setTimeout(() => { layer.hidden = true; setScrollLock(); }, reducedMotion ? 0 : 320);
    };
    $$("[data-open-ips]").forEach((button) => button.addEventListener("click", open));
    $$("[data-close-ips]", layer).forEach((button) => button.addEventListener("click", close));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !layer.hidden) close(); });
    render(0);
  }

  function initAllianceForm() {
    const form = $("[data-alliance-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const selected = data.getAll("services").join(", ") || "Sin selección específica";
      const body = [
        `Institución: ${data.get("institution")}`,
        `Contacto: ${data.get("contact")}`,
        `Cargo: ${data.get("role")}`,
        `Correo: ${data.get("email")}`,
        `Teléfono: ${data.get("phone") || "No indicado"}`,
        `Servicios de interés: ${selected}`,
        "",
        "Necesidad institucional:",
        data.get("message")
      ].join("\n");
      const subject = `Solicitud de alianza IPS — ${data.get("institution")}`;
      const success = $("[data-alliance-success]");
      if (success) success.hidden = false;
      window.location.href = `mailto:granados031981@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  initTheme();
  initNavigation();
  initProgressAndReveal();
  initTypewriter();
  renderInstitutions();
  initServices();
  initReasons();
  initApproach();
  initBooking();
  initIpsModal();
  initAllianceForm();
  hydrateIcons();
})();
