import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cCard',
    templateUrl: 'card.component.html',
})

export class CardComponent implements OnInit {

    @Input() isLoading: boolean = false

    constructor() { }

    ngOnInit() { }
}