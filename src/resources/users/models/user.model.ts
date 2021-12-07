export interface IUser {
    id: string;
    name:string;
    login: string;
    password: string;
}

export interface IUserWoPassword {
    id: string;
    name:string;
    login: string;
}

export interface IUserWoId {
    name:string;
    login: string;
    password: string;
}

//   interface IRequest {
//     method: string;
//     url: string;
//     header: object;
//   }
//   interface IResponse {
//     status: number;
//     message: string;
//     header: object;
//   }
 