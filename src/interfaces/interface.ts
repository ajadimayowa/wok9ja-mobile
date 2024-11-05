export interface IService {
    id:string,
    nameOfService: string,
    briefDescription: string,
    colorCode: string,
    colorCode2: string,
    serviceIcon: string,
    iconLibraryIsIonic: boolean

    
    webIcon? :string,
    createdBy?:string,
    category? :string
    basic?:boolean
    dateTime? :Date
}

export interface IGig {
    _id:string,
    id: string,
    fullNameOfSeller: string,
    currentLevel: number,
    gigDescription: string,
    sellerCurrentRating: number,
    sellerTotalBuyers: number,
    sellerBasePrice: number,
    isFavourite: boolean,
    gigCategoryId: string
}

export interface INews {
    id: string,
    titleOfNews: string,
    newsDescription: string,
    newsCoverImageUrl: string,
    newsUrl: string,
    newsId: string,
}

export interface IKyc {
    idType: string;
    idNumber: string,
}
