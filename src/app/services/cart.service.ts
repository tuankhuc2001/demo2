import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({providedIn: 'root'})
export class UserService {
    constructor() { }
    
    userSubject = new BehaviorSubject<string>('');
    roleSubject = new BehaviorSubject<string>('');
    tokenSubject = new BehaviorSubject<string>('')
    setUserInfo(user: string, role: string){
        this.userSubject.next(user)
        this.roleSubject.next(role)
    }
    getUserInfo(){
        return this.userSubject, this.roleSubject
    }
    getTokenInfo(){
        return this.tokenSubject
    }
    onSignOut(){
        this.userSubject.next('')
        this.roleSubject.next('')
        this.tokenSubject.next('')
    }
}