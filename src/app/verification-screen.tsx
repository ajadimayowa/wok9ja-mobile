import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../constants/colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import CustomSearchBar from '../components/inputs/search-input';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../config/apiConfig';
import LoaderScreen from '../components/screens/LoaderScreen';
import { BodyText } from '../constants/typography';
import Toast from 'react-native-toast-message';



const Verificationcreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const SignupSchema = Yup.object().shape({

        verificationCode: Yup.number().typeError('Must be a number').required('Required'),
        email: Yup.string().required()
    });

    const initialSeconds = 10

    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        // If the countdown reaches zero, stop the timer
        if (seconds <= 0) return;

        // Start the countdown timer
        const timerId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Clean up the interval on unmount
        return () => clearInterval(timerId);
    }, [seconds]);


    useEffect(() => {
        // Trigger the animation on component mount
        Animated.timing(slideAnim, {
            toValue: 0, // Move it to its final position (0 units down)
            duration: 500, // Animation duration
            useNativeDriver: true, // Improves performance by using the native animation driver
        }).start();
    }, [slideAnim]);


    const handleVerifyOtp = async (body: any) => {
        console.log({ sending: body })
        setLoading(true)
        try {

            const res = await api.post('/auth/verify-user', body)
            if (res.status == 200) {
                router.navigate({
                    pathname: './login',
                    params: { email: body?.email, phoneNumber: body?.phoneNumber }
                })
                // ToastAndroid.show('User verified!',ToastAndroid.LONG)
                Toast.show({
                    type: 'success',
                    text1: 'User verified!',
                    text2: 'You can now login with your credentials.',
                })
                setLoading(false)
            }


        } catch (error) {
            setErrorMessage(`Verification failed : ${error}`)
            setLoading(false)
        }
    }

    const handleResendOtp = (body: any) => {
        setSeconds(initialSeconds)
        // router.navigate({
        //     pathname:'./(dashbaord)',
        //     params:{email:body?.email,phoneNumber:body?.phoneNumber}
        // })
    }

    const handleverify = async (body: any) => {

        router.navigate({
            pathname: './(dashbaord)',
            params: { email: body?.email, phoneNumber: body?.phoneNumber }
        })
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            {
                loading ? <LoaderScreen /> :
                    <ScrollView>
                        <Animated.View
                            style={[styles.container,
                            {
                                transform: [{ translateY: slideAnim }], // Apply the animated translateY to the view
                            },
                            ]}
                        >

                            <View style={{ minWidth: '100%', marginTop: 10 }}>
                                <Text style={[styles.headerText, { color: darkColor }]}>Enter the OTP Sent To Your Email/Phone Number</Text>
                            </View>
                            <Formik
                                initialValues={{ email: email, verificationCode: '' }}
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {
                                    handleVerifyOtp(values);
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <Animated.View style={[styles.container]}>


                                        <View style={[styles.inputContainer, {}]}>
                                            {/* <Text style={[styles.p]}>Phone number</Text> */}
                                            <TextInput
                                                placeholder="OTP"
                                                onChangeText={handleChange('verificationCode')}
                                                onBlur={handleBlur('verificationCode')}
                                                keyboardType="numeric"
                                                maxLength={6}
                                                value={values.verificationCode}
                                                style={[
                                                    styles.input,
                                                    { borderColor: touched.verificationCode && errors.verificationCode ? 'red' : 'black' },
                                                ]}
                                            />
                                            {touched.verificationCode && errors.verificationCode ? <Text style={styles.errorText}>{errors.verificationCode}</Text> : null}
                                            {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                                            <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                                <Pressable
                                                    onPress={handleResendOtp}
                                                    disabled={seconds != 0}
                                                    style={({ pressed }) => pressed ?
                                                        { opacity: .8, }
                                                        :
                                                        { opacity: 1, }}
                                                ><Text style={[styles.p]}> {`Resend OTP in ${seconds}`}</Text></Pressable>
                                            </View>
                                        </View>








                                        <Pressable
                                            onPress={() => handleSubmit()}
                                            style={({ pressed }) => pressed ?
                                                { opacity: .8, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53, }
                                                :
                                                { opacity: 1, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53 }}
                                        ><Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Verify</Text>
                                        </Pressable>

                                        <View style={{ width: '100%', alignItems: 'center', display: 'flex' }}>
                                            <BodyText extraStyle={{ color: 'red', margin: 10 }} text={errorMessage} />
                                        </View>

                                    </Animated.View>
                                )}
                            </Formik>

                        </Animated.View>
                    </ScrollView>
            }

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

export default Verificationcreen;