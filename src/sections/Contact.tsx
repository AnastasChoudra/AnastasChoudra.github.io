import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Mail, MapPin, ExternalLink, Code2, Brain, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7000FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Main Content */}
        <div ref={contentRef} className="text-center mb-12">
          <span className="text-[#00F0FF] text-sm tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#E0E0E0] mb-6">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-[#E0E0E0]/60 max-w-2xl mx-auto text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your vision. Let's turn data into insights.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="mailto:tasoschoudras@gmail.com"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]/80 rounded-full text-[#050505] font-semibold hover:shadow-lg hover:shadow-[#00F0FF]/30 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </a>
          <a
            href="https://github.com/AnastasChoudra"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 border border-[#222] rounded-full text-[#E0E0E0] hover:border-[#00F0FF] hover:text-[#00F0FF] hover:glow-cyan transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass rounded-xl p-6 text-center hover:border-[#00F0FF]/30 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <h3 className="text-[#E0E0E0] font-semibold mb-1">Location</h3>
            <p className="text-[#E0E0E0]/60 text-sm">Reading, UK</p>
          </div>
          
          <div className="glass rounded-xl p-6 text-center hover:border-[#00F0FF]/30 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#7000FF]" />
            </div>
            <h3 className="text-[#E0E0E0] font-semibold mb-1">Projects</h3>
            <p className="text-[#E0E0E0]/60 text-sm">400+ Completed</p>
          </div>
          
          <div className="glass rounded-xl p-6 text-center hover:border-[#00F0FF]/30 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <h3 className="text-[#E0E0E0] font-semibold mb-1">Focus</h3>
            <p className="text-[#E0E0E0]/60 text-sm">ML & Data Science</p>
          </div>
        </div>

        {/* Tech Stack Mini */}
        <div className="glass rounded-xl p-6 mb-12">
          <h3 className="text-center text-[#E0E0E0]/60 text-sm mb-4 tracking-widest uppercase">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Python', 'TensorFlow', 'PyTorch', 'SQL', 'R', 'MATLAB', 'Pandas', 'Scikit-Learn', 'NLTK', 'Git'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm rounded-full bg-[#0A0A0A] text-[#E0E0E0]/70 border border-[#222] hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-[#222]">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a
              href="https://github.com/AnastasChoudra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E0E0E0]/60 hover:text-[#00F0FF] transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:tasoschoudras@gmail.com"
              className="text-[#E0E0E0]/60 hover:text-[#00F0FF] transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-[#E0E0E0]/40 text-sm">
            © {new Date().getFullYear()} Anastas Choudra. Built with React, Three.js & passion.
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-[#E0E0E0]/30 text-xs">
            <Database className="w-3 h-3" />
            <span>Data-driven development</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
