import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'InputValidate',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  constructor() {}
  showValidate: boolean = false;
  nameValue: string = ""
  onInput() {
    this.showValidate = this.nameValue.trim() === '';
  }
}
