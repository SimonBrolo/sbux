// Ersatzteilanfrage — Self-Service flow (replaces the old chat pattern).
//
//   view = "new"      → empty-state composer. User names the request (optional),
//                       drops in a photo, adds an optional description, submits.
//
//   view = "request"  → a submitted request. Two states, driven by status:
//                         "in-bearbeitung" → analysis/idle status. A human
//                              Ersatzteil-Experte is reviewing the photo;
//                              answer usually within 2 h.
//                         "beantwortet"    → result view: ONE best match with a
//                              match-probability badge + a list of fitting spare
//                              parts (each addable to the cart). A subtle
//                              fallback offers contacting an expert if it's wrong.
//
// The left rail lists all requests (empty state when none yet) + a "+" button.

const nowHHMM = () => {
  const d = new Date();
  return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
};

const newReqId = () => "ERSU-" + Math.floor(100000 + Math.random() * 900000);

// ─── Photo placeholder (used when user selects "Beispielbild") ─────────────
const FaucetPlaceholder = () =>
<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
    <defs>
      <pattern id="ert-tiles" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
        <rect width="22" height="22" fill="#7896aa" />
        <rect x="1" y="1" width="20" height="20" fill="#5e7c92" />
      </pattern>
      <linearGradient id="ert-chrome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fafafa" />
        <stop offset="50%" stopColor="#c4c8cc" />
        <stop offset="100%" stopColor="#5a5d62" />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#ert-tiles)" />
    <rect x="20" y="138" width="160" height="54" fill="#f4f5f6" />
    <rect x="20" y="138" width="160" height="6" fill="#dadcdf" />
    <rect x="92" y="92" width="16" height="46" fill="url(#ert-chrome)" />
    <path d="M 100 92 L 100 70 Q 100 60 110 60 L 132 60" fill="none" stroke="url(#ert-chrome)" strokeWidth="9" strokeLinecap="round" />
    <rect x="88" y="48" width="40" height="6" rx="1" fill="#cfd3d6" stroke="#73767a" strokeWidth="0.5" />
    <circle cx="90" cy="51" r="4" fill="#4a4d52" />
    <rect x="150" y="156" width="22" height="10" rx="2" fill="#e8d4b5" stroke="#b89a78" strokeWidth="0.5" />
  </svg>;


// ─── Article thumbnail (GROHE Kartusche) ───────────────────────────────────
const CartridgeThumb = () =>
<svg viewBox="0 0 48 48" style={{ width: "100%", height: "100%", display: "block" }}>
    <defs>
      <linearGradient id="evl-cart" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#cfd3d6" /><stop offset="45%" stopColor="#f4f5f6" /><stop offset="100%" stopColor="#7d8388" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" fill="#eef1f2" />
    <rect x="18" y="9" width="12" height="28" rx="1.5" fill="url(#evl-cart)" stroke="#7a7e82" strokeWidth="0.5" />
    <rect x="20" y="6" width="8" height="4" rx="1" fill="#9aa0a6" stroke="#6f7378" strokeWidth="0.4" />
    <circle cx="24" cy="15" r="2" fill="#3b3c43" />
    <circle cx="24" cy="22" r="2" fill="#c0292f" />
    <circle cx="24" cy="29" r="2" fill="#2c63b0" />
    <rect x="16" y="37" width="16" height="4" rx="1" fill="#d7dadd" stroke="#9aa0a6" strokeWidth="0.4" />
  </svg>;


// Generic part thumbnails so the list doesn't look monotonous.
const PartThumb = ({ kind }) => {
  if (kind === "mousseur")
  return (
    <svg viewBox="0 0 48 48" style={{ width: "100%", height: "100%", display: "block" }}>
        <rect width="48" height="48" fill="#eef1f2" />
        <circle cx="24" cy="24" r="13" fill="#cfd3d6" stroke="#8a9096" strokeWidth="1" />
        <circle cx="24" cy="24" r="9" fill="#9aa0a6" />
        <g fill="#6f7378">
          <circle cx="24" cy="19" r="1.3" /><circle cx="20" cy="22" r="1.3" /><circle cx="28" cy="22" r="1.3" />
          <circle cx="21" cy="27" r="1.3" /><circle cx="27" cy="27" r="1.3" /><circle cx="24" cy="24" r="1.3" />
        </g>
      </svg>);

  if (kind === "seal")
  return (
    <svg viewBox="0 0 48 48" style={{ width: "100%", height: "100%", display: "block" }}>
        <rect width="48" height="48" fill="#eef1f2" />
        <circle cx="18" cy="22" r="9" fill="none" stroke="#1f1f1f" strokeWidth="3.2" opacity="0.55" />
        <circle cx="30" cy="28" r="7" fill="none" stroke="#1f1f1f" strokeWidth="2.6" opacity="0.4" />
      </svg>);

  return <CartridgeThumb />;
};


// ─── Rail item ─────────────────────────────────────────────────────────────
const STATUS_LABEL = { "in-bearbeitung": "In Bearbeitung", "beantwortet": "Beantwortet", "rueckfrage": "Rückfrage", "nicht-gelistet": "Nicht gelistet", "abgeschlossen": "Abgeschlossen", "experten-chat": "Im Experten-Chat" };

