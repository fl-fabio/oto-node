import { Document, model, Schema } from "mongoose";
import { ROLE } from "../types/role.enum";
import { Gender, GenderEnum } from "../types/gender.enum";

export interface User extends Document {
    id: string;
    email: string;
    name: string;
    password: string;
    gender: Gender;
    role: ROLE;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { 
        type: String, 
        required: true,
        enum: GenderEnum,
        default: GenderEnum.NOTPROVIDED
    },
    role: { 
        type: String, 
        enum: ROLE, 
        required: true, 
        default: ROLE.USER 
    },
    },
    {timestamps: true, versionKey: false}
);

UserSchema.set('toJSON', { virtuals: true });

export const UserModel = model<User>('User', UserSchema);