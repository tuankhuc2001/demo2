import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'cModal',
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {
    constructor() { }

    @Input() isLoading: boolean = false
    @Input() title: string = "Default title"
    @Input() isVisible: boolean = false
    @Output() closeModal: EventEmitter<void> = new EventEmitter<void>()

    ngOnInit() { }

    handleCancel() {
        this.closeModal.emit()
    }

    handleOk() {
        this.handleCancel()
    }
}