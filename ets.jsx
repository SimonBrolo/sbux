// ETS in ONLINE PLUS — six screen states (S1–S6).
// Single React component; the screen prop drives which body renders.

// ---------------- shared bits ----------------

const ThreeSteps = () =>
<div className="step-strip">
    <div className="step">
      <div className="num">1</div>
      <div className="txt">
        <div className="ttl">Foto oder Text hochladen</div>
        <div className="sub">Bild, KBN, Hersteller — was du gerade hast.</div>
      </div>
    </div>
    <div className="arrow"><IconArrow size={20} stroke={2} /></div>
    <div className="step">
      <div className="num">2</div>
      <div className="txt">
        <div className="ttl">KI findet das passende Teil</div>
        <div className="sub">In Sekunden, mit Konfidenz-Bewertung.</div>
      </div>
    </div>
    <div className="arrow"><IconArrow size={20} stroke={2} /></div>
    <div className="step">
      <div className="num">3</div>
      <div className="txt">
        <div className="ttl">Direkt bestellen</div>
        <div className="sub">In den Warenkorb, fertig.</div>
      </div>
    </div>
  </div>;


// Stylised SVG that *represents* a user-uploaded photo of a plumbing part.
// Each variant looks like a workbench snapshot, not vector art posing as a product photo.
const PhotoPlaceholder = ({ variant = "cartridge", label }) => {
  const bg = {
    cartridge: "#9aa2a8",
    wcseat: "#c8c2b3",
    reducer: "#7c8389",
    valve: "#a4988a"
  }[variant] || "#9aa2a8";

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <radialGradient id={"vig-" + variant} cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor={bg} stopOpacity="1" />
          <stop offset="100%" stopColor="#3b3c43" stopOpacity="1" />
        </radialGradient>
        <linearGradient id={"metal-" + variant} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6f7378" />
          <stop offset="20%" stopColor="#d6d8d9" />
          <stop offset="50%" stopColor="#f0f1f1" />
          <stop offset="80%" stopColor="#a9adae" />
          <stop offset="100%" stopColor="#52555a" />
        </linearGradient>
        <linearGradient id={"chrome-" + variant} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eaeb" />
          <stop offset="50%" stopColor="#a9adae" />
          <stop offset="100%" stopColor="#52555a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#vig-${variant})`} />

      {variant === "cartridge" &&
      <g>
          <ellipse cx="200" cy="265" rx="120" ry="8" fill="rgba(0,0,0,0.35)" />
          {/* cartridge cylinder */}
          <rect x="140" y="80" width="120" height="170" rx="6" fill={`url(#metal-${variant})`} />
          <rect x="140" y="80" width="120" height="12" fill="#1a1a1c" opacity="0.7" />
          <rect x="140" y="232" width="120" height="18" fill="#1a1a1c" opacity="0.6" />
          {/* stem */}
          <rect x="190" y="40" width="20" height="48" fill={`url(#chrome-${variant})`} />
          <circle cx="200" cy="40" r="14" fill="#3b3c43" />
          {/* o-ring */}
          <ellipse cx="200" cy="80" rx="58" ry="6" fill="#1a1a1c" opacity="0.85" />
          {/* manufacturer label */}
          <rect x="156" y="160" width="88" height="38" fill="#fff" opacity="0.85" />
          <text x="200" y="184" fontFamily="GC Klavika, sans-serif" fontWeight="700" fontSize="14" fill="#202125" textAnchor="middle" letterSpacing="1">46.374.000</text>
          <text x="200" y="196" fontFamily="GC Klavika, sans-serif" fontWeight="500" fontSize="8" fill="#626369" textAnchor="middle" letterSpacing="0.5">GROHE</text>
        </g>
      }

      {variant === "wcseat" &&
      <g>
          <ellipse cx="200" cy="275" rx="150" ry="10" fill="rgba(0,0,0,0.3)" />
          {/* toilet seat outline (oval ring) */}
          <ellipse cx="200" cy="155" rx="130" ry="100" fill="#f6f4ef" stroke="#a8a08f" strokeWidth="2" />
          <ellipse cx="200" cy="160" rx="92" ry="70" fill={`url(#vig-${variant})`} />
          {/* hinges */}
          <rect x="180" y="46" width="14" height="22" rx="2" fill="#888" />
          <rect x="206" y="46" width="14" height="22" rx="2" fill="#888" />
        </g>
      }

      {variant === "reducer" &&
      <g>
          <ellipse cx="200" cy="265" rx="120" ry="8" fill="rgba(0,0,0,0.3)" />
          <rect x="100" y="120" width="200" height="60" rx="4" fill={`url(#metal-${variant})`} />
          <rect x="120" y="140" width="160" height="20" fill="#1a1a1c" opacity="0.4" />
          <rect x="180" y="60" width="40" height="80" fill={`url(#chrome-${variant})`} />
          <rect x="170" y="50" width="60" height="14" fill="#3b3c43" />
          <circle cx="200" cy="200" r="14" fill="#d3012d" />
          <text x="200" y="205" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="GC Klavika, sans-serif">DM</text>
        </g>
      }

      {variant === "valve" &&
      <g>
          <ellipse cx="200" cy="265" rx="120" ry="8" fill="rgba(0,0,0,0.3)" />
          <rect x="80" y="160" width="240" height="40" fill={`url(#metal-${variant})`} />
          <circle cx="200" cy="120" r="36" fill={`url(#chrome-${variant})`} stroke="#3b3c43" strokeWidth="2" />
          <rect x="195" y="60" width="10" height="60" fill="#3b3c43" />
          <rect x="180" y="55" width="40" height="8" fill="#3b3c43" />
        </g>
      }

      {label &&
      <g>
          <rect x="12" y="270" width="120" height="20" fill="rgba(0,0,0,0.55)" />
          <text x="20" y="284" fontFamily="GC Klavika, sans-serif" fontWeight="500" fontSize="11" fill="#fff">{label}</text>
        </g>
      }
    </svg>);

};

