export interface Contributor {
    name: string;
}

export interface Attachment {
    name: string;
    url: string;
}

export interface Document {
    id: string;
    name: string;
    contributors: Contributor[];
    version: number;
    attachments: Attachment[];
    createdAt: Date;
}