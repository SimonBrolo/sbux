// App root — composes chrome + Produktsuche/Ersatzteilsuche/Experten flow + tweaks panel.

// Screens organised into demo phases so the Jumper has clear flow groups.
// Each entry's `phase` becomes a section heading; the order inside a phase
// reflects the linear demo path.
const SCREENS = [
{ phase: "1 · Anfrage stellen", id: "home", num: "1.1", name: "Startseite", ctx: "Mehrwertpaket Klima & Lüftung" },
{ phase: "1 · Anfrage stellen", id: "ersatzteilsuche", num: "1.2", name: "Ersatzteilsuche", ctx: "Hersteller-Auswahl + Experten-CTA" },
{ phase: "1 · Anfrage stellen", id: "ersatzteilanfragen", num: "1.3", name: "Ersatzteilanfragen", ctx: "Neue Anfrage (leerer Zustand)" },
{ phase: "1 · Anfrage stellen", id: "ersatzteilanfragen-chat", num: "1.4", name: "Anfrage in Bearbeitung", ctx: "Abgesendete Anfrage · Foto wird analysiert" },
{ phase: "2 · Rückfrage vom Experten", id: "home-notification-rueckfrage", num: "2.1", name: "Benachrichtigung Rückfrage", ctx: "Experte braucht weitere Infos" },
{ phase: "2 · Rückfrage vom Experten", id: "ersatzteilanfragen-rueckfrage", num: "2.2", name: "Rückfrage beantworten", ctx: "Status „Rückfrage“ + Antwortformular" },
{ phase: "3 · Ergebnis erhalten", id: "home-notification", num: "3.1", name: "Benachrichtigung Ergebnis", ctx: "Badges in der Sidebar nach Rückkehr" },
{ phase: "3 · Ergebnis erhalten", id: "ersatzteilanfragen-expert", num: "3.2", name: "Ergebnis der Anfrage", ctx: "Haupttreffer + Treffer-% + Ersatzteilliste" },
{ phase: "4 · Artikel nicht gelistet", id: "ersatzteilanfragen-unlisted", num: "4.1", name: "Artikel nicht gelistet", ctx: "Innendienst ist informiert und meldet sich" },
{ phase: "5 · Experten-Chat", id: "ersatzteilanfragen-experten-chat", num: "5.1", name: "Chat mit dem Experten", ctx: "Persönlicher Chat · Antwort kommt per E-Mail" }];


const Jumper = ({ current, onJump }) => {
  // Start collapsed — by default just a small pill in the bottom-right.
  // Click to expand the full screen list.
  const [open, setOpen] = React.useState(false);
  // Group screens by phase, preserving order.
  const groups = [];
  SCREENS.forEach((s) => {
    const last = groups[groups.length - 1];
    if (last && last.phase === s.phase) last.items.push(s);else
    groups.push({ phase: s.phase, items: [s] });
  });
  const activeMeta = SCREENS.find((s) => s.id === current);
  return (
    <div className={"jumper" + (open ? " is-open" : " is-collapsed")} data-screen-label={null}>
      <button
        type="button"
        className="title"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}>
        <span>Prototyp · Screens</span>
        <span className="meta">{open ? "▾" : "▴"}</span>
      </button>
      {open &&
      <div className="jumper-scroll">
          {groups.map((g, gi) =>
        <div className="jumper-group" key={gi}>
              <div className="jumper-phase">{g.phase}</div>
              {g.items.map((s) =>
          <button
            key={s.id}
            className={"row" + (s.id === current ? " active" : "")}
            onClick={() => onJump(s.id)}>
                  <span className="num">{s.num}</span>
                  <span className="name">{s.name}</span>
                  <span className="ctx">{s.ctx}</span>
                </button>
          )}
            </div>
        )}
        </div>
      }
    </div>);

};