const ReqListItem = ({ item, active, onSelect }) =>
<button
  className={"erta-conv-row" + (active ? " is-active" : "")}
  onClick={() => onSelect(item.id)}>
    {item.unread && !active && <span className="erta-unread-dot" aria-hidden="true" />}
    <span className="erta-conv-body">
      <span className="erta-conv-row-top">
        <span className="erta-conv-title">{item.title}</span>
        <span className="erta-conv-time">{item.updated}</span>
      </span>
      <span className="erta-conv-author-row">
        {item.author ?
        <span className="erta-conv-author">
          <span className="erta-conv-ava">{item.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
          {item.author}
        </span> :
        <span />}
        <span className={"erta-status-pill status-" + (item.expertChat ? "experten-chat" : item.status)} style={{ borderRadius: "3px" }}>
          <span className="dot" /> {item.expertChat ? STATUS_LABEL["experten-chat"] : STATUS_LABEL[item.status] || item.status}
        </span>
      </span>
      {item.kommission &&
      <span className="erta-conv-komm" title={"Kommission: " + item.kommission}>
        {item.kommission}
      </span>}
    </span>
  </button>;


// ─── Request recap (photo + title + description) ───────────────────────────
const RequestSummary = ({ req, compact }) =>
<div className={"erta-req-summary" + (compact ? " is-compact" : "")}>
    <div className="erta-req-photo">
      {req.photoData ?
    <img src={req.photoData} alt="Foto der Anfrage" /> :
    <FaucetPlaceholder />}
    </div>
    <div className="erta-req-info">
      <div className="erta-req-info-label">{req.author ? "Anfrage von " + req.author : "Deine Anfrage"}</div>
      <div className="erta-req-info-title">{req.title}</div>
      {req.caption &&
    <p className="erta-req-info-desc">{req.caption}</p>}
    </div>
  </div>;


// ─── Quantity stepper (O+ style) ───────────────────────────────────────────
const QtyField = ({ min = 1 }) => {
  const [qty, setQty] = React.useState(min);
  const dec = () => setQty((q) => Math.max(min, q - 1));
  const inc = () => setQty((q) => q + 1);
  return (
    <div className="erta-qty">
      <button type="button" className="erta-qty-btn" onClick={dec} aria-label="Menge verringern">–</button>
      <input
        type="text"
        className="erta-qty-input"
        value={qty}
        onChange={(e) => {
          const v = parseInt(e.target.value.replace(/\D/g, ""), 10);
          setQty(Number.isNaN(v) ? min : Math.max(min, v));
        }}
        inputMode="numeric" />
      <button type="button" className="erta-qty-btn" onClick={inc} aria-label="Menge erhöhen">+</button>
    </div>);

};

// ─── O+ availability icon (recreates the md_INSTOCK.svg traffic-light disc) ──
const StockIcon = ({ state }) => {
  const fill = state === "in" ? "#3a9b4e" : state === "low" ? "#e0a106" : "#c0292f";
  const ring = state === "in" ? "#2c7d3d" : state === "low" ? "#b88203" : "#9a2127";
  return (
    <svg className="erta-stock-ico" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill={fill} stroke={ring} strokeWidth="1" />
      {state === "in" ?
      <path d="M7.5 12.4 L10.6 15.4 L16.5 8.8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /> :
      <path d="M12 7 L12 13 M12 16 L12 16.6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />}
    </svg>);

};

// ─── O+ "Alternativartikel vorhanden" icon (Alternativ_lg_INSTOCK.svg) ─────
const AltStockIcon = () =>
<svg className="erta-stock-ico" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#3a9b4e" stroke="#2c7d3d" strokeWidth="1" />
    {/* swap / alternative arrows */}
    <path d="M8 10 H15 L13 8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 14 H9 L11 16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

// ─── Pending / waiting state (static — a human reviews it, up to ~2 h) ─────
const PendingAddendum = ({ onAddPhotos, onAddNote }) => {
  const fileRef = React.useRef(null);
  const [text, setText] = React.useState("");
  const [dragOver, setDragOver] = React.useState(false);

  const handleFiles = (fileList) => {
    [...(fileList || [])].filter((f) => f.type.startsWith("image/")).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => onAddPhotos([e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const send = () => {
    const v = text.trim();
    if (!v) return;
    onAddNote(v);
    setText("");
  };

  return (
    <div
      className={"erta-addendum" + (dragOver ? " is-drag" : "")}
      onDragOver={(e) => {e.preventDefault();setDragOver(true);}}
      onDragLeave={(e) => {e.preventDefault();setDragOver(false);}}
      onDrop={onDrop}>
      <div className="erta-addendum-head">Etwas vergessen?</div>
      <p className="erta-addendum-sub">
        Du kannst deiner Anfrage weitere Fotos oder Infos hinzufügen, solange sie in Bearbeitung ist. Fotos kannst du auch direkt hierher ziehen.
      </p>
      <textarea
        className="erta-field-input erta-field-textarea"
        placeholder="Weitere Infos ergänzen — z.B. Maße, Typenschild-Nummer, Hersteller …"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        maxLength={500} />
      <div className="erta-addendum-actions">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple={true}
          style={{ display: "none" }}
          onChange={(e) => {handleFiles(e.target.files);e.target.value = "";}} />
        <button type="button" className="erta-addendum-photo" onClick={() => fileRef.current && fileRef.current.click()}>
          <IconCamera size={15} stroke={2} /> Foto hinzufügen
        </button>
        <button type="button" className="erta-addendum-send" disabled={!text.trim()} onClick={send}>
          Hinzufügen
        </button>
      </div>
    </div>);

};

const PendingView = ({ req, onAddPhotos, onAddNote }) => {
  const extraPhotos = [...(req.photos ? req.photos.slice(1) : []), ...(req.addedPhotos || [])];
  return (
  <div className="erta-state-scroll">
    <div className="erta-state-inner">
      <div className="erta-analyzing">
        <div className="erta-analyzing-main">
          <div className="erta-analyzing-photo">
            {req.photoData ? <img src={req.photoData} alt="" /> : <FaucetPlaceholder />}
          </div>
          <div className="erta-analyzing-text">
            <div className="erta-pending-eyebrow">
              <span className="erta-pending-dot" aria-hidden="true" /> In Bearbeitung
            </div>
            <h2 className="erta-analyzing-head">Deine Anfrage wird geprüft</h2>
            <p className="erta-analyzing-body">
              Ein Ersatzteil-Experte prüft dein Foto und ermittelt das passende
              Original-Teil. Du wirst benachrichtigt, sobald das Ergebnis vorliegt.
            </p>
            <div className="erta-analyzing-meta">
              <IconInfo size={14} stroke={2} />
              Antwort meist innerhalb von 2 Std. werktags.
            </div>
          </div>
        </div>

        {extraPhotos.length > 0 &&
      <div className="erta-state-note">
            <span className="erta-state-note-label">Weitere Fotos</span>
            <div className="erta-state-photos">
              {extraPhotos.map((d, i) =>
          <span className="erta-state-photo" key={i}><img src={d} alt={"Weiteres Foto " + (i + 2)} /></span>
          )}
            </div>
          </div>}

        {req.caption &&
      <div className="erta-state-note">
            <span className="erta-state-note-label">Deine Beschreibung</span>
            <p>{req.caption}</p>
          </div>}

        {req.kommission &&
      <div className="erta-state-note">
            <span className="erta-state-note-label">Kommission/Auftragstext</span>
            <p>{req.kommission}</p>
          </div>}

        {(req.addenda || []).map((a, i) =>
      <div className="erta-state-note" key={"add-" + i}>
            <span className="erta-state-note-label">{(a.label || "Nachtrag") + " · " + a.time}</span>
            <p>{a.text}</p>
          </div>
      )}
      </div>

      <PendingAddendum onAddPhotos={onAddPhotos} onAddNote={onAddNote} />
    </div>
  </div>);

};


// ─── Rückfrage state — the expert needs more info before answering ────────
const RueckfrageView = ({ req, onReply }) => {
  const [text, setText] = React.useState("");
  const [photos, setPhotos] = React.useState([]);
  const fileRef = React.useRef(null);

  const handleFiles = (fileList) => {
    [...(fileList || [])].filter((f) => f.type.startsWith("image/")).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setPhotos((prev) => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const send = () => {
    const v = text.trim();
    if (!v && photos.length === 0) return;
    onReply(v, photos);
  };

  return (
    <div className="erta-state-scroll">
      <div className="erta-result-banner">
        <div className="erta-result-banner-inner">
          <RequestSummary req={req} compact={true} />
        </div>
      </div>
      <div className="erta-state-inner">
        {/* The expert's question + inline reply form — one card */}
        <div className="erta-query">
          <div className="erta-query-head">
            <span className="erta-query-eyebrow">
              <IconMsg size={15} stroke={2} /> Rückfrage zu deiner Anfrage
            </span>
            <span className="erta-query-time">Heute, {req.query.time}</span>
          </div>
          <div className="erta-query-body">
            <div className="erta-query-text">
              <div className="erta-query-name">Weitere Angaben benötigt</div>
              <p className="erta-query-msg">{req.query.text}</p>
            </div>
          </div>
          <div className="erta-query-reply">
            <textarea
              className="erta-field-input erta-field-textarea"
              placeholder="Deine Antwort … (optional, wenn du ein Foto anhängst)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={500} />
            {photos.length > 0 &&
            <div className="erta-state-photos">
                {photos.map((d, i) =>
              <span className="erta-state-photo" key={i}><img src={d} alt={"Antwort-Foto " + (i + 1)} /></span>
              )}
              </div>}
            <div className="erta-addendum-actions">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple={true}
                style={{ display: "none" }}
                onChange={(e) => {handleFiles(e.target.files);e.target.value = "";}} />
              <button type="button" className="erta-addendum-photo" onClick={() => fileRef.current && fileRef.current.click()}>
                <IconCamera size={15} stroke={2} /> Foto hinzufügen
              </button>
              <button type="button" className="erta-query-send" disabled={!text.trim() && photos.length === 0} onClick={send}>
                Antwort senden <IconArrow size={15} stroke={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};


// ─── Unlisted state — the article is not in the GC range; Innendienst takes over
const UnlistedView = ({ req }) =>
<div className="erta-state-scroll">
    <div className="erta-result-banner">
      <div className="erta-result-banner-inner">
        <RequestSummary req={req} compact={true} />
      </div>
    </div>
    <div className="erta-state-inner">
      <div className="erta-query is-unlisted">
        <div className="erta-query-head">
          <span className="erta-query-eyebrow">
            <IconInfo size={15} stroke={2} /> Prüfung abgeschlossen
          </span>
          <span className="erta-query-time">Heute, {req.answer.time}</span>
        </div>
        <div className="erta-query-body">
          <div className="erta-query-text">
            <div className="erta-query-name">Artikel nicht gelistet</div>
            <p className="erta-query-msg">{req.answer.text}</p>
          </div>
        </div>
        <div className="erta-handoff">
          <span className="erta-handoff-ico"><IconCheck size={18} stroke={2.5} /></span>
          <div className="erta-handoff-body">
            <span className="erta-handoff-head">Dein Innendienst-Ansprechpartner ist informiert</span>
            <span className="erta-handoff-sub">
              <strong>Sabine Koch</strong> · Innendienst · Cordes &amp; Graefe Bremen — setzt sich
              zeitnah mit dir in Verbindung. Du musst nichts weiter tun.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>;


// ─── Match badge (probability) ─────────────────────────────────────────────
const MatchBadge = ({ value }) => {
  const tone = value >= 85 ? "high" : value >= 60 ? "mid" : "low";
  return (
    <span className={"erta-match-badge tone-" + tone}>
      <IconCheck size={13} stroke={3} />
      {value} % Übereinstimmung
    </span>);

};


// ─── Star rating control ───────────────────────────────────────────────────
const StarRating = ({ value, onChange, readOnly }) => {
  const [hover, setHover] = React.useState(0);
  return (
    <div className={"erta-stars" + (readOnly ? " is-readonly" : "")}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            className={"erta-star" + (active ? " is-active" : "")}
            onMouseEnter={() => !readOnly && setHover(n)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => !readOnly && onChange(n)}
            disabled={readOnly}
            aria-label={n + " von 5 Sternen"}>
            <IconStar size={22} stroke={1.5} />
          </button>);

      })}
    </div>);

};

// ─── Result state ──────────────────────────────────────────────────────────
const ResultView = ({ req, onExpert, onClose }) => {
  const r = req.result;
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  return (
    <div className="erta-state-scroll">
      <div className="erta-result-banner">
        <div className="erta-result-banner-inner">
          <RequestSummary req={req} compact={true} />
        </div>
      </div>
      <div className="erta-state-inner">

        {/* Recognised model */}
        <div className="erta-result-head">
          <div className="erta-result-media"><FaucetPlaceholder /></div>
          <div className="erta-result-text">
            <span className="erta-result-eyebrow">Erkanntes Modell</span>
            <div className="erta-match-row">
              <h2 className="erta-match-name">{r.model.name}</h2>
            </div>
            <div className="erta-match-sub">{r.model.sub}</div>
            <p className="erta-match-note">{r.note}</p>
          </div>
        </div>

        {/* Spare parts */}
        <div className="erta-parts">
          <div className="erta-parts-head">
            <span className="erta-parts-title">Passende Ersatzteile</span>
            <span className="erta-parts-count">{r.parts.length} Artikel</span>
          </div>

          <div className="erta-parts-list">
            {r.parts.map((p) =>
            <div className={"erta-part" + (p.primary ? " is-primary" : "")} key={p.sku}>
                <div className="erta-part-thumb"><PartThumb kind={p.thumb} /></div>
                <div className="erta-part-body">
                  {p.primary &&
                <span className="erta-part-flag">Empfohlen für dein Problem</span>}
                  <div className="erta-part-title">{p.title}</div>
                  <div className="erta-part-sub">{p.sub}</div>
                  <div className="erta-part-sku">{p.sku}</div>
                  {p.stock > 0 ?
                  <div className="erta-part-stock in-stock" title={"Der Artikel ist im Lager verfügbar. Der Bestand beträgt " + p.stock.toLocaleString("de-DE") + " Stück."}>
                    {p.alt && <span className="erta-stock-alt" title="Alternativartikel vorhanden — im Lager verfügbar."><AltStockIcon /></span>}
                    <StockIcon state="in" />
                    {p.delivery} · {p.stock.toLocaleString("de-DE")} Stk.
                  </div> :
                  <div className="erta-part-stock out-stock" title={"Lieferbar in " + p.eta + ". Verfügbar über Zentrallager: " + p.central.toLocaleString("de-DE") + " Stück."}>
                    {p.alt && <span className="erta-stock-alt" title="Alternativartikel vorhanden — im Lager verfügbar."><AltStockIcon /></span>}
                    <StockIcon state="in" />
                    Lieferbar in {p.eta} · {p.central.toLocaleString("de-DE")} Stk.
                  </div>}
                </div>
                <div className="erta-part-buy">
                  <div className="erta-part-pricewrap">
                    <div className="erta-part-priceline">
                      <span className="erta-part-perunit">per 1 Stück</span>
                      <span className="erta-part-price">{p.price}</span>
                    </div>
                    {p.list &&
                    <div className="erta-part-list">{p.list} Listenpreis</div>}
                  </div>
                  <div className="erta-part-cartrow">
                    <QtyField min={1} />
                    <button type="button" className="erta-part-cart">
                      <IconCart size={15} stroke={2} /> In den Warenkorb
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expert fallback */}
        <button type="button" className="erta-expert-fallback" onClick={onExpert}>
          <span className="erta-expert-fallback-text">
            {req.expertChat ? "Du bist mit einem Experten im Chat." : "Ist das nicht das richtige Teil?"}
          </span>
          <span className="erta-expert-fallback-btn">
            {req.expertChat ? "Chat mit dem Experten öffnen" : "An einen Ersatzteil-Experten wenden"} <IconChevR size={13} stroke={2.5} />
          </span>
        </button>

        {/* Close & rate */}
        {req.status === "abgeschlossen" ?
        <div className="erta-close-done">
          <div className="erta-close-done-head">
            <span className="erta-close-done-icon"><IconCheckCircle size={20} stroke={2} /></span>
            Anfrage abgeschlossen
          </div>
          {req.rating > 0 &&
          <div className="erta-close-done-rating">
            <span className="erta-close-done-label">Deine Bewertung</span>
            <StarRating value={req.rating} readOnly={true} />
          </div>}
          {req.ratingComment &&
          <p className="erta-close-done-comment">„{req.ratingComment}“</p>}
        </div> :
        <div className="erta-close-panel">
          <div className="erta-close-panel-head">
            <h3 className="erta-close-panel-title">Anfrage abschließen</h3>
            <p className="erta-close-panel-sub">Hat dir die Empfehlung geholfen? Schließe die Anfrage ab und hinterlasse eine Bewertung.</p>
          </div>
          <div className="erta-close-rate">
            <span className="erta-close-rate-label">Deine Bewertung</span>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <textarea
            className="erta-field-input erta-field-textarea erta-close-comment"
            placeholder="Optionaler Kommentar zur Bearbeitung deiner Anfrage …"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            maxLength={400} />
          <div className="erta-close-actions">
            <button
              type="button"
              className="erta-close-btn"
              disabled={rating === 0}
              onClick={() => onClose(rating, comment.trim())}>
              <IconCheck size={16} stroke={2.5} /> Als abgeschlossen markieren
            </button>
          </div>
        </div>}
      </div>
    </div>);

};


// ─── Ersatzteil-Experte kontaktieren (own view) ────────────────────────────
const EXPERT_EMAIL = "max.muster@mustercompany.de";

const ExpertChatScreen = ({ req, typing, onBack, onSend, onAttach }) => {
  const [reply, setReply] = React.useState("");
  const fileRef = React.useRef(null);
  const threadRef = React.useRef(null);
  const messages = req.expertChat && req.expertChat.messages || [];

  React.useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages.length, typing]);

  const handleFiles = (fileList) => {
    [...(fileList || [])].filter((f) => f.type.startsWith("image/")).forEach((file) => {
      const r = new FileReader();
      r.onload = (e) => onAttach(e.target.result);
      r.readAsDataURL(file);
    });
  };
  const send = () => {
    const v = reply.trim();
    if (!v) return;
    onSend(v);
    setReply("");
  };

  return (
    <div className="erta-state-scroll erta-chat-scroll">
      <div className="erta-result-banner">
        <div className="erta-result-banner-inner">
          <div className="erta-chat-head">
            <button type="button" className="erta-chat-back-btn" onClick={onBack} aria-label="Zurück zum Ergebnis">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12 H5 M11 6 L5 12 L11 18" /></svg>
              <span className="erta-chat-back-label">Zurück zum Ergebnis</span>
            </button>
            <span className="erta-chat-avatar"><IconUser size={20} stroke={2} /></span>
            <div className="erta-chat-head-body">
              <div className="erta-chat-head-title">Ersatzteil-Experte</div>
              <div className="erta-chat-head-sub">
                Antwortet meist innerhalb von 2 Std. werktags
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="erta-chat-wrap">
        {/* Email notification banner */}
        <div className="erta-chat-mail">
          <IconInfo size={15} stroke={2} />
          <span>Du wirst per E-Mail an <strong>{EXPERT_EMAIL}</strong> benachrichtigt, sobald der Experte antwortet. Du musst nicht auf dieser Seite bleiben.</span>
        </div>

        <div className="erta-chat-thread" ref={threadRef}>
          {messages.map((m, i) =>
          <div className={"erta-chat-msg " + (m.from === "user" ? "is-user" : "is-expert")} key={i}>
            {m.from === "expert" &&
            <span className="erta-chat-msg-avatar"><IconUser size={15} stroke={2} /></span>}
            <div className="erta-chat-bubble">
              {m.photos && m.photos.length > 0 &&
              <div className="erta-chat-photos">
                {m.photos.map((d, pi) => <img src={d} alt={"Foto " + (pi + 1)} key={pi} />)}
              </div>}
              {m.text && <p className="erta-chat-text">{m.text}</p>}
              <span className="erta-chat-time">{m.time}</span>
            </div>
          </div>
          )}
          {typing &&
          <div className="erta-chat-msg is-expert">
            <span className="erta-chat-msg-avatar"><IconUser size={15} stroke={2} /></span>
            <div className="erta-chat-bubble erta-chat-typing">
              <span /><span /><span />
            </div>
          </div>}
        </div>

        {/* Composer */}
        <div className="erta-chat-composer">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple={true}
            style={{ display: "none" }}
            onChange={(e) => {handleFiles(e.target.files);e.target.value = "";}} />
          <button type="button" className="erta-chat-attach" onClick={() => fileRef.current && fileRef.current.click()} aria-label="Foto anhängen">
            <IconCamera size={18} stroke={2} />
          </button>
          <textarea
            className="erta-chat-input"
            placeholder="Nachricht an den Experten schreiben …"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();send();}}}
            rows={1} />
          <button type="button" className="erta-chat-send" disabled={!reply.trim()} onClick={send} aria-label="Senden">
            <IconArrow size={18} stroke={2.5} />
          </button>
        </div>
      </div>
    </div>);

};

// ─── Ersatzteil-Experte kontaktieren (form) ────────────────────────────────
const ExpertContactView = ({ req, onCancel, onStart }) => {
  const [text, setText] = React.useState("");
  const [photos, setPhotos] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);
  const fileRef = React.useRef(null);

  const handleFiles = (fileList) => {
    [...(fileList || [])].filter((f) => f.type.startsWith("image/")).forEach((file) => {
      const r = new FileReader();
      r.onload = (e) => setPhotos((p) => [...p, e.target.result]);
      r.readAsDataURL(file);
    });
  };
  const onDrop = (e) => {e.preventDefault();setDragOver(false);handleFiles(e.dataTransfer.files);};
  const removePhoto = (i) => setPhotos((prev) => prev.filter((_, idx) => idx !== i));
  const submit = () => {if (!text.trim()) return;onStart(text.trim(), photos.slice());};

  return (
    <div className="erta-state-scroll">
      <div className="erta-result-banner">
        <div className="erta-result-banner-inner">
          {/* Expert intro card */}
          <div className="erta-expert-card">
            <button type="button" className="erta-chat-back-btn" onClick={onCancel} aria-label="Zurück zum Ergebnis">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12 H5 M11 6 L5 12 L11 18" /></svg>
              <span className="erta-chat-back-label">Zurück zum Ergebnis</span>
            </button>
            <span className="erta-expert-avatar"><IconUser size={26} stroke={2} /></span>
            <div className="erta-expert-card-body">
              <div className="erta-expert-card-eyebrow">Persönliche Hilfe</div>
              <h2 className="erta-expert-card-head">Ersatzteil-Experte kontaktieren</h2>
              <p className="erta-expert-card-sub">
                Passt der vorgeschlagene Artikel nicht? Ein Ersatzteil-Experte
                schaut sich deinen Fall persönlich an und findet das richtige Teil.
              </p>
              <div className="erta-expert-card-meta">
                <IconClock size={14} stroke={2} /> Antwort meist innerhalb von 2 Std. werktags.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="erta-state-inner">
        {/* Reference to the recognised model */}
        {req.result &&
        <div className="erta-expert-ref">
          <span className="erta-expert-ref-thumb">
            {req.photoData ? <img src={req.photoData} alt="Dein Foto" /> : <FaucetPlaceholder />}
          </span>
          <span className="erta-expert-ref-label">Bezug</span>
          <span className="erta-expert-ref-text">
            {req.title} · vorgeschlagen: {req.result.model.name}
          </span>
        </div>}

        {/* Message */}
        <div className="erta-field">
          <label className="erta-field-label">
            <span className="erta-step-num">1</span>
            Was passt nicht oder welches Teil suchst du?
            <span className="erta-field-required">Erforderlich</span>
          </label>
          <textarea
            className="erta-field-input erta-field-textarea"
            placeholder="z.B. Der Hebel hat eine andere Form, oder ich brauche zusätzlich die Befestigungsschrauben …"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={600} />
          <div className="erta-field-hint"><span>{text.length}/600</span></div>
        </div>

        {/* Optional extra photos */}
        <div className="erta-field">
          <label className="erta-field-label">
            <span className="erta-step-num">2</span>
            Weitere Fotos
            <span className="erta-field-optional">Optional</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple={true}
            style={{ display: "none" }}
            onChange={(e) => {handleFiles(e.target.files);e.target.value = "";}} />
          {photos.length === 0 ?
          <div
            className={"erta-expert-drop" + (dragOver ? " is-drag" : "")}
            onDragOver={(e) => {e.preventDefault();setDragOver(true);}}
            onDragLeave={(e) => {e.preventDefault();setDragOver(false);}}
            onDrop={onDrop}
            onClick={() => fileRef.current && fileRef.current.click()}
            role="button"
            tabIndex={0}>
            <IconCamera size={26} stroke={1.6} />
            <span>Foto hierher ziehen oder klicken</span>
          </div> :
          <div
            className={"erta-photo-grid" + (dragOver ? " is-drag" : "")}
            onDragOver={(e) => {e.preventDefault();setDragOver(true);}}
            onDragLeave={(e) => {e.preventDefault();setDragOver(false);}}
            onDrop={onDrop}>
            {photos.map((d, i) =>
            <span className="erta-photo-tile" key={i}>
              <img src={d} alt={"Foto " + (i + 1)} />
              <button type="button" className="erta-photo-tile-remove" onClick={() => removePhoto(i)} aria-label="Foto entfernen">
                <IconX size={13} stroke={2.5} />
              </button>
            </span>
            )}
            <button type="button" className="erta-photo-add-tile" onClick={() => fileRef.current && fileRef.current.click()}>
              <IconCamera size={18} stroke={1.8} /><span>Weiteres Foto</span>
            </button>
          </div>}
        </div>

        {/* Submit */}
        <div className="erta-new-submit-row">
          <div className="erta-new-submit-hint">
            <IconInfo size={14} stroke={2} /> Deine Fotos und Beschreibung der Anfrage werden mitgeschickt.
          </div>
          <button
            type="button"
            className="erta-submit-btn"
            disabled={!text.trim()}
            onClick={submit}>
            An Experten senden <IconArrow size={16} stroke={2.5} />
          </button>
        </div>
      </div>
    </div>);

};

