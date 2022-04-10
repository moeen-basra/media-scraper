export enum contentTypes {
    IMAGE = "image",
    VIDEO = "video",
}

export interface FeedItem{
    id: number;
    title: string;
    type: string;
    src: string;
    createdAt: string;
    updatedAt: string;
}


