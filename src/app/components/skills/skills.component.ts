import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory, Skill } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  skillCategories: SkillCategory[] = [];
  activeCategory = signal<string>('languages');

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.skillCategories = this.portfolioService.getSkillCategories();
  }

  setCategory(key: string): void {
    this.activeCategory.set(key);
  }

  get currentCategory(): SkillCategory | undefined {
    return this.skillCategories.find(c => c.key === this.activeCategory());
  }

  getLevelLabel(level: number): string {
    switch (level) {
      case 5: return 'Mastered';
      case 4: return 'Advanced';
      case 3: return 'Intermediate';
      case 2: return 'Beginner';
      default: return 'Learning';
    }
  }

  getLevelColor(level: number): string {
    switch (level) {
      case 5: return '#4ec9b0'; 
      case 4: return '#569cd6';
      case 3: return '#dcdcaa'; 
      case 2: return '#ce9178'; 
      default: return '#808080'; 
    }
  }
  
}
