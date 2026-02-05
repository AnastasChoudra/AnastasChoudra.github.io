import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Github, Mail, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function decodeText(element: HTMLElement, finalText: string, duration: number = 1.5) {
  let iteration = 0;
  const totalIterations = finalText.length * 3;
  
  const interval = setInterval(() => {
    element.innerText = finalText
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' ';
        if (index < iteration / 3) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    iteration++;
    
    if (iteration >= totalIterations) {
      clearInterval(interval);
      element.innerText = finalText;
    }
  }, duration * 1000 / totalIterations);
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Text decode animation on load
    const timer = setTimeout(() => {
      setIsLoaded(true);
      if (nameRef.current) {
        decodeText(nameRef.current, 'ANASTAS CHOUDRA', 1.5);
      }
      setTimeout(() => {
        if (roleRef.current) {
          gsap.fromTo(roleRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          );
        }
      }, 800);
      setTimeout(() => {
        if (ctaRef.current) {
          gsap.fromTo(ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          );
        }
        if (socialsRef.current) {
          gsap.fromTo(socialsRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        }
      }, 1200);
    }, 500);

    // Scroll-based fade out
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
      });
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Social Links - Top Right */}
      <div 
        ref={socialsRef}
        className="absolute top-8 right-8 flex gap-4 opacity-0"
      >
        <a 
          href="https://github.com/AnastasChoudra" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-[#222] hover:border-[#00F0FF] hover:glow-cyan transition-all duration-300"
        >
          <Github className="w-5 h-5 text-[#E0E0E0] hover:text-[#00F0FF]" />
        </a>
        <a 
          href="mailto:tasoschoudras@gmail.com"
          className="p-2 rounded-full border border-[#222] hover:border-[#00F0FF] hover:glow-cyan transition-all duration-300"
        >
          <Mail className="w-5 h-5 text-[#E0E0E0] hover:text-[#00F0FF]" />
        </a>
        <a 
          href="https://www.linkedin.com/in/anastaschoudra/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-[#222] hover:border-[#00F0FF] hover:glow-cyan transition-all duration-300"
        >
          <Linkedin className="w-5 h-5 text-[#E0E0E0] hover:text-[#00F0FF]" />
        </a>
      </div>

      {/* Main Content */}
      <div className="text-center z-10">
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            textShadow: '0 0 40px rgba(0, 240, 255, 0.3)'
          }}
        >
          {isLoaded ? '' : 'ANASTAS CHOUDRA'}
        </h1>
        
        <p
          ref={roleRef}
          className="text-lg sm:text-xl md:text-2xl text-[#E0E0E0]/80 tracking-[0.3em] uppercase opacity-0"
        >
          Data Scientist & Neuroscientist
        </p>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-[#00F0FF]/60">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span className="text-sm">400+ Projects Completed</span>
        </div>
      </div>

      {/* CTA Button */}
      <div ref={ctaRef} className="absolute bottom-32 opacity-0">
        <button
          onClick={scrollToProjects}
          className="group px-8 py-3 border border-[#00F0FF]/50 rounded-full text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] hover:glow-cyan transition-all duration-300 flex items-center gap-2"
        >
          Explore My Work
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#E0E0E0]/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00F0FF]/50 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-[#00F0FF]/30 to-transparent" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-[#7000FF]/30 to-transparent" />
    </section>
  );
}

export default Hero;
