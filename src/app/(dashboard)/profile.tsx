import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../../constants/colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import CustomSearchBar from '@/src/components/inputs/search-input';
import { useNavigation, useRouter } from 'expo-router';
import { logUserOut } from '@/src/helpers';
import ActivityListCard from '@/src/components/cards/activity-list-card';
import { LargeCaptionText, TitleText } from '@/src/constants/typography';
import ActivityListFullCard from '@/src/components/cards/activity-list-full-card';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
});

const LoginScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const navigation = useNavigation();


    const handleLogOut = () => {
        logUserOut();
        router.replace('../home-unauth')
    }


    useEffect(() => {
        // Trigger the animation on component mount
        Animated.timing(slideAnim, {
            toValue: 0, // Move it to its final position (0 units down)
            duration: 500, // Animation duration
            useNativeDriver: true, // Improves performance by using the native animation driver
        }).start();
    }, [slideAnim]);


    const handleNavigateToLogin = () => {
        router.back()
    }

    const doables = [
        {
            title: 'Active orders',
            icon: 'pie-chart-outline',
            url: './orders',
            count: '2'
        },
        {
            title: 'Gig Perfomance',
            icon: 'bar-chart-outline',
            url: './orders',
            count: ''
        },
        {
            title: 'Notifications',
            icon: 'notifications-outline',
            url: './orders',
            count: '4'
        },
    ]

    const doablesUser = [
        {
            title: 'Update profile',
            icon: 'pie-chart-outline',
            path: '../user-screens/update-profile',
            count: ''
        },
        {
            title: 'Complete Kyc',
            icon: 'pie-chart-outline',
            path: '../user-screens/kyc-screen',
            count: ''
        }
    ]

    const settingsUser = [
        {
            title: 'Prefference',
            icon: 'pie-chart-outline',
            url: './orders',
            count: ''
        },
        {
            title: 'Account',
            icon: 'bar-chart-outline',
            url: './orders',
            count: ''
        },
        {
            title: 'Security',
            icon: 'notifications-outline',
            url: './orders',
            count: ''
        },
    ]

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Mayowa Ajadi`, // Custom title
            headerStyle: {
                backgroundColor: primaryColor, // Set the background color
            },
            headerTintColor: '#fff', // Set the color of the back button and title
            headerTitleStyle: {
                fontWeight: 'bold', // Customize title font style
            },
            headerRight: ({ size, color }: any) => (
                <View style={{ paddingHorizontal: 15 }}><TouchableOpacity onPress={handleLogOut}><Ionicons color={'#fff'} size={24} name={'power'} /></TouchableOpacity></View>
            ),
            headerLeft: ({ size, color }: any) => (
                <View style={{ paddingLeft: 10 }}>
                    <Image
                        style={{ height: 40, width: 40, borderRadius: 25 }}
                        source={require('../../assets/images/tailorImage.jpg')} />
                </View>
            )
        });
    }, [navigation]);

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

                {/* <View style={{ minWidth: '100%', marginTop: 10 }}>
                    <Text style={[styles.headerText, { color: darkColor }]}>Login with your email</Text>
                </View> */}

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: '2%' }}>

                    <LargeCaptionText text='Manage gig' />
                    <LargeCaptionText text='Manage Profile' />
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <ActivityListCard data={doables} />
                    <ActivityListCard data={doablesUser} />
                </View>


                <View style={{ width: '100%',marginTop:'5%', flexDirection: 'row', justifyContent: 'space-between', padding: '2%' }}>
                    <TitleText text='Settings' />
                </View>
                <ActivityListFullCard data={settingsUser} />

                



                {/* <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <Animated.View style={[styles.container]}>
                            <View style={[styles.inputContainer, {}]}>
                                <TextInput
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={[
                                        styles.input,
                                        { borderColor: touched.email && errors.email ? 'red' : 'black' },
                                    ]}
                                />
                                {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            </View>


                            <View style={[styles.inputContainer, {}]}>
                            <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <Pressable
                                        onPress={() => setSecure(!secure)}
                                        style={({ pressed }) => pressed ?
                                            { opacity: .8, }
                                            :
                                            { opacity: 1, }}
                                    ><Text style={[styles.p]}>Show</Text></Pressable>
                                </View>
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry={secure}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    style={[
                                        styles.input,
                                        { borderColor: touched.password && errors.password ? 'red' : 'black' },
                                    ]}
                                />
                                {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                                <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <Pressable
                                        // onPress={() => handleSubmit()}
                                        style={({ pressed }) => pressed ?
                                            { opacity: .8, }
                                            :
                                            { opacity: 1, }}
                                    ><Text style={[styles.p]}>Forgot password</Text></Pressable>
                                </View>
                            </View>




                            <View style={[styles.inputContainer, { gap: 20 }]}>




                                <View style={{ maxWidth: '100%' }}>

                                </View>
                            </View>



                            <Pressable
                                onPress={() => handleSubmit()}
                                style={({ pressed }) => pressed ?
                                    { opacity: .8, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53, }
                                    :
                                    { opacity: 1, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53 }}
                            ><Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Login</Text></Pressable>


                        </Animated.View>
                    )}
                </Formik> */}

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
        paddingVertical: '5%',
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