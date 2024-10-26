export interface Contributor {
    ID: number;
    Name: string;
}

export interface Document {
    ID: number;
    Title: string;
    Contributors: Contributor[];
}