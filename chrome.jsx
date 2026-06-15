// GC ONLINE PLUS chrome — top bar, header, sidebar, ad rail.

const TopBar = () =>
<div className="topbar">
    <span className="firma">Cordes &amp; Graefe Bremen KG &mdash; Ihr Fachgroßhändler für Haustechnik</span>
    <span className="spacer" />
    <span className="lang">
      DE
      <IconChevD size={12} stroke={2} />
    </span>
  </div>;


// GC red "Gruppe" mark — the same logo.png used in O+'s header.
const GcLogoRed = () =>
<div className="logo-img logo-img-red" aria-label="GC">
    <img src={typeof window !== "undefined" && window.__resources && window.__resources.gcLogoRed || "https://www.gconlineplus.de/layouts/GC/images/logo.png"} alt="" />
  </div>;


// GC Gruppe logo — official asset supplied by the user, served locally so it
// renders reliably live, in screenshots and in the offline bundle.
const GcLogoGruppe = () =>
<img
    src="ds/logo-gc-gruppe.svg"
    alt="GC Gruppe"
    className="logo-img logo-img-gruppe" />;

// Notification dropdown anchored to the bell icon. List of recent
// notifications — the unread expert-reply sits at the top.
const NotificationsMenu = ({ onClose, onOpenAnfrage }) => {
  const items = [
  {
    id: "n1",
    unread: true,
    kind: "expert",
    title: "Antwort von Thomas Brinkmann",
    sub: "Anfrage „Wasserhahn Küche\" · ERSU-742183",
    preview: "Hallo Max, anhand deines Fotos habe ich das passende Ersatzteil gefunden …",
    time: "Gerade eben",
    onClick: onOpenAnfrage },

  {
    id: "n2",
    unread: false,
    kind: "delivery",
    title: "Lieferung unterwegs",
    sub: "Auftrag AU-58231 · Voraussichtl. heute, 14:00 – 18:00",
    time: "Heute, 09:12" },

  {
    id: "n3",
    unread: false,
    kind: "offer",
    title: "Mehrwertpaket Klima & Lüftung endet in 19 Tagen",
    sub: "Sonderkonditionen für aktuelle Pakete",
    time: "Gestern" },

  {
    id: "n4",
    unread: false,
    kind: "system",
    title: "Neue Funktion: Ersatzteilanfrage",
    sub: "Schicke Fotos an unsere Ersatzteil-Experten und erhalte das passende Produkt.",
    time: "Vor 3 Tagen" }];


  const iconFor = (kind) => {
    if (kind === "expert") return <IconUser size={18} stroke={2} />;
    if (kind === "delivery") return <IconTruck size={18} stroke={2} />;
    if (kind === "offer") return <IconPercent size={18} stroke={2} />;
    return <IconBell size={18} stroke={2} />;
  };

  return (
    <>
      <div className="notif-scrim" onClick={onClose} />
      <div className="notif-menu" role="menu">
        <div className="notif-arrow" />
        <header className="notif-header">
          <span className="notif-title">Benachrichtigungen</span>
          <button className="notif-mark">Alle als gelesen markieren</button>
        </header>
        <ul className="notif-list">
          {items.map((it) =>
          <li
            key={it.id}
            className={"notif-item" + (it.unread ? " is-unread" : "")}
            onClick={() => {
              if (it.onClick) {
                onClose && onClose();
                it.onClick();
              }
            }}
            role="menuitem">

              <span className={"notif-icon notif-icon-" + it.kind}>
                {iconFor(it.kind)}
              </span>
              <div className="notif-body">
                <div className="notif-row">
                  <span className="notif-name">{it.title}</span>
                  <span className="notif-time">{it.time}</span>
                </div>
                <div className="notif-sub">{it.sub}</div>
                {it.preview && <div className="notif-preview">{it.preview}</div>}
              </div>
              {it.unread && <span className="notif-dot" aria-label="ungelesen" />}
            </li>
          )}
        </ul>
        <footer className="notif-footer">
          <button className="notif-all">Alle Benachrichtigungen anzeigen</button>
        </footer>
      </div>
    </>);

};

