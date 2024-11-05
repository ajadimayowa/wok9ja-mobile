export interface IService{
    _id:string,
    id:string,
    nameOfService: string,
    briefDescription: string,
    colorCode: string,
    colorCode2: string,
    serviceIcon: string,
    iconLibraryIsIonic: boolean,
    webIcon? :string,
    createdBy?:string,
    category? :string
    basic?:boolean
    dateTime? :Date
}