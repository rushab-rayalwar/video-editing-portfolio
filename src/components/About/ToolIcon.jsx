// Small line icons for the tool groups in the About section.
// They inherit the text colour, so they stay grey with their label.

const paths = {
  // AI video: a four-point sparkle
  sparkle: <path d="M8 1.8 9.4 6.6 14.2 8 9.4 9.4 8 14.2 6.6 9.4 1.8 8 6.6 6.6Z" strokeLinejoin="round" />,

  // Script & prompting: a pen
  pen: (
    <>
      <path d="M11.2 2.3 13.7 4.8 5.8 12.7 2.6 13.4 3.3 10.2Z" strokeLinejoin="round" />
      <path d="M9.8 3.7 12.3 6.2" />
    </>
  ),

  // Edit: scissors, for the cut
  scissors: (
    <>
      <circle cx="4.3" cy="4.6" r="2" />
      <circle cx="4.3" cy="11.4" r="2" />
      <path d="M6 5.7 13.6 11.9M6 10.3 13.6 4.1" />
    </>
  ),

  // Stills: a camera aperture
  aperture: (
    <>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 5.4 14.13 8.94M10.25 6.7v7.08M10.25 9.3 4.12 12.84M8 10.6 1.87 7.06M5.75 9.3V2.22M5.75 6.7l6.13-3.54" />
    </>
  ),

  // Sound: a waveform
  waveform: <path d="M2 6.5v3M4.4 4.5v7M6.8 2.5v11M9.2 5v6M11.6 3.5v9M14 6.5v3" />,
}

function ToolIcon({ name, className }) {
  if (!paths[name]) return null
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export default ToolIcon
