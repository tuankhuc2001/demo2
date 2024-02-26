import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'cButton',
    templateUrl: 'button.component.html',
    styleUrl: 'button.component.css',
})

export class ButtonComponent implements OnInit {
    constructor() { }

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
    @Input() nameButtonCommon: String ='hihi'

    ngOnInit() { }

    handleClick() {
        this.onClick.emit();
    }
}