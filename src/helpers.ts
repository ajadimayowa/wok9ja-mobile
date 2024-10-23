import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

// Define the type for the response from the server
interface TokenValidationResponse {
    isValid: boolean;
}



// Function to get the stored token
const getToken = async (): Promise<string | null> => {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        return token;
    } catch (error) {
        console.error('Error retrieving the token', error);
        return '';
    }
};

const logUserOut = async (): Promise<string | null> => {
    try {
       await SecureStore.deleteItemAsync('userToken');
        return 'cleared'
    } catch (error) {
        console.error('Error retrieving the token', error);
        return 'failed to clear'
    }
};

// Function to validate the token
// const validateToken = async (): Promise<boolean> => {
//     const token = await getToken();

//     if (!token) {
//         console.log('No token found');
//         return false; // No token, user is not authenticated
//     }

//     try {
//         const response: AxiosResponse<TokenValidationResponse> = await axios.post(
//             'https://yourapi.com/validate-token',
//             {}, // Request body can be empty
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Send token in Authorization header
//                 },
//             }
//         );

//         if (response.data.isValid) {
//             console.log('Token is active');
//             return true;
//         } else {
//             console.log('Token is inactive');
//             return false;
//         }
//     } catch (error) {
//         console.error('Error validating token:', error);
//         return false;
//     }
// };

export { getToken,logUserOut}
