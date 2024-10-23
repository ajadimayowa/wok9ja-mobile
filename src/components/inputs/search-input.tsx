import React from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { greyColor, primaryColor, successColor } from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const SignupSchema = Yup.object().shape({
    searchWord: Yup.string().required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
    // password: Yup.string().min(6, 'Too short!').required('Required'),
});

const CustomSearchBar = ({extraStyle}:any) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withTiming(scale.value, { duration: 300 }) }],
        };
    });


    return (
        <View>
            <Formik
                initialValues={{ searchWord: '' }}
                // validationSchema={SignupSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={[{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', width: '100%'
                    },extraStyle]}>
                        <Animated.View style={[styles.inputContainer, animatedStyle]}>
                            <View style={styles.inputWrapper}>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                    style={{ flex: 1 }}>
                                    <View style={styles.inputView}>
                                    <TextInput
                                        placeholder="Search service."
                                        onChangeText={handleChange('searchWord')}
                                        onBlur={handleBlur('searchWord')}
                                        value={values.searchWord}
                                        style={[
                                            styles.input,
                                            { borderColor: touched.searchWord && errors.searchWord ? 'red' : '#fff' },
                                        ]}
                                    />
                                </View>
                                </KeyboardAvoidingView>

                                <Pressable
                                    disabled={values.searchWord == ''}
                                    onPress={() => handleSubmit()}
                                    style={({ pressed }) => pressed ?
                                        { opacity: .3, minWidth: 50, borderRadius: 7, backgroundColor: successColor, padding: '3%', minHeight: 53, maxHeight: 53, }
                                        :
                                        { opacity: 1, minWidth: 50, borderRadius: 7, backgroundColor: successColor, padding: '3%', minHeight: 53, maxHeight: 53 }}
                                ><Ionicons name='search' color='#fff' size={24} /></Pressable>
                            </View>

                            {touched.searchWord && errors.searchWord ? <Text style={styles.errorText}>{errors.searchWord}</Text> : null}


                        </Animated.View>

                        {/* <Button

                            onPress={() => console.log('ok')}
                            title="Submit"
                        //  ={()=>console.log('ok')}
                        //   onPressOut={handlePressOut}
                        /> */}
                    </View>
                )}

            </Formik>
        </View>
    )



}

const styles = ScaledSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: 'pink'
    },
    layerOne: {
        display: 'flex',
        gap: 5,
        backgroundColor: primaryColor,
        padding: '20@s',
        paddingVertical: '15%',
        fontFamily: 'primaryFontBold',

    },
    titleText: {
        fontSize: '30@s',
        fontWeight: 'bold',
        color: '#fff'
    },
    p: {
        fontFamily: 'primaryFont',
        fontSize: '16@s',
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        width: '100%',
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        // shadowOpacity:0.5,
        // shadowRadius:2,
        // shadowOffset:{width:2,height:1},
        // shadowColor:'#0000',
        // elevation:8,
        // overflow:'hidden'
       



        // backgroundColor: 'pink'
    },
    inputView:{
    borderColor: greyColor,
    borderWidth: .4,
    borderRadius: 10
    },
    input: {
        borderWidth: '1@s',
        padding: '10@s',
        borderRadius: '10@s',
        backgroundColor: '#fff'
    },
    errorText: {
        color: 'red',
        marginBottom: '5@s',
    },
});


export default CustomSearchBar