import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, ToastAndroid, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../constants/colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import CustomSearchBar from '../components/inputs/search-input';
import { useRouter } from 'expo-router';
import { CustomInputField } from '../components/inputs/inputField';
import api from '../config/apiConfig';
import * as SecureStore from 'expo-secure-store'


import Constants from 'expo-constants';
import LoaderScreen from '../components/screens/LoaderScreen';
import { BodyText } from '../constants/typography';
import Toast from 'react-native-toast-message';
import { setLoggedInUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/store';
// const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:5000/api';





const LoginScreen = () => {
    // console.log(apiUrl)
    const scale = useSharedValue(1);
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useAppDispatch()

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Too short!').required('Required'),
    });

    useEffect(() => {
        // Trigger the animation on component mount
        Animated.timing(slideAnim, {
            toValue: 0, // Move it to its final position (0 units down)
            duration: 500, // Animation duration
            useNativeDriver: true, // Improves performance by using the native animation driver
        }).start();
    }, [slideAnim]);


    // const handleNavigateToDashboard = async (val: any) => {
    //     try {
    //         const res = await api.post('/',
    //             {
    //                 "email": "ajadimayowa879@gmail.com",
    //                 "password": "Ajadi4real."
    //             },
    //         );
    //         console.log({ respone: res, body: val })
    //         // router.replace('/(dashboard)')

    //     } catch (error) {
    //         console.log({ error: 'failing' })
    //     }
    // }

    interface LoginValues {
        email: string;
        password: string;
    }

    const handleLogin = async (val: LoginValues): Promise<void> => {
        setLoading(true);



        try {
            // API request to log in
            const res = await api.post('/auth/login', val);
            console.log({ userDataHere: res.data })
            if (res.status == 200) {
                // Destructure the response data
                const { token, payload } = res.data;
                dispatch(setLoggedInUser({ ...res.data.payload, token: token }))

                // Log response for debugging
                console.log({ token, payload});

                // Save token and user info securely
                await SecureStore.setItemAsync('userToken', token);
                await SecureStore.setItemAsync('userId', payload?.id);
                await SecureStore.setItemAsync('userInfo', JSON.stringify(payload));
                setErrorMessage(``)
                // Navigate to dashboard
                router.replace({
                    pathname: '/(dashboard)',
                    params: { userId: payload?.id, userToken: token }
                });
            }

        } catch (error: any) {
            setErrorMessage(`Error Message: ${error}`);
            Toast.show({
                type: 'error',
                text1: `Error Message: ${error}`
            });
            setLoading(false);
        }
    };

    const handleNavigateToReset = (email: string) => {
        router.push({
            pathname: './request-password-reset',
            params: { email: email ? email : '' }
        })
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />

            <Animated.View
                style={[styles.container,
                {
                    transform: [{ translateY: slideAnim }], // Apply the animated translateY to the view
                },
                ]}
            >

                <View style={{ minWidth: '100%', marginTop: 10 }}>
                    <Text style={[styles.headerText, { color: darkColor }]}>Login with your email</Text>
                </View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        // console.log(values);
                        handleLogin(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <Animated.View style={[styles.container]}>
                            <View style={[styles.inputContainer, {}]}>
                                <CustomInputField
                                    placeholder='Email'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    // value={values.email}
                                    extraStyle={{ borderColor: touched.email && errors.email ? 'red' : 'black' }}
                                    lIcon={'mail-outline'} type={'text'} />
                                {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            </View>


                            <View style={[styles.inputContainer, {}]}>
                                <CustomInputField
                                    placeholder='Password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    // value={values.password}
                                    extraStyle={{ borderColor: touched.password && errors.password ? 'red' : 'black' }}
                                    rIcon={true} type={'text'} />
                                {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                                <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <Pressable
                                        onPress={() => handleNavigateToReset(values.email)}
                                        style={({ pressed }) => pressed ?
                                            { opacity: .8, }
                                            :
                                            { opacity: 1, }}
                                    ><Text style={[styles.p]}>Forgot password</Text></Pressable>
                                </View>
                            </View>
                            <Pressable
                                        disabled={loading}
                                            onPress={() => handleSubmit()}
                                            style={({ pressed }) => pressed ?
                                                { opacity: .8, minWidth: 50, alignItems: 'center',justifyContent:'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53, }
                                                :
                                                { opacity: 1, minWidth: 50, alignItems: 'center',justifyContent:'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53 }}
                                        >{
                                            loading?<ActivityIndicator size="small" color='#fff' />:
                                            <Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Login</Text>
                                        }
                                            </Pressable>

                            <View style={{ width: '100%', alignItems: 'center', display: 'flex' }}>
                                <BodyText extraStyle={{ color: 'red', margin: 10 }} text={errorMessage} />
                            </View>
                        </Animated.View>
                    )}
                </Formik>

            </Animated.View>
        </SafeAreaView>

    );
};


const styles = ScaledSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        // backgroundColor: 'yellow',
        flex: 1,
        maxWidth: '100%',
        paddingHorizontal: '3%',
        paddingVertical: '10%',
    },
    layerOne: {
        display: 'flex',
        gap: 5,
        backgroundColor: primaryColor,
        padding: '20@s',
        paddingVertical: '15%',
        fontFamily: 'primaryFontBold',

    },
    layerTwo: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        maxWidth: '100%',
        marginTop: '-25@s',
        border: 1,
        borderColor: 'red',
        margin: '2%',
        gap: 15,
        paddingHorizontal: '2%',
        fontFamily: 'primaryFontBold',

    },

    layerThree: {
        justifyContent: 'space-between',
        // backgroundColor:'green',
        flexDirection: 'row',
        maxWidth: '100%',
        paddingHorizontal: '3%',
        fontFamily: 'primaryFontBold',
        minHeight: '60@s',
        alignItems: 'flex-end'
    },
    titleText: {
        fontSize: '30@s',
        fontWeight: 'bold',
        color: '#fff'
    },

    headerText: {
        fontSize: '18@s',
        color: '#fff',
        fontFamily: 'primaryFontBold',
    },
    p: {
        fontFamily: 'primaryFont',
        fontSize: '16@s',
        color: greyColor
    },

    pressable: {

    },

    card: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10@s',
        backgroundColor: '#fff',
        minHeight: '170@s',
        minWidth: '150@s',
        elevation: 5,
        borderRadius: 15,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#000'
    },

    inputContainer: {
        marginBottom: '10@s',
    },
    input: {
        borderWidth: '1@s',
        padding: '10@s',
        borderRadius: '5@s',
        marginBottom: '5@s',
    },
    errorText: {
        color: 'red',
        marginBottom: '5@s',
    },
});

export default LoginScreen;