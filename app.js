// ===== Util =====
const $ = (sel) => document.querySelector(sel);
const toastEl = $("#toast");

function toast(msg, ms = 1800) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), ms);
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    toast("Copiado!");
  }catch{
    toast("Não deu pra copiar (permita clipboard).");
  }
}

// ===== Hero backgrounds =====
function setHero(el, imagePath, pillText, title, subtitle) {
  el.style.setProperty("--hero", `url('${imagePath}')`);
  el.innerHTML = `
    <div class="heroInner">
      <span class="pill">${pillText}</span>
      <h2 class="heroTitle">${title}</h2>
      <p class="heroSub">${subtitle}</p>
    </div>
  `;
}

function setupHeros(){
  setHero($("#heroHome"), "./imagens/hero-hoje.jpg", "Dia em dia", "Hoje", "Escolha uma opção para começar.");

  setHero($("#heroDevocional"), "./imagens/hero-devocional.jpg", "Devocional", "30 dias", "Marque os dias feitos e siga firme.");

  setHero($("#heroBiblia"), "./imagens/hero-biblia.jpg", "Bíblia", "Leitura", "Escolha um livro e veja um versículo.");

  setHero($("#heroOracao"), "./imagens/hero-oracao.jpg", "Oração", "Apoio", "Escreva sua oração e receba mensagens por tema.");

  setHero($("#heroAudio"), "./imagens/hero-temas.jpg", "Áudio", "Mensagens", "Demo interativo (depois liga com áudios reais).");

  setHero($("#heroSermoes"), "./imagens/hero-temas.jpg", "Sermões", "Assista", "Abra links de sermões e vídeos.");

  setHero($("#heroCulto"), "./imagens/hero-calendario.jpg", "Culto", "Ao vivo", "Abra a live/canal da igreja.");
}

// ===== Navegação SPA =====
const screens = ["home","devocional","biblia","oracao","audio","sermoes","culto"];

function openScreen(name){
  screens.forEach(s => {
    const el = $(`#screen-${s}`);
    if (!el) return;
    el.classList.toggle("active", s === name);
  });

  document.querySelectorAll(".navItem").forEach(item => {
    item.classList.toggle("active", item.dataset.open === name);
  });

  location.hash = `#${name}`;
}

function initNavigation(){
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]")?.dataset.open;
    if (open) return openScreen(open);

    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) return showRandomVerse(bookBtn.dataset.book);

    const linkBtn = e.target.closest("[data-openlink]");
    if (linkBtn) {
      window.open(linkBtn.dataset.openlink, "_blank", "noopener,noreferrer");
      return;
    }
  });

  const initial = (location.hash || "#home").replace("#","");
  openScreen(screens.includes(initial) ? initial : "home");
}

