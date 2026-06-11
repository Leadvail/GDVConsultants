const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html'));

const css = `
    /* Custom Header overrides for HUB */
    #main-header {
      background: var(--navy) !important;
      border-bottom: 1px solid rgba(255,255,255,0.05) !important;
    }
    #main-header.scrolled {
      box-shadow: 0 4px 24px rgba(0,0,0,0.3) !important;
    }
    .nav-links a {
      color: rgba(255,255,255,0.7) !important;
    }
    .nav-links a:hover {
      color: var(--white) !important;
      background: transparent !important;
    }
    .nav-links a.active {
      color: var(--amber) !important;
      background: transparent !important;
      position: relative;
    }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 14px;
      right: 14px;
      height: 2px;
      background: var(--amber);
    }
    .nav-hamburger span {
      background: var(--white) !important;
    }
    @media (max-width: 768px) {
      .nav-menu-group.open {
        background: var(--navy) !important;
        border-top: 1px solid rgba(255,255,255,0.1) !important;
      }
      .blog-hero { padding: 120px 20px 60px !important; }
      .blog-content { padding: 40px 20px !important; }
      .blog-article h2 { font-size: 1.5rem !important; margin: 32px 0 16px !important; }
      .hub-grid { grid-template-columns: 1fr !important; }
      .hub-row-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
    }
`;

const html = `<!-- HEADER -->
  <header id="main-header" role="banner" class="scrolled">
    <div class="container">
      <nav class="nav-inner" aria-label="Main navigation">
        <a href="index.html" class="nav-logo" aria-label="GDV Consultants Home" style="display:flex; align-items:center; gap: 12px; text-decoration: none;">
          <div class="nav-logo-img-wrap">
            <img src="images/gdv_hub_logo.png" alt="GDV Consultants" width="120" height="76" style="object-fit: contain;" />
          </div>
          <span style="color: var(--amber); font-family: var(--font-display); font-weight: 800; font-size: 1.8rem; letter-spacing: 0.05em; padding-left: 12px; border-left: 2px solid rgba(255,255,255,0.2);">HUB</span>
        </a>
        <div class="nav-menu-group" id="nav-menu-group">
          <ul class="nav-links" id="nav-links" role="list">
            <li><a href="hub.html#podcasts">Podcasts</a></li>
            <li><a href="hub.html#vlogs">Vlogs</a></li>
            <li><a href="hub.html#blog" class="active">Blog</a></li>
          </ul>
          <div class="nav-cta" id="nav-cta-wrap">
            <a href="index.html?contact=true" id="nav-cta-btn" class="btn btn-teal">Request a consultation</a>
          </div>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </div>
  </header>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('Custom Header overrides for HUB')) {
    content = content.replace('  </style>', css + '  </style>');
  } else {
    // If it exists, just strip it out and re-add it
    const parts = content.split('/* Custom Header overrides for HUB */');
    const before = parts[0];
    const after = parts[1].substring(parts[1].indexOf('</style>'));
    content = before + css + after;
  }
  content = content.replace(/<!-- HEADER -->[\s\S]*?<\/header>/, html);
  fs.writeFileSync(file, content);
}