// Strich-/Maßzeichnung representation for the toggle on result cards
const LineDrawing = ({ variant }) =>
<svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
    {variant === "cartridge" &&
  <g fill="none" stroke="#202125" strokeWidth="1.2">
        <rect x="60" y="50" width="80" height="110" rx="4" />
        <rect x="60" y="50" width="80" height="10" />
        <line x1="60" y1="150" x2="140" y2="150" />
        <rect x="92" y="30" width="16" height="22" />
        <line x1="60" y1="105" x2="140" y2="105" strokeDasharray="4 3" stroke="#d3012d" />
        {/* dimension lines */}
        <line x1="150" y1="50" x2="150" y2="160" stroke="#626369" />
        <line x1="146" y1="50" x2="154" y2="50" stroke="#626369" />
        <line x1="146" y1="160" x2="154" y2="160" stroke="#626369" />
        <text x="160" y="108" fontSize="10" fill="#626369" fontFamily="GC Klavika, sans-serif">110 mm</text>
        <line x1="60" y1="172" x2="140" y2="172" stroke="#626369" />
        <line x1="60" y1="168" x2="60" y2="176" stroke="#626369" />
        <line x1="140" y1="168" x2="140" y2="176" stroke="#626369" />
        <text x="100" y="186" fontSize="10" fill="#626369" textAnchor="middle" fontFamily="GC Klavika, sans-serif">Ø 46 mm</text>
      </g>
  }
    {variant !== "cartridge" &&
  <g fill="none" stroke="#202125" strokeWidth="1.2">
        <rect x="40" y="60" width="120" height="80" rx="6" />
        <circle cx="100" cy="100" r="16" />
        <line x1="170" y1="60" x2="170" y2="140" stroke="#626369" />
        <text x="178" y="104" fontSize="10" fill="#626369" fontFamily="GC Klavika, sans-serif">82 mm</text>
      </g>
  }
  </svg>;


// ---------- Faucet illustrations for the visual-match grid ----------
// Six different stylised single-lever / two-handle washbasin mixers + spouts.
// Real product photos are placeholders for the design — these stand in.

const FaucetImg = ({ variant, alt }) => {
  // Each variant is a tiny chrome-ish illustration on a soft studio gradient.
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }} role="img" aria-label={alt}>
      <defs>
        <linearGradient id={"fbg-" + variant} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3f4f4" />
          <stop offset="100%" stopColor="#d8dadc" />
        </linearGradient>
        <linearGradient id={"chrome-" + variant} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="40%" stopColor="#c8ccd0" />
          <stop offset="60%" stopColor="#e4e6e8" />
          <stop offset="100%" stopColor="#4a4d52" />
        </linearGradient>
        <linearGradient id={"chrome-edge-" + variant} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6b6f74" />
          <stop offset="50%" stopColor="#f0f1f2" />
          <stop offset="100%" stopColor="#6b6f74" />
        </linearGradient>
      </defs>
      <rect width="240" height="200" fill={`url(#fbg-${variant})`} />
      <ellipse cx="120" cy="178" rx="78" ry="6" fill="rgba(0,0,0,0.12)" />

      {variant === "eurosmart" &&
      <g>
          {/* base */}
          <rect x="98" y="156" width="44" height="14" rx="2" fill={`url(#chrome-${variant})`} />
          {/* body */}
          <rect x="106" y="100" width="28" height="60" rx="4" fill={`url(#chrome-${variant})`} />
          {/* spout */}
          <path d="M120 100 V70 Q120 56 134 56 H172" stroke={`url(#chrome-edge-${variant})`} strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* lever */}
          <rect x="118" y="36" width="46" height="8" rx="2" fill="#d8dadc" stroke="#73767a" strokeWidth="0.5" />
          <rect x="118" y="40" width="46" height="4" rx="1" fill="#a3a6aa" />
          <circle cx="120" cy="40" r="6" fill="#4a4d52" />
        </g>
      }

      {variant === "essence" &&
      <g>
          <rect x="100" y="160" width="40" height="10" rx="2" fill={`url(#chrome-${variant})`} />
          {/* slender column */}
          <rect x="115" y="60" width="10" height="100" rx="2" fill={`url(#chrome-edge-${variant})`} />
          {/* curved spout */}
          <path d="M120 70 Q120 38 158 38 L172 38" stroke={`url(#chrome-edge-${variant})`} strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* tall pin lever */}
          <rect x="103" y="48" width="6" height="36" rx="1" fill="#a3a6aa" />
          <circle cx="106" cy="46" r="4" fill="#4a4d52" />
        </g>
      }

      {variant === "twohandle" &&
      <g>
          <rect x="60" y="150" width="120" height="14" rx="3" fill={`url(#chrome-${variant})`} />
          {/* gooseneck */}
          <path d="M120 150 V90 Q120 64 144 64" stroke={`url(#chrome-edge-${variant})`} strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="148" cy="64" r="6" fill="#4a4d52" />
          {/* left handle */}
          <circle cx="80" cy="130" r="10" fill="#a3a6aa" stroke="#4a4d52" strokeWidth="0.6" />
          <rect x="78" y="100" width="4" height="22" fill={`url(#chrome-edge-${variant})`} />
          {/* right handle */}
          <circle cx="160" cy="130" r="10" fill="#a3a6aa" stroke="#4a4d52" strokeWidth="0.6" />
          <rect x="158" y="100" width="4" height="22" fill={`url(#chrome-edge-${variant})`} />
        </g>
      }

      {variant === "sensor" &&
      <g>
          <rect x="102" y="158" width="36" height="12" rx="2" fill={`url(#chrome-${variant})`} />
          {/* short angular spout */}
          <path d="M120 158 V90 Q120 70 144 70 L172 70" stroke={`url(#chrome-edge-${variant})`} strokeWidth="10" fill="none" />
          {/* sensor lens */}
          <circle cx="140" cy="86" r="3.5" fill="#1f3050" />
          <circle cx="140" cy="86" r="1.5" fill="#7faaff" />
        </g>
      }

      {variant === "kueche" &&
      <g>
          <rect x="100" y="160" width="40" height="10" rx="2" fill={`url(#chrome-${variant})`} />
          {/* tall arch */}
          <path d="M120 160 V100 Q120 50 165 50 Q200 50 200 78 L200 96" stroke={`url(#chrome-edge-${variant})`} strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* lever */}
          <rect x="104" y="78" width="38" height="6" rx="1" fill="#d8dadc" stroke="#73767a" strokeWidth="0.5" />
          <circle cx="108" cy="81" r="4" fill="#4a4d52" />
          {/* shower head */}
          <rect x="194" y="96" width="14" height="20" rx="2" fill={`url(#chrome-${variant})`} />
        </g>
      }

      {variant === "concetto" &&
      <g>
          <rect x="98" y="156" width="44" height="14" rx="2" fill={`url(#chrome-${variant})`} />
          <rect x="108" y="90" width="24" height="70" rx="3" fill={`url(#chrome-${variant})`} />
          {/* lever */}
          <rect x="116" y="44" width="42" height="6" rx="1" fill="#d8dadc" stroke="#73767a" strokeWidth="0.5" />
          <rect x="116" y="50" width="42" height="2" rx="1" fill="#9fa3a7" />
          <circle cx="118" cy="47" r="5" fill="#4a4d52" />
          {/* short straight spout */}
          <rect x="118" y="60" width="56" height="9" rx="2" fill={`url(#chrome-edge-${variant})`} />
        </g>
      }
    </svg>);

};