// ===== Bíblia demo =====
const BIBLE = {
  "Salmos": [
    { ref: "Salmos 23:1", text: "O Senhor é o meu pastor; nada me faltará." },
    { ref: "Salmos 46:1", text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia." },
    { ref: "Salmos 119:105", text: "Lâmpada para os meus pés é a tua palavra e, luz para o meu caminho." }
  ],
  "Provérbios": [
    { ref: "Provérbios 3:5", text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento." },
    { ref: "Provérbios 16:3", text: "Confia ao Senhor as tuas obras, e os teus desígnios serão estabelecidos." }
  ],
  "João": [
    { ref: "João 3:16", text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito..." },
    { ref: "João 14:6", text: "Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim." }
  ],
};

let currentBook = "Salmos";
let currentVerse = null;

function showRandomVerse(book){
  currentBook = book;
  const list = BIBLE[book] || [];
  if (!list.length) {
    $("#bibliaVerse").textContent = "Sem versículos carregados.";
    return;
  }
  currentVerse = list[Math.floor(Math.random() * list.length)];
  $("#bibliaVerse").innerHTML = `<b>${currentVerse.ref}</b><br>${currentVerse.text}`;
  toast(`Livro: ${book}`);
}

// ===== Devocional 30 dias =====
const DEVOCIONAL_30 = [
  { ref:"Dia 1 — Salmos 23:1", text:"O Senhor é o meu pastor; nada me faltará." },
  { ref:"Dia 2 — Isaías 41:10", text:"Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus." },
  { ref:"Dia 3 — Filipenses 4:6", text:"Não andeis ansiosos... sejam conhecidas diante de Deus as vossas petições." },
  { ref:"Dia 4 — João 14:27", text:"Deixo-vos a paz, a minha paz vos dou." },
  { ref:"Dia 5 — Provérbios 3:5", text:"Confia no Senhor de todo o teu coração..." },
  { ref:"Dia 6 — Salmos 46:1", text:"Deus é o nosso refúgio e fortaleza..." },
  { ref:"Dia 7 — Mateus 11:28", text:"Vinde a mim, todos os que estais cansados e oprimidos..." },
  { ref:"Dia 8 — Romanos 8:28", text:"Todas as coisas cooperam para o bem dos que amam a Deus." },
  { ref:"Dia 9 — Salmos 121:1-2", text:"Elevo os meus olhos... o meu socorro vem do Senhor." },
  { ref:"Dia 10 — 2 Coríntios 12:9", text:"A minha graça te basta, porque o poder se aperfeiçoa na fraqueza." },
  { ref:"Dia 11 — Tiago 1:5", text:"Se alguém tem falta de sabedoria, peça-a a Deus..." },
  { ref:"Dia 12 — 1 Pedro 5:7", text:"Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós." },
  { ref:"Dia 13 — Salmos 37:5", text:"Entrega o teu caminho ao Senhor; confia nele, e o mais ele fará." },
  { ref:"Dia 14 — João 3:16", text:"Porque Deus amou o mundo de tal maneira..." },
  { ref:"Dia 15 — Lamentações 3:22-23", text:"As misericórdias do Senhor... renovam-se cada manhã." },
  { ref:"Dia 16 — Hebreus 13:5", text:"Não te deixarei, nem te desampararei." },
  { ref:"Dia 17 — Salmos 119:105", text:"Lâmpada para os meus pés é a tua palavra..." },
  { ref:"Dia 18 — Efésios 2:8", text:"Pela graça sois salvos, mediante a fé." },
  { ref:"Dia 19 — Romanos 12:2", text:"Transformai-vos pela renovação da vossa mente." },
  { ref:"Dia 20 — Josué 1:9", text:"Sê forte e corajoso... o Senhor teu Deus é contigo." },
  { ref:"Dia 21 — Mateus 6:33", text:"Buscai primeiro o Reino de Deus..." },
  { ref:"Dia 22 — 1 João 1:9", text:"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar." },
  { ref:"Dia 23 — Colossenses 3:13", text:"Perdoai-vos uns aos outros, como o Senhor vos perdoou." },
  { ref:"Dia 24 — Provérbios 18:10", text:"Torre forte é o nome do Senhor." },
  { ref:"Dia 25 — João 14:6", text:"Eu sou o caminho, e a verdade, e a vida." },
  { ref:"Dia 26 — Salmos 34:8", text:"Provai e vede que o Senhor é bom." },
  { ref:"Dia 27 — 2 Timóteo 1:7", text:"Deus não nos deu espírito de temor, mas de poder, amor e equilíbrio." },
  { ref:"Dia 28 — Salmos 91:1", text:"Aquele que habita no esconderijo do Altíssimo..." },
  { ref:"Dia 29 — Romanos 5:8", text:"Deus prova o seu amor para conosco..." },
  { ref:"Dia 30 — Apocalipse 21:4", text:"E Deus limpará de seus olhos toda lágrima..." }
];

const DEV_KEY = "devocional30_done"; // array booleana
function loadDevState(){
  try{
    const raw = localStorage.getItem(DEV_KEY);
    if (!raw) return Array(30).fill(false);
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.length === 30 ? arr : Array(30).fill(false);
  }catch{
    return Array(30).fill(false);
  }
}
function saveDevState(state){
  localStorage.setItem(DEV_KEY, JSON.stringify(state));
}
function todayIndex(){
  // simples: usa o dia do mês e "encaixa" em 0-29
  const d = new Date().getDate(); // 1..31
  return (d - 1) % 30;
}
function renderDevocional(){
  const listEl = $("#devocionalList");
  const state = loadDevState();

  const doneCount = state.filter(Boolean).length;
  $("#devocionalProgress").textContent = `${doneCount}/30 feitos`;

  listEl.innerHTML = "";

  DEVOCIONAL_30.forEach((v, i) => {
    const item = document.createElement("div");
    item.className = "dayItem";
    item.innerHTML = `
      <input type="checkbox" ${state[i] ? "checked" : ""} data-day="${i}">
      <div class="dayText">
        <b>${v.ref}</b>
        <div>${v.text}</div>
        <div class="mutedLine">Toque no checkbox para marcar.</div>
      </div>
    `;
    listEl.appendChild(item);
  });

  listEl.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const idx = Number(cb.dataset.day);
      const s = loadDevState();
      s[idx] = cb.checked;
      saveDevState(s);
      renderDevocional();
    });
  });
}
function getTodayDevVerse(){
  const idx = todayIndex();
  return DEVOCIONAL_30[idx];
}

