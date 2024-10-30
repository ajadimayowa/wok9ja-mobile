// src/store/exampleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserBio {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | any;
    isVerified: boolean |null,
    userId: string;
    state: string;
    lga: string;
    homeAddress: string;
    token:string;
}

interface IUser {
    userBio :{
    id:string,
    fullName: string,
    firstName:string,
    lastName:string,
    email: string,
    phoneNumber: string | any,
    isVerified: boolean |null,
    userId: string,
    state:string,
    lga: string,
    homeAddress: string,
    token:string,
    }
}

const initialState: IUser = {
    userBio : {
    id:'',
    fullName: '',
    firstName:'',
    lastName:'',
    email: '',
    phoneNumber: '',
    isVerified: null,
    userId: '',
    state:'',
    lga: '',
    homeAddress: '',
    token:''
    }
}

const UserSlice = createSlice({
    name: 'user-info',
    initialState,
    reducers: {
        setLoggedInUser: (state, action:PayloadAction<IUserBio>) => {
            console.log({apiSent:action.payload})
            state.userBio = action.payload
        },
        logoutUser: (state,action)=>{
            state.userBio = initialState.userBio
        }

    },
});

export const { setLoggedInUser } = UserSlice.actions;
export default UserSlice.reducer;
