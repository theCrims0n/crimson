export interface Users {
    _id: Object;
    name: string;
    lastname: string;
    email: string;
    password?: string;
    role_id?: number;
    socket_id? : string
}