// ===== Oração: Campo + mensagens por tema =====
const PRAYER_KEY = "oracao_campo_texto";

function loadPrayer(){
  return localStorage.getItem(PRAYER_KEY) || "";
}
function savePrayer(text){
  localStorage.setItem(PRAYER_KEY, text);
}

const SUPPORT_TOPICS = {
  "Medo": [
    "Quando o medo vier, lembre-se: Deus está com você. Respire, ore e siga um passo de cada vez.",
    "O Senhor luta por você. Sua coragem não vem da ausência de medo, mas da presença de Deus."
  ],
  "Perdão": [
    "Perdoar não é dizer que foi certo — é escolher ser livre, como Cristo te libertou.",
    "O perdão cura por dentro primeiro. Deus te dá graça para recomeçar."
  ],
  "Casamento": [
    "Amor se constrói com paciência, verdade e oração. Deus restaura o que parece quebrado.",
    "Honre, ouça, peça perdão rápido e ore junto. Pequenas atitudes mudam tudo."
  ],
  "Ansiedade": [
    "Entregue hoje nas mãos de Deus. Amanhã não está nas suas mãos, mas está nas mãos dEle.",
    "Faça sua parte e descanse: Deus cuida do que você não consegue controlar."
  ],
  "Tristeza": [
    "Você não está sozinho. Deus recolhe suas lágrimas e te sustenta no vale.",
    "Mesmo na noite, Deus está trabalhando. A alegria volta, no tempo certo."
  ],
  "Família": [
    "Deus pode curar relacionamentos e trazer paz ao lar. Comece com oração e mansidão.",
    "A sua casa pode ser um lugar de presença de Deus — um dia de cada vez."
  ],
  "Propósito": [
    "Deus não te chamou por acaso. O seu propósito cresce enquanto você permanece fiel.",
    "Pequena obediência hoje abre portas grandes amanhã."
  ],
  "Trabalho/Finanças": [
    "Deus honra o esforço com integridade. Peça sabedoria e aja com prudência.",
    "Uma porta pode parecer fechada, mas Deus sabe abrir caminhos onde não existe."
  ]
};

let currentTopic = "Medo";
let currentSupportMessage = "";

function renderTopicChips(){
  const chips = $("#chipsTemas");
  chips.innerHTML = "";
  Object.keys(SUPPORT_TOPICS).forEach(topic => {
    const c = document.createElement("div");
    c.className = "chip" + (topic === currentTopic ? " active" : "");
    c.textContent = topic;
    c.onclick = () => {
      currentTopic = topic;
      renderTopicChips();
      generateSupportMessage();
    };
    chips.appendChild(c);
  });
}

function generateSupportMessage(){
  const arr = SUPPORT_TOPICS[currentTopic] || [];
  if (!arr.length) {
    currentSupportMessage = "Sem mensagens nesse tema.";
  } else {
    currentSupportMessage = arr[Math.floor(Math.random() * arr.length)];
  }
  $("#msgApoioBox").innerHTML = `<b>${currentTopic}</b><br>${currentSupportMessage}`;
  toast("Mensagem atualizada.");
}

