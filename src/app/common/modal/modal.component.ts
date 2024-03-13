import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'cModal',
    templateUrl: 'modal.component.html',
    styleUrl: 'modal.component.css',
})

export class ModalComponent implements OnInit {
    constructor() { }

    @Input() footer: boolean = true
    @Input() buttonX : boolean = false
    @Input() isLoading: boolean = false
    @Input() title: string = ""
    @Input() isVisible: boolean = false
    @Input() width: string | number = ''
    @Output() closeModal: EventEmitter<void> = new EventEmitter<void>()

    ngOnInit() { }

    handleCancel() {
        this.closeModal.emit()
    }

    handleOk() {
        this.handleCancel()
    }
}