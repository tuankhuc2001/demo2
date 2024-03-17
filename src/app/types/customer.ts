export interface ICustomer {
    id: number,
    nameCustomer: string,
    phoneCustomer: string,
    address: string,
}

export interface IResponseCustomer {
    message: string,
    status: boolean,
    content: {
        list: ICustomer[],
    }
}

export interface ICustomerRequest {
    nameCustomer: string,
    phoneCustomer: string,
    address: string,
    avatar: string
}