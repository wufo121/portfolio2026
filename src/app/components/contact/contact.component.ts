import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialLink } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  socialLinks: SocialLink[] = [];
  submitted = false;
  submitting = false;

  form: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(private portfolioService: PortfolioService) {
    this.socialLinks = this.portfolioService.getSocialLinks();
  }

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.submitting = true;

    // Simulate sending
    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 1500);
  }

  resetForm(): void {
    this.submitted = false;
  }

  getSocialIcon(icon: string): string {
    const map: Record<string, string> = {
      github:   'GitHub',
      linkedin: 'LinkedIn',
      twitter:  'Twitter',
      mail:     'Email',
    };
    return map[icon] ?? icon;
  }
}