// ─── New-Anfrage composer (view === "new") ─────────────────────────────────
const NewAnfrageView = ({ onSubmit, initialPhotos }) => {
  const [title, setTitle] = React.useState("");
  const [photos, setPhotos] = React.useState(initialPhotos || []);
  const [desc, setDesc] = React.useState("");
  const [kommission, setKommission] = React.useState("");
  const [dragOver, setDragOver] = React.useState(false);
  const fileRef = React.useRef(null);

  const handleFiles = (fileList) => {
    const files = [...(fileList || [])].filter((f) => f.type.startsWith("image/"));
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setPhotos((prev) => [...prev, { data: e.target.result, name: file.name }]);
      reader.readAsDataURL(file);
    });
  };
  const onPick = () => fileRef.current && fileRef.current.click();
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };
  const removePhoto = (idx) => setPhotos((prev) => prev.filter((_, i) => i !== idx));

  const canSubmit = photos.length > 0;
  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      title: title.trim() || "Ersatzteilanfrage",
      photos,
      desc: desc.trim(),
      kommission: kommission.trim()
    });
  };

  return (
    <div className="erta-new-wrap">
      <header className="erta-thread-head erta-new-head">
        <div className="erta-thread-head-body">
          <div className="erta-thread-title">Neue Ersatzteilanfrage</div>
        </div>
      </header>

      <div className="erta-new-body">
        <div className="erta-new-form">
          {/* Step 1 — Title */}
          <div className="erta-field">
            <label className="erta-field-label">
              <span className="erta-step-num">1</span>
              Fotos vom defekten Artikel
              <span className="erta-field-required">Erforderlich</span>
            </label>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple={true}
              style={{ display: "none" }}
              onChange={(e) => {handleFiles(e.target.files);e.target.value = "";}} />

            {photos.length === 0 &&
            <div
              className={"erta-dropzone" + (dragOver ? " is-drag" : "")}
              onDragOver={(e) => {e.preventDefault();setDragOver(true);}}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={onPick}
              role="button"
              tabIndex={0}>
                <div className="erta-dropzone-icon"><IconCamera size={36} stroke={1.6} /></div>
                <div className="erta-dropzone-head">Foto hier ablegen</div>
                <div className="erta-dropzone-sub">oder klicken, um eine Datei auszuwählen</div>
                <div className="erta-dropzone-cta">
                  <span className="erta-dropzone-btn"><IconUpload size={14} stroke={2} /> Foto auswählen</span>
                </div>
                <div className="erta-dropzone-tip">
                  Tipp: möglichst nah, scharf und gut beleuchtet — das verbessert die Erkennung.
                </div>
              </div>
            }

            {photos.length > 0 &&
            <React.Fragment>
                <div
                className={"erta-photo-grid" + (dragOver ? " is-drag" : "")}
                onDragOver={(e) => {e.preventDefault();setDragOver(true);}}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}>
                  {photos.map((p, i) =>
                <div className="erta-photo-tile" key={i}>
                      <img src={p.data} alt={p.name} />
                      <button type="button" className="erta-photo-tile-remove" onClick={() => removePhoto(i)} aria-label="Foto entfernen">
                        <IconX size={13} stroke={2.4} />
                      </button>
                    </div>
                )}
                  <button type="button" className="erta-photo-add-tile" onClick={onPick}>
                    <IconPlus size={20} stroke={2} />
                    <span>Weiteres Foto</span>
                  </button>
                </div>
                <div className="erta-field-hint">
                  Mehrere Perspektiven helfen — z.B. Gesamtansicht, Detail und Typenschild.
                </div>
              </React.Fragment>
            }
          </div>

          {/* Step 2 — Title */}
          <div className="erta-field">
            <label className="erta-field-label">
              <span className="erta-step-num">2</span>
              Wie sollen wir die Anfrage benennen?
              <span className="erta-field-optional">Optional</span>
            </label>
            <input
              type="text"
              className="erta-field-input"
              placeholder="z.B. Wasserhahn Küche, Heizungspumpe Keller …"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60} />
            <div className="erta-field-hint">Hilft dir, deine Anfragen später schnell wiederzufinden.</div>
          </div>

          {/* Step 3 — Description */}
          <div className="erta-field">
            <label className="erta-field-label">
              <span className="erta-step-num">3</span>
              Beschreibung
              <span className="erta-field-optional">Optional</span>
            </label>
            <textarea
              className="erta-field-input erta-field-textarea"
              placeholder="Beschreibe kurz, was nicht funktioniert oder welches Teil du suchst — Hersteller, Modell, Maße helfen uns enorm."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              maxLength={500} />
            <div className="erta-field-hint">
              <span>{desc.length}/500</span>
            </div>
          </div>

          {/* Step 4 — Kommission / Auftragstext */}
          <div className="erta-field">
            <label className="erta-field-label">
              <span className="erta-step-num">4</span>
              Kommission/Auftragstext
              <span className="erta-field-optional">Optional</span>
            </label>
            <input
              type="text"
              className="erta-field-input"
              placeholder="z.B. BV Müller, Bad OG — erscheint auf Auftrag und Lieferschein"
              value={kommission}
              onChange={(e) => setKommission(e.target.value)}
              maxLength={60} />
            <div className="erta-field-hint">Hilft dir, die Bestellung deinem Bauvorhaben zuzuordnen.</div>
          </div>

          {/* Submit */}
          <div className="erta-new-submit-row">
            <div className="erta-new-submit-hint">
              <IconInfo size={14} stroke={2} />
              Antwort meist innerhalb von 2 Std. werktags.
            </div>
            <button
              type="button"
              className="erta-submit-btn"
              disabled={!canSubmit}
              onClick={submit}>
              Anfrage absenden <IconArrow size={16} stroke={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>);

};

