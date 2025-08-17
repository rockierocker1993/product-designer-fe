// icons.js

export const TABLER_ICONS = {
    DELETE: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3h6v3" />
    </svg>
  `,
    DUPLICATE: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  `,
    ROTATE: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  `,
    RESIZE: `
    <svg aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        >
        <path d="M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4" />
        <path d="M14 14m0 1a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z" />
        <path d="M7 9l4 4" />
        <path d="M8 13h3v-3" />
    </svg>
  `
};

export function renderTablerSvgIcon(svgString, { size = 24, color = "black" } = {}) {
    return svgString
        .replace(/stroke="currentColor"/g, `stroke="${color}"`)
        .replace(/width=".*?"/, `width="${size}"`)
        .replace(/height=".*?"/, `height="${size}"`);
}
