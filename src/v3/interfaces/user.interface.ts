import { Gender } from "../types/gender.enum";
import { ROLE } from "../types/role.enum";

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    gender: Gender;
    role: ROLE;
}