// ─── Editable request title ────────────────────────────────────────────────
const EditableTitle = ({ value, onChange }) => {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef(null);

  React.useEffect(() => {setDraft(value);}, [value]);
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    const v = draft.trim();
    if (v && v !== value) onChange(v);else
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="erta-thread-title-input"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {setDraft(value);setEditing(false);}
        }}
        maxLength={60} />);

  }
  return (
    <button
      type="button"
      className="erta-thread-title erta-thread-title-btn"
      onClick={() => setEditing(true)}
      title="Anfrage umbenennen">
      <span>{value}</span>
      <IconEdit size={14} stroke={2} />
    </button>);

};

// ─── Demo result data (Wasserhahn Küche → GROHE Eurosmart Cosmopolitan) ────
const DEMO_RESULT = {
  match: 92,
  model: {
    name: "GROHE Eurosmart Cosmopolitan",
    sub: "Einhebel-Küchenarmatur · Baujahr 2015–2019"
  },
  note: "Anhand deines Fotos wurde dieses Modell erkannt. Die folgenden Original-Ersatzteile passen dazu.",
  parts: [
  { sku: "GRO46374000", title: "Kartusche 46374 — 35 mm", sub: "Misch-Kartusche, für Eurosmart Cosmopolitan", price: "32,90 €", list: "41,50 €", thumb: "cartridge", primary: true, stock: 2436, delivery: "Lieferung morgen" },
  { sku: "GRO48430000", title: "Mousseur / Strahlregler M24×1", sub: "Auslauf-Belüfter, verkalkungsarm", price: "9,40 €", list: "12,30 €", thumb: "mousseur", stock: 1180, delivery: "Lieferung morgen", alt: true },
  { sku: "GRO45984000", title: "Dichtungsset Auslauf", sub: "O-Ringe + Gleitlager", price: "6,80 €", list: "8,90 €", thumb: "seal", stock: 540, delivery: "Lieferung morgen", alt: true }]

};

