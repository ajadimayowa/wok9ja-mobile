import { IGig, INews} from "@/src/interfaces/interface";
import { IService } from "@/src/interfaces/service";


export const PlaceholderServices: IService[] = [
    {
        _id:'',
        id: '1',
        nameOfService: 'Fashion & Tailoring',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#421300',
        colorCode2: '#DB6304',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '2',
        nameOfService: 'Gadget & Electronics',
        briefDescription: 'Sales of all kinds of electronics and repaire',
        colorCode: '#254200',
        colorCode2: '#706203',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '3',
        nameOfService: 'Programing & Tech',
        briefDescription: 'All programing related services',
        colorCode: '#00732E',
        colorCode2: '#D1F7E6',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '4',
        nameOfService: 'Photography and Design',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '5',
        nameOfService: 'Article and Writting',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#FF7640',
        colorCode2: '#D1F8E6',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '6',
        nameOfService: 'Social Media Marketing',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '7',
        nameOfService: 'Virtual Assistant',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#4D1727',
        colorCode2: '#BD5272',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '8',
        nameOfService: 'Interior Decor',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#00732E',
        colorCode2: '#BD5272',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '9',
        nameOfService: 'Beauty and Cosmetics',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '10',
        nameOfService: 'Catering Services',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#8F2900',
        colorCode2: '#CE6C39',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        _id:'',
        id: '11',
        nameOfService: 'Logistics',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
]


export const PlaceholderGigs: IGig[] = [
    {
        _id:'',
        id: '1',
        fullNameOfSeller: 'Odeleye Olive',
        currentLevel: 4,
        gigDescription: 'Sew modern and stylish women clothing for all occasions',
        gigCategoryId: 'Fashion & Tailoring',
        sellerCurrentRating: 4.3,
        sellerTotalBuyers: 40,
        sellerBasePrice: 5000,
        isFavourite: true
    },
    {
        _id:'',
        id: '2',
        fullNameOfSeller: 'Akintayo Charles',
        currentLevel: 3,
        gigCategoryId: 'Photography and Design',
        gigDescription: 'Do all your graphics design jobs',
        sellerCurrentRating: 3.7,
        sellerTotalBuyers: 25,
        sellerBasePrice: 3600,
        isFavourite: false
    },
    {
        _id:'',
        id: '3',
        fullNameOfSeller: 'Chima Austine',
        currentLevel: 1,
        gigCategoryId: 'Programing & Tech',
        gigDescription: 'Build business landing pages with wordpress',
        sellerCurrentRating: 3.3,
        sellerTotalBuyers: 45,
        sellerBasePrice: 70000,
        isFavourite: true
    },
]

export const latestNewsOnWok9ja: INews[] = [
    {
        id: '1',
        titleOfNews: 'Location filtering is now available',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },

    {
        id: '2',
        titleOfNews: 'New face to kyc',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },
    {
        id: '3',
        titleOfNews: 'You can now buy credit via vendors',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },
]
