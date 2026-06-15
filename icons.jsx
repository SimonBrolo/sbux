// Feather-icon inline React components for the ETS prototype.

const Icon = ({ children, size = 20, stroke = 2, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);

const IconHome     = (p) => <Icon {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>;
const IconSearch   = (p) => <Icon {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon>;
const IconPercent  = (p) => <Icon {...p}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></Icon>;
const IconCart     = (p) => <Icon {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></Icon>;
const IconTruck    = (p) => <Icon {...p}><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Icon>;
const IconBolt     = (p) => <Icon {...p}><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const IconMapPin   = (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
const IconDownload = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const IconUsers    = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const IconLogOut   = (p) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Icon>;
const IconUser     = (p) => <Icon {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const IconChevR    = (p) => <Icon {...p}><polyline points="9 18 15 12 9 6"/></Icon>;
const IconChevL    = (p) => <Icon {...p}><polyline points="15 18 9 12 15 6"/></Icon>;
const IconChevD    = (p) => <Icon {...p}><polyline points="6 9 12 15 18 9"/></Icon>;
const IconChevU    = (p) => <Icon {...p}><polyline points="18 15 12 9 6 15"/></Icon>;
const IconMenu     = (p) => <Icon {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>;
const IconX        = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const IconCamera   = (p) => <Icon {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></Icon>;
const IconUpload   = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>;
const IconType     = (p) => <Icon {...p}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></Icon>;
const IconImage    = (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></Icon>;
const IconFile     = (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>;
const IconPlus     = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
const IconTrash    = (p) => <Icon {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></Icon>;
const IconClock    = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const IconCheck    = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const IconCheckCircle = (p) => <Icon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const IconAlert    = (p) => <Icon {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>;
const IconInfo     = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></Icon>;
const IconShield   = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>;
const IconMsg      = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const IconHeadset  = (p) => <Icon {...p}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></Icon>;
const IconStar     = (p) => <Icon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>;
const IconHash     = (p) => <Icon {...p}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></Icon>;
const IconHistory  = (p) => <Icon {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/><polyline points="12 7 12 12 15 14"/></Icon>;
const IconFilter   = (p) => <Icon {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const IconArrow    = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
const IconSparkle  = (p) => <Icon {...p}><path d="M12 3 L13.5 9.5 L20 11 L13.5 12.5 L12 19 L10.5 12.5 L4 11 L10.5 9.5 Z"/></Icon>;
const IconRuler    = (p) => <Icon {...p}><path d="M3 17 L17 3 L21 7 L7 21 Z"/><path d="M7 17 L9 15 M10 14 L12 12 M13 11 L15 9 M16 8 L18 6"/></Icon>;
const IconRefresh  = (p) => <Icon {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></Icon>;
const IconEye      = (p) => <Icon {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>;
const IconExternal = (p) => <Icon {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
const IconBell     = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const IconLibrary  = (p) => <Icon {...p}><line x1="4" y1="3" x2="4" y2="21"/><line x1="9" y1="3" x2="9" y2="21"/><rect x="12" y="5" width="3" height="16"/><rect x="17" y="3" width="3" height="18"/></Icon>;
const IconTree     = (p) => <Icon {...p}><path d="M12 22V11"/><path d="M5 15a4 4 0 0 1-4-4 5 5 0 0 1 8-4 6 6 0 1 1 11 4 4 4 0 0 1-4 4z"/><path d="M5 15h14"/></Icon>;
const IconCatalog  = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="20"/></Icon>;
const IconBook     = (p) => <Icon {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
const IconSliders  = (p) => <Icon {...p}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></Icon>;

// G.U.T. BEEM-style Ersatzteilfinder icon — a screen frame with a spanner inside.
const IconSpareParts = ({ size = 18, stroke = 1.5, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...rest}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
// Pipe / Rohr — line-stroke icon matching the truck/cart neighbours in the
// header. A clean C-shaped pipe body opening to the right, with a small
// stub pipe inside the opening to hint at a T-fitting / pipe junction.
const IconPipe = (p) => (
  <Icon {...p}>
    <path d="M17 7.5 A6.5 6.5 0 1 0 17 16.5" />
    <path d="M14 11 H17 V14" />
  </Icon>
);

// GC Ersatzteilservice brand mark — a chunky dark C-bend pipe inside a soft
// lavender rounded square, with a small purple terminal cap. Self-coloured
// (does not inherit currentColor) so the brand colours stay consistent.
const IconEtsLogo = ({ size = 28, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...rest}>
    <rect x="0" y="0" width="24" height="24" rx="4.5" fill="#efeaf6" />
    <path
      d="M17 7.5 H10.5 a4 4 0 0 0 0 8 H17"
      fill="none"
      stroke="#2c2933"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round" />
    <rect x="16" y="13.5" width="3.2" height="3.2" rx="0.4" fill="#6b3fbd" />
  </svg>
);
const IconEdit = (p) => (
  <Icon {...p}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </Icon>
);
const IconPaperclip = (p) => <Icon {...p}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></Icon>;
const IconPrinter  = (p) => <Icon {...p}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></Icon>;
const IconCloudDownload = (p) => <Icon {...p}><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/></Icon>;
const IconClipboard = (p) => <Icon {...p}><path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/></Icon>;
const IconPaperclipImage = (p) => (
  <Icon {...p}>
    {/* Image frame */}
    <rect x="2" y="3" width="15" height="15" rx="2" />
    {/* Sun + mountain inside the frame */}
    <circle cx="7" cy="8.5" r="1.4" />
    <path d="M2.5 16.5l4.5-5 3 3.5 2-2.5 4.5 5" />
    {/* Plus-in-circle badge (no fill so the frame edge can show through cleanly) */}
    <circle cx="18.5" cy="18.5" r="3.5" />
    <line x1="18.5" y1="16.7" x2="18.5" y2="20.3" />
    <line x1="16.7" y1="18.5" x2="20.3" y2="18.5" />
  </Icon>
);

Object.assign(window, {
  Icon, IconHome, IconSearch, IconPercent, IconCart, IconTruck, IconBolt, IconMapPin,
  IconDownload, IconUsers, IconLogOut, IconUser, IconChevR, IconChevL, IconChevD, IconChevU,
  IconMenu, IconX, IconCamera, IconUpload, IconType, IconImage, IconFile, IconPlus,
  IconTrash, IconClock, IconCheck, IconCheckCircle, IconAlert, IconInfo, IconShield,
  IconMsg, IconHeadset, IconStar, IconHash, IconHistory, IconFilter, IconArrow, IconSparkle,
  IconRuler, IconRefresh, IconEye, IconExternal, IconBell, IconPipe, IconSpareParts,
  IconLibrary, IconTree, IconCatalog, IconBook, IconSliders, IconEdit, IconPaperclip, IconPaperclipImage, IconEtsLogo,
  IconPrinter, IconCloudDownload, IconClipboard,
});
