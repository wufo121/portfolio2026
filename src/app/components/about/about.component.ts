import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'], 
})
export class AboutComponent implements OnInit {
  devInfo: any; // initialisé plus tard
  initials: string = '';

  timeline = [
    {
      year: '2024 – Now',
      role: 'Full-Stack Developer',
      company: 'Company Name',
      description: 'Building scalable web applications with Angular, NestJS, and PostgreSQL.',
      tech: ['Angular', 'NestJS', 'PostgreSQL'],
    },
    {
      year: '2022 – 2024',
      role: 'Frontend Developer',
      company: 'Another Company',
      description: 'Developed reactive UIs, improved core web vitals, and mentored junior developers.',
      tech: ['React', 'TypeScript', 'SCSS'],
    },
    {
      year: '2021 – 2022',
      role: 'Junior Developer',
      company: 'Startup',
      description: 'First professional experience. Discovered my passion for clean code and good UX.',
      tech: ['JavaScript', 'Vue.js', 'Node.js'],
    },
  ];

  interests = [
    { icon: '🎮', label: 'Gaming' },
    { icon: '📚', label: 'Tech Books' },
    { icon: '☕', label: 'Coffee' },
    { icon: '🎵', label: 'Music' },
    { icon: '🚴', label: 'Cycling' },
    { icon: '🌐', label: 'Open Source' },
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.devInfo = this.portfolioService.getDeveloperInfo();


    this.initials = this.devInfo?.name
  ? this.devInfo.name
      .split(' ')
      .map((n: string) => n[0]) // on précise que n est une string
      .join('')
  : '';
  }
}
