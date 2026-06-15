// Ersatzteilsuche — manufacturer-picker page (recreates the BEEM-style O+
// screen captured from gconlineplus.de). Sits between Produktsuche and the
// per-manufacturer drill-down. Clicking a manufacturer is decorative in this
// prototype; the photo-upload ETS flow remains accessible via the screen
// jumper / a CTA on this page.

// ────────────────────────────────────────────────────────────────────────────
// Manufacturer thumbnails — stylised text-logos that mirror the captured grid.
// Each logo is a tiny inline SVG so the page works offline.
// ────────────────────────────────────────────────────────────────────────────
const BrandLogos = {
  aduxa: () =>
  <svg viewBox="0 0 200 80" style={{ width: "100%", height: "100%" }}>
      <text x="60" y="50" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="32" fill="#c8102e">aduxa</text>
      <g stroke="#c8102e" strokeWidth="4" fill="none">
        <line x1="38" y1="32" x2="56" y2="50" />
        <line x1="56" y1="32" x2="38" y2="50" />
        <circle cx="47" cy="41" r="14" />
      </g>
    </svg>,

  conel: () =>
  <svg viewBox="0 0 200 80" style={{ width: "100%", height: "100%" }}>
      <text x="100" y="45" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="28" fill="#0078b6" textAnchor="middle" letterSpacing="2">CONEL</text>
      <text x="100" y="62" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9" fill="#0078b6" textAnchor="middle" letterSpacing="3">CONNECTING ELEMENTS</text>
    </svg>,

  cosmo: () =>
  <svg viewBox="0 0 200 80" style={{ width: "100%", height: "100%" }}>
      <text x="100" y="42" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="28" fill="#1a1a1a" textAnchor="middle" letterSpacing="2">COSMO</text>
      <text x="100" y="58" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="8" fill="#666" textAnchor="middle" letterSpacing="3">GUTES KLIMA · BESSER LEBEN</text>
    </svg>,

  dtg: () => <BrandLogoGc text="DTG" />,
  efg: () => <BrandLogoGc text="EFG" />,
  gcgruppe: () =>
  <div className="brand-logo-gc-full">
      <div className="square">
        <div className="inner">
          <span className="g">G</span>
          <span className="c">C</span>
        </div>
      </div>
      <div className="label">GC GRUPPE</div>
    </div>,

  hti: () => <BrandLogoGc text="HTI" />,
  itg: () => <BrandLogoGc text="ITG" />,
  bims: () => <BrandLogoGc text="BIMS" textColor="#0d3e7a" />,
  gut: () => <BrandLogoGc text="G.U.T." />,
  hydro: () =>
  <svg viewBox="0 0 200 80" style={{ width: "100%", height: "100%" }}>
      <text x="100" y="50" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="26" fill="#0fa3e4" textAnchor="middle" letterSpacing="2">HYDROSOLAR</text>
    </svg>,

  grohe: () =>
  <svg viewBox="0 0 200 80" style={{ width: "100%", height: "100%" }}>
      <text x="100" y="50" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="30" fill="#1a1a1a" textAnchor="middle" letterSpacing="3">GROHE</text>
    </svg>

};

// Right-side "G.U.T. format" logo: word + small GC GRUPPE corner square.
const BrandLogoGc = ({ text, textColor = "#c8102e" }) =>
<div className="brand-logo-gc">
    <span className="word" style={{ color: textColor }}>{text}</span>
    <div className="corner">
      <div className="inner">
        <span className="g">G</span>
        <span className="c">C</span>
        <span className="gruppe">GRUPPE</span>
      </div>
    </div>
  </div>;


const MANUFACTURERS = [
{ id: "aduxa", name: "aduxa", count: 119, logo: "aduxa" },
{ id: "conel", name: "CONEL", count: 1529, logo: "conel" },
{ id: "cosmo", name: "COSMO", count: 1022, logo: "cosmo" },
{ id: "dtg", name: "DTG", count: 20, logo: "dtg" },
{ id: "efg", name: "EFG", count: 48, logo: "efg" },
{ id: "gcgruppe", name: "GC Gruppe", count: 87, logo: "gcgruppe" },
{ id: "hti", name: "HTI", count: 60, logo: "hti" },
{ id: "itg", name: "ITG", count: 45, logo: "itg" },
{ id: "bims", name: "BIMS", count: 34, logo: "bims" },
{ id: "gut", name: "G.U.T.", count: 71, logo: "gut" },
{ id: "hydro", name: "HYDROSOLAR", count: 28, logo: "hydro" },
{ id: "grohe", name: "GROHE", count: 412, logo: "grohe" }];


// ────────────────────────────────────────────────────────────────────────────
// Filter sidebar
// ────────────────────────────────────────────────────────────────────────────
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HERSTELLER_TOP = [
{ name: "2N TELEKOMUNIKACE a.s.", count: 4 },
{ name: "4 pipes GmbH", count: 5 },
{ name: "A.B.S. Silo- und Förder…", count: 22 },
{ name: "Aalberts/Seppelfricke", count: 114 },
{ name: "AB Akustik", count: 9 },
{ name: "ABB STOTZ-KONTAKT", count: 87 },
{ name: "ABU Plast", count: 13 },
{ name: "Acrylic Centre Europe", count: 6 }];