// ─── Seeds ─────────────────────────────────────────────────────────────────
const SEED_PENDING = {
  id: "ERSU-742183",
  title: "Wasserhahn Küche",
  author: "Max Muster",
  status: "in-bearbeitung",
  updated: "11:02",
  unread: false,
  photoData: null,
  caption: "Mischhebel sitzt fest, Auslauf tropft konstant. Modell ist ca. 8 Jahre alt.",
  result: null
};

const SEED_RESULT = {
  id: "ERSU-742183",
  title: "Wasserhahn Küche",
  author: "Max Muster",
  status: "beantwortet",
  updated: "12:46",
  unread: true,
  photoData: null,
  caption: "Mischhebel sitzt fest, Auslauf tropft konstant. Modell ist ca. 8 Jahre alt.",
  result: DEMO_RESULT
};

const SEED_EXPERTCHAT = {
  id: "ERSU-742183",
  title: "Wasserhahn Küche",
  author: "Max Muster",
  status: "beantwortet",
  updated: "13:12",
  unread: true,
  photoData: null,
  caption: "Mischhebel sitzt fest, Auslauf tropft konstant. Modell ist ca. 8 Jahre alt.",
  result: DEMO_RESULT,
  expertChat: {
    messages: [
    { from: "user", text: "Der Hebel hat eine andere Form als der vorgeschlagene Artikel. Ich brauche die Variante mit dem langen Griff.", photos: [], time: "13:08" },
    { from: "expert", text: "Danke für die Infos! Anhand deiner Beschreibung passt die Variante mit dem langen Hebel. Ich habe dir die korrekte Kartusche herausgesucht und schicke sie dir gleich als Empfehlung. Melde dich, falls noch etwas unklar ist.", time: "13:12" }]

  }
};

