import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  title = input('');
  show = input(false);
  close = output();
}
