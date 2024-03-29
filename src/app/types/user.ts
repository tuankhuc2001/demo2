export interface IUser {
  id: number;
  phone: string;
  password: string;
  email: string;
  address: string;
  fullname: string;
  avatar: any;
  type: string;
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
  newPassword: string;
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

