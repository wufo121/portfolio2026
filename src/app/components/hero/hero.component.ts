import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  displayedTitle = signal<string>('');
  showCursor = signal<boolean>(true);
  lineNumber = signal<number>(1);

  private fullTitle = 'Full-Stack Developer';
  private typeTimer: ReturnType<typeof setTimeout> | null = null;
  private cursorTimer: ReturnType<typeof setInterval> | null = null;
  private currentIndex = 0;

  devInfo = this.portfolioService.getDeveloperInfo();
  socialLinks = this.portfolioService.getSocialLinks();

  codeLines = [
    { num: 1,  tokens: [{ text: 'const ', cls: 'keyword' }, { text: 'developer', cls: 'variable' }, { text: ' = {', cls: 'operator' }] },
    { num: 2,  tokens: [{ text: '  name:', cls: 'property' }, { text: " '", cls: 'operator' }, { text: 'Antoine Léger', cls: 'string' }, { text: "',", cls: 'operator' }] },
    { num: 3,  tokens: [{ text: '  title:', cls: 'property' }, { text: " '", cls: 'operator' }, { text: 'Full-Stack Developer', cls: 'string' }, { text: "',", cls: 'operator' }] },
    { num: 4,  tokens: [{ text: '  location:', cls: 'property' }, { text: " '", cls: 'operator' }, { text: 'Paris, France', cls: 'string' }, { text: "',", cls: 'operator' }] },
    { num: 5,  tokens: [{ text: '  skills:', cls: 'property' }, { text: ' [', cls: 'operator' }, { text: "'Angular'", cls: 'string' }, { text: ', ', cls: 'operator' }, { text: "'TypeScript'", cls: 'string' }, { text: ', ', cls: 'operator' }, { text: "'Node.js'", cls: 'string' }, { text: '],', cls: 'operator' }] },
    { num: 6,  tokens: [{ text: '  openToWork:', cls: 'property' }, { text: ' true,', cls: 'number' }] },
    { num: 7,  tokens: [{ text: '};', cls: 'operator' }] },
    { num: 8,  tokens: [] },
    { num: 9,  tokens: [{ text: '// 👋 Welcome to my portfolio!', cls: 'comment' }] },
    { num: 10, tokens: [{ text: "console", cls: 'variable' }, { text: '.', cls: 'operator' }, { text: 'log', cls: 'function' }, { text: '(', cls: 'operator' }, { text: "'Hello, World!'", cls: 'string' }, { text: ');', cls: 'operator' }] },
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.startTypewriter();
    this.startCursorBlink();
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
    if (this.cursorTimer) clearInterval(this.cursorTimer);
  }

  private startTypewriter(): void {
    if (this.currentIndex <= this.fullTitle.length) {
      this.displayedTitle.set(this.fullTitle.slice(0, this.currentIndex));
      this.currentIndex++;
      this.typeTimer = setTimeout(() => this.startTypewriter(), 75);
    }
  }

  private startCursorBlink(): void {
    this.cursorTimer = setInterval(() => {
      this.showCursor.update(v => !v);
    }, 530);
  }

  navigateTo(section: string): void {
    this.portfolioService.setActiveSection(section);
  }

  getSocialIcon(icon: string): string {
    const map: Record<string, string> = {
      github:   '⎇',
      linkedin: 'in',
      twitter:  '𝕏',
      mail:     '✉',
    };
    return map[icon] ?? '⚡';
  }
}
