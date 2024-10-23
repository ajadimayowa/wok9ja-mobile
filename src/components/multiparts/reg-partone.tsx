import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../../constants/colors'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const RegStepOne = () => {
  

    const init = { email: '', password: '' }
    return (

        <View>
            <View style={[styles.inputContainer, {}]}>
                <Text style={[styles.p, { color: darkColor, fontSize: 18 }]}>Fullname</Text>
                <TextInput
                    placeholder="Fullname"
                    // onChangeText={handleChange('email')}
                    // onBlur={handleBlur('email')}
                    // value={values.email}
                    // style={[
                    //     styles.input,
                    //     { borderColor: touched.email && errors.email ? 'red' : 'black' },
                    // ]}
                />
                {/* {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null} */}
            </View>

            <View style={[styles.inputContainer, {}]}>
                <Text style={[styles.p, { color: darkColor, fontSize: 18 }]}>Username</Text>
                <TextInput
                    placeholder="Email"
                    // onChangeText={handleChange('email')}
                    // onBlur={handleBlur('email')}
                    // value={values.email}
                    // style={[
                    //     styles.input,
                    //     { borderColor: touched.email && errors.email ? 'red' : 'black' },
                    // ]}
                />
                {/* {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null} */}
            </View>

            

            <Pressable
                // onPress={() => handleSubmit()}
                style={({ pressed }) => pressed ?
                    { opacity: .8, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53, }
                    :
                    { opacity: 1, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53 }}
            ><Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Next</Text></Pressable>
        </View>

    )
}

const styles = ScaledSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        // backgroundColor: 'yellow',
        flex: 1,
        maxWidth: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
    },

    formContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        maxWidth: '100%',
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

export default RegStepOne