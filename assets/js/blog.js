/**
 * blog.js — moteur de blog 100% vanilla JS
 *
 * Fonctionnement :
 * 1. /blog/posts.json liste les métadonnées de chaque article
 *    (titre, slug, date, catégorie, tags, extrait, fichier .md).
 * 2. blog.html affiche la liste (recherche, catégories, tags, pagination)
 *    en lisant uniquement posts.json (rapide, pas besoin de télécharger
 *    tous les .md pour la liste).
 * 3. blog-post.html récupère le fichier .md correspondant au slug dans
 *    l'URL (?post=slug) et le convertit en HTML avec un petit parseur
 *    Markdown maison (parseMarkdown).
 *
 * Pour ajouter un article : déposer un fichier .md dans /blog/posts/
 * et ajouter une entrée dans /blog/posts.json.
 */

const POSTS_PER_PAGE = 4;
const POSTS_INDEX_URL = "blog/posts.json";

const state = {
  posts: [],
  filtered: [],
  search: "",
  category: "all",
  tag: null,
  page: 1,
};

/* ============================================================
   PARTIE LISTE (blog.html)
   ============================================================ */
async function initBlogList() {
  const listEl = document.getElementById("posts-list");
  if (!listEl) return;

  try {
    state.posts = await fetchPostsIndex();
  } catch (err) {
    listEl.innerHTML = `<p class="empty-state">Impossible de charger les articles pour le moment.</p>`;
    console.error(err);
    return;
  }

  // Tri par date décroissante
  state.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  state.filtered = [...state.posts];

  renderCategories();
  renderTags();
  renderPosts();

  const searchInput = document.getElementById("blog-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.trim().toLowerCase();
      state.page = 1;
      applyFilters();
    });
  }
}

async function fetchPostsIndex() {
  const res = await fetch(POSTS_INDEX_URL);
  if (!res.ok) throw new Error("posts.json introuvable");
  return res.json();
}

function applyFilters() {
  state.filtered = state.posts.filter((post) => {
    const matchesSearch =
      !state.search ||
      post.title.toLowerCase().includes(state.search) ||
      post.excerpt.toLowerCase().includes(state.search) ||
      post.tags.some((t) => t.toLowerCase().includes(state.search));

    const matchesCategory = state.category === "all" || post.category === state.category;
    const matchesTag = !state.tag || post.tags.includes(state.tag);

    return matchesSearch && matchesCategory && matchesTag;
  });
  renderPosts();
}

function renderCategories() {
  const container = document.getElementById("category-list");
  if (!container) return;

  const categories = ["all", ...new Set(state.posts.map((p) => p.category))];
  container.innerHTML = categories
    .map(
      (cat) => `
      <li>
        <button data-category="${cat}" class="${cat === "all" ? "active" : ""}">
          <span>${cat === "all" ? "Tous les articles" : cat}</span>
          <span>${cat === "all" ? state.posts.length : state.posts.filter((p) => p.category === cat).length}</span>
        </button>
      </li>`
    )
    .join("");

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.category = btn.dataset.category;
      state.page = 1;
      container.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });
}

function renderTags() {
  const container = document.getElementById("tag-cloud");
  if (!container) return;

  const tags = [...new Set(state.posts.flatMap((p) => p.tags))];
  container.innerHTML = tags.map((tag) => `<button data-tag="${tag}">#${tag}</button>`).join("");

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;
      const isActive = state.tag === tag;
      container.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      state.tag = isActive ? null : tag;
      if (!isActive) btn.classList.add("active");
      state.page = 1;
      applyFilters();
    });
  });
}

