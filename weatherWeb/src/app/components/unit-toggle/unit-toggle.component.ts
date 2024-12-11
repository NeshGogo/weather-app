import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-unit-toggle',
  imports: [],
  templateUrl: './unit-toggle.component.html',
  styles: ''
})
export class UnitToggleComponent {
  isCelsius = signal(true);
  click = output<string>();

  unitHandler(){
    this.isCelsius.set(!this.isCelsius());
    this.click.emit(this.isCelsius()? 'C' : 'F');
  }
}
