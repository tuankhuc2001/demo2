import { Observable, Subscription } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Router } from "@angular/router";
import { routerNames } from "../constant/router";

export class apiCommon {
    constructor(private notification: NzNotificationService,
        private router: Router) {}

    createNotification(type: string, content: string): void {
        this.notification.create(
          type,
          `${content}`,
          ''
        );
      }
    
    call<T>(callBackService: Observable<T>, callback: (data: T) => void): Subscription {
        
        return callBackService.subscribe({
            next: value => callback(value),
            error: e => {
                if (e.status == 403) {
                    this.createNotification('error', "Phiên đăng nhập hết hạn")
                    this.router.navigate([routerNames.signInPage]);
                }
            }
        });
    }
}

