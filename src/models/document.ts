export interface Contributor {
    ID: number;
    Name: string;
}

export interface Document {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    Title: string;
    Attachments: string[];
    Contributors: { ID: string; Name: string }[];
    Version: string;
}