const FilterPanel = () => {
  const [archivOpen, setArchivOpen] = React.useState(true);
  const [herstellerOpen, setHerstellerOpen] = React.useState(true);
  const [herstellerTab, setHerstellerTab] = React.useState("alle");
  const [herstellerSearch, setHerstellerSearch] = React.useState("");

  return (
    <aside className="ets-filters">
      <button className="ets-filters-close" aria-label="Filter schließen"><IconX size={14} stroke={2.5} /></button>

      <div className="ets-filters-head">
        <div className="ets-filters-head-row">
          <span className="lbl">Filter (7)</span>
          <input className="filter-name" placeholder="Filterbezeichnung …" />
          <button className="trash" aria-label="Alle Filter löschen"><IconTrash size={14} stroke={2} /></button>
        </div>
        <div className="ets-filters-tabs">
          <span className="tab tab-pill active">Alle</span>
          <span className="tab-sep">|</span>
          <span className="tab tab-pill">Top</span>
          <span className="tab-sep">|</span>
          <div className="tab-letters">
            {LETTERS.map((l) => <span key={l} className="tab tab-letter">{l}</span>)}
          </div>
        </div>
      </div>

      <div className="filter-card">
        <div className="filter-head" onClick={() => setArchivOpen((o) => !o)}>
          <span>Archiviert</span>
          {archivOpen ? <IconChevU size={14} stroke={2} /> : <IconChevD size={14} stroke={2} />}
        </div>
        {archivOpen &&
        <div className="filter-body">
            <div className="filter-tab-row">
              <span className="filter-tab active">Top 1</span>
            </div>
            <label className="filter-opt">
              <input type="checkbox" defaultChecked />
              <span className="name">Nein</span>
              <span className="cnt">(38.115)</span>
            </label>
            <button className="filter-clear" aria-label="Auswahl löschen">
              <IconX size={12} stroke={2.5} />
            </button>
          </div>
        }
      </div>

      <div className="filter-card">
        <div className="filter-head" onClick={() => setHerstellerOpen((o) => !o)}>
          <span>Hersteller</span>
          {herstellerOpen ? <IconChevU size={14} stroke={2} /> : <IconChevD size={14} stroke={2} />}
        </div>
        {herstellerOpen &&
        <div className="filter-body">
            <div className="filter-tab-row two-tabs">
              <button
              className={"filter-tab" + (herstellerTab === "top" ? " active" : "")}
              onClick={() => setHerstellerTab("top")}>
                Top 10
              </button>
              <button
              className={"filter-tab" + (herstellerTab === "alle" ? " active" : "")}
              onClick={() => setHerstellerTab("alle")}>
                Alle (799)
              </button>
            </div>
            <input
            className="filter-search"
            placeholder="Nach Hersteller suchen …"
            value={herstellerSearch}
            onChange={(e) => setHerstellerSearch(e.target.value)} />
            <div className="filter-list">
              {HERSTELLER_TOP.
            filter((h) => !herstellerSearch || h.name.toLowerCase().includes(herstellerSearch.toLowerCase())).
            map((h) =>
            <label key={h.name} className="filter-opt">
                    <input type="checkbox" />
                    <span className="name">{h.name}</span>
                    <span className="cnt">({h.count})</span>
                  </label>
            )}
            </div>
          </div>
        }
      </div>
    </aside>);

};

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────
const ScreenErsatzteilsuche = ({ onPhotoSearch }) => {
  const [search, setSearch] = React.useState("");
  const filtered = MANUFACTURERS.filter((m) =>
  !search.trim() || m.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="ersatzteilsuche" style={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <button className="ets-experten-cta" onClick={onPhotoSearch}>
        <span className="cta-icon">
          <IconUser size={28} stroke={1.8} />
        </span>
        <span className="cta-body">
          <span className="cta-eyebrow">
            <span className="cta-badge">Neu</span>
            <span className="cta-eyebrow-label">Ersatzteil-Experten</span>
          </span>
          <span className="cta-title">Du findest dein Ersatzteil nicht?</span>
          <span className="cta-sub">
            Lad ein Foto hoch oder beschreib es kurz — unser Team ermittelt das passende
            Original-Teil und legt dir das Ergebnis direkt in deine Ersatzteilanfragen.
          </span>
          <span className="cta-meta">
            <span className="meta-item"><IconImage size={12} stroke={2} /> Foto-Upload</span>
            <span className="meta-item"><IconSpareParts size={12} stroke={2} /> Passende Teileliste</span>
            <span className="meta-item"><IconClock size={12} stroke={2} /> ⌀ 2 h Antwortzeit</span>
          </span>
        </span>
        <span className="cta-action">
          Anfrage starten
          <IconChevR size={14} stroke={2.5} />
        </span>
      </button>

      <div className="ets-search-row">
        <div className="ets-search-input">
          <input
            placeholder="Suchbegriff eingeben …"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="ets-search-btn" aria-label="Suchen">
          <IconSearch size={20} stroke={2.2} />
        </button>
        <button className="ets-bookmark-btn" aria-label="Vorgemerkte (0)">
          <IconMenu size={20} stroke={2.2} />
          <span className="badge">0</span>
        </button>
      </div>

      <div className="ets-layout">
        <FilterPanel />
        <div className="ets-manufacturers">
          {filtered.map((m) => {
            const Logo = BrandLogos[m.logo];
            return (
              <div className="brand-card" key={m.id}>
                <div className="brand-card-logo">
                  {Logo ? <Logo /> : <span>{m.name}</span>}
                </div>
                <div className="brand-card-foot">
                  <span className="brand-card-count">
                    <IconSearch size={12} stroke={2} />
                    {m.count.toLocaleString("de-DE")}
                  </span>
                  <button className="brand-card-fav" aria-label="Merken">
                    <IconStar size={14} stroke={2} />
                  </button>
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

};

Object.assign(window, { ScreenErsatzteilsuche });