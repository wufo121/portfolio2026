import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filter = signal<'all' | 'featured'>('all');

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.projects = this.portfolioService.getProjects();
  }

  setFilter(value: 'all' | 'featured'): void {
    this.filter.set(value);
  }

  get filteredProjects(): Project[] {
    return this.filter() === 'featured'
      ? this.projects.filter(p => p.featured)
      : this.projects;
  }

  getStatusColor(status: Project['status']): string {
    return { completed: '#4ec9b0', 'in-progress': '#dcdcaa', archived: '#6b6b6b' }[status];
  }

  getStatusLabel(status: Project['status']): string {
    return { completed: '✓ Done', 'in-progress': '⟳ WIP', archived: '⎘ Archived' }[status];
  }
}
