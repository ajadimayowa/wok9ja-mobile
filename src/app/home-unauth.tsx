import React, { useEffect, useRef } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, greyColor, primaryColor, successColor } from '../constants/colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import CustomSearchBar from '../components/inputs/search-input';
import { useRouter } from 'expo-router';
import {BodyText, CaptionText, HeaderText, LargeCaptionText, LinkText, TitleText} from '../constants/typography';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
});

const headerText = "Empowering Nigerians with Remote Work Opportunity & Connections."
const headerSubText = 'Work9ja connects Nigerian professionals with remote work opportunities providing a seamless platform for job seekers and employers to collaborate and thrive in a flexible work environment.'

const UnAuthHomeScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(500)).current; // Start the view off-screen (500 units down)

    useEffect(() => {
        // Trigger the animation on component mount
        Animated.timing(slideAnim, {
            toValue: 0, // Move it to its final position (0 units down)
            duration: 500, // Animation duration
            useNativeDriver: true, // Improves performance by using the native animation driver
        }).start();
    }, [slideAnim]);


    const handleNavigateToLogin = () => {
        router.navigate('./login')
    }

    const handleNavigateToRegister = () => {
        router.navigate('./registration')
    }

    const handleNavigateToExploreScreen = () => {
        router.navigate('./registration')
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            <ScrollView style={styles.container}>
                <Animated.View
                    style={[
                        {
                            transform: [{ translateY: slideAnim }], // Apply the animated translateY to the view
                        },
                    ]}
                >
                    <View style={styles.layerOne}>
                        <HeaderText extraStyle={{color:'#fff'}} text={headerText}/>
                        <BodyText extraStyle={{color:'#fff'}} text={headerSubText}/>
                        <CustomSearchBar extraStyle={{marginTop:10}} />
                    </View>

                    <View style={styles.layerTwo}>
                    <Pressable
                            onPress={handleNavigateToExploreScreen}
                            style={({ pressed }) => pressed ? { opacity: .9 } : { opacity: 1 }}
                        >
                        <View style={{ alignItems: 'center', gap: 10 }}>
                            <View style={styles.card}>
                                <Ionicons name='globe' size={60} color={accentColor} />
                            </View>
                            <LargeCaptionText text={'Explore Market'}/>
                        </View>
                        </Pressable>

                        <Pressable
                            onPress={handleNavigateToRegister}
                            style={({ pressed }) => pressed ? { opacity: .9 } : { opacity: 1 }}
                        >
                        <View style={{ alignItems: 'center', gap: 10 }}>
                            <View style={styles.card}>
                                <Ionicons name='people' size={60} color={accentColor} />
                            </View>
                            <LargeCaptionText text={'Become a member'}/>
                        </View>
                        </Pressable>
                    </View>


                </Animated.View>
                <View style={styles.layerThree}>
                    <Pressable
                        onPress={handleNavigateToLogin}
                        style={({ pressed }) => pressed ? { opacity: .9 } : { opacity: 1 }}
                    >
                        <LinkText extraStyle={{color: successColor}} text={'Sign in'}/>
                        {/* <Text style={[styles.headerText, { color: successColor }]}></Text> */}
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => pressed ? { opacity: .9 } : { opacity: 1 }}
                    ><LinkText extraStyle={{color: successColor}} text={'About us'}/>
                    </Pressable>
                </View>
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
        flex: 1
    },
    layerOne: {
        display: 'flex',
        gap: 5,
        backgroundColor: primaryColor,
        padding: '20@s',
        paddingVertical: '20%',
        // paddingTop: '20%',
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
        paddingTop: '2%',
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

export default UnAuthHomeScreen;