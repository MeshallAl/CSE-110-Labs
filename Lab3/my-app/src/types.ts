export enum Label {
    personal = "Personal",
    study = "Study",
    work = "Work",
    other = "Other",
 }
 
 export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    favourite: boolean;
 };
 
export type GroceryItem = { name: string; isPurchased: boolean };


 