import glob
import os
import re

files = glob.glob("blog-*.html") + ["critical-decision-making.html"]

header_css = """
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
"""

header_html = """
  <!-- HEADER -->
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
  </header>
"""

for file in files:
    if not os.path.exists(file):
        continue
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "Custom Header overrides for HUB" not in content:
        content = content.replace("  </style>", header_css + "  </style>")
    else:
        content = re.sub(r'/\* Custom Header overrides for HUB \*/.*?(?=</style>)', header_css.strip() + '\n  ', content, flags=re.DOTALL)
        
    content = re.sub(r'<!-- HEADER -->.*?</header>', header_html.strip(), content, flags=re.DOTALL)
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
