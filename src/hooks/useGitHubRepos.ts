import { useState, useEffect, useCallback } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Map repo names to generated images - expanded with new thumbnails
const repoImageMap: Record<string, string> = {
  // Deep Learning / Neural Network projects (high priority)
  'Classifying-Galaxies-with-CNN': '/galaxy_thumb.jpg',
  'Predicting-EV-Charging-Loads-with-Neural-Networks': '/neural_thumb.jpg',
  'Classifying-X-Rays-For-COVID-with-Neural-Networks': '/medical_thumb.jpg',
  'Graduate_Admissions_Deep_Learning': '/neural_thumb.jpg',
  'heart-failure-survival-prediction': '/heart_thumb.jpg',
  'WHO-Life-Expectancy': '/medical_thumb.jpg',
  'Bone-Marow-Transplants': '/data_thumb.jpg',
  
  // NLP projects
  'Mining-Homer-s-Iliad-with-Python-NLTK': '/nlp_thumb.jpg',
  'text-forensics-postcards': '/nlp_thumb.jpg',
  
  // Chatbots (low priority - rudimentary)
  'AlienChatBot': '/nlp_thumb.jpg',
  'ml-chat-bot': '/nlp_thumb.jpg',
  
  // Other projects
  'Ceasar-s-Cipher': '/data_thumb.jpg',
  'Vigenere-Cipher': '/data_thumb.jpg',
  'Clock-wise-Oddball-Generator': '/medical_thumb.jpg',
  'Data-Analysis-on-NBA-Games': '/sports_thumb.jpg',
  'Diet_Plan': '/medical_thumb.jpg',
  'Linear-Regression-for-Students-Scores': '/education_thumb.jpg',
  'Spotify_Songs_Sampling-Distributions': '/music_thumb.jpg',
  '3-AFC-Random-Dot-Kinematic-Task': '/neural_thumb.jpg',
};

// Default image for repos without a specific mapping
const defaultImage = '/galaxy_thumb.jpg';

// Repos to exclude (like profile README repo)
const excludedRepos = ['anastaschoudra', 'psychtoolbox-3.github.com'];

// Priority order - deep learning and neural network projects first
// Lower number = higher priority (shown first)
const repoPriority: Record<string, number> = {
  // Deep Learning / Neural Networks (highest priority)
  'Classifying-Galaxies-with-CNN': 1,
  'Predicting-EV-Charging-Loads-with-Neural-Networks': 1,
  'Classifying-X-Rays-For-COVID-with-Neural-Networks': 1,
  'Graduate_Admissions_Deep_Learning': 1,
  'heart-failure-survival-prediction': 1,
  'WHO-Life-Expectancy': 1,
  'Bone-Marow-Transplants': 2,
  
  // NLP / Text Analysis
  'Mining-Homer-s-Iliad-with-Python-NLTK': 3,
  'text-forensics-postcards': 3,
  
  // Other data science projects
  'Data-Analysis-on-NBA-Games': 4,
  'Spotify_Songs_Sampling-Distributions': 4,
  'Linear-Regression-for-Students-Scores': 4,
  '3-AFC-Random-Dot-Kinematic-Task': 4,
  'Clock-wise-Oddball-Generator': 4,
  
  // Utility projects
  'Ceasar-s-Cipher': 5,
  'Vigenere-Cipher': 5,
  'Diet_Plan': 5,
  
  // Chatbots (lowest priority - rudimentary)
  'AlienChatBot': 10,
  'ml-chat-bot': 10,
};

// Generate tags based on repo name and description
function generateTags(repo: GitHubRepo): string[] {
  const tags: string[] = [];
  const nameLower = repo.name.toLowerCase();
  const descLower = (repo.description || '').toLowerCase();
  const combined = nameLower + ' ' + descLower;
  
  // Framework/Technology tags
  if (combined.includes('tensorflow') || combined.includes('keras')) tags.push('TensorFlow');
  if (combined.includes('pytorch')) tags.push('PyTorch');
  if (combined.includes('scikit') || combined.includes('sklearn')) tags.push('Scikit-Learn');
  if (combined.includes('nltk') || combined.includes('nlp') || combined.includes('text')) tags.push('NLP');
  if (combined.includes('cnn') || combined.includes('neural network') || combined.includes('deep learning')) tags.push('Deep Learning');
  if (combined.includes('classification') || combined.includes('classify')) tags.push('Classification');
  if (combined.includes('regression')) tags.push('Regression');
  if (combined.includes('image') || combined.includes('vision') || combined.includes('x-ray') || combined.includes('galaxy')) tags.push('Computer Vision');
  if (combined.includes('time series') || combined.includes('forecasting') || combined.includes('prediction')) tags.push('Time Series');
  if (combined.includes('health') || combined.includes('medical') || combined.includes('survival')) tags.push('Healthcare AI');
  if (combined.includes('chat') || combined.includes('bot')) tags.push('Chatbot');
  if (combined.includes('cipher') || combined.includes('crypto')) tags.push('Cryptography');
  
  // Add language as tag if not already included
  if (repo.language && !tags.includes(repo.language)) {
    tags.push(repo.language);
  }
  
  // Limit to 3 tags
  return tags.slice(0, 3);
}

export function useGitHubRepos(username: string = 'AnastasChoudra'): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check cache first (valid for 5 minutes)
      const cached = localStorage.getItem(`github-repos-${username}`);
      const cachedTime = localStorage.getItem(`github-repos-${username}-time`);
      
      if (cached && cachedTime) {
        const age = Date.now() - parseInt(cachedTime);
        if (age < 5 * 60 * 1000) { // 5 minutes
          setRepos(JSON.parse(cached));
          setLoading(false);
          return;
        }
      }
      
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data: GitHubRepo[] = await response.json();
      
      // Filter out excluded repos and forks, then process
      const processedRepos = data
        .filter(repo => !excludedRepos.includes(repo.name) && !repo.fork)
        .map(repo => ({
          ...repo,
          // Add generated tags
          topics: generateTags(repo)
        }))
        .sort((a, b) => {
          // First sort by priority (lower number = higher priority)
          const priorityA = repoPriority[a.name] || 5;
          const priorityB = repoPriority[b.name] || 5;
          
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }
          
          // Then by stars
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          
          // Finally by update date
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
      
      // Cache the results
      localStorage.setItem(`github-repos-${username}`, JSON.stringify(processedRepos));
      localStorage.setItem(`github-repos-${username}-time`, Date.now().toString());
      
      setRepos(processedRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      // Try to use cached data even if expired
      const cached = localStorage.getItem(`github-repos-${username}`);
      if (cached) {
        setRepos(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchRepos();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchRepos, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchRepos]);

  return { repos, loading, error, refetch: fetchRepos };
}

// Helper function to get image for a repo
export function getRepoImage(repoName: string): string {
  return repoImageMap[repoName] || defaultImage;
}

// Helper to format repo name for display
export function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}
