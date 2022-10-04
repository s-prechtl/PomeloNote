export interface Note {
    id: number;
    attributes: Attribute;
}

export interface Attribute {
    title: string;
    content: string;

    lastViewed: Date;
}