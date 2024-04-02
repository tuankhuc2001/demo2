export interface IUser {
  id: number;
  phone: string;
  email: string;
  fullname: string;
  avatar: any;
  role: string;
  token: string;
  refreshToken: string
}

export interface IUserRequest {
  phone: string;
  password: string ;
  address: string;
  fullname: string;
  role: string;
}

export interface IUserRequestUpdate {
  password: string ;
  role: string;
}

export interface IAddUser {
  message: string,
  status: boolean,
  content: {
  }
}

export interface IUpdateUser {
  message: string,
  status: boolean,
  content: {
  }
}

export interface IGetUser {
  message: string,
  status: boolean,
  content: {
    list: IUser[];
  }
}
