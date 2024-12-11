import { Component } from '@angular/core';
import { DarkModeToggleComponent } from "../components/dark-mode-toggle/dark-mode-toggle.component";

@Component({
  selector: 'app-layout',
  imports: [DarkModeToggleComponent],
  templateUrl: './layout.component.html',
  styles: ''
})
export class LayoutComponent {

}
