import { Injectable, signal } from '@angular/core';
import {
  Project,
  Skill,
  SkillCategory,
  NavTab,
  FileItem,
  SocialLink,
} from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
/**
 * Service de gestion des données du portfolio.
 * Fournit les informations sur les sections de navigation, les fichiers de la barre latérale,
 * les informations du développeur, les compétences, les projets et les liens sociaux.
 */
export class PortfolioService {

  // ── Active section ──────────────────────────────────────────
    /** Signal Angular pour suivre la section active du portfolio. */
  activeSection = signal<string>('hero');

    /**
   * Définit la section active du portfolio.
   * @param section L'identifiant de la section à activer.
   */
  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  // ── Nav Tabs ────────────────────────────────────────────────
    /**
   * Retourne la liste des onglets de navigation.
   * Chaque onglet représente une section majeure du portfolio.
   * @returns Un tableau d'objets NavTab.
   */
  getTabs(): NavTab[] {
    return [
      { id: 'hero',     label: 'Accueil',       icon: '🟦', iconColor: '#3178c6', active: true  },
      { id: 'about',    label: 'À Propos',       icon: '🟦', iconColor: '#3178c6', active: false },
      { id: 'skills',   label: 'Compétences',      icon: '🟦', iconColor: '#3178c6', active: false },
      { id: 'projects', label: 'Projets',    icon: '🟦', iconColor: '#3178c6', active: false },
      { id: 'read-me',  label: 'README',   icon: '##', iconColor: '#76b4db', active: false },
      { id: 'contact',  label: 'Contact',   icon: '🟣', iconColor: '#cd6799', active: false },
    ];
  }

  // ── Sidebar Files ───────────────────────────────────────────
    /**
   * Retourne la liste des fichiers affichés dans la barre latérale.
   * Ces fichiers simulent une structure de projet et permettent de naviguer entre les sections.
   * @returns Un tableau d'objets FileItem.
   */
  getFiles(): FileItem[] {
    return [
      { name: 'Accueil',           extension: 'ts',   icon: 'ts',   iconColor: '#3178c6', section: 'hero'     },
      { name: 'À Propos',          extension: 'ts',   icon: 'ts',   iconColor: '#3178c6', section: 'about'    },
      { name: 'Compétences',         extension: 'ts',   icon: 'ts',   iconColor: '#3178c6', section: 'skills'   },
      { name: 'Projets',       extension: 'ts',   icon: 'ts',   iconColor: '#3178c6', section: 'projects' },
      { name: 'Contact',      extension: 'scss', icon: 'scss', iconColor: '#cd6799', section: 'contact'  },
      { name: 'app.module.ts',     extension: 'ts',   icon: 'ts',   iconColor: '#3178c6', section: ''         },
      { name: 'tsconfig.json',     extension: 'json', icon: 'json', iconColor: '#f1d502', section: ''         },
      { name: 'package.json',      extension: 'json', icon: 'json', iconColor: '#f1d502', section: ''         },
      { name: 'README.md',         extension: 'md',   icon: 'md',   iconColor: '#519aba', section: 'read-me'         },
    ];
  }

  // ── About ───────────────────────────────────────────────────
    /**
   * Retourne les informations personnelles du développeur.
   * @returns Un objet contenant le nom, le titre, la localisation, l'email, la biographie, etc.
   */
  getDeveloperInfo() {
    return {
      name: 'Antoine Léger',
      title: 'Full-Stack Developer',
      location: 'Paris, France',
      email: 'antoineleger02@gmail.com',
      bio: `Passionate full-stack developer with a love for clean code, elegant architectures, and solving complex problems.
I craft digital experiences that are both functional and beautiful from pixel-perfect UIs to scalable APIs.
Currently pursuing a Master’s degree in AI and Big Data, expanding my expertise in intelligent systems, data engineering, and advanced analytics.`,
      yearsOfExperience: 3,
      projectsCompleted: 15,
      coffeeConsumed: 1337,
    };
  }

