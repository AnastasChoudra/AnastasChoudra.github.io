import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Star, GitFork, Code2, Brain, Cpu, Database, FileText, Github, RefreshCw, Loader2 } from 'lucide-react';
import { useGitHubRepos, getRepoImage, formatRepoName, type GitHubRepo } from '../hooks/useGitHubRepos';

gsap.registerPlugin(ScrollTrigger);

const languageIcons: Record<string, React.ReactNode> = {
  Python: <Code2 className="w-4 h-4" />,
  MATLAB: <Cpu className="w-4 h-4" />,
  SQL: <Database className="w-4 h-4" />,
  R: <Brain className="w-4 h-4" />,
  JavaScript: <Code2 className="w-4 h-4" />,
  TypeScript: <Code2 className="w-4 h-4" />,
  Jupyter: <FileText className="w-4 h-4" />,
  default: <FileText className="w-4 h-4" />
};

interface ProjectCardProps {
  project: GitHubRepo;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: y * 8, y: -x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const image = getRepoImage(project.name);
  const displayName = formatRepoName(project.name);
  const language = project.language || 'Unknown';
  const tags = project.topics || [];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out'
      }}
      className="group relative glass rounded-xl overflow-hidden hover:border-[#00F0FF]/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        {/* Language Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#222]">
          {languageIcons[language] || languageIcons.default}
          <span className="text-xs text-[#E0E0E0]/80">{language}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#E0E0E0] mb-2 line-clamp-1 group-hover:text-[#00F0FF] transition-colors">
          {displayName}
        </h3>
        
        <p className="text-sm text-[#E0E0E0]/60 mb-4 line-clamp-2">
          {project.description || 'No description available'}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full bg-[#00F0FF]/10 text-[#00F0FF]/80 border border-[#00F0FF]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#E0E0E0]/40 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {project.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {project.forks_count}
            </span>
          </div>
          
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/5 to-[#7000FF]/5" />
      </div>
    </div>
  );
}

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { repos, loading, error, refetch } = useGitHubRepos('AnastasChoudra');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[#00F0FF] text-sm tracking-widest uppercase mb-2 block">
                Portfolio
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#E0E0E0] mb-4">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={refetch}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#222] text-[#E0E0E0]/60 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span className="text-sm">{loading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>
          
          <p className="text-[#E0E0E0]/60 max-w-2xl">
            A selection of my data science and machine learning projects, fetched live from GitHub. 
            Each project demonstrates different aspects of AI and neuroscience research.
          </p>
          
          {error && (
            <p className="text-red-400 text-sm mt-2">
              Error loading projects: {error}. Showing cached data.
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && repos.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-[#111]" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-[#111] rounded w-3/4" />
                  <div className="h-4 bg-[#111] rounded w-full" />
                  <div className="h-4 bg-[#111] rounded w-2/3" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-[#111] rounded w-16" />
                    <div className="h-6 bg-[#111] rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading || repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {repos.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : null}

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/AnastasChoudra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#222] rounded-full text-[#E0E0E0]/80 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:glow-cyan transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All {repos.length} Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Auto-update note */}
        <p className="text-center text-[#E0E0E0]/30 text-xs mt-4">
          Projects auto-refresh every 5 minutes • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </section>
  );
}

export default Projects;
