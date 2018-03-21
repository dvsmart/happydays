export class Album{
    id:number;
    name:string;
    caption:string;
    isPublic:boolean;
    imagesCount?:number;
    coverImage?:string;
    addedOn?:Date;
    updated?:Date
    createdBy:string
}

// export const albums: Album[] = [
//     {id:1, name:"School Days",caption:'Taken in school', isPublic:true,updated:new Date('1/1/16')},
//     {id:2, name:"Goa Trip",caption:'Taken in school', isPublic:true,updated:new Date('1/1/16')},
//     {id:3, name:"Forest Trip",caption:'Taken in school', isPublic:true,updated:new Date('1/1/16')},
//     {id:4, name:"Beach Fun",caption:'Taken in school', isPublic:true,updated:new Date('1/1/16')},
// ]