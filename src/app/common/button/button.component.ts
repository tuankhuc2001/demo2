import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'cButton',
    templateUrl: 'button.component.html',
    styleUrl: 'button.component.css',
})

export class ButtonComponent implements OnInit {
    constructor() { }

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit() { }

    handleClick() {
        this.onClick.emit();
    }
}