export interface Contributor {
    ID: string;
    Name: string;
}

export interface Document {
    ID: string;
    Title: string;
    Version: string;
    Contributors: Contributor[];
    Attachments: any[];
    CreatedAt: string;
}