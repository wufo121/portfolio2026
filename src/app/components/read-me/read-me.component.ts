import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-readme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-me.component.html',
  styleUrl: './read-me.component.scss'
})
export class ReadmeComponent {

  commands = [
    {
      name: 'help',
      description: 'Display available commands'
    },
    {
      name: 'whoami',
      description: 'Display information about the developer'
    },
    {
      name: 'skills',
      description: 'Show technical skills'
    },
    {
      name: 'projects',
      description: 'List portfolio projects'
    },
    {
      name: 'contact',
      description: 'Display contact information'
    },
    {
      name: 'date',
      description: 'Show the current date'
    },
    {
      name: 'echo <message>',
      description: 'Display a custom message'
    },
    {
      name: 'clear',
      description: 'Clear the terminal'
    }
  ];

}