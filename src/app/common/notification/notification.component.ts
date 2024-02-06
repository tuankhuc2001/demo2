import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'cNotification',
    templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit {

    @Input() title: string = 'Title'
    @Input() context: string = 'Context'

    constructor(private notification: NzNotificationService) { }

    windowSize = window.innerWidth;

    createBasicNotification(position: NzNotificationPlacement): void {
        this.notification.blank(
          `${this.title}`,
          `${this.context}`,
          { nzPlacement: position }
        );
      }

    ngOnInit() { }
}