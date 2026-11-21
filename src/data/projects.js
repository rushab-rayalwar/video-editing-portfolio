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
      {
        title: 'Weight Loss Without Guidance',
        meta: 'Aiqa · Reel · Direction, edit',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248314092?h=5f19195c20',
      },
      {
        title: 'Scale Sirf Number Batata Hai',
        meta: 'Aiqa · Reel · Direction, edit',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248424351?h=b8dd96406b',
      },
      {
        title: 'Monster Advisor',
        meta: 'Aiqa · Reel · Direction, edit',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248422488?h=075c51be06',
      },
      {
        title: 'Pidilite: Adhesive vs. Water',
        meta: 'Ad film · Direction, edit, continuity',
        orientation: 'landscape',
        vimeo: 'https://player.vimeo.com/video/1248427219?h=1c695930bc',
        tag: 'In progress',
      },
    ],
  },
  {
    id: 'ads',
    title: 'Ads & Brand Films',
    description: 'Short, sharp ads for brands and the people behind them.',
    projects: [
      {
        title: 'Guitar Lessons with Rohan',
        meta: 'Reel · Edit, grade',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248427221?h=9ee2b1afa0',
      },
      {
        title: 'Career Domain',
        meta: 'Reel · Edit, grade, motion graphics',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248715452?h=237fe90564',
      },
      {
        title: 'Unsolicited Advice',
        meta: 'Aiqa · Reel · Motion graphics',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248823342?h=22ec932d39',
      },
      {
        title: 'Obesity Crisis',
        meta: 'Aiqa · Reel · Motion graphics',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248317095?h=6ea19fabde',
      },
    ],
  },
  {
    id: 'long-form',
    title: 'YouTube & Long-form',
    description: 'Long-form edits that keep people watching to the end.',
    projects: [
      {
        title: 'Workout Summary',
        meta: 'YouTube · Edit, pacing',
        orientation: 'landscape',
        vimeo: 'https://player.vimeo.com/video/1248732449?h=2a9c72f2d7',
      },
      {
        title: "Amsterdam's Red Light District",
        meta: 'Travel vlog · Edit, storytelling',
        orientation: 'landscape',
        vimeo: 'https://player.vimeo.com/video/1248427218?h=97a75ee969',
        tag: 'Mature themes',
      },
    ],
  },
  {
    id: 'stories',
    title: 'Stories & Personal Work',
    description: 'Things I made because I wanted to.',
    projects: [
      {
        title: 'Yellow (Guitar Cover)',
        meta: 'Music · Script, edit, mix',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248427220?h=db127832c0',
      },
      {
        title: "A Day in Rushab's Life",
        meta: 'Shot and edited in a single day',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1248720695?h=3ed391d186',
      },
      {
        title: 'Ramayana Movie Review',
        meta: 'On camera · Edit, grade',
        orientation: 'portrait',
        vimeo: 'https://player.vimeo.com/video/1246291735?h=e61286c5d0',
      },
    ],
  },
]
