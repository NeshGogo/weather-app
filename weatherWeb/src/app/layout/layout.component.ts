import { Component, input, output } from '@angular/core';
import { DarkModeToggleComponent } from "../components/dark-mode-toggle/dark-mode-toggle.component";
import { UnitToggleComponent } from "../components/unit-toggle/unit-toggle.component";

@Component({
  selector: 'app-layout',
  imports: [DarkModeToggleComponent, UnitToggleComponent],
  templateUrl: './layout.component.html',
  styles: ''
})
export class LayoutComponent {
  unitChange = output<string>();
  isAFavoritePlace = input(false);
  thereisAPlace = input(false);
  favorite = output<boolean>();
  showFavoriteList = output<boolean>();
  listenToWeather = output<void>();

  toggleFavoritePlace() {
    this.favorite.emit(!this.isAFavoritePlace());
  }
}
