
export interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}


export interface IAddress {
  country: string;
  city: string;
  street: string;
  house: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: string;
}

export type LoginResponse = {
  status: number;
  error?: string;
  data?: any;
};