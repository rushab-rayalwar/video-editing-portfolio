import { useCallback, useState } from 'react'
// import Navbar from './components/Navbar.jsx'
import TopLinks from './components/TopLinks/TopLinks.jsx'
import Hero from './components/Hero.jsx'
import WorkSection from './components/Work/WorkSection.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import VideoModal from './components/VideoModal/VideoModal.jsx'
import Timeline from './components/Timeline.jsx'
import { sections } from './data/sections.js'
import { categories } from './data/projects.js'
import './App.css'

function App() {
  const [playing, setPlaying] = useState(null)
  const closePlayer = useCallback(() => setPlaying(null), [])

  return (
    <>
      {/* <Navbar /> */}
      <TopLinks />
      <main className="page">
        <Hero />

        {categories.map((category, i) => (
          <WorkSection key={category.id} category={category} index={i + 1} onPlay={setPlaying} />
        ))}

        <About index={categories.length + 1} />
        <Contact index={categories.length + 2} />
      </main>

      <Timeline sections={sections} />
      <VideoModal project={playing} onClose={closePlayer} />
    </>
  )
}

export default App