// ---------------- S1: Einstieg ----------------
// Two forms exposed via Tweaks:
//   - Overlay: a floating sheet (default, lightweight integration)
//   - Inline: a full O+ page with dual photo/text entry (more discoverable)

const EtsOverlay = ({ open, onClose, onPick, anchorRef }) => {
  const [files, setFiles] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [text, setText] = React.useState("");
  const inputRef = React.useRef(null);
  const overlayRef = React.useRef(null);

  // Reset state when the overlay re-opens.
  React.useEffect(() => {
    if (open) {
      setFiles([]);
      setText("");
      setDragging(false);
    }
  }, [open]);

  // Click-outside to dismiss (popover behaviour, not modal).
  React.useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      const ov = overlayRef.current;
      const anchor = anchorRef && anchorRef.current;
      if (!ov) return;
      if (ov.contains(e.target)) return;
      if (anchor && anchor.contains(e.target)) return;
      onClose();
    };
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    // Defer so the click that *opened* it doesn't immediately close it.
    const id = setTimeout(() => document.addEventListener("mousedown", onDocClick), 0);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, anchorRef]);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (incoming.length === 0) return;
    const withUrls = incoming.map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      url: URL.createObjectURL(f),
      size: f.size
    }));
    setFiles((prev) => [...prev, ...withUrls]);
  };

  // Revoke object URLs on unmount to avoid leaking memory.
  React.useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), []); // eslint-disable-line

  const removeFile = (id) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return next;
    });
  };

  if (!open) return null;

  const fmtKB = (b) => b < 1024 * 1024 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;
  const canSearch = files.length > 0 || text.trim().length > 0;

  return (
    <div className="ets-overlay" ref={overlayRef} role="dialog" aria-label="Ersatzteilfinder">
      <span className="ets-overlay-arrow" aria-hidden="true" />
      <div className="ets-overlay-head">
        <div className="ets-overlay-title-row">
          <h3 className="ets-overlay-title">Foto rein, fertig.</h3>
          <button className="ets-overlay-close" onClick={onClose} aria-label="Schließen">
            <IconX size={16} stroke={2.5} />
          </button>
        </div>
        <p className="ets-overlay-lede">Bilder vom defekten Teil hochladen — die KI sucht das passende Ersatzteil in 4,7 Mio. Artikeln.</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {addFiles(e.target.files);e.target.value = "";}} />

      <div
        className={"ets-overlay-drop" + (dragging ? " is-dragging" : "") + (files.length ? " has-files" : "")}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {e.preventDefault();e.stopPropagation();setDragging(true);}}
        onDragOver={(e) => {e.preventDefault();e.stopPropagation();setDragging(true);}}
        onDragLeave={(e) => {e.preventDefault();e.stopPropagation();setDragging(false);}}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
          if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
        }}>
        {files.length === 0 ?
        <>
            <div className="ets-overlay-drop-ico"><IconUpload size={26} stroke={1.8} /></div>
            <div className="ets-overlay-drop-title">
              {dragging ? "Loslassen zum Hochladen" : "Bilder hier ablegen"}
            </div>
            <div className="ets-overlay-drop-sub">oder Datei wählen · JPEG, PNG, HEIC bis 10 MB</div>
          </> :

        <div className="ets-overlay-thumbs">
            {files.map((f) =>
          <div className="ets-overlay-thumb" key={f.id}>
                <img src={f.url} alt={f.name} />
                <button
              className="ets-overlay-thumb-x"
              onClick={(e) => {e.stopPropagation();removeFile(f.id);}}
              aria-label={`Bild ${f.name} entfernen`}>
                  <IconX size={11} stroke={3} />
                </button>
                <span className="ets-overlay-thumb-meta">{fmtKB(f.size)}</span>
              </div>
          )}
            <button
            className="ets-overlay-thumb ets-overlay-thumb-add"
            onClick={(e) => {e.stopPropagation();inputRef.current?.click();}}>
              <IconPlus size={20} stroke={2} />
              <span>weiteres Bild</span>
            </button>
          </div>
        }
      </div>

      <div className="ets-overlay-or" aria-hidden="true">
        <span className="ets-overlay-or-rule" />
        <span className="ets-overlay-or-label">oder</span>
        <span className="ets-overlay-or-rule" />
      </div>

      <div className="ets-overlay-text">
        <label htmlFor="ets-overlay-text">Beschreibung</label>
        <input
          id="ets-overlay-text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'z. B. „defekte Grohe Eurosmart Einhand-Mischbatterie, Küche, ca. 2018"'} />
      </div>

      <div className="ets-overlay-foot">
        <a className="ets-overlay-info" href="#" onClick={(e) => e.preventDefault()}>
          <IconShield size={12} stroke={2} />
          Was passiert mit meinen Bildern?
        </a>
        <button
          className={"ets-overlay-cta" + (canSearch ? "" : " disabled")}
          disabled={!canSearch}
          onClick={() => onPick(files, text)}>
          <IconSearch size={14} stroke={2} />
          Ersatzteil finden
        </button>
      </div>
    </div>);

};

