import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalLine } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
/**
 * Composant Terminal simulant une interface de ligne de commande interactive.
 * Il affiche une séquence de démarrage, exécute des commandes prédéfinies et gère l'historique des commandes.
 */
export class TerminalComponent implements OnInit, AfterViewInit {
  @ViewChild('terminalBody') terminalBody!: ElementRef<HTMLDivElement>;
  @ViewChild('terminalInput') terminalInput!: ElementRef<HTMLInputElement>;

    /** Tableau des lignes affichées dans le terminal (commandes, sorties, erreurs). */
  lines: TerminalLine[] = [];
    /** Contenu actuel de l'entrée utilisateur dans le terminal. */
  currentInput = '';
    /** Historique des commandes saisies par l'utilisateur. */
  commandHistory: string[] = [];
    /** Index actuel dans l'historique des commandes pour la navigation (flèches haut/bas). */
  historyIndex = -1;

    /** Informations sur le développeur, récupérées via le PortfolioService. */
  private readonly devInfo = this.portfolioService.getDeveloperInfo();

    /** Séquence de démarrage affichée au lancement du terminal. */
  private readonly bootSequence: TerminalLine[] = [
    { type: 'output',  content: `portfolio-os v1.0.0 — ${this.devInfo.name}` },
    { type: 'output',  content: 'Type "help" to see available commands.' },
    { type: 'command', content: 'whoami' },
    { type: 'success', content: `${this.devInfo.name} — ${this.devInfo.title} — ${this.devInfo.location}` },
  ];

    /**
   * Carte des commandes disponibles et de leurs gestionnaires.
   * Chaque clé est une commande (ex: 'help', 'whoami') et la valeur est une fonction qui retourne son résultat.
   */
  private readonly commandMap: Record<string, () => string[]> = {
    help: () => [
      'Available commands:',
      '  whoami      → About me',
      '  skills      → List my skills',
      '  projects    → List my projects',
      '  contact     → How to reach me',
      '  clear       → Clear terminal',
      '  date        → Current date',
      '  echo <msg>  → Echo a message',
    ],
    whoami: () => [
      `Name     : ${this.devInfo.name}`,
      `Role     : ${this.devInfo.title}`,
      `Location : ${this.devInfo.location}`,
      `Email    : ${this.devInfo.email}`,
    ],
    skills: () => {
      const cats = this.portfolioService.getSkillCategories();
      return cats.map(c => `${c.label.padEnd(12)} → ${c.skills.map(s => s.name).join(', ')}`);
    },
    projects: () => {
      return this.portfolioService.getProjects().map(p =>
        `[${p.status}] ${p.title} — ${p.tech.join(', ')}`
      );
    },
    contact: () => [
      `Email  : ${this.devInfo.email}`,
      'GitHub : https://github.com/wufo121',
      'LinkedIn : https://www.linkedin.com/in/antoine-leger-dev/',
    ],
    date: () => [new Date().toLocaleString()],
    clear: () => { this.lines = []; return []; },
  };

    /**
   * Constructeur du composant Terminal.
   * @param portfolioService Service pour récupérer les données du portfolio.
   */
  constructor(private portfolioService: PortfolioService) {}

    /**
   * Hook du cycle de vie Angular, appelé après l'initialisation du composant.
   * Déclenche la séquence de démarrage du terminal.
   */
  ngOnInit(): void {
    // Display boot sequence with delay
    this.bootSequence.forEach((line, i) => {
      setTimeout(() => {
        this.lines.push(line);
        this.scrollToBottom();
      }, i * 200);
    });
  }

    /**
   * Hook du cycle de vie Angular, appelé après l'initialisation de la vue du composant.
   * Met le focus sur le champ de saisie du terminal.
   */
  ngAfterViewInit(): void {
    setTimeout(() => this.terminalInput?.nativeElement?.focus(), 900);
  }

    /**
   * Gère les événements de touche, notamment pour la navigation dans l'historique des commandes (flèches haut/bas).
   * @param event L'événement clavier.
   */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.currentInput = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.currentInput = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      } else {
        this.  /** Index actuel dans l'historique des commandes pour la navigation (flèches haut/bas). */
  historyIndex = -1;
        this.  /** Contenu actuel de l'entrée utilisateur dans le terminal. */
  currentInput = '';
      }
    }
  }

    /**
   * Exécute la commande saisie par l'utilisateur.
   * Ajoute la commande à l'historique, traite la commande et affiche le résultat ou une erreur.
   */
  executeCommand(): void {
    const raw = this.currentInput.trim();
    if (!raw) return;

    this.lines.push({ type: 'command', content: raw });
    this.commandHistory.push(raw);
    this.  /** Index actuel dans l'historique des commandes pour la navigation (flèches haut/bas). */
  historyIndex = -1;
    this.  /** Contenu actuel de l'entrée utilisateur dans le terminal. */
  currentInput = '';

    const [cmd, ...args] = raw.split(' ');
    const handler = this.commandMap[cmd.toLowerCase()];

    if (handler) {
      const result = handler();
      result.forEach(line => this.lines.push({ type: 'output', content: line }));
    } else if (cmd === 'echo') {
      this.lines.push({ type: 'output', content: args.join(' ') });
    } else {
      this.lines.push({ type: 'error', content: `command not found: ${cmd}. Type "help" for help.` });
    }

    setTimeout(() => this.scrollToBottom(), 0);
  }

    /**
   * Fait défiler le terminal jusqu'en bas pour afficher la dernière ligne.
   */
  private scrollToBottom(): void {
    if (this.terminalBody?.nativeElement) {
      this.terminalBody.nativeElement.scrollTop = this.terminalBody.nativeElement.scrollHeight;
    }
  }
}
