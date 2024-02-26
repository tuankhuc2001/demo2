import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { buttonType } from '../../constant/button';

@Component({
    selector: 'cButton',
    templateUrl: 'button.component.html',
    styleUrl: 'button.component.css',
})

export class ButtonComponent implements OnInit {
    buttonType = buttonType
    classNameOnType: string = buttonType.green 

    @Input() customStyle: {[key: string]: string} = {}
    @Input() type: buttonType = buttonType.green

    @Output() handleClick: EventEmitter<any> = new EventEmitter()

    constructor() { }

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit() { }

}