// Inline S1 — full-page dual-entry variant. Restored from the original briefing.
const ScreenEinstieg = ({ onUpload, onTextSearch }) =>
<div>
    <div className="ets-page-head">
      <div>
        <h1>Ersatzteil finden — Foto rein, fertig.</h1>
        <div className="lede">
          Du hast ein defektes Teil vor dir? Lad ein Foto hoch oder schreib uns, was du brauchst.
          Die KI sucht in 4,7 Mio. Artikeln den passenden Ersatz.
        </div>
      </div>
      <a className="help-link" href="#">
        <IconShield size={14} stroke={2} />
        Was passiert mit meinen Bildern?
      </a>
    </div>

    <ThreeSteps />

    <div className="entry-grid">
      <div className="entry-col">
        <h3>Foto oder Bild</h3>
        <div className="help">Mehrere Bilder erlaubt &mdash; gerne aus verschiedenen Blickwinkeln.</div>
        <div className="dropzone" onClick={onUpload}>
          <div className="icon-wrap"><IconUpload size={28} stroke={2} /></div>
          <div className="dz-title">Bild hier ablegen</div>
          <div className="dz-sub">JPEG, PNG, HEIC — bis 10 MB pro Bild</div>
          <div className="dz-btns">
            <button className="dz-btn primary" onClick={(e) => {e.stopPropagation();onUpload();}}>
              <IconImage size={14} stroke={2} /> Datei wählen
            </button>
            <button className="dz-btn" onClick={(e) => e.stopPropagation()}>
              <IconCamera size={14} stroke={2} /> Foto aufnehmen
            </button>
          </div>
          <div className="dz-hint">Tipp: 3 Bilder aus verschiedenen Winkeln liefern das beste Ergebnis.</div>
        </div>
      </div>

      <div className="entry-col">
        <h3>KBN, Hersteller oder Beschreibung</h3>
        <div className="help">Wenn du die Artikelnummer schon kennst &mdash; tipp sie einfach ein.</div>
        <div className="text-input-wrap">
          <label>Was suchst du?</label>
          <textarea placeholder={'z. B. „Grohe Kartusche 46.374.000" oder „Geberit Druckspüler defekt"'} defaultValue=""></textarea>
          <div className="examples">
            <div>Beispiele:</div>
            <span className="pill">Grohe Kartusche</span>
            <span className="pill">WC-Sitz Villeroy &amp; Boch</span>
            <span className="pill">Druckminderer Honeywell</span>
            <span className="pill">46.374.000</span>
          </div>
          <button className="primary-cta" onClick={onTextSearch}>
            <IconSearch size={16} stroke={2} /> Suchen
          </button>
        </div>
      </div>
    </div>
  </div>;


// ---------------- S2: Upload-Zustand ----------------

const ScreenUpload = ({ onSearch, onReset }) => {
  const [thumbs, setThumbs] = React.useState([
  { id: 1, variant: "cartridge", label: "IMG_4823.jpg" },
  { id: 2, variant: "cartridge", label: "IMG_4824.jpg" },
  { id: 3, variant: "cartridge", label: "IMG_4825.jpg" }]
  );
  const [ctx, setCtx] = React.useState("");

  return (
    <div>
      <div className="ets-page-head">
        <div>
          <h1>Bilder prüfen, los geht's.</h1>
          <div className="lede">
            Drei Bilder einer Mischer-Kartusche. Du kannst noch sortieren, weitere hinzufügen oder einen Kontext ergänzen — musst du aber nicht.
          </div>
        </div>
        <a className="help-link" href="#" onClick={(e) => {e.preventDefault();onReset();}}>
          <IconRefresh size={14} stroke={2} /> Von vorn beginnen
        </a>
      </div>

      <ThreeSteps />

      <div className="upload-state">
        <div className="thumbs-card">
          <div className="head">
            <div className="ttl">Deine Bilder <span className="count">{thumbs.length}/10</span></div>
            <span className="clear"><IconTrash size={12} stroke={2} /> Alle entfernen</span>
          </div>
          <div className="thumbs-grid">
            {thumbs.map((t, i) =>
            <div className="thumb-cell" key={t.id}>
                <PhotoPlaceholder variant={t.variant} label={t.label} />
                <span className="badge">{i + 1}</span>
                <button className="del" onClick={() => setThumbs(thumbs.filter((x) => x.id !== t.id))}>
                  <IconX size={12} stroke={2.5} />
                </button>
                <span className="drag-hint">ziehen zum Sortieren</span>
              </div>
            )}
            <button className="thumb-cell add" onClick={() => setThumbs([...thumbs, { id: Date.now(), variant: "cartridge", label: "Neu" }])}>
              <IconPlus size={22} stroke={2} />
              Weiteres Bild
            </button>
          </div>
        </div>

        <div className="upload-side">
          <div className="ctx-card">
            <div className="lbl-row">
              <label>Was suchst du?</label>
              <span className="opt">optional</span>
            </div>
            <input
              placeholder={`z. B. "Kartusche", "WC-Sitz", "Eckventil"`}
              value={ctx}
              onChange={(e) => setCtx(e.target.value)} />
            
            <div className="hint">Ein Stichwort hilft der KI, wenn dein Bild mehrdeutig ist.</div>
          </div>

          <div className="ctx-card">
            <div className="lbl-row">
              <label><IconHash size={12} stroke={2} style={{ verticalAlign: -2 }} />&nbsp;Vorgang / Auftrag</label>
              <span className="opt">optional</span>
            </div>
            <input placeholder="z. B. WW90" />
            <div className="hint">Wird beim Bestellen mit dem Vorgang in deiner Handwerker-Software verknüpft.</div>
          </div>

          <button className="cta-primary" onClick={onSearch}>
            <IconSparkle size={18} stroke={2} className="sparkle" />
            Ersatzteil finden
          </button>
          <button className="cta-secondary" onClick={onReset}>
            <IconChevL size={14} stroke={2} /> Zurück zur Auswahl
          </button>
        </div>
      </div>
    </div>);

};

