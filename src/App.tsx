import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import NeuralBackground from './components/NeuralBackground';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all content loads
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
