// ============================================
// MODELS / INTERFACES
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'archived';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'languages';
  icon?: string;
}

export interface SkillCategory {
  label: string;
  key: string;
  skills: Skill[];
}

export interface NavTab {
  id: string;
  label: string;
  icon: string;
  iconColor: string;
  active: boolean;
  modified?: boolean;
}

export interface FileItem {
  name: string;
  extension: string;
  icon: string;
  iconColor: string;
  section: string;
}

export interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  delay?: number;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