// ===== Áudio demo =====
let demoAudio = null;
function playDemo(){
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = "sine";
  o.frequency.value = 440;
  g.gain.value = 0.03;
  o.start();
  $("#audioStatus").textContent = "Tocando demo...";
  demoAudio = { ctx, o };
  setTimeout(() => { stopDemo(); }, 800);
}
function stopDemo(){
  if (!demoAudio) {
    $("#audioStatus").textContent = "Parado.";
    return;
  }
  try { demoAudio.o.stop(); } catch {}
  try { demoAudio.ctx.close(); } catch {}
  demoAudio = null;
  $("#audioStatus").textContent = "Parado.";
}

// ===== Culto link =====
const CULTO_URL = "https://youtube.com/@comunidadedaesperanca7530?si=5AmdNQo7xl22edXq";

// ===== Botões =====
function wireButtons(){
  // Bíblia
  $("#btnNewVerse").onclick = () => showRandomVerse(currentBook);
  $("#btnCopyVerse").onclick = () => {
    if (!currentVerse) return toast("Gere um versículo primeiro.");
    copyText(`${currentVerse.ref} — ${currentVerse.text}`);
  };

  // Busca
  $("#btnSearch").onclick = () => toast("Busca: (próximo passo a gente liga no conteúdo)");

  // Áudio
  $("#btnPlayDemo").onclick = playDemo;
  $("#btnStopDemo").onclick = stopDemo;

  // Devocional
  $("#btnDevocionalHoje").onclick = () => {
    const idx = todayIndex();
    const items = $("#devocionalList").querySelectorAll(".dayItem");
    if (items[idx]) items[idx].scrollIntoView({ behavior:"smooth", block:"center" });
    toast(`Dia de hoje: ${idx+1}/30`);
  };
  $("#btnDevocionalReset").onclick = () => {
    saveDevState(Array(30).fill(false));
    renderDevocional();
    toast("Devocional reiniciado.");
  };
  $("#btnDevocionalCopiarHoje").onclick = () => {
    const v = getTodayDevVerse();
    copyText(`${v.ref} — ${v.text}`);
  };

  // Oração campo
  $("#btnSalvarOracao").onclick = () => {
    const t = $("#prayerInput").value.trim();
    savePrayer(t);
    toast("Oração salva.");
  };
  $("#btnCopiarOracaoCampo").onclick = () => {
    const t = $("#prayerInput").value.trim();
    if (!t) return toast("Campo vazio.");
    copyText(t);
  };
  $("#btnLimparOracaoCampo").onclick = () => {
    $("#prayerInput").value = "";
    savePrayer("");
    toast("Campo limpo.");
  };

  // Mensagens de apoio
  $("#btnNovaMensagemApoio").onclick = generateSupportMessage;
  $("#btnCopiarMensagemApoio").onclick = () => {
    if (!currentSupportMessage) return toast("Gere uma mensagem primeiro.");
    copyText(`[${currentTopic}] ${currentSupportMessage}`);
  };

  // Culto
  $("#btnAbrirCulto").onclick = () => {
    window.open(CULTO_URL, "_blank", "noopener,noreferrer");
  };

  // Limpar cache (SW)
  $("#btnClearCache").onclick = async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    toast("Cache apagado. Recarregue a página.");
  };
}

// ===== Service Worker =====
function registerSW(){
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") {
    console.warn("Abra com Live Server (http://localhost) para o SW funcionar.");
    return;
  }
  navigator.serviceWorker.register("./sw.js")
    .then(() => console.log("SW ok"))
    .catch((e) => console.error("SW erro:", e));
}

// ===== Init =====
setupHeros();
initNavigation();
wireButtons();
registerSW();

// Inicializa conteúdos
showRandomVerse("Salmos");

// Devocional
renderDevocional();

// Oração
$("#prayerInput").value = loadPrayer();

// Mensagens
renderTopicChips();
generateSupportMessage();
