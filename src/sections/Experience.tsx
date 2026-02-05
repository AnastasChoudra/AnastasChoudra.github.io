import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Microscope, Code, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    type: 'work',
    title: 'Data Scientist',
    organization: '',
    location: '',
    period: 'Nov 2024 - Present',
    description: 'Conducting extensive exploratory data analysis across diverse datasets. Designing and optimizing machine learning models including classical algorithms and neural networks. Applied NLP techniques for text cleaning, feature extraction, and sentiment analysis.',
    achievements: [
      'Completed 400+ hands-on data science projects',
      'Built predictive models for classification and regression tasks',
      'Implemented deep learning solutions with TensorFlow and PyTorch'
    ],
    icon: <Code className="w-5 h-5" />,
    color: '#00F0FF'
  },
  {
    type: 'work',
    title: 'Research Assistant',
    organization: '',
    location: '',
    period: 'Dec 2023 - Aug 2024',
    description: 'Conducted experimental research on "Detection and Perception of Facial Expressions". Coded experimental visual stimuli for oddball tasks using Python. Assisted in fMRI unit operations and data acquisition.',
    achievements: [
      'Automated trial presentation and data recording',
      'Developed specialized software routines for data analysis',
      'Managed participant recruitment and scheduling'
    ],
    icon: <Microscope className="w-5 h-5" />,
    color: '#7000FF'
  },
  {
    type: 'education',
    title: 'MSc in Cognitive Neuroscience',
    organization: '',
    location: '',
    period: 'Sept 2023 - Sept 2024',
    description: 'Dissertation: Signal Detection & Metacognition. Designed and implemented a 3-AFC visual motion discrimination task in MATLAB using Psychtoolbox-3. Applied Signal Detection Theory and meta-d\' modelling.',
    achievements: [
      'Coding Club & Neurohack Team Member',
      'Specialized in BCI & Signal Processing',
      'Advanced statistical analysis with R'
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    color: '#00F0FF'
  },
  {
    type: 'education',
    title: 'BSc in Psychology',
    organization: '',
    location: '',
    period: 'Sept 2021 - July 2023',
    description: 'Dissertation in Linguistics and Colour Perception. Mentor for 1st & 2nd Year Students.',
    achievements: [
      'Mentor for undergraduate students',
      'Research focus on cognitive psychology'
    ],
    icon: <BookOpen className="w-5 h-5" />,
    color: '#7000FF'
  }
];

function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

      // Timeline items animation
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(item,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Progress line animation
      if (progressRef.current) {
        gsap.fromTo(progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 50%',
              scrub: 1
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-widest uppercase mb-2 block">
            Background
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#E0E0E0] mb-4">
            Journey & <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-[#E0E0E0]/60 max-w-2xl mx-auto">
            From cognitive neuroscience research to cutting-edge data science, 
            my path has been driven by curiosity and a passion for uncovering insights.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#222] md:-translate-x-px" />
          
          {/* Progress Line */}
          <div 
            ref={progressRef}
            className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-[#00F0FF] to-[#7000FF] md:-translate-x-px origin-top"
            style={{ height: '100%' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`timeline-item relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                }`}>
                  <div className="glass rounded-xl p-6 hover:border-[#00F0FF]/30 transition-all duration-300 group">
                    {/* Header */}
                    <div className={`flex items-center gap-3 mb-3 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div 
                        className="p-2 rounded-lg"
                        style={{ background: `${exp.color}15`, color: exp.color }}
                      >
                        {exp.icon}
                      </div>
                      <span className="text-sm text-[#00F0FF] font-medium">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#E0E0E0] mb-1 group-hover:text-[#00F0FF] transition-colors">
                      {exp.title}
                    </h3>
                    {(exp.organization || exp.location) && (
                      <p className="text-[#E0E0E0]/60 mb-3">
                        {exp.organization}{exp.organization && exp.location && ' • '}{exp.location}
                      </p>
                    )}
                    <p className="text-[#E0E0E0]/70 text-sm mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      {exp.achievements.map((achievement, achIndex) => (
                        <span
                          key={achIndex}
                          className="px-3 py-1 text-xs rounded-full bg-[#00F0FF]/10 text-[#00F0FF]/80 border border-[#00F0FF]/20"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 mt-6">
                  <div 
                    className="w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      borderColor: exp.color,
                      background: '#050505',
                      boxShadow: `0 0 20px ${exp.color}40`
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ background: exp.color }}
                    />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
