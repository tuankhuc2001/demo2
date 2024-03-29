import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { apiCustomer, apiUser } from "../constant/api";
import { IAddUser, IUpdateUser, IUser, IUserRequest, IUserRequestUpdate } from '../types/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    userId = new BehaviorSubject<number>(1)
    userToken = new BehaviorSubject<string>('')

    setUserToken(value: string): void {
        this.userToken.next(value);
    }

    getUserToken(): BehaviorSubject<string> {
        return this.userToken;
    }

    setUserId(value: number): void {
        this.userId.next(value);
    }

    getUserId(): BehaviorSubject<number> {
        return this.userId;
    }

    addAccount(accountRequest: IUserRequest): Observable<IAddUser> {
        return this.http.post<IAddUser>(`${apiUser.addAccount}`, accountRequest)
    }

    updateAccount(idUser: number, accountRequest: IUserRequestUpdate): Observable<IUpdateUser> {
        return this.http.put<IAddUser>(`${apiUser.updateAccount}${idUser}`, accountRequest)
    }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// @Injectable({providedIn: 'root'})
// export class UserService {
//     constructor() { }
    
//     userSubject = new BehaviorSubject<string>('');
//     roleSubject = new BehaviorSubject<string>('');
//     tokenSubject = new BehaviorSubject<string>('')
//     setUserInfo(user: string, role: string){
//         this.userSubject.next(user)
//         this.roleSubject.next(role)
//     }
//     getUserInfo(){
//         return this.userSubject, this.roleSubject
//     }
//     getTokenInfo(){
//         return this.tokenSubject
//     }
//     onSignOut(){
//         this.userSubject.next('')
//         this.roleSubject.next('')
//         this.tokenSubject.next('')
//     }
// }