const Header = ({ ets, etsRef, onEts, onHome, onEtsClick, overlay, hasNotification, notificationsOpen, onToggleNotifications, onOpenAnfrage, onOpenEts }) =>
<header className="header">
    <div className="header-inner">
      <div className="brand" onClick={onHome}>
        <div className="brand-title">
          <span className="h1">GC</span>
          <span className="h2">ONLINE PLUS</span>
        </div>
        <GcLogoGruppe />
      </div>

      <div className="search">
        <input placeholder="Entdecke unsere neue Suche für 4,7 Mio. Artikel." style={{ borderWidth: "0px" }} />
        <span className="search-ico"><IconSearch size={20} stroke={2} /></span>
      </div>

      <div className="hdr-icons">
        <button
          className={"hdr-item" + (hasNotification ? " has-badge" : "")}
          aria-label="Ersatzteilanfrage"
          onClick={onOpenEts}>
          <span className="hdr-ico ets-pipe ets-finder">
            <IconSpareParts size={22} stroke={1.8} />
            {hasNotification && <span className="ets-pipe-dot" aria-hidden="true" />}
          </span>
          <span className="hdr-label">Ersatzteilanfrage</span>
        </button>

        <button className="hdr-item" aria-label="Vorgänge">
          <span className="hdr-ico"><IconClipboard size={22} stroke={1.8} /></span>
          <span className="hdr-label">Vorgänge</span>
        </button>

        <button className="hdr-item" aria-label="Warenkörbe">
          <span className="hdr-ico"><IconCart size={22} stroke={1.8} /></span>
          <span className="hdr-label">Warenkörbe</span>
        </button>
      </div>
    </div>
  </header>;


const AccentStripe = () => <div className="accent-stripe" />;

const Crumbs = ({ items = [] }) =>
<div className="crumb-row" style={{ padding: "0px 20px", height: "40px" }}>
    {items.map((it, i) =>
  <React.Fragment key={i}>
        {i > 0 && <span className="sep">/</span>}
        <span className={"crumb-item" + (items.length > 1 && i === items.length - 1 ? " active" : "")}>{it}</span>
      </React.Fragment>
  )}
  </div>;


// Left sidebar — user card + nav, mirroring the attached screenshot.
const NAV = [
{ id: "start", label: "Startseite" },
{ id: "intern", label: "Intern" },
{ id: "search", label: "Produktsuche", subnav: [
  { id: "ets-service", label: "Ersatzteilanfrage", badge: "Neu" },
  { id: "ersatzteilsuche", label: "Ersatzteilsuche" },
  { id: "suchbaum", label: "Suchbaum" },
  { id: "katalogsuche", label: "Katalogsuche" },
  { id: "bildpreislisten", label: "Bildpreislisten" },
  { id: "bibliothek", label: "Bibliothek" },
  { id: "konfiguratoren", label: "Konfiguratoren" }]
},
{ id: "offers", label: "Sonderangebote", pct: true },
{ id: "carts", label: "Warenkörbe" },
{ id: "orders", label: "Vorgänge" },
{ id: "quick", label: "Schnellerfassung" },
{ id: "locations", label: "Standorte" },
{ id: "downloads", label: "Download" },
{ id: "more", label: "Mehr…" },
{ id: "admin", label: "Administration" },
{ id: "legal", label: "Rechtliche Hinweise" }];


