// Startseite — Mehrwertpaket Klima & Lüftung promo + product table.
// Recreates the captured gconlineplus.de content; nested inside our O+ chrome.

// --- Countdown — counts down from 19 Tagen real-time ---
const useCountdown = () => {
  const target = React.useRef(null);
  if (!target.current) {
    // ~19 days, 7 hours, 25 minutes, 22 seconds from now.
    target.current = Date.now() + (19 * 24 * 3600 + 7 * 3600 + 25 * 60 + 22) * 1000;
  }
  const [t, setT] = React.useState(() => Math.max(0, Math.floor((target.current - Date.now()) / 1000)));
  React.useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, Math.floor((target.current - Date.now()) / 1000))), 1000);
    return () => clearInterval(id);
  }, []);
  const days = Math.floor(t / 86400);
  const hours = Math.floor((t % 86400) / 3600);
  const mins = Math.floor((t % 3600) / 60);
  const secs = t % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return { days: pad(days), hours: pad(hours), mins: pad(mins), secs: pad(secs) };
};

// --- Product data extracted from the capture ---
const MEHRWERT_PRODUCTS = [
  { kbn: "VFR75",        unit: "Rolle", min: 6,  title: "VALL ValloFlex Rundrohr R75/50",            sub: "Rundrohr 75 mm, 50 m",                                  price: "120,00",   color: "#bf2240" },
  { kbn: "VAFL2360",     unit: "Stück", min: 1,  title: "VALL Grundpaket 2/R75/130",                 sub: "Wohneinheiten bis 130m², Rundrohr 75 mm",                price: "999,00",   color: "#9ea3a7" },
  { kbn: "VAFL2370",     unit: "Stück", min: 1,  title: "VALL Grundpaket 3/R75/180",                 sub: "Wohneinheiten bis 180m², Rundrohr 75 mm",                price: "1.199,00", color: "#9ea3a7" },
  { kbn: "LVELFVAL13",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 6 LUVAQ",       sub: "KWL digit SE / 130E, 2xG4/1xF7",                          price: "40,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL6",    unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 14 LUVAQ",      sub: "ValloPlus 240, 2xG4/1xF7",                                price: "39,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL10",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 17 LUVAQ",      sub: "ValloMaxx / ValloPlus 1000, 2xG4/1xF7",                   price: "39,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL15",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 4 LUVAQ",       sub: "KWL 100/100R/120, 2xG3/1xG4/1xF7",                        price: "45,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL22",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 21 LUVAQ",      sub: "ValloMulti 200 SC, 2xG4",                                 price: "12,09",    color: "#d4cdb8" },
  { kbn: "LVELFVAL26",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 24 LUVAQ",      sub: "ValloPlus 350 SC/SE/MV, 2xG4/1xF7",                       price: "39,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL30",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 26 LUVAQ",      sub: "ValloMulti 300 SB/SC/MV, 2xG4/1xF7",                      price: "35,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL32",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 27 LUVAQ",      sub: "ValloPlus 270 SC/SE/MV, 2xG4/1xF7",                       price: "30,72",    color: "#d4cdb8" },
  { kbn: "LVELFVAL34",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 28 LUVAQ",      sub: "ValloPlus 510 MV, 2xG4/1xF7",                             price: "55,00",    color: "#d4cdb8" },
  { kbn: "LVELFVAL45",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox Nr. 29 LUVAQ",      sub: "ValloPlus 850 MV, 2xG4/1xF7",                             price: "140,00",   color: "#d4cdb8" },
  { kbn: "LVELFVAL73",   unit: "Stück", min: 3,  title: "Ersatzfilter für Vallox LUVAQ",             sub: "ValloPlus 370 MV/MV-E, 2xG4/1xF7",                        price: "39,00",    color: "#d4cdb8" },
  { kbn: "LVTS100",      unit: "Stück", min: 3,  title: "Schott DN 100 Z-41.3-720 LUVAQ",            sub: "f. Decken u. in Schachtw. DIN 18017-3",                   price: "33,00",    color: "#dcdcde" },
  { kbn: "LVTS125",      unit: "Stück", min: 3,  title: "Schott DN 125 Z-41.3-720 LUVAQ",            sub: "f. Decken u. in Schachtw. DIN 18017-3",                   price: "35,00",    color: "#dcdcde" },
  { kbn: "CELEC60N",     unit: "Stück", min: 3,  title: "EC-Ventilatoreinsatz 60N COSMO",            sub: "mit Nachlauf, 0–60 m³/h",                                  price: "125,00",   color: "#e9e7e2" },
  { kbn: "CELEC60F",     unit: "Stück", min: 3,  title: "EC-Ventilatoreinsatz 60F COSMO",            sub: "m. Nachlauf u. Feuchtesteuerung, 0–60 m³/h",              price: "175,00",   color: "#e9e7e2" },
  { kbn: "CELGUP",       unit: "Stück", min: 3,  title: "UP-Gehäuse o. Brandschutz COSMO",           sub: "Ausblas seitl. oder hinten",                              price: "25,00",    color: "#dcdcde" },
  { kbn: "CVAPCL100N",   unit: "Stück", min: 3,  title: "Kleinraumvent. APART 100 N-CL COSMO",       sub: "Classic Line, mit Nachlauf",                              price: "69,00",    color: "#f4f1ec" },
  { kbn: "CVAPCL100F",   unit: "Stück", min: 3,  title: "Kleinraumvent. APART 100 NF-CL COSMO",      sub: "Classic Line, mit Nachlauf / Feuchte",                    price: "99,00",    color: "#f4f1ec" },
  { kbn: "CVAPCL120N",   unit: "Stück", min: 3,  title: "Kleinraumvent. APART 120 N-CL COSMO",       sub: "Classic Line, mit Nachlauf",                              price: "79,00",    color: "#f4f1ec" },
  { kbn: "CVAPCL120F",   unit: "Stück", min: 3,  title: "Kleinraumvent. APART 120 NF-CL COSMO",      sub: "Classic Line, mit Nachlauf / Feuchte",                    price: "109,00",   color: "#f4f1ec" },
  { kbn: "MAICECA1IPVZC",unit: "Stück", min: 3,  title: "Kleinraumventilator Maico ECA 100 ipro",    sub: "Typ VZC zweistufig",                                      price: "120,00",   color: "#f4f1ec" },
  { kbn: "MAICECA1IPH",  unit: "Stück", min: 3,  title: "Kleinraumventilator Maico ECA 100 ipro",    sub: "Typ H zweistufig",                                        price: "129,00",   color: "#f4f1ec" },
  { kbn: "MAICECA1IPF",  unit: "Stück", min: 3,  title: "Kleinraumventilator Maico ECA 100 ipro",    sub: "Typ F zweistufig",                                        price: "136,00",   color: "#f4f1ec" },
  { kbn: "HELIM1100NCN", unit: "Stück", min: 3,  title: "Minilüfter Helios MiniVent M 1/100 N/C",    sub: "m. Nachlauf u. Intervallbetrieb",                         price: "89,00",    color: "#f4f1ec" },
  { kbn: "HELIM1100P",   unit: "Stück", min: 3,  title: "Minilüfter Helios MiniVent M 1/100 P",      sub: "m. Präsenzmelder",                                        price: "115,00",   color: "#f4f1ec" },
  { kbn: "HELIM1100F",   unit: "Stück", min: 3,  title: "Minilüfter Helios MiniVent M 1/100 F",      sub: "m. Feuchteverlaufssteuerung",                             price: "115,00",   color: "#f4f1ec" },
  { kbn: "LVLVS125",     unit: "Stück", min: 20, title: "LUVAQ Lüftungsventil Abluft DN 125",        sub: "aus Stahl, RAL9016, m. Einbaurahmen",                     price: "3,50",     color: "#e6e4e0" },
];

// --- tiny stylised product thumbnail (vent/duct/filter/etc.) ---
const ProdThumb = ({ color, kbn }) => {
  const kind = kbn.startsWith("VFR") ? "tube" :
               kbn.startsWith("VAFL") ? "coil" :
               kbn.startsWith("LVELF") ? "filter" :
               kbn.startsWith("LVTS") ? "schott" :
               kbn.startsWith("CELG") ? "case" :
               kbn.startsWith("CELEC") ? "motor" :
               kbn.startsWith("CVAP") || kbn.startsWith("MAIC") || kbn.startsWith("HELIM") ? "fan" :
               "valve";

  return (
    <svg viewBox="0 0 80 60" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={"prg-" + kbn} cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor={color} stopOpacity="1"/>
          <stop offset="100%" stopColor="#52555a" stopOpacity="1"/>
        </radialGradient>
      </defs>
      <rect width="80" height="60" fill="#fafbfb"/>
      {kind === "tube" && (
        <g>
          <ellipse cx="40" cy="50" rx="34" ry="3" fill="rgba(0,0,0,0.18)"/>
          {/* coiled red tube */}
          {[0,1,2,3,4,5].map(i => (
            <ellipse key={i} cx="40" cy={16 + i*5.6} rx={28 - i*1.5} ry="3.2" fill={color} stroke="#7e1326" strokeWidth="0.6"/>
          ))}
        </g>
      )}
      {kind === "coil" && (
        <g>
          <ellipse cx="40" cy="52" rx="28" ry="3" fill="rgba(0,0,0,0.18)"/>
          <ellipse cx="40" cy="38" rx="28" ry="14" fill={color} stroke="#5a5d62" strokeWidth="0.6"/>
          <ellipse cx="40" cy="36" rx="22" ry="10" fill="#9aa2a8" stroke="#3b3c43" strokeWidth="0.5"/>
          <ellipse cx="40" cy="36" rx="6" ry="2.6" fill="#3b3c43"/>
          {/* duct emerging */}
          <rect x="10" y="34" width="18" height="6" fill="#7c8389" stroke="#3b3c43" strokeWidth="0.4"/>
        </g>
      )}
      {kind === "filter" && (
        <g>
          <ellipse cx="40" cy="52" rx="28" ry="3" fill="rgba(0,0,0,0.15)"/>
          <rect x="14" y="14" width="52" height="34" fill={color} stroke="#7a7464" strokeWidth="0.7"/>
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <line key={i} x1={14 + i*5.2} y1="14" x2={14 + i*5.2} y2="48" stroke="#a09372" strokeWidth="0.5"/>
          ))}
          <rect x="14" y="14" width="52" height="6" fill="#7a7464"/>
          <rect x="14" y="42" width="52" height="6" fill="#7a7464"/>
        </g>
      )}
      {kind === "schott" && (
        <g>
          <ellipse cx="40" cy="52" rx="28" ry="2.5" fill="rgba(0,0,0,0.15)"/>
          <circle cx="40" cy="32" r="20" fill={color} stroke="#7a7e82" strokeWidth="0.6"/>
          <circle cx="40" cy="32" r="14" fill="#9aa2a8" stroke="#3b3c43" strokeWidth="0.4"/>
          <circle cx="40" cy="32" r="6" fill="#3b3c43"/>
        </g>
      )}
      {kind === "fan" && (
        <g>
          <ellipse cx="40" cy="52" rx="28" ry="2.5" fill="rgba(0,0,0,0.18)"/>
          <rect x="12" y="12" width="56" height="40" rx="2" fill="#f9f7f3" stroke="#a8a8a8" strokeWidth="0.6"/>
          <circle cx="40" cy="32" r="14" fill="#fff" stroke="#a8a8a8" strokeWidth="0.6"/>
          {[0,1,2,3,4,5].map(i => {
            const a = (i * 60) * Math.PI / 180;
            const x = 40 + Math.cos(a) * 12;
            const y = 32 + Math.sin(a) * 12;
            return <path key={i} d={`M40 32 Q${40 + Math.cos(a-0.5)*8} ${32 + Math.sin(a-0.5)*8} ${x} ${y}`} fill="none" stroke="#6b6b6b" strokeWidth="1.4" strokeLinecap="round"/>;
          })}
          <circle cx="40" cy="32" r="3" fill="#6b6b6b"/>
        </g>
      )}
      {kind === "motor" && (
        <g>
          <ellipse cx="40" cy="52" rx="28" ry="2.5" fill="rgba(0,0,0,0.18)"/>
          <circle cx="40" cy="32" r="20" fill="#fafafa" stroke="#a8a8a8" strokeWidth="0.6"/>
          <circle cx="40" cy="32" r="14" fill="#e6e6e6" stroke="#a8a8a8" strokeWidth="0.4"/>
          {[0,1,2,3,4,5,6,7].map(i => {
            const a = (i * 45) * Math.PI / 180;
            return <line key={i} x1={40 + Math.cos(a)*5} y1={32 + Math.sin(a)*5} x2={40 + Math.cos(a)*13} y2={32 + Math.sin(a)*13} stroke="#9b9b9b" strokeWidth="2.2" strokeLinecap="round"/>;
          })}
          <circle cx="40" cy="32" r="3" fill="#3b3c43"/>
        </g>
      )}
      {kind === "case" && (
        <g>
          <ellipse cx="40" cy="52" rx="28" ry="2.5" fill="rgba(0,0,0,0.15)"/>
          <rect x="14" y="16" width="52" height="34" fill="#dcdcde" stroke="#7a7e82" strokeWidth="0.6"/>
          <rect x="20" y="22" width="40" height="22" fill="#9aa2a8" stroke="#3b3c43" strokeWidth="0.4"/>
        </g>
      )}
      {kind === "valve" && (
        <g>
          <ellipse cx="40" cy="52" rx="22" ry="2.5" fill="rgba(0,0,0,0.15)"/>
          <ellipse cx="40" cy="34" rx="22" ry="12" fill="#fafafa" stroke="#a8a8a8" strokeWidth="0.6"/>
          <ellipse cx="40" cy="34" rx="14" ry="7" fill="#dcdcde" stroke="#a8a8a8" strokeWidth="0.4"/>
          <circle cx="40" cy="34" r="3" fill="#7a7e82"/>
        </g>
      )}
    </svg>
  );
};

// --- the Mehrwertpaket promo banner ---
const MehrwertPromo = ({ onDismiss, variant = "full" }) => {
  const { days, hours, mins, secs } = useCountdown();
  if (variant === "compact") {
    return (
      <div className="mw-promo mw-promo-compact">
        <button className="dismiss" onClick={onDismiss} aria-label="Schließen"><IconX size={16} stroke={2.5} /></button>
        <div className="mw-c-eyebrow">Mehrwertpaket</div>
        <div className="mw-c-title">Klima &amp; Lüftung</div>
        <div className="mw-c-clock">
          Endet in <b>{days}T {hours}:{mins}:{secs}</b>
        </div>
        <button className="mw-c-cta">Zu den Angeboten <IconChevR size={14} stroke={2.5} /></button>
      </div>
    );
  }
  return (
    <div className="mw-promo">
      <button className="dismiss" onClick={onDismiss} aria-label="Schließen"><IconX size={18} stroke={2.5} /></button>
      <div className="mw-illu">
        <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%" }}>
          {/* stylised ventilation fan — yellow line style */}
          <g fill="none" stroke="#f0b223" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round">
            {/* fan housing */}
            <rect x="44" y="44" width="152" height="152" rx="20" />
            {/* hub */}
            <circle cx="120" cy="120" r="15" fill="#f0b223" stroke="none" />
            {/* four curved fan blades around the hub */}
            <path d="M120 105 C150 96 168 78 166 56 C146 60 128 76 120 105 Z" fill="#f0b223" stroke="#f0b223" strokeWidth="6" />
            <path d="M135 120 C144 150 162 168 184 166 C180 146 164 128 135 120 Z" fill="#f0b223" stroke="#f0b223" strokeWidth="6" />
            <path d="M120 135 C90 144 72 162 74 184 C94 180 112 164 120 135 Z" fill="#f0b223" stroke="#f0b223" strokeWidth="6" />
            <path d="M105 120 C96 90 78 72 56 74 C60 94 76 112 105 120 Z" fill="#f0b223" stroke="#f0b223" strokeWidth="6" />
            {/* corner mounting holes */}
            <circle cx="60" cy="60" r="3.5" fill="#f0b223" stroke="none" />
            <circle cx="180" cy="60" r="3.5" fill="#f0b223" stroke="none" />
            <circle cx="60" cy="180" r="3.5" fill="#f0b223" stroke="none" />
            <circle cx="180" cy="180" r="3.5" fill="#f0b223" stroke="none" />
          </g>
        </svg>
      </div>
      <div className="mw-body">
        <h2 className="mw-title">
          MEHRWERTPAKET KLIMA &amp; LÜFTUNG
          <span className="snowflake" aria-hidden="true">❄</span>
        </h2>
        <p className="mw-lede">
          Frische Luft, smarter Preis — unsere Klima- &amp; Lüftungs-Mehrwertpakete bieten alles für effiziente Lösungen, clever kombiniert und günstiger im Paket.
        </p>
        <p className="mw-hinweis">
          <u>HINWEIS</u>: Die in der Kundenstammkommission vereinbarten Konditionen finden Berücksichtigung. Die Preise sind freibleibend.
          Durch die Auswahl einer Kundenstammkommission entfallen die hinterlegten Sonderangebotspreise.
        </p>
        <div className="mw-clock">
          <div className="clk"><span className="num">{days}</span><span className="unit">Tage</span></div>
          <div className="clk"><span className="num">{hours}</span><span className="unit">Stunden</span></div>
          <div className="clk"><span className="num">{mins}</span><span className="unit">Minuten</span></div>
          <div className="clk"><span className="num">{secs}</span><span className="unit">Sekunden</span></div>
        </div>
        <button className="mw-cta">ZUM MEHRWERTPAKET</button>
      </div>
    </div>
  );
};

// --- product row ---
const ProductRow = ({ p }) => (
  <div className="prow">
    <div className="prow-img">
      <ProdThumb color={p.color} kbn={p.kbn} />
    </div>
    <div className="prow-kbn">{p.kbn}</div>
    <div className="prow-desc">
      <div className="ttl">{p.title}</div>
      <div className="sub">{p.sub}</div>
    </div>
    <button className="prow-share" aria-label="Teilen"><IconExternal size={16} stroke={2} /></button>
    <div className="prow-qty">
      <input defaultValue={p.min} aria-label={p.unit} />
      <span className="unit-lbl">{p.unit}</span>
      <span className="min-lbl">Mindestmenge: {p.min}</span>
    </div>
    <div className="prow-actions">
      <button className="add"><IconCart size={14} stroke={2} /></button>
      <button className="more"><IconChevD size={12} stroke={2.5} /></button>
    </div>
    <div className="prow-price">{p.price} EUR</div>
    <button className="prow-menu" aria-label="Menü"><IconMenu size={14} stroke={2} /></button>
  </div>
);

// Show only the first 5 rows — anything beyond the fold is trimmed.
const VISIBLE_PRODUCTS = MEHRWERT_PRODUCTS.slice(0, 5);

// --- Expert reply notification toast — shown on Startseite when an expert
//     has responded to an open Ersatzteilanfrage. Pinned to the top-right
//     of the content column. ---
const ExpertNotification = ({ onOpen, onDismiss, variant }) => {
  const [closing, setClosing] = React.useState(false);
  const isQuery = variant === "rueckfrage";
  const close = () => {
    setClosing(true);
    setTimeout(() => onDismiss && onDismiss(), 180);
  };
  return (
    <div className={"erta-notify" + (closing ? " is-closing" : "")} role="alert">
      <div className="erta-notify-head">
        <span className="erta-notify-eyebrow">
          <span className="erta-notify-dot" /> {isQuery ? "Rückfrage vom Experten" : "Antwort vom Experten"}
        </span>
        <button className="erta-notify-x" onClick={close} aria-label="Schließen">
          <IconX size={14} stroke={2.5} />
        </button>
      </div>
      <div className="erta-notify-body">
        <span className="erta-notify-avatar">
          <IconUser size={22} stroke={2} />
        </span>
        <div className="erta-notify-text">
          <div className="erta-notify-name">
            Thomas Brinkmann
            <span className="erta-notify-role">Ersatzteil-Experte · Sanitär</span>
          </div>
          <div className="erta-notify-subject">
            <span className="erta-notify-label">Anfrage</span>
            <span className="erta-notify-title">Wasserhahn Küche</span>
            <span className="erta-notify-id">· ERSU-742183</span>
          </div>
          <p className="erta-notify-preview">
            {isQuery ?
          "Hallo Max, um das passende Teil zu bestimmen, brauche ich noch ein Detail zu deiner Armatur. Magst du kurz antworten?" :
          "Hallo Max, anhand deines Fotos habe ich das passende Ersatzteil gefunden. Schau dir bitte den Vorschlag an und gib mir Bescheid, ob es zu deinem Modell passt."}
          </p>
        </div>
      </div>
      <div className="erta-notify-foot">
        <span className="erta-notify-time">{isQuery ? "Gerade eben · 11:38" : "Gerade eben · 14:27"}</span>
        <button className="erta-notify-cta" onClick={onOpen}>
          {isQuery ? "Rückfrage beantworten" : "Zur Antwort"} <IconChevR size={12} stroke={2.5} />
        </button>
      </div>
    </div>
  );
};

// --- the whole Startseite ---
const ScreenStartseite = ({ notification, notificationVariant, onOpenAnfrage, promoMode = "full" }) => {
  const [promoOpen, setPromoOpen] = React.useState(true);
  const [notifyOpen, setNotifyOpen] = React.useState(true);
  const [filter, setFilter] = React.useState("");
  const [tab, setTab] = React.useState("auswahl");
  const filtered = VISIBLE_PRODUCTS.filter(p =>
    !filter.trim() ||
    p.kbn.toLowerCase().includes(filter.toLowerCase()) ||
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.sub.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={"startseite" + (notification ? " has-notification" : "")}>
      {promoOpen && promoMode !== "off" && <MehrwertPromo variant={promoMode} onDismiss={() => setPromoOpen(false)} />}

      <div className="filter-row">
        <input placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <div className="tab-row">
        <button className={"tab " + (tab === "auswahl" ? "active" : "")} onClick={() => setTab("auswahl")}>
          <span className="ic"><IconCheckCircle size={20} stroke={2}/></span> Auswählen
        </button>
        <button className={"tab " + (tab === "cart" ? "active" : "")} onClick={() => setTab("cart")}>
          <span className="ic"><IconCart size={20} stroke={2}/></span> Warenkorb <IconChevD size={14} stroke={2} className="cv" />
        </button>
      </div>

      <div className="table-head">
        <span className="th-img" />
        <span className="th-kbn">Artikelnummer</span>
        <span className="th-desc">Beschreibung</span>
        <span className="th-share" />
        <span className="th-qty" />
        <span className="th-actions" />
        <span className="th-price">Preis</span>
        <span className="th-menu" />
      </div>

      <div className="prows">
        {filtered.map(p => <ProductRow key={p.kbn} p={p} />)}
        {filtered.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", color: "var(--fg-3)" }}>
            Keine Artikel passen zum Filter „{filter}".
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { ScreenStartseite });