// ---------------- S3: Loading ----------------

const ScreenLoading = ({ onDone }) =>
<div>
    <div className="ets-page-head">
      <div>
        <h1>Die KI schaut sich deine Bilder an…</h1>
        <div className="lede">Im Schnitt 4–7 Sekunden. Du kannst hierbleiben — wir zeigen dir Zwischenstände.</div>
      </div>
    </div>

    <div className="loading-card">
      <div className="preview">
        <PhotoPlaceholder variant="cartridge" />
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
        <div className="scan" />
      </div>
      <div className="stage">
        <h2>Erkennung läuft</h2>
        <p className="sub">3 Bilder werden analysiert</p>
        <div className="progress"><div className="bar" /></div>
        <div className="progress-steps">
          <div className="step done">
            <span className="dot"><IconCheck size={11} stroke={3} /></span>
            <span>Bilder hochgeladen (3/3)</span>
          </div>
          <div className="step done">
            <span className="dot"><IconCheck size={11} stroke={3} /></span>
            <span>Hersteller erkannt: <b>Grohe</b></span>
          </div>
          <div className="step active">
            <span className="dot"></span>
            <span>Komponente bestimmen: Kartusche · 46 mm</span>
          </div>
          <div className="step pending">
            <span className="dot" />
            <span>Passende Artikel im Sortiment suchen</span>
          </div>
        </div>

        <div className="pre-result">
          <span className="label">Vorab</span>
          <span className="val">GROHE · Kartusche · Ø 46&nbsp;mm</span>
          <span className="conf">Hohe Übereinstimmung</span>
        </div>

        <button className="cta-secondary" style={{ alignSelf: "flex-start", marginTop: 8 }} onClick={onDone}>
          Treffer anzeigen <IconChevR size={14} stroke={2} />
        </button>
      </div>
    </div>
  </div>;


// ---------------- S2: Ähnliche Artikel — visual match grid ----------------
// Replaces the old S2 (Bilder geladen) and S3 (KI-Erkennung): users see the
// uploaded image pinned to the side as a constant comparison reference, and
// pick from a grid of candidate articles ranked by visual similarity.

const SIMILAR_CANDIDATES = [
{ id: "33184002", brand: "GROHE", title: "Eurosmart Einhand-Waschtischbatterie", spec: "Chrom · Größe S · mit Zugstange", variant: "eurosmart", price: "82,90 €", match: 96 },
{ id: "23368001", brand: "GROHE", title: "Essence Waschtischarmatur", spec: "Chrom · M-Size · ohne Ablaufgarnitur", variant: "essence", price: "168,50 €", match: 91 },
{ id: "31330000", brand: "GROHE", title: "BauEdge Einhand-Waschtischbatterie", spec: "Chrom · Größe S · GROHE EcoJoy", variant: "concetto", price: "65,40 €", match: 87 },
{ id: "32114001", brand: "HANSGROHE", title: "Focus 100 Einhebel-Waschtischmischer", spec: "Chrom · Coolstart · Push-Open", variant: "essence", price: "94,90 €", match: 79 },
{ id: "F3300002", brand: "FRANKE", title: "AQRM550 Sensor-Waschtischbatterie", spec: "Chrom · berührungslos · 230 V", variant: "sensor", price: "412,00 €", match: 64 },
{ id: "23379003", brand: "GROHE", title: "Eurocube Zweigriff-Waschtischarmatur", spec: "Chrom · 3-Loch · für Standmontage", variant: "twohandle", price: "289,00 €", match: 52 },
{ id: "31354001", brand: "GROHE", title: "Concetto Einhand-Waschtischbatterie", spec: "Chrom · Größe M · GROHE SilkMove", variant: "concetto", price: "124,50 €", match: 48 },
{ id: "32018000", brand: "HANSGROHE", title: "Talis E Küchenmischer 200", spec: "Chrom · ausziehbarer Auslauf", variant: "kueche", price: "229,00 €", match: 41 },
{ id: "F2200015", brand: "FRANKE", title: "Atlas Neo Sensor Waschtischarmatur", spec: "Edelstahl · IR-Sensor · 230 V", variant: "sensor", price: "498,00 €", match: 33 }];