// Promo loudness tweak — the only remaining axis that meaningfully reshapes
// the design system across the prototype.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "promo": "full"
} /*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [screen, _setScreen] = React.useState(() => {
    const h = (typeof window !== "undefined" && window.location.hash || "").replace("#", "");
    return SCREENS.find((s) => s.id === h) ? h : "home";
  });
  const setScreen = (s) => {
    _setScreen(s);
    if (typeof window !== "undefined") window.location.hash = s;
    setNotifOpen(false);
    // Clear any pending dropped photos once we leave the Anfrage screen.
    if (s !== "ersatzteilanfragen") setDroppedPhotos(null);
  };

  // Bell-dropdown state. Closed by default — opens only when the bell is
  // clicked. The home-notification screen surfaces the unread state via the
  // bell badge + sidebar dot; users can click the bell to inspect the list.
  const [notifOpen, setNotifOpen] = React.useState(false);

  // Demo state: becomes true once the Ersatzteilbot has acknowledged a freshly
  // submitted request. Drives the sidebar badges + notification view on the
  // Startseite, simulating the user returning later to find an expert reply.
  const [unreadExpertReply, setUnreadExpertReply] = React.useState(false);

  // Demo state: true once the user answered the expert's Rückfrage — the next
  // Startseite visit then shows the Ergebnis notification (3.1) and the
  // Ersatzteilanfrage entry points lead to the result screen (3.2).
  const [unreadResult, setUnreadResult] = React.useState(false);

  // Drag-and-drop on the Startseite: dropping an image opens the
  // Ersatzteilanfrage dialog with that photo prefilled.
  const [droppedPhotos, setDroppedPhotos] = React.useState(null);
  const [dropActive, setDropActive] = React.useState(false);
  const dragDepth = React.useRef(0);

  const isHome = screen === "home" || screen === "home-notification" || screen === "home-notification-rueckfrage";

  const dndHasFiles = (e) => {
    const dt = e.dataTransfer;
    if (!dt) return false;
    if (dt.types) {for (let i = 0; i < dt.types.length; i++) {if (dt.types[i] === "Files") return true;}}
    return false;
  };
  const onHomeDragEnter = (e) => {
    if (!isHome || !dndHasFiles(e)) return;
    e.preventDefault();
    dragDepth.current += 1;
    setDropActive(true);
  };
  const onHomeDragOver = (e) => {
    if (!isHome || !dndHasFiles(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const onHomeDragLeave = (e) => {
    if (!isHome) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDropActive(false);
  };
  const onHomeDrop = (e) => {
    if (!isHome || !dndHasFiles(e)) return;
    e.preventDefault();
    dragDepth.current = 0;
    setDropActive(false);
    const files = [...(e.dataTransfer.files || [])].filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;
    let pending = files.length;
    const collected = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        collected.push({ data: ev.target.result, name: file.name });
        pending -= 1;
        if (pending === 0) {
          setDroppedPhotos(collected);
          setScreen("ersatzteilanfragen");
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const screenMeta = SCREENS.find((s) => s.id === screen) || SCREENS[0];

  let body;
  switch (screen) {
    case "home":
      body = <ScreenStartseite promoMode={t.promo} />;
      break;
    case "produktsuche":
      body = <ScreenProduktsuche onErsatzteilsuche={() => setScreen("ersatzteilsuche")} />;
      break;
    case "ersatzteilsuche":
      body = <ScreenErsatzteilsuche onPhotoSearch={() => setScreen("ersatzteilanfragen")} />;
      break;
    case "ersatzteilanfragen":
      body = <ScreenErsatzteilanfragen key="erta-empty" onBack={() => setScreen("ersatzteilsuche")} onBotReplied={() => setUnreadExpertReply(true)} initialPhotos={droppedPhotos} />;
      break;
    case "ersatzteilanfragen-chat":
      body = <ScreenErsatzteilanfragen key="erta-chat" seed={true} onBack={() => setScreen("ersatzteilsuche")} onBotReplied={() => setUnreadExpertReply(true)} />;
      break;
    case "ersatzteilanfragen-expert":
      body = <ScreenErsatzteilanfragen key="erta-expert" seedExpert={true} onBack={() => setScreen("ersatzteilsuche")} />;
      break;
    case "home-notification":
      body = <ScreenStartseite promoMode={t.promo} notification={true} onOpenAnfrage={() => setScreen("ersatzteilanfragen-expert")} />;
      break;
    case "home-notification-rueckfrage":
      body = <ScreenStartseite promoMode={t.promo} notification={true} notificationVariant="rueckfrage" onOpenAnfrage={() => setScreen("ersatzteilanfragen-rueckfrage")} />;
      break;
    case "ersatzteilanfragen-rueckfrage":
      body = <ScreenErsatzteilanfragen key="erta-rueckfrage" seedRueckfrage={true} onBack={() => setScreen("ersatzteilsuche")} onRueckfrageAnswered={() => setUnreadResult(true)} />;
      break;
    case "ersatzteilanfragen-unlisted":
      body = <ScreenErsatzteilanfragen key="erta-unlisted" seedUnlisted={true} onBack={() => setScreen("ersatzteilsuche")} />;
      break;
    case "ersatzteilanfragen-experten-chat":
      body = <ScreenErsatzteilanfragen key="erta-expertenchat" seedExpertChat={true} onBack={() => setScreen("ersatzteilsuche")} />;
      break;
    default:
      body = <ScreenStartseite promoMode={t.promo} />;
  }

  const onHome = () => setScreen(unreadResult ? "home-notification" : unreadExpertReply ? "home-notification-rueckfrage" : "home");

  const crumbs =
  screen === "home" || screen === "home-notification" || screen === "home-notification-rueckfrage" ? ["Home"] :
  screen === "produktsuche" ? ["Home", "Produktsuche"] :
  screen === "ersatzteilsuche" ? ["Home", "Produktsuche", "Ersatzteilsuche"] :
  screen === "ersatzteilanfragen" ? ["Home", "Produktsuche", "Ersatzteilanfrage"] :
  screen === "ersatzteilanfragen-chat" ? ["Home", "Produktsuche", "Ersatzteilanfrage"] :
  screen === "ersatzteilanfragen-expert" ? ["Home", "Produktsuche", "Ersatzteilanfrage"] :
  screen === "ersatzteilanfragen-rueckfrage" ? ["Home", "Produktsuche", "Ersatzteilanfrage"] :
  screen === "ersatzteilanfragen-unlisted" ? ["Home", "Produktsuche", "Ersatzteilanfrage"] :
  screen === "ersatzteilanfragen-experten-chat" ? ["Home", "Produktsuche", "Ersatzteilanfrage"] :
  ["Home"];

  // Sidebar nav handler.
  const onNavClick = (id) => {
    if (id === "start") setScreen(unreadResult ? "home-notification" : unreadExpertReply ? "home-notification-rueckfrage" : "home");else
    if (id === "search") setScreen("produktsuche");else
    if (id === "ets-service") {
      // Unread result (after the Rückfrage was answered) wins; otherwise a
      // fresh submit leads to the expert's Rückfrage (2.x).
      if (unreadResult || screen === "home-notification") {
        setUnreadResult(false);
        setUnreadExpertReply(false);
        setScreen("ersatzteilanfragen-expert");
      } else if (screen === "home-notification-rueckfrage" || unreadExpertReply) {
        setUnreadExpertReply(false);
        setScreen("ersatzteilanfragen-rueckfrage");
      } else {
        setScreen("ersatzteilanfragen");
      }
    } else
    if (id === "ersatzteilsuche") setScreen("ersatzteilsuche");
  };

  const activeNav =
  screen === "home" || screen === "home-notification" || screen === "home-notification-rueckfrage" ? "start" :
  screen === "produktsuche" ? "search" :
  screen === "ersatzteilsuche" ? "ersatzteilsuche" :
  screen === "ersatzteilanfragen" || screen === "ersatzteilanfragen-chat" || screen === "ersatzteilanfragen-expert" || screen === "ersatzteilanfragen-rueckfrage" || screen === "ersatzteilanfragen-unlisted" || screen === "ersatzteilanfragen-experten-chat" ? "ets-service" :
  null;

  return (
    <div
      className="shell"
      data-screen-label={screenMeta.name}
      onDragEnter={onHomeDragEnter}
      onDragOver={onHomeDragOver}
      onDragLeave={onHomeDragLeave}
      onDrop={onHomeDrop}>
      <TopBar />
      <Header
        onHome={onHome}
        onEtsClick={() => setScreen("ersatzteilsuche")}
        hasNotification={(screen === "home-notification" || screen === "home-notification-rueckfrage" || unreadExpertReply || unreadResult) && !(activeNav === "ets-service")}
        notificationsOpen={notifOpen}
        onToggleNotifications={(v) => setNotifOpen((cur) => typeof v === "boolean" ? v : !cur)}
        onOpenAnfrage={() => setScreen(unreadResult || screen === "home-notification" ? "ersatzteilanfragen-expert" : screen === "home-notification-rueckfrage" || unreadExpertReply ? "ersatzteilanfragen-rueckfrage" : "ersatzteilanfragen-expert")}
        onOpenEts={() => onNavClick("ets-service")} />
      <AccentStripe />
      <Crumbs items={crumbs} />
      <div className={"shell-body" + ((screen === "home" || screen === "home-notification" || screen === "home-notification-rueckfrage") ? " has-rail" : "")} style={{ padding: "0px 16px 80px" }}>
        <Sidebar activeNav={activeNav} onNavClick={onNavClick} etsCount={(screen === "home-notification" || screen === "home-notification-rueckfrage" || (screen === "home" && (unreadExpertReply || unreadResult))) ? 1 : 0} />
        <main className={"main" + ((screen === "home" || screen === "home-notification" || screen === "home-notification-rueckfrage") ? " main-home" : "")}>
          {body}
        </main>
        {(screen === "home" || screen === "home-notification" || screen === "home-notification-rueckfrage") && <AdRail />}
      </div>
      <Jumper current={screen} onJump={setScreen} />

      {isHome && dropActive &&
      <div className="home-drop-overlay">
        <div className="home-drop-card">
          <div className="home-drop-icon"><IconCamera size={40} stroke={1.6} /></div>
          <div className="home-drop-title">Foto ablegen für Ersatzteilanfrage</div>
          <div className="home-drop-sub">Lass das Bild los und wir öffnen die Ersatzteilanfrage mit deinem Foto.</div>
        </div>
      </div>}

      <TweaksPanel title="Prototyp Tweaks">
        <TweakSection label="Mehrwertpaket-Promo · Startseite" />
        <TweakRadio
          label="Variante"
          value={t.promo}
          options={[
          { value: "full", label: "Voll" },
          { value: "compact", label: "Kompakt" },
          { value: "off", label: "Aus" }]
          }
          onChange={(v) => setTweak("promo", v)} />
      </TweaksPanel>
    </div>);

};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);