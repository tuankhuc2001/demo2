import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { buttonType } from '../../constant/button';

@Component({
    selector: 'cButton',
    templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {
    buttonType = buttonType
    classNameOnType: string = buttonType.green 

    @Input() customStyle: {[key: string]: string} = {}
    @Input() type: buttonType = buttonType.green

    @Output() handleClick: EventEmitter<any> = new EventEmitter()

    constructor() { }

    ngOnInit() { }
}