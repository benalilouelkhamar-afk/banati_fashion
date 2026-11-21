const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const Bag = (p) => (<svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>)
export const MenuIcon = (p) => (<svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>)
export const Close = (p) => (<svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const Search = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>)
export const Insta = (p) => (<svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>)
export const Pin = (p) => (<svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>)
export const Phone = (p) => (<svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>)
export const Clock = (p) => (<svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>)
export const Chevron = (p) => (<svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>)
export const Ruler = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M3 17L17 3l4 4L7 21z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></svg>)
export const WhatsApp = ({ size = 22, ...p }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" {...p}>
    <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.6 14.6 0 0 0 5.6 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.2-.3-.3-.6-.4z" />
  </svg>
)
export const Lock = (p) => (<svg viewBox="0 0 24 24" width="13" height="13" {...base} {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>)
export const Truck = (p) => (<svg viewBox="0 0 24 24" width="26" height="26" {...base} strokeWidth="1.3" {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></svg>)
export const Cash = (p) => (<svg viewBox="0 0 24 24" width="26" height="26" {...base} strokeWidth="1.3" {...p}><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5v5M18 9.5v5" /></svg>)
export const Store = (p) => (<svg viewBox="0 0 24 24" width="26" height="26" {...base} strokeWidth="1.3" {...p}><path d="M4 10v10h16V10" /><path d="M3 10l2-6h14l2 6a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" /><path d="M10 20v-5h4v5" /></svg>)
export const Swap = (p) => (<svg viewBox="0 0 24 24" width="26" height="26" {...base} strokeWidth="1.3" {...p}><path d="M4 8h14l-3-3M20 16H6l3 3" /></svg>)
