export interface ILoginResponse {
    id: number,
    phone: string,
    password: string,
    email: string,
    fullName: string,
    avatar: string,
    role: string,
    token: string,
    refreshToken: string
}