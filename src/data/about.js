// Everything the About section says. Edit the text here; the layout follows.

export const about = {
  bio: "I make high-retention reels and motion graphics for brands and creators.",

  // Hidden for now: remove the // from the lines below to show "What I can do for you" again.
  // services: [
  //   'Ad films',
  //   'AI ads',
  //   'Promos & explainers',
  //   'YouTube & long-form edits',
  //   'Sound mixing & sound design',
  // ],

  // Grouped by what each tool is used for.
  // icon: sparkle, pen, scissors, aperture or waveform (drawn in components/About/ToolIcon.jsx)
  tools: [
    { group: 'AI video', icon: 'sparkle', items: ['Kling', 'Google Flow', 'invideo'] },
    { group: 'Script & prompting', icon: 'pen', items: ['Claude', 'ChatGPT', 'Gemini'] },
    { group: 'Edit', icon: 'scissors', items: ['Premiere Pro', 'After Effects'] },
    { group: 'Stills', icon: 'aperture', items: ['Photoshop', 'Lightroom'] },
    { group: 'Sound', icon: 'waveform', items: ['FL Studio'] },
  ],

  // A quiet italic line at the end of the section; '' hides it
  signoff: '',
}
