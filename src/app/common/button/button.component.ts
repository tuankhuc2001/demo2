import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'cButton',
    templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {

    @Input() customStyle: {[key: string]: string} = {}
    @Input() isDisabled: boolean = false

    @Output() handleClick: EventEmitter<any> = new EventEmitter()

    constructor() { }

    ngOnInit() { 

    }
}