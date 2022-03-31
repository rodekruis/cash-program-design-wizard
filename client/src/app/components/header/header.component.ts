import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  title: string;

  constructor() {}

  public darkModeEnabled(): boolean {
    return document.body.classList.contains('dark');
  }

  public toggleDarkMode(): void {
    document.body.classList.toggle('dark');
  }
}