const SEED_RUECKFRAGE = {
  id: "ERSU-742183",
  title: "Wasserhahn Küche",
  author: "Max Muster",
  status: "rueckfrage",
  updated: "11:38",
  unread: true,
  photoData: null,
  caption: "Mischhebel sitzt fest, Auslauf tropft konstant. Modell ist ca. 8 Jahre alt.",
  result: null,
  query: {
    time: "11:38",
    text: "Zur Bestimmung der passenden Kartuschen-Variante wird noch ein Detail benötigt: Wie breit ist der Mischhebel an der Unterseite (in mm)? Ein Foto von der Unterseite des Hebels hilft ebenfalls bei der Zuordnung."
  }
};

const SEED_UNLISTED = {
  id: "ERSU-742611",
  title: "Mischbatterie Gäste-WC",
  author: "Max Muster",
  status: "nicht-gelistet",
  updated: "13:54",
  unread: true,
  photoData: null,
  caption: "Hersteller unbekannt, kein Typenschild auffindbar. Kartusche tropft.",
  result: null,
  answer: {
    time: "13:54",
    text: "Der Artikel auf deinem Foto wurde geprüft — es handelt sich um ein Fabrikat, das nicht in unserem Sortiment gelistet ist. Ein passendes Original-Ersatzteil kann daher über ONLINE PLUS nicht angeboten werden."
  }
};