  // ── Skills ──────────────────────────────────────────────────
    /**
   * Retourne les catégories de compétences du développeur.
   * Chaque catégorie contient une liste de compétences avec leur niveau.
   * @returns Un tableau d'objets SkillCategory.
   */
  getSkillCategories(): SkillCategory[] {
    return [
      {
        label: 'Languages',
        key: 'languages',
        skills: [
          { name: 'TypeScript', level: 4, category: 'languages' },
          { name: 'JavaScript', level: 4, category: 'languages' },
          { name: 'Python',     level: 1, category: 'languages' },
          { name: 'Java',       level: 2, category: 'languages' },
          { name: 'SQL',        level: 3, category: 'languages' },
        ],
      },
      {
        label: 'Frontend',
        key: 'frontend',
        skills: [
          { name: 'Angular',     level: 4, category: 'frontend' },
          { name: 'React',       level: 3, category: 'frontend' },
          { name: 'SCSS',        level: 4, category: 'frontend' },
          { name: 'HTML5',       level: 5, category: 'frontend' },
          { name: 'RxJS',        level: 4, category: 'frontend' },
        ],
      },
      {
        label: 'Backend',
        key: 'backend',
        skills: [
          { name: 'Node.js',    level: 3, category: 'backend' },
          { name: 'Express',    level: 3, category: 'backend' },
          { name: 'PostgreSQL', level: 3, category: 'backend' },
          { name: 'MongoDB',    level: 3, category: 'backend' },
        ],
      },
      {
        label: 'DevOps / Tools',
        key: 'tools',
        skills: [
          { name: 'Git',        level: 4, category: 'devops' },
          { name: 'Docker',     level: 2, category: 'devops' },
          { name: 'CI/CD',      level: 2, category: 'devops' },
          { name: 'VS Code',    level: 5, category: 'tools' },
          { name: 'Linux',      level: 2, category: 'tools' },
        ],
      },
    ];
  }

  // ── Projects ────────────────────────────────────────────────
    /**
   * Retourne la liste des projets du développeur.
   * Chaque projet inclut un titre, une description, les technologies utilisées, et des liens.
   * @returns Un tableau d'objets Project.
   */
  getProjects(): Project[] {
    return [
      {
        id: 'project-1',
        title: 'Apéro shop',
        description: 'Full-stack e-commerce web application built with Angular and Express.js, using an SQL database with real-time data updates. Clean architecture with comprehensive test coverage.',
        tech: ['Angular', 'ExpressJS', 'TypeScript', 'MySQL', 'Sass','Docker','Regex'],
        github: 'https://github.com/wufo121/Ap-roShop',
        featured: true,
        status: 'completed',
      },
      {
        id: 'project-2',
        title: 'DevBoard',
        description: 'Deep learning school project in Python (PyTorch) for tank image classification. Comparison between a custom CNN and EfficientNet-B0 (transfer learning), achieving 92.6% validation accuracy.',
        tech: ['Python', 'PyTorch', 'Torchvision', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'CUDA'],
        github: 'https://github.com/wufo121/Projet_groupe_tank_model',
        featured: true,
        status: 'completed',
      },
      {
        id: 'project-3',
        title: 'Site de location',
        description: 'School project focused on frontend website development with react, including responsive design',
        tech: ['React', 'Javascript', 'Scss'],
        github: 'https://github.com/wufo121/projet8-kasa',
        featured: false,
        status: 'completed',
      },
      {
        id: 'project-4',
        title: 'LeakLock',
        description: 'Lightweight API gateway with rate limiting, JWT auth, and request logging. Deployable via Docker Compose.',
        tech: ['Rust','typescript','Regex','Cargo'],
        github: 'https://github.com/LeackLockTeam/LeakLock',
        featured: true,
        status: 'in-progress',
      },
    ];
  }

  // ── Social Links ─────────────────────────────────────────────
    /**
   * Retourne la liste des liens sociaux du développeur.
   * @returns Un tableau d'objets SocialLink.
   */
  getSocialLinks(): SocialLink[] {
    return [
      { label: 'GitHub',   url: 'https://github.com/wufo121',         icon: 'github'   },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/antoine-leger-dev/',    icon: 'linkedin' },
      { label: 'Email',    url: 'antoineleger02@gmail.com',           icon: 'mail'     },
    ];
  }
}
