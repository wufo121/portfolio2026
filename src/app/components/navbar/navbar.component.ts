import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTab } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() tabChanged = new EventEmitter<string>();

  tabs: NavTab[] = [];
  activeTabId = signal<string>('hero');

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.tabs = this.portfolioService.getTabs();
  }

  selectTab(tab: NavTab): void {
    if (!tab.id) return;
    this.tabs.forEach(t => (t.active = t.id === tab.id));
    this.activeTabId.set(tab.id);
    this.tabChanged.emit(tab.id);
  }

  getExtension(label: string): string {
    const parts = label.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }
}
