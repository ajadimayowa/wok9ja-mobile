export interface IUserBio {
    profile:{
      id:string,
      fullName:string,
      firstName:string,
      isVerified:boolean|null
      profilePicUrl:string,
    },
    contact : {
      email: string,
      phoneNumber: string,
    },
    kyc: {
      isVerified: boolean|null
      idType: string,
      idNumber: string,
      idDocumentFile: string,
    },
    userLocation: {
      state: string,
      lga: string,
      homeAddress:string,
      officeAddress: string,
      currentLocation:string,
    },
    nok: {
      nextOfKinAddress:string,
      nextOfKinPhoneNumber: string,
      nextOfKinEmail:string,
    },
    selling : {
      isSeller : boolean|null
      gigs: string[],
      orders: string[],
    },
    buying : {
      orders:string[],
    },
    billing:{
      currentBalance:string,
      totalSpent:string,
      totalEarning:string,
      spendingHistory:string[],
      earningHistory:string[],
    }


  }