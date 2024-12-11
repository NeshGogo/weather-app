import { Component } from '@angular/core';
import { DarkModeToggleComponent } from "../components/dark-mode-toggle/dark-mode-toggle.component";
import { UnitToggleComponent } from "../components/unit-toggle/unit-toggle.component";

@Component({
  selector: 'app-layout',
  imports: [DarkModeToggleComponent, UnitToggleComponent],
  templateUrl: './layout.component.html',
  styles: ''
})
export class LayoutComponent {

}
