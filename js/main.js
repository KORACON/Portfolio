(() => {
  const burger = document.querySelector('[data-burger]');
  const mobile = document.querySelector('[data-mobile]');
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const langBtn = document.querySelector('[data-lang-toggle]');
  const year = document.querySelector('[data-year]');

  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    mobile.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      mobile.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  }

  // Active link by pathname
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path) a.classList.add('active');
  });

  // Theme
  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (themeBtn) themeBtn.textContent = (t === 'light') ? '☾ Dark' : '☀ Light';
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') applyTheme(savedTheme);
  else applyTheme('dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Language dictionary
  const dict = {
    ru: {
      // NAV
      nav_home: "Главная",
      nav_projects: "Проекты",
      nav_stack: "Стек",
      nav_experience: "Опыт",
      nav_services: "Услуги",
      nav_contacts: "Контакты",

      role: "Frontend · Bots",

      // HOME
      hero_kicker: "/Frontend Developer · Bot Developer",
      hero_title: "Делаю UI и ботов, которые держатся на логике.",
      hero_text: "React/TS интерфейсы, админки, Telegram-боты, интеграции API (CRM, платежи, webhooks). Люблю ясную архитектуру, хороший UX и стабильность.",
      hero_cta_contact: "Связаться",
      hero_cta_projects: "Смотреть проекты",

      sections_title: "Разделы",
      sections_sub: "все кнопки на главной, каждая ведёт на отдельную страницу",
      open: "Открыть →",

      card_projects_t: "Проекты",
      card_projects_d: "Избранные кейсы: Frontend, Telegram-боты, интеграции.",
      card_stack_t: "Стек",
      card_stack_d: "Технологии и уровни: core / confident / familiar.",
      card_exp_t: "Опыт",
      card_exp_d: "Короткий таймлайн: роли, достижения, цифры.",
      card_services_t: "Услуги",
      card_services_d: "Пакеты, процесс, что входит, форматы сотрудничества.",
      card_contacts_t: "Контакты",
      card_contacts_d: "Только контактная информация и быстрые ссылки.",

      tip_t: "Подсказка",
      tip_d: "В хедере есть переключатели темы и языка. Выбор сохраняется в браузере.",

      // COMMON
      back_home: "← На главную",

      // CONTACTS
      contacts_title: "Связаться со мной",
      contacts_sub: "Здесь только контактная информация.",
      fast_channels: "Быстрые каналы",
      brief_title: "Короткий бриф",
      brief_list: "1) Что нужно сделать?\n2) Сроки/приоритеты?\n3) Есть ли дизайн/референсы?\n4) Нужны ли интеграции (CRM/оплата/таблицы)?",
      tz: "Timezone: UTC+3 · Формат: remote",

      // PROJECTS PAGE
      projects_title: "Проекты",
      projects_sub: "Карточки кейсов: Frontend / Bots / Integrations.",
      projects_c1_k: "Bots",
      projects_c1_t: "Бот заявок + админка",
      projects_c1_d: "Лиды, роли, CRM, уведомления, логирование.",
      projects_c1_a1: "GitHub",
      projects_c1_a2: "Демо",
      projects_c2_k: "Frontend",
      projects_c2_t: "Панель оператора",
      projects_c2_d: "Таблицы, фильтры, RBAC, история изменений.",
      projects_c2_a1: "GitHub",
      projects_c2_a2: "Кейс",
      projects_c3_k: "Integrations",
      projects_c3_t: "CRM + Webhooks",
      projects_c3_d: "События, ретраи, rate-limit, мониторинг ошибок.",
      projects_c3_a1: "Описание",
      projects_c3_a2: "Связаться",

      // STACK PAGE
      stack_title: "Стек",
      stack_sub: "Коротко по категориям (можно расширить позже).",
      stack_front_k: "Frontend",
      stack_front_d: "React, TypeScript, Next.js, Tailwind, Vite, Accessibility, Performance.",
      stack_bot_k: "Bots / Backend",
      stack_bot_d: "Telegram bots (FSM, anti-flood), Webhooks, REST, Postgres, Redis, Docker, CI/CD.",

      // EXPERIENCE PAGE
      exp_title: "Опыт",
      exp_sub: "Коротко, факты, цифры.",
      exp_1_k: "2022 – сейчас",
      exp_1_t: "Frontend & Bot Developer · Freelance",
      exp_1_d: "Боты, админки, интеграции. Оптимизация perf/UX. Поддержка и релизы.",
      exp_2_k: "2019 – 2022",
      exp_2_t: "Frontend Developer · Product Team",
      exp_2_d: "Компоненты UI, типизация, улучшение качества релизов, ускорение внедрения фич.",

      // SERVICES PAGE
      svc_title: "Услуги",
      svc_sub: "Пакеты и процесс. Цены можно добавить позже.",
      svc_mvp_k: "MVP",
      svc_mvp_t: "Быстрый запуск",
      svc_mvp_d: "Основной сценарий, минимальный UI, нужные интеграции.",
      svc_std_k: "Standard",
      svc_std_t: "Прод + качество",
      svc_std_d: "Роли, логи, мониторинг, UX-полировка, стабильность.",
      svc_turn_k: "Turnkey",
      svc_turn_t: "Под ключ",
      svc_turn_d: "Архитектура, CI/CD, документация, сопровождение.",
      svc_cta: "Запросить"
    },

    en: {
      // NAV
      nav_home: "Home",
      nav_projects: "Projects",
      nav_stack: "Stack",
      nav_experience: "Experience",
      nav_services: "Services",
      nav_contacts: "Contacts",

      role: "Frontend · Bots",

      // HOME
      hero_kicker: "/Frontend Developer · Bot Developer",
      hero_title: "I build UI and bots that stand on logic, not luck.",
      hero_text: "React/TS interfaces, dashboards, Telegram bots, and API integrations (CRM, payments, webhooks). I care about clean architecture, strong UX, and reliability.",
      hero_cta_contact: "Contact me",
      hero_cta_projects: "View projects",

      sections_title: "Sections",
      sections_sub: "all buttons are on the home page, each opens its own page",
      open: "Open →",

      card_projects_t: "Projects",
      card_projects_d: "Selected cases: Frontend, Telegram bots, integrations.",
      card_stack_t: "Stack",
      card_stack_d: "Technologies and levels: core / confident / familiar.",
      card_exp_t: "Experience",
      card_exp_d: "Short timeline: roles, achievements, numbers.",
      card_services_t: "Services",
      card_services_d: "Packages, process, deliverables, collaboration formats.",
      card_contacts_t: "Contacts",
      card_contacts_d: "Only contact info and quick links.",

      tip_t: "Tip",
      tip_d: "Theme and language toggles are in the header. Your choice is saved.",

      // COMMON
      back_home: "← Back to home",

      // CONTACTS
      contacts_title: "Get in touch",
      contacts_sub: "Only contact information on this page.",
      fast_channels: "Quick channels",
      brief_title: "Quick brief",
      brief_list: "1) What do you need?\n2) Timeline/priorities?\n3) Any design/reference?\n4) Do you need integrations (CRM/payments/tables)?",
      tz: "Timezone: UTC+3 · Format: remote",

      // PROJECTS PAGE
      projects_title: "Projects",
      projects_sub: "Case cards: Frontend / Bots / Integrations.",
      projects_c1_k: "Bots",
      projects_c1_t: "Lead bot + admin panel",
      projects_c1_d: "Leads, roles, CRM, notifications, logging.",
      projects_c1_a1: "GitHub",
      projects_c1_a2: "Demo",
      projects_c2_k: "Frontend",
      projects_c2_t: "Operator dashboard",
      projects_c2_d: "Tables, filters, RBAC, change history.",
      projects_c2_a1: "GitHub",
      projects_c2_a2: "Case",
      projects_c3_k: "Integrations",
      projects_c3_t: "CRM + Webhooks",
      projects_c3_d: "Events, retries, rate-limit, error monitoring.",
      projects_c3_a1: "Details",
      projects_c3_a2: "Contact",

      // STACK PAGE
      stack_title: "Stack",
      stack_sub: "Short by categories (can be expanded later).",
      stack_front_k: "Frontend",
      stack_front_d: "React, TypeScript, Next.js, Tailwind, Vite, Accessibility, Performance.",
      stack_bot_k: "Bots / Backend",
      stack_bot_d: "Telegram bots (FSM, anti-flood), Webhooks, REST, Postgres, Redis, Docker, CI/CD.",

      // EXPERIENCE PAGE
      exp_title: "Experience",
      exp_sub: "Short, factual, numbers-friendly.",
      exp_1_k: "2022 – present",
      exp_1_t: "Frontend & Bot Developer · Freelance",
      exp_1_d: "Bots, dashboards, integrations. perf/UX optimization. Support and releases.",
      exp_2_k: "2019 – 2022",
      exp_2_t: "Frontend Developer · Product Team",
      exp_2_d: "UI components, typing, release quality improvements, faster feature delivery.",

      // SERVICES PAGE
      svc_title: "Services",
      svc_sub: "Packages and process. Pricing can be added later.",
      svc_mvp_k: "MVP",
      svc_mvp_t: "Fast launch",
      svc_mvp_d: "Core flow, minimal UI, required integrations.",
      svc_std_k: "Standard",
      svc_std_t: "Production-ready",
      svc_std_d: "Roles, logs, monitoring, UX polish, stability.",
      svc_turn_k: "Turnkey",
      svc_turn_t: "End-to-end",
      svc_turn_d: "Architecture, CI/CD, documentation, maintenance.",
      svc_cta: "Request"
    }
  };

  const applyLang = (lang) => {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);
    if (langBtn) langBtn.textContent = (lang === 'ru') ? 'EN' : 'RU';

    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      const value = dict[lang]?.[key];
      if (!value) return;
      node.textContent = value;
    });
  };

  const savedLang = localStorage.getItem('lang');
  if (savedLang === 'ru' || savedLang === 'en') applyLang(savedLang);
  else applyLang('ru');

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-lang') || 'ru';
      applyLang(current === 'ru' ? 'en' : 'ru');
    });
  }
})();