// ─── Colleague requests — pre-existing team history shown in the rail ──────
const COLLEAGUE_SEEDS = [
{
  id: "ERSU-742090",
  title: "Eckventil Gäste-WC",
  author: "Sabine Reuter",
  kommission: "BV Müller, Bad OG",
  status: "beantwortet",
  updated: "Gestern",
  unread: false,
  photoData: null,
  caption: "Eckventil unter dem Waschtisch ist verkalkt und lässt sich nicht mehr drehen.",
  result: DEMO_RESULT
},
{
  id: "ERSU-741998",
  title: "Spülkasten Drückerplatte",
  author: "Jens Hoffmann",
  kommission: "BV Schäfer, Whg. 12",
  status: "in-bearbeitung",
  updated: "Gestern",
  unread: false,
  photoData: null,
  caption: "Drückerplatte löst nicht mehr aus — Mechanik im Spülkasten vermutlich defekt.",
  result: null
},
{
  id: "ERSU-741872",
  title: "Thermostat Dusche",
  author: "Markus Thiel",
  kommission: "BV Hansen, Whg. 3",
  status: "abgeschlossen",
  updated: "09.06.2026",
  unread: false,
  photoData: null,
  caption: "Thermostat hält die Temperatur nicht mehr stabil, Kartusche vermutlich verschlissen.",
  result: DEMO_RESULT
},
{
  id: "ERSU-741403",
  title: "Mischbatterie Altbau",
  author: "Petra Lange",
  status: "nicht-gelistet",
  updated: "06.06.2026",
  unread: false,
  photoData: null,
  caption: "Altbau-Armatur ohne Typenschild, Hersteller unbekannt. Griff dreht durch.",
  result: null,
  answer: {
    time: "10:18",
    text: "Der Artikel auf dem Foto wurde geprüft — es handelt sich um ein Fabrikat, das nicht in unserem Sortiment gelistet ist. Ein passendes Original-Ersatzteil kann daher über ONLINE PLUS nicht angeboten werden."
  }
}];


