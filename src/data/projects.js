// Your work, grouped by category. The categories appear on the page in this order,
// and their ids match the timeline clips in sections.js.
//
// To add a Vimeo video to a project, fill in its `vimeo` field with the link from
// the video's own page, for example 'https://vimeo.com/123456789/abc123def'.
// Until then the card shows a "Coming soon" frame.
//
// Project fields:
//   title        what the card is called
//   meta         one short line: format and what you did
//   orientation  'portrait' (9:16 reels) or 'landscape' (16:9)
//   vimeo        Vimeo link, or '' for now
//   tag          optional small label, e.g. 'In progress' or 'Mature themes'

export const categories = [
  {
    id: 'ai-films',
    title: 'AI Films',
    description: 'Ads written, directed and edited entirely with generative AI.',
    projects: [
      { title: 'AI Ad 01', meta: 'Reel · Direction, edit', orientation: 'portrait', vimeo: '' },
      { title: 'AI Ad 02', meta: 'Reel · Direction, edit', orientation: 'portrait', vimeo: '' },
      { title: 'AI Ad 03', meta: 'Reel · Direction, edit', orientation: 'portrait', vimeo: '' },
      {
        title: 'Untitled AI Film',
        meta: 'Ad film · Direction, edit, continuity',
        orientation: 'landscape',
        vimeo: '',
        tag: 'In progress',
      },
    ],
  },
  {
    id: 'ads',
    title: 'Ads & Brand Films',
    description: 'Short, sharp ads for brands and the people behind them.',
    projects: [
      { title: "Rohan's Guitar Lessons", meta: 'Reel · Edit, grade', orientation: 'portrait', vimeo: '' },
      { title: 'Career Domain', meta: 'Reel · Edit, grade, motion graphics', orientation: 'portrait', vimeo: '' },
      { title: 'Motion Graphics Ad 01', meta: 'Reel · Motion graphics', orientation: 'portrait', vimeo: '' },
      { title: 'Motion Graphics Ad 02', meta: 'Reel · Motion graphics', orientation: 'portrait', vimeo: '' },
    ],
  },
  {
    id: 'long-form',
    title: 'YouTube & Long-form',
    description: 'Long-form edits that keep people watching to the end.',
    projects: [
      { title: 'Workout Summary', meta: 'YouTube · Edit, pacing', orientation: 'landscape', vimeo: '' },
      {
        title: "Amsterdam's Red Light District",
        meta: 'Travel vlog · Edit, storytelling',
        orientation: 'landscape',
        vimeo: '',
        tag: 'Mature themes',
      },
    ],
  },
  {
    id: 'stories',
    title: 'Stories & Personal Work',
    description: 'Things I made because I wanted to.',
    projects: [
      { title: 'Yellow (Cover)', meta: 'Music · Script, edit, mix', orientation: 'portrait', vimeo: '' },
      {
        title: "A Day in Rushab's Life",
        meta: 'Shot and edited in a single day',
        orientation: 'portrait',
        vimeo: '',
      },
      { title: 'Ramayan Movie Review', meta: 'On camera · Edit, grade', orientation: 'portrait', vimeo: '' },
    ],
  },
]
