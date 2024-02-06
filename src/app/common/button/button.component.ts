import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'cButton',
    styleUrl: './button.component.css',
    templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {
    constructor() { }

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit() { }

    handleClick() {
        this.onClick.emit();
    }
}