const Sidebar = ({ activeNav, onNavClick, etsCount = 0 }) => {
  const [open, setOpen] = React.useState(false);

  // If the current active nav is a child of a subnav, keep that parent's
  // submenu open by default so the user can see the navigation context.
  const parentOfActive = React.useMemo(() => {
    for (const it of NAV) {
      if (it.subnav && it.subnav.some((s) => s.id === activeNav)) return it.id;
    }
    return null;
  }, [activeNav]);
  const [submenuOpen, setSubmenuOpen] = React.useState(parentOfActive);

  // Keep the submenu open whenever the active sub item changes to a child
  // of one of the subnav parents.
  React.useEffect(() => {
    if (parentOfActive) setSubmenuOpen(parentOfActive);
  }, [parentOfActive]);

  const handleNavClick = (it) => {
    if (it.subnav) {
      setSubmenuOpen((cur) => cur === it.id ? null : it.id);
      return;
    }
    setSubmenuOpen(null);
    onNavClick && onNavClick(it.id);
  };
  const handleSubClick = (sub) => {
    // Keep the submenu open so the user can see where they are.
    onNavClick && onNavClick(sub.id);
  };

  return (
    <aside className="sidebar">
      <div className="user-card">
        <div className={"acct-row" + (open ? " expanded" : "")} onClick={() => setOpen((o) => !o)}>
          <div className="avatar"><IconUser size={18} stroke={2} /></div>
          <span className="name" style={{ letterSpacing: "0px" }}>max muster</span>
          <span className="chev">{open ? <IconChevU size={16} stroke={2} /> : <IconChevD size={16} stroke={2} />}</span>
        </div>
        {open &&
        <div className="acct-detail">
            <div className="row">
              <span className="full">Max Muster</span>
              <button className="close" onClick={(e) => {e.stopPropagation();setOpen(false);}}>
                <IconX size={12} stroke={2.5} />
              </button>
            </div>
            <span className="sub">Systeminformationen</span>
            <span className="sub">Einstellungen</span>
            <span className="sub">Hilfe</span>
            <button className="logout-btn">Logout</button>
          </div>
        }
      </div>
      <nav className="nav">
        {NAV.map((it) => {
          // While a submenu is open, suppress the active highlight on other
          // top-level items so only the opened parent stays styled.
          const isActive = activeNav === it.id && !submenuOpen;
          const isOpen = submenuOpen === it.id;
          return (
            <div key={it.id} className="nav-item-wrap">
              <div
                className={"nav-item" + (isActive ? " active" : "") + (isOpen ? " is-open" : "")}
                onClick={() => handleNavClick(it)}>
                <span style={{ letterSpacing: "0px", fontWeight: "500" }}>{it.label.toUpperCase()}</span>
                {it.pct &&
                <span className="pct-badge" aria-hidden="true">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7 1.04004C15.9467 1.04004 20.2 5.29333 20.2 10.54C20.2 15.7867 15.9467 20.04 10.7 20.04C5.45325 20.04 1.19995 15.7867 1.19995 10.54C1.19995 5.29333 5.45325 1.04004 10.7 1.04004Z" fill="#F8C8BA" />
                      <path d="M10.7 1.04004C15.9467 1.04004 20.2 5.29333 20.2 10.54C20.2 15.7867 15.9467 20.04 10.7 20.04C5.45325 20.04 1.19995 15.7867 1.19995 10.54C1.19995 5.29333 5.45325 1.04004 10.7 1.04004Z" stroke="#F08869" />
                      <path d="M14.2 7.04004L7.19995 14.04" stroke="#802B11" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.94995 9.04004C8.64031 9.04004 9.19995 8.48039 9.19995 7.79004C9.19995 7.09968 8.64031 6.54004 7.94995 6.54004C7.2596 6.54004 6.69995 7.09968 6.69995 7.79004C6.69995 8.48039 7.2596 9.04004 7.94995 9.04004Z" stroke="#802B11" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.45 14.54C14.1403 14.54 14.7 13.9804 14.7 13.29C14.7 12.5997 14.1403 12.04 13.45 12.04C12.7596 12.04 12.2 12.5997 12.2 13.29C12.2 13.9804 12.7596 14.54 13.45 14.54Z" stroke="#802B11" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                }
                {etsCount > 0 && it.id === "search" && !isOpen &&
                <span className="nav-count-badge" aria-label={etsCount + " neue Antwort" + (etsCount === 1 ? "" : "en") + " zur Ersatzteilanfrage"}>{etsCount}</span>
                }
                <span className="chev"><IconChevR size={16} stroke={2.5} /></span>
              </div>
              {it.subnav && isOpen &&
              <ul className="nav-sub" role="menu">
                  {it.subnav.map((s) =>
                <li
                  key={s.id}
                  role="menuitem"
                  className={"nav-sub-item" + (activeNav === s.id ? " active" : "")}
                  onClick={() => handleSubClick(s)}>
                      <span style={{ letterSpacing: "0px" }}>{s.label.toUpperCase()}</span>
                      {s.badge && <span className="nav-sub-badge" aria-label={s.badge}>{s.badge}</span>}
                      {etsCount > 0 && s.id === "ets-service" && <span className="nav-sub-count" aria-label={etsCount + " neue Antwort" + (etsCount === 1 ? "" : "en")}>{etsCount}</span>}
                    </li>
                )}
                </ul>
              }
            </div>);
        })}
      </nav>
    </aside>);

};

// Right ad rail — two stacked ad slots, matching the screenshot.
const AdRail = () =>
<aside className="ad-rail">
    <div className="ad-card conel">
      <div className="anz">Anzeige</div>
      <div className="ad-body">
        <div className="brand">
          CONEL
          <span className="small">CONNECTING ELEMENTS</span>
        </div>
        <h3 className="ttl">CONEL CARE<br />SUREFILL EVO</h3>
        <div className="desc">VE-Patrone für Heizungswasser. Vollentsalzungspatrone — jetzt mit metallischer Verschraubung.</div>
        <div className="sticker">Mit<br />Metall-<br />Ver-<br />schraubung</div>
      </div>
    </div>
    <div className="ad-card maxiflex">
      <div className="anz">Anzeige</div>
      <div className="ad-body">
        <div className="brand">MaxiFlex<sup style={{ fontSize: 11 }}>®</sup></div>
        <div className="desc">
          Entdecke höchste Präzision, extreme Atmungsaktivität und absoluten Tragekomfort.
        </div>
      </div>
    </div>
  </aside>;


Object.assign(window, { TopBar, Header, AccentStripe, Crumbs, Sidebar, AdRail });