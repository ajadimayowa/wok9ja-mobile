import { router, useNavigation, useRouter } from "expo-router"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { View, Text, Pressable, StyleSheet, Animated, Image, SafeAreaView } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { primaryColor } from "../constants/colors"
import { getToken } from "../helpers"

const LandingPage = () => {
    const scaleLogo = useRef();
    const [counter, setCounter] = useState<number>(10);
    const [userTok,setUserTok] = useState<any>()
    const router = useRouter();

    const handleTokenCheck = async () => {
        const token = await getToken();
        if (!token) {
            setUserTok(token)
            router.replace('./home-unauth');
        } else {
            router.replace('./(dashboard)')
        }
    }

    // const storeToken = async (token) => {
    //     try {
    //       await SecureStore.setItemAsync('userToken', token);
    //       console.log('Token stored successfully');
    //     } catch (error) {
    //       console.error('Error storing the token', error);
    //     }
    //   };





    //   Function to validate the token
    useLayoutEffect(() => {
        handleTokenCheck()
    })


    return (
        <SafeAreaView style={style.container}>
            <View >
                <Image
                    source={require('../assets/gifs/wok9jaloaderLarge.gif')}

                />
                {/* <Text style={style.p}>Get Work Done Faster.</Text> */}
            </View>
        </SafeAreaView>
    )


}

const style = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    p: {
        fontFamily: 'primaryFont',
        fontSize: 24,
        color: primaryColor
    }

})
export default LandingPage