import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Output() fileSelected = new EventEmitter<string>();

  files: FileItem[] = [];
  selectedFile = signal<string>('home.ts');
  explorerOpen = signal<boolean>(true);
  srcFolderOpen = signal<boolean>(true);
  appFolderOpen = signal<boolean>(true);

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.files = this.portfolioService.getFiles();
  }

  selectFile(file: FileItem): void {
    if (!file.section) return;
    this.selectedFile.set(file.name);
    this.fileSelected.emit(file.section);
  }

  toggleExplorer(): void {
    this.explorerOpen.update(v => !v);
  }

  toggleSrc(): void {
    this.srcFolderOpen.update(v => !v);
  }

  toggleApp(): void {
    this.appFolderOpen.update(v => !v);
  }

  getIconLabel(ext: string): string {
    const map: Record<string, string> = {
      ts:   'TS',
      scss: 'SC',
      json: '{}',
      html: '<>',
      md:   '##',
    };
    return map[ext] ?? ext.toUpperCase();
  }
}
