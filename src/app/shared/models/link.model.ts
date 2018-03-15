export class Link{
    id:number;
    caption:string;
    icon:string | null;
    hasChild?:boolean;
    children?:Link[];
    Order:number;
    routerLink?:string;
}