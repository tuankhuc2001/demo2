import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'cNotification',
    templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit {

    constructor(private notification: NzNotificationService) { }

    windowSize = window.innerWidth;

    createBasicNotification(position: NzNotificationPlacement): void {
        this.notification.blank(
          `${typeof(this.windowSize)}`,
          `${this.windowSize}`,
          { nzPlacement: position }
        );
      }

    ngOnInit() { }
}