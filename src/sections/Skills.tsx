import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  Code2, 
  BarChart3, 
  Network,
  FileText,
  Microscope,
  GitBranch,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: "Machine Learning & AI",
    icon: <Brain className="w-6 h-6" />,
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn", "Neural Networks", "Deep Learning", "CNN", "RNN"],
    color: "#00F0FF"
  },
  {
    name: "Programming & Data",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["Python", "R", "SQL", "MATLAB", "Pandas", "NumPy", "SciPy"],
    color: "#7000FF"
  },
  {
    name: "Data Analysis & Viz",
    icon: <BarChart3 className="w-6 h-6" />,
    skills: ["Exploratory Data Analysis", "Statistical Analysis", "Tableau", "Matplotlib", "Seaborn", "Plotly"],
    color: "#00F0FF"
  },
  {
    name: "NLP & Text Analysis",
    icon: <FileText className="w-6 h-6" />,
    skills: ["NLTK", "spaCy", "Text Cleaning", "Sentiment Analysis", "Feature Extraction", "TF-IDF"],
    color: "#7000FF"
  },
  {
    name: "MLOps & Tools",
    icon: <GitBranch className="w-6 h-6" />,
    skills: ["Git", "GitHub", "Jupyter", "Google Colab", "Docker", "MLflow"],
    color: "#00F0FF"
  },
  {
    name: "Research Methods",
    icon: <Microscope className="w-6 h-6" />,
    skills: ["A/B Testing", "Hypothesis Testing", "Signal Detection Theory", "Experimental Design", "fMRI Analysis"],
    color: "#7000FF"
  }
];

const stats = [
  { value: "400+", label: "Projects Completed", icon: <Layers className="w-5 h-5" /> },
  { value: "21", label: "GitHub Repositories", icon: <Terminal className="w-5 h-5" /> },
  { value: "5+", label: "ML Frameworks", icon: <Network className="w-5 h-5" /> },
  { value: "4", label: "Programming Languages", icon: <Cpu className="w-5 h-5" /> }
];

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7000FF]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-[#7000FF] text-sm tracking-widest uppercase mb-2 block">
            Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#E0E0E0] mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-[#E0E0E0]/60 max-w-2xl mx-auto">
            A comprehensive toolkit built through 400+ projects, spanning machine learning, 
            data analysis, and scientific computing.
          </p>
        </div>

        {/* Stats Bar */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item glass rounded-xl p-6 text-center hover:border-[#00F0FF]/30 transition-all duration-300"
            >
              <div className="flex justify-center mb-2 text-[#00F0FF]">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#E0E0E0]/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card glass rounded-xl p-6 hover:border-[#00F0FF]/30 transition-all duration-300 group"
              style={{ 
                borderColor: `${category.color}20`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-2 rounded-lg"
                  style={{ 
                    background: `${category.color}15`,
                    color: category.color 
                  }}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#E0E0E0] group-hover:text-[#00F0FF] transition-colors">
                  {category.name}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 text-sm rounded-full bg-[#0A0A0A] text-[#E0E0E0]/70 border border-[#222] hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Connection Lines */}
        <svg className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none opacity-20" style={{ zIndex: -1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7000FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}

export default Skills;
