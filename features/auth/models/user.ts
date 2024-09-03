import { Validator } from "@angular/forms";

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}
 
export interface LoginResponse {
    token: string;
}
 
export interface RegisterResponse {
    message: string;
}