const ScreenSimilar = ({ uploaded = [], uploadedText = "", onPick, onNoResult, onExpert }) => {
  const sorted = [...SIMILAR_CANDIDATES].sort((a, b) => b.match - a.match);
  const top = sorted[0];

  return (
    <div className="similar">
      <div className="ets-page-head">
        <div>
          <h1>Ähnliche Artikel — welcher passt zu deinem Bild?</h1>
          <div className="lede">
            Die KI hat in unserem Sortiment 6 Artikel mit hoher Bild-Ähnlichkeit gefunden.
            Wähl den passenden aus — Vergleichsbild bleibt links sichtbar.
          </div>
        </div>
        <a className="help-link" href="#" onClick={(e) => {e.preventDefault();onNoResult();}}>
          <IconCamera size={14} stroke={2} /> Nichts passt? Tipps für optimale Fotos
        </a>
      </div>

      <div className="similar-layout">
        <aside className="similar-ref" style={{ lineHeight: "1" }}>
          <span className="similar-ref-label">Dein Bild</span>
          <div className="similar-ref-img">
            {uploaded[0] ?
            <img src={uploaded[0].url} alt={uploaded[0].name} /> :

            <PhotoPlaceholder variant="valve" />
            }
          </div>
          {uploaded.length > 1 &&
          <div className="similar-ref-strip">
              {uploaded.slice(1, 5).map((f) =>
            <div className="similar-ref-thumb" key={f.id}>
                  <img src={f.url} alt={f.name} />
                </div>
            )}
              {uploaded.length > 5 &&
            <div className="similar-ref-thumb more">+{uploaded.length - 5}</div>
            }
            </div>
          }
          {uploadedText &&
          <div className="similar-ref-text">
              <span className="lbl">Beschreibung</span>
              <p>{uploadedText}</p>
            </div>
          }
        </aside>

        <div className="similar-grid-wrap">
          <div className="similar-grid-head">
            <span className="cnt">{sorted.length} Treffer</span>
            <span className="spc" />
          </div>
          <div className="similar-grid">
            {sorted.slice(0, 6).map((c, i) =>
            <button
              className="similar-card"
              key={c.id}
              onClick={() => onPick(c)}
              aria-label={`${c.title} auswählen`}>
                <div className="similar-card-img">
                  <FaucetImg variant={c.variant} alt={c.title} />
                </div>
                <div className="similar-card-body">
                  <h3 className="ttl">{c.title}</h3>
                </div>
                <div className="similar-card-zoom" aria-hidden="true">
                  <FaucetImg variant={c.variant} alt={c.title} />
                </div>
              </button>
            )}
            <div className="similar-expert-row">
              <span className="ico"><IconUser size={18} stroke={2} /></span>
              <span className="copy">
                <b>Kein Artikel passt?</b> Unsere Ersatzteil-Experten schauen sich deine Bilder persönlich an — Antwort i.d.R. innerhalb von 2 Stunden.
              </span>
              <button className="cta" onClick={onExpert}>
                An Ersatzteil-Experten weitergeben <IconChevR size={14} stroke={2} />
              </button>
            </div>
            {sorted.slice(6).map((c) =>
            <button
              className="similar-card"
              key={c.id}
              onClick={() => onPick(c)}
              aria-label={`${c.title} auswählen`}>
                <div className="similar-card-img">
                  <FaucetImg variant={c.variant} alt={c.title} />
                </div>
                <div className="similar-card-body">
                  <h3 className="ttl">{c.title}</h3>
                </div>
                <div className="similar-card-zoom" aria-hidden="true">
                  <FaucetImg variant={c.variant} alt={c.title} />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

};

const ConfHead = ({ tone, label, count }) =>
<div className={"head " + tone}>
    <span className="pip">●</span>
    {label} <span style={{ color: "var(--fg-3)", fontWeight: 500, letterSpacing: 0, textTransform: "none" }}>· {count} Treffer</span>
    <span className="bar" />
  </div>;


const ResultCard = ({ data }) => {
  const cm = data.confidenceMode || "sections";
  // Map confidence visually onto the row tone (sections-mode keeps original feel).
  return (
    <div className={"plp-row" + (data.warned ? " is-warned" : "")}>
      <div className="plp-row-thumb">
        <PhotoPlaceholder variant={data.variant} />
      </div>

      <div className="plp-row-kbn">
        <span className="kbn">{data.kbn}</span>
      </div>

      <div className="plp-row-desc">
        <span className="brand">{data.brand}</span>{" "}
        <span className="title">{data.title.replace(new RegExp("^" + data.brand + "\\s*", "i"), "")}</span>
      </div>

      <div className="plp-row-qty">
        <input type="text" defaultValue="" placeholder="Stück" inputMode="numeric" />
      </div>

      <div className="plp-row-add">
        <button className="add-btn" aria-label="In den Warenkorb">
          <IconCart size={16} stroke={2} />
        </button>
        <button className="add-more" aria-label="Weitere Möglichkeiten">
          <IconChevD size={11} stroke={2.5} />
        </button>
      </div>

      <div className="plp-row-price">
        <div className="price">{data.price}</div>
        <div className="unit">per 1 Stück</div>
        {data.listprice && <div className="listprice">{data.listprice} Listenpreis</div>}
      </div>
    </div>);

};

const ScreenPlp = ({ onNewSearch, onNoResult, onExpert, confidenceMode = "sections", pickedArticle }) => {
  const high = [
  {
    kbn: "46374000",
    brand: "GROHE",
    title: "GROHE Kartusche 46 mm — universal für Einhand-Mischer",
    specs: "Keramik-Kartusche, Ø 46 mm, mit Druckausgleich, passend für Eurosmart / Eurostyle ab 2015",
    variant: "cartridge",
    conf: "high", confPct: 94,
    price: "38,90 €", listprice: "52,00 €",
    stock: { warehouse: 24, pickup: 4 },
    delivery: "morgen, 12.05."
  },
  {
    kbn: "46758000",
    brand: "GROHE",
    title: `GROHE Kartusche 46 mm "SilkMove" mit kalter Mittelstellung`,
    specs: "Keramik-Kartusche, Ø 46 mm — Nachfolger der KBN 45879. Baulänge weicht ab.",
    variant: "cartridge",
    conf: "high", confPct: 88,
    warned: true,
    warning: {
      oldKbn: "45879000",
      detail: "Baulänge 110 mm statt 105 mm. Vor Einbau Maß prüfen — passt nicht in alle Altarmaturen vor 2015."
    },
    price: "42,10 €",
    stock: { warehouse: 12, pickup: 2 },
    delivery: "morgen, 12.05."
  }];


  const med = [
  {
    kbn: "46048000",
    brand: "GROHE",
    title: "GROHE Kartusche 35 mm — kompakte Bauform",
    specs: "Keramik, Ø 35 mm — kleinere Bauform, prüfe vor Bestellung den Durchmesser.",
    variant: "cartridge",
    conf: "med", confPct: 62,
    price: "29,40 €",
    stock: { warehouse: 8, pickup: 0 },
    delivery: "Di, 14.05."
  },
  {
    kbn: "92609000",
    brand: "HANSGROHE",
    title: "HANSGROHE Kartusche M2 Ø 47 mm",
    specs: "Falls dein Mischer doch von Hansgrohe ist — sehr ähnliche Bauform, 1 mm größerer Durchmesser.",
    variant: "cartridge",
    conf: "med", confPct: 41,
    price: "44,80 €",
    stock: { warehouse: 3, pickup: 0 },
    delivery: "Mi, 15.05."
  }];


  // Inject confidence mode onto each card so they render the right badge style.
  const allSorted = [...high, ...med].sort((a, b) => b.confPct - a.confPct);
  const tagged = (arr) => arr.map((d) => ({ ...d, confidenceMode }));

  return (
    <div>
      <div className="ets-page-head">
        <div>
          <h1>4 Treffer für deine Bilder.</h1>
          <div className="lede">
            Wir haben einen Grohe-Mischer erkannt. Der erste Treffer hat die höchste Übereinstimmung mit deinem Foto.
          </div>
        </div>
        <a className="help-link" href="#" onClick={(e) => {e.preventDefault();onNoResult();}}>
          <IconCamera size={14} stroke={2} /> Nichts passt? Tipps für optimale Fotos
        </a>
      </div>

      {pickedArticle &&
      <div className="plp-picked">
        <div className="plp-picked-img">
          <FaucetImg variant={pickedArticle.variant} alt={pickedArticle.title} />
        </div>
        <div className="plp-picked-body">
          <span className="plp-picked-eyebrow">Erkannter Artikel</span>
          <h2 className="plp-picked-title">
            <span className="brand">{pickedArticle.brand}</span> {pickedArticle.title}
          </h2>
          <div className="plp-picked-meta">
            <span className="kbn">{pickedArticle.id}</span>
          </div>
        </div>
        <button className="plp-picked-change" onClick={onNewSearch}>
          <IconRefresh size={13} stroke={2} /> Anderen Artikel wählen
        </button>
      </div>
      }

      <div className="plp-table">
        <div className="plp-table-head">
          <div className="th th-thumb" />
          <div className="th th-kbn">Artikelnummer</div>
          <div className="th th-desc">Beschreibung</div>
          <div className="th th-qty">Menge</div>
          <div className="th th-add" />
          <div className="th th-price">Preis</div>
        </div>
        <div className="plp-table-body">
          {tagged(allSorted).map((d) => <ResultCard key={d.kbn} data={d} />)}
        </div>
      </div>

      <div style={{
        marginTop: 18, padding: "14px 18px",
        background: "var(--gc-neutral-100)", border: "1px solid var(--gc-neutral-300)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
        fontSize: 13, color: "var(--fg-2)"
      }}>
        <span><IconHeadset size={16} stroke={2} style={{ verticalAlign: -3, marginRight: 8, color: "var(--fg-3)" }} />
          Nichts dabei? Unsere Ersatzteil-Experten schauen sich deine Bilder persönlich an &mdash; Antwort i.d.R. innerhalb von 2 Stunden.
        </span>
        <button className="cta-secondary" onClick={onExpert} style={{ background: "#fff" }}>
          An Ersatzteil-Experten weitergeben <IconChevR size={14} stroke={2} />
        </button>
      </div>
    </div>);

};

// ---------------- S5: Kein Treffer ----------------

const TipFrontal = () =>
<svg viewBox="0 0 200 110" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="110" fill="#e8eaeb" />
    {/* "lit" beam */}
    <polygon points="100,12 28,100 172,100" fill="#fff" opacity="0.6" />
    <rect x="80" y="40" width="40" height="50" rx="3" fill="#7c8389" stroke="#202125" strokeWidth="1.2" />
    <rect x="92" y="28" width="16" height="14" fill="#7c8389" stroke="#202125" strokeWidth="1.2" />
    <circle cx="100" cy="65" r="3" fill="#d3012d" />
  </svg>;

const TipRuler = () =>
<svg viewBox="0 0 200 110" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="110" fill="#e8eaeb" />
    <rect x="36" y="40" width="40" height="40" rx="3" fill="#9aa2a8" stroke="#202125" strokeWidth="1.2" />
    {/* ruler */}
    <rect x="90" y="68" width="90" height="14" fill="#f0b223" stroke="#202125" strokeWidth="1.2" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <line key={i} x1={94 + i * 10} y1="68" x2={94 + i * 10} y2={i % 2 === 0 ? 76 : 73} stroke="#202125" strokeWidth="0.8" />)}
    <text x="98" y="64" fontSize="9" fill="#202125" fontFamily="GC Klavika, sans-serif">cm</text>
  </svg>;

const TipCover = () =>
<svg viewBox="0 0 200 110" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="110" fill="#e8eaeb" />
    <rect x="55" y="36" width="90" height="55" fill="#7c8389" stroke="#202125" strokeWidth="1.2" />
    {/* lifted cover */}
    <rect x="80" y="14" width="60" height="14" fill="#a9adae" stroke="#202125" strokeWidth="1.2" transform="rotate(-12 110 21)" />
    {/* arrow */}
    <line x1="140" y1="36" x2="160" y2="22" stroke="#d3012d" strokeWidth="1.5" />
    <polyline points="156,18 160,22 156,26" fill="none" stroke="#d3012d" strokeWidth="1.5" />
  </svg>;

const TipStamp = () =>
<svg viewBox="0 0 200 110" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="110" fill="#e8eaeb" />
    <rect x="48" y="34" width="104" height="50" rx="4" fill="#7c8389" stroke="#202125" strokeWidth="1.2" />
    <rect x="60" y="48" width="80" height="22" fill="#fff" stroke="#202125" strokeWidth="0.8" />
    <text x="100" y="58" fontSize="9" fill="#202125" fontFamily="GC Klavika, sans-serif" textAnchor="middle" fontWeight="700">46.374.000</text>
    <text x="100" y="67" fontSize="7" fill="#626369" fontFamily="GC Klavika, sans-serif" textAnchor="middle">GROHE · DE</text>
  </svg>;


const ScreenNoResult = ({ onRetry, onExpert }) =>
<div>
    <div className="ets-page-head">
      <div>
        <h1>Wir sind uns nicht sicher.</h1>
        <div className="lede">
          Die KI hat in deinen Bildern keinen eindeutigen Treffer gefunden. Mit diesen vier Tipps klappt's meist beim zweiten Versuch:
        </div>
      </div>
    </div>

    <div className="no-result">
      <div className="tip-grid">
        <div className="tip">
          <div className="vis"><span className="num">1</span><TipFrontal /></div>
          <h4>Frontal &amp; gut beleuchtet</h4>
          <p>Senkrecht draufhalten, Tageslicht oder Lampe. Kein Gegenlicht.</p>
        </div>
        <div className="tip">
          <div className="vis"><span className="num">2</span><TipRuler /></div>
          <h4>Zollstock daneben</h4>
          <p>Ein Maß im Bild macht den größten Unterschied — Durchmesser oder Baulänge.</p>
        </div>
        <div className="tip">
          <div className="vis"><span className="num">3</span><TipCover /></div>
          <h4>Blende oder Deckel ab</h4>
          <p>Wenn möglich öffnen — die KI braucht das Innenleben, nicht das Gehäuse.</p>
        </div>
        <div className="tip">
          <div className="vis"><span className="num">4</span><TipStamp /></div>
          <h4>Beschriftung fotografieren</h4>
          <p>Stempel, Aufdruck, KBN am Teil? Davon ein scharfes Nahfoto.</p>
        </div>
      </div>

      <div className="cta-row">
        <button className="primary" onClick={onRetry}>
          <IconUpload size={16} stroke={2} /> Neue Bilder hochladen
        </button>
        <span className="or">oder</span>
        <button className="secondary" onClick={onExpert}>
          <IconUser size={14} stroke={2} /> An Ersatzteil-Experten weitergeben
        </button>
      </div>
    </div>
  </div>;


// ---------------- S6: Experten-Übergabe ----------------

const ScreenExpert = ({ onBack }) =>
<div>
    <div className="ets-page-head">
      <div>
        <a className="help-link back" href="#" onClick={(e) => {e.preventDefault();onBack();}}>
          <IconChevL size={14} stroke={2} /> Zurück zur Trefferliste
        </a>
        <h1>Anfrage an die Ersatzteil-Experten.</h1>
        <div className="lede">
          Deine Bilder und Eingaben sind übernommen. Eine Person aus dem ETS-Team meldet sich i.d.R. innerhalb von 2 Stunden bei dir zurück.
        </div>
      </div>
    </div>

    <div className="expert">
      <div className="summary-card">
        <h2>Was wir an dich rüberreichen</h2>
        <p className="lede">Du musst nichts erneut eintippen — alles, was du bisher hochgeladen hast, ist schon dran.</p>

        <div className="block">
          <div className="lbl"><span className="check"><IconCheck size={12} stroke={3} /></span> 3 Bilder übernommen</div>
          <div className="pics">
            <div className="pic"><PhotoPlaceholder variant="cartridge" /></div>
            <div className="pic"><PhotoPlaceholder variant="cartridge" /></div>
            <div className="pic"><PhotoPlaceholder variant="cartridge" /></div>
          </div>
        </div>

        <div className="block">
          <div className="lbl"><span className="check"><IconCheck size={12} stroke={3} /></span> KI-Erkennung übernommen</div>
          <span className="ctx-pill">Erkannt: <b style={{ marginLeft: 4 }}>GROHE · Kartusche · Ø 46 mm</b></span>
          <span className="ctx-pill" style={{ marginLeft: 6 }}>Vorgang: <b style={{ marginLeft: 4 }}>WW90</b></span>
        </div>

        <div className="block">
          <div className="lbl">Was hast du schon probiert? <span style={{ marginLeft: 8, color: "var(--fg-muted)", letterSpacing: 0, textTransform: "none", fontWeight: 500 }}>optional</span></div>
          <textarea placeholder={`z. B. "Habe drei Grohe-Kartuschen mit Ø 46 ausprobiert, keine sitzt richtig. Mischer ist Eurostyle vermutlich vor 2010."`}></textarea>
        </div>

        <div className="submit-row">
          <button className="send"><IconMsg size={16} stroke={2} /> Anfrage senden</button>
          <button className="cancel" onClick={onBack}>Abbrechen</button>
        </div>
      </div>

      <div className="info-card">
        <div className="row">
          <div className="ic"><IconClock size={16} stroke={2} /></div>
          <div>
            <h4>Antwort i.d.R. in 2 Stunden</h4>
            <p>Montag bis Freitag, 7–17 Uhr. Außerhalb dieser Zeit: nächster Werktag.</p>
          </div>
        </div>
        <div className="row">
          <div className="ic"><IconMsg size={16} stroke={2} /></div>
          <div>
            <h4>Antwort per E-Mail</h4>
            <p>Du erhältst die Antwort per Mail an die in ONLINE PLUS hinterlegte E-Mail-Adresse.</p>
          </div>
        </div>
      </div>
    </div>
  </div>;


Object.assign(window, {
  ScreenEinstieg, ScreenSimilar, ScreenUpload, ScreenLoading, ScreenPlp, ScreenNoResult, ScreenExpert,
  EtsOverlay
});