// ─── Screen ────────────────────────────────────────────────────────────────
const ScreenErsatzteilanfragen = ({ onBack, seed, seedExpert, seedRueckfrage, seedUnlisted, seedExpertChat, onBotReplied, onRueckfrageAnswered, initialPhotos }) => {
  // Screen 4.1 jumps straight to Petra Lange's "nicht gelistet" request, which
  // already lives in the colleague history (no separate seed injected).
  const UNLISTED_COLLEAGUE_ID = "ERSU-741403";
  const initial = seedExpertChat ? SEED_EXPERTCHAT : seedExpert ? SEED_RESULT : seedRueckfrage ? SEED_RUECKFRAGE : seed ? SEED_PENDING : null;
  const initialExpertView = seedExpertChat ? "chat" : "none";
  const [requests, setRequests] = React.useState((initial ? [initial] : []).concat(COLLEAGUE_SEEDS));
  const [activeId, setActiveId] = React.useState(seedUnlisted ? UNLISTED_COLLEAGUE_ID : initial ? initial.id : null);
  const [view, setView] = React.useState(seedUnlisted || initial ? "request" : "new"); // "new" | "request"
  // "none" | "form" | "chat" — which expert overlay (if any) is shown for the
  // active beantwortet/abgeschlossen request.
  const [expertView, setExpertView] = React.useState(initialExpertView || "none");
  const [typingFor, setTypingFor] = React.useState(null);

  const active = requests.find((r) => r.id === activeId);

  // Lock body scroll while mounted.
  React.useEffect(() => {
    document.body.classList.add("erta-lock");
    document.documentElement.classList.add("erta-lock");
    return () => {
      document.body.classList.remove("erta-lock");
      document.documentElement.classList.remove("erta-lock");
    };
  }, []);

  const startNew = () => {
    setActiveId(null);
    setExpertView("none");
    setView("new");
  };

  const handleSelect = (id) => {
    setActiveId(id);
    setView("request");
    setExpertView("none");
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, unread: false } : r));
  };

  const handleRename = (id, newTitle) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, title: newTitle } : r));
  };

  // Close a "Beantwortet" request and store the rating + optional comment.
  const handleCloseRequest = (id, rating, comment) => {
    setRequests((prev) => prev.map((r) => r.id === id ?
    { ...r, status: "abgeschlossen", rating, ratingComment: comment || null, updated: nowHHMM() } : r));
  };

  // Simulate the expert's reply: typing indicator, then a message on the thread.
  const scheduleExpertReply = (id) => {
    setTimeout(() => setTypingFor(id), 2600);
    setTimeout(() => {
      setTypingFor((cur) => cur === id ? null : cur);
      setRequests((prev) => prev.map((r) => {
        if (r.id !== id) return r;
        const msgs = (r.expertChat && r.expertChat.messages) || [];
        return { ...r, updated: nowHHMM(), expertChat: { messages: [...msgs, {
          from: "expert",
          text: "Danke für die Infos! Anhand deiner Beschreibung passt die Variante mit dem langen Hebel. Ich habe dir die korrekte Kartusche herausgesucht und schicke sie dir gleich als Empfehlung. Melde dich, falls noch etwas unklar ist.",
          time: nowHHMM()
        }] } };
      }));
    }, 5200);
  };

  // Start the expert chat from the contact form.
  const handleStartExpertChat = (id, text, photos) => {
    const first = { from: "user", text, photos: photos || [], time: nowHHMM() };
    setRequests((prev) => prev.map((r) => r.id === id ?
    { ...r, updated: nowHHMM(), expertChat: { messages: [first] } } : r));
    setExpertView("chat");
    scheduleExpertReply(id);
  };

  // Send a follow-up message inside the chat.
  const handleSendExpertMessage = (id, text) => {
    setRequests((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      const msgs = (r.expertChat && r.expertChat.messages) || [];
      return { ...r, updated: nowHHMM(), expertChat: { messages: [...msgs, { from: "user", text, photos: [], time: nowHHMM() }] } };
    }));
    scheduleExpertReply(id);
  };

  const handleAttachExpertPhoto = (id, dataUrl) => {
    setRequests((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      const msgs = (r.expertChat && r.expertChat.messages) || [];
      return { ...r, updated: nowHHMM(), expertChat: { messages: [...msgs, { from: "user", text: "", photos: [dataUrl], time: nowHHMM() }] } };
    }));
  };

  const handleAddPhotos = (id, dataList) => {
    setRequests((prev) => prev.map((r) => r.id === id ?
    { ...r, addedPhotos: [...(r.addedPhotos || []), ...dataList], updated: nowHHMM() } : r));
  };

  const handleAddNote = (id, text) => {
    setRequests((prev) => prev.map((r) => r.id === id ?
    { ...r, addenda: [...(r.addenda || []), { text, time: nowHHMM() }], updated: nowHHMM() } : r));
  };

  // Answering a Rückfrage: the question + answer become part of the request
  // history and the status returns to "In Bearbeitung".
  const handleReplyQuery = (id, text, photoList) => {
    setRequests((prev) => prev.map((r) => {
      if (r.id !== id || !r.query) return r;
      return {
        ...r,
        status: "in-bearbeitung",
        query: null,
        unread: false,
        updated: nowHHMM(),
        addenda: [
        ...(r.addenda || []),
        { label: "Rückfrage", text: r.query.text, time: r.query.time },
        ...(text ? [{ label: "Deine Antwort", text, time: nowHHMM() }] : [])],

        addedPhotos: [...(r.addedPhotos || []), ...(photoList || [])]
      };
    }));
    // Signal the host: the answer is on its way to the expert — shortly after,
    // the result notification appears on the Startseite.
    if (onRueckfrageAnswered) setTimeout(() => onRueckfrageAnswered(), 1400);
  };

  const handleSubmitNew = ({ title, photos, desc, kommission }) => {
    const id = newReqId();
    const time = nowHHMM();
    const newReq = {
      id,
      title,
      author: "Max Muster",
      status: "in-bearbeitung",
      updated: time,
      unread: false,
      photoData: photos[0] && photos[0].data || null,
      photos: photos.map((p) => p.data),
      caption: desc || null,
      kommission: kommission || null,
      result: null
    };
    setRequests((prev) => [newReq, ...prev]);
    setActiveId(id);
    setView("request");
    // Signal the host that a request was submitted — drives the Startseite
    // notification (as if the expert answered while the user was away).
    if (onBotReplied) setTimeout(() => onBotReplied(), 1400);
  };

  return (
    <div className="erta">
      {/* ── Left rail ── */}
      <aside className="erta-rail">
        <div className="erta-rail-section">
          <span className="erta-rail-title">Ersatzteilanfragen</span>
        </div>

        <div className="erta-rail-list">
          {requests.length === 0 &&
          <div className="erta-rail-empty">
              <div className="erta-rail-empty-icon">
                <IconMsg size={26} stroke={1.5} />
              </div>
              <div className="erta-rail-empty-head">Noch keine Anfragen</div>
              <div className="erta-rail-empty-body">Lade rechts ein Foto hoch für deine erste Anfrage.</div>
            </div>}
          {requests.map((item) =>
          <ReqListItem
            key={item.id}
            item={item}
            active={item.id === activeId && view === "request"}
            onSelect={handleSelect} />
          )}
        </div>

        <div className="erta-rail-foot">
          <button type="button" className="erta-rail-new-btn" onClick={startNew}>
            <IconEdit size={16} stroke={2} /> Neue Ersatzteilanfrage
          </button>
        </div>
      </aside>

      {/* ── Main column ── */}
      <section className="erta-thread-wrap">
        {view === "new" || !active ?
        <NewAnfrageView onSubmit={handleSubmitNew} initialPhotos={initialPhotos} /> :

        <React.Fragment>
            <header className="erta-thread-head">
              <div className="erta-thread-head-body">
                <EditableTitle
                value={active.title}
                onChange={(v) => handleRename(active.id, v)} />
                <div className="erta-thread-sub">
                  <span className={"erta-status-pill status-" + (active.expertChat ? "experten-chat" : active.status)} style={{ borderRadius: "3px" }}>
                    <span className="dot" /> {active.expertChat ? STATUS_LABEL["experten-chat"] : STATUS_LABEL[active.status]}
                  </span>
                  {active.kommission &&
                  <span className="erta-thread-meta">Kommission: {active.kommission}</span>}
                </div>
              </div>
            </header>

            {(active.status === "beantwortet" || active.status === "abgeschlossen") && expertView === "chat" ?
            <ExpertChatScreen
            req={active}
            typing={typingFor === active.id}
            onBack={() => setExpertView("none")}
            onSend={(t) => handleSendExpertMessage(active.id, t)}
            onAttach={(d) => handleAttachExpertPhoto(active.id, d)} /> :
            (active.status === "beantwortet" || active.status === "abgeschlossen") && expertView === "form" ?
            <ExpertContactView
            req={active}
            onCancel={() => setExpertView("none")}
            onStart={(t, p) => handleStartExpertChat(active.id, t, p)} /> :
            active.status === "beantwortet" || active.status === "abgeschlossen" ?
            <ResultView
            req={active}
            onExpert={() => setExpertView(active.expertChat ? "chat" : "form")}
            onClose={(rating, comment) => handleCloseRequest(active.id, rating, comment)} /> :
            active.status === "nicht-gelistet" && active.answer ?
            <UnlistedView req={active} /> :
            active.status === "rueckfrage" && active.query ?
            <RueckfrageView
            req={active}
            onReply={(text, photoList) => handleReplyQuery(active.id, text, photoList)} /> :
            <PendingView
            req={active}
            onAddPhotos={(list) => handleAddPhotos(active.id, list)}
            onAddNote={(text) => handleAddNote(active.id, text)} />}
          </React.Fragment>
        }
      </section>
    </div>);

};

Object.assign(window, { ScreenErsatzteilanfragen });
