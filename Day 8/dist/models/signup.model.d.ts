import mongoose from "mongoose";
export declare const SignUpModel: mongoose.Model<{
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
}, mongoose.Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        username: string;
        email: string;
        password: string;
        role: "admin" | "user";
        emailConfirmed: boolean;
        profilePicture?: string | null;
        phoneNumber?: string | null;
    }, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<{
        username: string;
        email: string;
        password: string;
        role: "admin" | "user";
        emailConfirmed: boolean;
        profilePicture?: string | null;
        phoneNumber?: string | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    emailConfirmed: boolean;
    profilePicture?: string | null;
    phoneNumber?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=signup.model.d.ts.map