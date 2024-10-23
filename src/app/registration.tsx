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
import { BodyText } from '../constants/typography';
import api from '../config/apiConfig';
import LoaderScreen from '../components/screens/LoaderScreen';
import Toast from 'react-native-toast-message';




const LoginScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().min(3, 'Cannot be less than 3 character').required('Required'),
        phoneNumber: Yup.number().typeError('Must be a number').min(11, 'Cannot be less than 11 digits').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match') // Removed 'null' from here
            .required('Confirm Password is required'),
    });

    useEffect(() => {
        // Trigger the animation on component mount
        Animated.timing(slideAnim, {
            toValue: 0, // Move it to its final position (0 units down)
            duration: 500, // Animation duration
            useNativeDriver: true, // Improves performance by using the native animation driver
        }).start();
    }, [slideAnim]);


    const handleNavigateToCodeVerification = async (body: any) => {
        setLoading(true);
        const { fullName, phoneNumber, email, password } = body
        const payload = {
            fullName,
            phoneNumber,
            email,
            password
        }
        try {
            const res = await api.post('/auth/register', payload);
            setLoading(false);
            Toast.show({
                type:'success',
                text1:'Registration successful.',
                text2:'Kindly check your email for verification code'
            })
            router.navigate({
                pathname: './verification-screen',
                params: { email: body?.email, phoneNumber: body?.phoneNumber }
            })

        } catch (error: any) {
            // ToastAndroid.show('Registeration Failed :', error);
            Toast.show({
                type: 'error',
                text1: 'User already exist/Network error!'
            });
            setLoading(false);
        }

    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
                    <ScrollView>
                        <Animated.View
                            style={[styles.container,
                            {
                                transform: [{ translateY: slideAnim }], // Apply the animated translateY to the view
                            },
                            ]}
                        >

                            <View style={{ minWidth: '100%', marginTop: 10 }}>
                                <Text style={[styles.headerText, { color: darkColor }]}>Register with your email.</Text>
                            </View>
                            <Formik
                                initialValues={{ fullName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' }}
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {
                                    handleNavigateToCodeVerification(values);
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <Animated.View style={[styles.container]}>
                                        <View style={[styles.inputContainer, {}]}>
                                            <BodyText text={'Fullname'} />
                                            <CustomInputField
                                                placeholder="Fullname"
                                                onChangeText={handleChange('fullName')}
                                                onBlur={handleBlur('fullName')}
                                                value={values.fullName}
                                                extraStyle={{ borderColor: touched.fullName && errors.fullName ? 'red' : 'black' }}
                                                lIcon={'person-outline'} type={'text'} />
                                            {touched.fullName && errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
                                            
                                        </View>

                                        <View style={[styles.inputContainer, {}]}>

                                            <BodyText text={'Email'} />
                                            <CustomInputField
                                                placeholder="Email"
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                extraStyle={{ borderColor: touched.email && errors.email ? 'red' : 'black' }}
                                                lIcon={'mail-outline'} type={'text'} />
                                            {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                                        </View>

                                        <View style={[styles.inputContainer, {}]}>
                                            <BodyText text={'Phone number'} />
                                            <CustomInputField
                                                type='number'
                                                placeholder="Phone number"
                                                onChangeText={handleChange('phoneNumber')}
                                                onBlur={handleBlur('phoneNumber')}
                                                value={values.phoneNumber}
                                                maxLength={11}
                                                keyboardType="numeric"
                                                extraStyle={{ borderColor: touched.phoneNumber && errors.phoneNumber ? 'red' : 'black' }}
                                                lIcon={'call-outline'} />
                                            {touched.phoneNumber && errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
                                        </View>


                                        <View style={[styles.inputContainer, {}]}>
                                            <BodyText text={'Password'} />
                                            <CustomInputField
                                                type='text'
                                                placeholder="Password"
                                                secureTextEntry={secure}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                extraStyle={{ borderColor: touched.password && errors.password ? 'red' : 'black' }}
                                                rIcon={true} />
                                            {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                                        </View>

                                        <View style={[styles.inputContainer, {}]}>
                                            <BodyText text={'Confirm Password'} />
                                            <CustomInputField
                                                placeholder="Confirm Password"
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                value={values.confirmPassword}
                                                extraStyle={{ borderColor: touched.password && errors.password ? 'red' : 'black' }}
                                                rIcon={true} />
                                            {touched.confirmPassword && errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

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
                                            <Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Register</Text>
                                        }
                                            </Pressable>


                                    </Animated.View>
                                )}
                            </Formik>

                        </Animated.View>
                    </ScrollView>

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