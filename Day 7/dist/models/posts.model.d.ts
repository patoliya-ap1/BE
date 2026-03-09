import mongoose from "mongoose";
export declare const PostModel: mongoose.Model<{
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        title: string;
        body: string;
        tags: string[];
        views?: number | null;
        userId?: number | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        title: string;
        body: string;
        tags: string[];
        views?: number | null;
        userId?: number | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    body: string;
    tags: string[];
    views?: number | null;
    userId?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=posts.model.d.ts.map