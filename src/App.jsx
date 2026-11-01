// import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import PlaceholderSection from './components/PlaceholderSection.jsx'
import Timeline from './components/Timeline.jsx'
import { sections } from './data/sections.js'
import './App.css'

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="page">
        <Hero />
        {sections.slice(1).map((section, i) => (
          <PlaceholderSection key={section.id} id={section.id} label={section.label} index={i + 2} />
        ))}
      </main>
      <Timeline sections={sections} />
    </>
  )
}

export default App