function renderPosts() {
  const listEl = document.getElementById("posts-list");
  const paginationEl = document.getElementById("pagination");
  if (!listEl) return;

  if (!state.filtered.length) {
    listEl.innerHTML = `
      <div class="empty-state">
        <h3>Aucun article trouvé</h3>
        <p>Essayez un autre mot-clé ou réinitialisez les filtres.</p>
      </div>`;
    if (paginationEl) paginationEl.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(state.filtered.length / POSTS_PER_PAGE);
  state.page = Math.min(state.page, totalPages) || 1;
  const start = (state.page - 1) * POSTS_PER_PAGE;
  const pagePosts = state.filtered.slice(start, start + POSTS_PER_PAGE);

  listEl.innerHTML = pagePosts
    .map(
      (post) => `
      <article class="post-card reveal is-visible">
        <div class="post-meta">
          <span>${formatDate(post.date)}</span>
          <span>·</span>
          <span>${post.category}</span>
        </div>
        <h2><a href="blog-post.html?post=${post.slug}">${post.title}</a></h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-tags">
          ${post.tags.map((t) => `<span class="tech-tag">#${t}</span>`).join("")}
        </div>
      </article>`
    )
    .join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const paginationEl = document.getElementById("pagination");
  if (!paginationEl) return;
  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i === state.page ? "active" : ""}" data-page="${i}" aria-label="Page ${i}">${i}</button>`;
  }
  paginationEl.innerHTML = html;

  paginationEl.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.page = Number(btn.dataset.page);
      renderPosts();
      document.getElementById("posts-list").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

/* ============================================================
   PARTIE ARTICLE UNIQUE (blog-post.html)
   ============================================================ */
async function initSinglePost() {
  const container = document.getElementById("post-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("post");

  if (!slug) {
    container.innerHTML = notFoundMarkup();
    return;
  }

  try {
    const posts = await fetchPostsIndex();
    const meta = posts.find((p) => p.slug === slug);
    if (!meta) throw new Error("Article introuvable dans l'index");

    const res = await fetch(`blog/posts/${meta.file}`);
    if (!res.ok) throw new Error("Fichier markdown introuvable");
    const markdown = await res.text();

    document.title = `${meta.title} — Blog de Mahdi Belhadj Sassi`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", meta.excerpt);

    container.innerHTML = `
      <header class="post-header reveal is-visible">
        <div class="post-meta" style="justify-content:center;">
          <span>${formatDate(meta.date)}</span>
          <span>·</span>
          <span>${meta.category}</span>
        </div>
        <h1>${meta.title}</h1>
        <div class="post-tags" style="justify-content:center;">
          ${meta.tags.map((t) => `<span class="tech-tag">#${t}</span>`).join("")}
        </div>
      </header>
      <div class="post-content reveal is-visible">${parseMarkdown(markdown)}</div>
      <p style="text-align:center; margin-top:3rem;">
        <a class="btn btn-outline" href="blog.html">&larr; Retour au blog</a>
      </p>`;
  } catch (err) {
    console.error(err);
    container.innerHTML = notFoundMarkup();
  }
}

function notFoundMarkup() {
  return `
    <div class="empty-state">
      <h3>Article introuvable</h3>
      <p>Cet article n'existe pas ou a été déplacé.</p>
      <a class="btn btn-primary" href="blog.html" style="margin-top:1rem;">Voir tous les articles</a>
    </div>`;
}

/* ============================================================
   PETIT PARSEUR MARKDOWN (sans dépendance externe)
   Prend en charge : titres, gras/italique, liens, images,
   listes, citations, code inline/bloc, paragraphes.
   ============================================================ */
function parseMarkdown(md) {
  // Échappe le HTML brut pour éviter les injections
  let text = md.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Blocs de code ```...```
  const codeBlocks = [];
  text = text.replace(/```([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(code.trim());
    return `%%CODEBLOCK${codeBlocks.length - 1}%%`;
  });

  // Titres
  text = text
    .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Citations
  text = text.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

  // Images ![alt](src)
  text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy">');

  // Liens [texte](url)
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Gras et italique
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Code inline
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Listes non ordonnées
  text = text.replace(/(?:^|\n)((?:- .*(?:\n|$))+)/g, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => `<li>${line.replace(/^- /, "")}</li>`)
      .join("");
    return `\n<ul>${items}</ul>\n`;
  });

  // Paragraphes : on découpe par double saut de ligne
  text = text
    .split(/\n\s*\n/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h1|h2|h3|h4|ul|blockquote|img|%%CODEBLOCK)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  // Réinjecte les blocs de code
  text = text.replace(/%%CODEBLOCK(\d+)%%/g, (_, i) => `<pre><code>${codeBlocks[Number(i)]}</code></pre>`);

  return text;
}

document.addEventListener("DOMContentLoaded", () => {
  initBlogList();
  initSinglePost();
});
