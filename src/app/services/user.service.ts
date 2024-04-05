import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUser, objectApi } from '../constant/api';
import { ILoginResponse } from '../types/login';
import { IAddUser, IGetUser, IUpdateUser, IUser, IUserRequest, IUserRequestUpdate } from '../types/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    user = new BehaviorSubject<IUser>({
        id: 1,
        phone: "",
        email: "",
        fullname: "",
        avatar: "",
        role: "",
        token: "",
        refreshToken: ""
    })

    getUser(): BehaviorSubject<IUser> {
        return this.user
    }

    setUser(value: ILoginResponse): void {
        this.user.next({
            id: value.id,
            phone: value.phone,
            email: value.email,
            fullname: value.fullname,
            avatar: value.avatar,
            role: value.role,
            token: value.token,
            refreshToken: value.refreshToken
        })
    }

    header(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        });
        return headers
    }

    headerUpload(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        });
        return headers
    }

    login(userName: string, password: string): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${objectApi.login}`, { phone: userName, password })
    }

    getAllAccount(): Observable<IGetUser> {
        const headers = this.header()
        return this.http.get<IGetUser>(`${apiUser.getAllAccount}`, {headers})
    }

    addAccount(accountRequest: IUserRequest): Observable<IAddUser> {
        const headers = this.header()
        return this.http.post<IAddUser>(`${apiUser.addAccount}`, accountRequest, {headers})
    }

    updateAccount(idUser: number, accountRequest: IUserRequest): Observable<IUpdateUser> {
        const headers = this.header()
        return this.http.put<IAddUser>(`${apiUser.updateAccount}${idUser}`, accountRequest, {headers})
    }
    

}
