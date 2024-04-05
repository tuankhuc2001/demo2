export interface ILoginResponse {
    id: number,
    phone: string,
    password: string,
    email: string,
    fullname: string,
    avatar: string,
    role: string,
    token: string,
    refreshToken: string
}