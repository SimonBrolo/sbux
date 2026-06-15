// Produktsuche overview — the page the sidebar "Produktsuche" item lands on.
// Mirrors the captured O+ screen: 6 large red-outlined options stacked
// vertically. The first one ("Ersatzteilsuche") is the entry to the ETS flow.

const PRODUKTSUCHE_OPTIONS = [
{ id: "ersatzteilsuche", label: "Ersatzteilsuche", icon: IconLibrary, enabled: true },
{ id: "suchbaum", label: "Suchbaum", icon: IconTree, enabled: false },
{ id: "katalog", label: "Katalogsuche", icon: IconCatalog, enabled: false },
{ id: "bildpreislisten", label: "Bildpreislisten", icon: IconBook, enabled: false },
{ id: "bibliothek", label: "BIBliothek", icon: IconLibrary, enabled: false },
{ id: "konfiguratoren", label: "Konfiguratoren", icon: IconSliders, enabled: false }];


const ScreenProduktsuche = ({ onErsatzteilsuche }) =>
<div className="produktsuche">
    {PRODUKTSUCHE_OPTIONS.map((opt) => {
    const Ic = opt.icon;
    const handleClick = () => {
      if (opt.id === "ersatzteilsuche") onErsatzteilsuche();
    };
    return (
      <button
        key={opt.id}
        className="produktsuche-option"
        onClick={handleClick}
        aria-label={opt.label}>
          <span className="ic"><Ic size={20} stroke={1.8} /></span>
          <span className="label" style={{ letterSpacing: "0px" }}>{opt.label}</span>
          <span className="trailing" />
        </button>);

  })}
  </div>;


Object.assign(window, { ScreenProduktsuche });