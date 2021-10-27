import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {}

  public darkModeEnabled(): boolean {
    return document.body.classList.contains('dark');
  }

  public toggleDarkMode(): void {
    document.body.classList.toggle('dark');
  }
}
