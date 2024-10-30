import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Image, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../../constants/colors'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import CustomSearchBar from '@/src/components/inputs/search-input';
import { useNavigation, useRouter } from 'expo-router';
import { CustomInputField } from '@/src/components/inputs/inputField';
import { BodyText, CaptionText, TitleText } from '@/src/constants/typography';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'
import api from '@/src/config/apiConfig';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '@/src/store/store';
import { getToken } from '@/src/helpers';
import { IUserBio } from '@/src/interfaces/user';



interface IUser {
    userId:string,
    fullName: string;
    phoneNumber: string,
    homeAddress: string,
    state: string,
    lga: string,
}

interface IStates {
    id: string;
    state: string;
    localGovernmentAreas: string;
}


const UpdateProfileScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const navigation = useNavigation();
    const [image, setImage] = useState<string | null>(null);
    const [userInfo,setUserInfo] = useState<IUserBio>();
    const [initialValues, setInitialValues] = useState<IUser | null>(null);
    const [states, setStates] = useState<IStates[]>([{ id: '', state: '', localGovernmentAreas: '' }]);
    const [lgas, setLgas] = useState<IStates[]>([{ id: '', state: '', localGovernmentAreas: '' }]);
    const [stateId, setStateId] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const { id,token } = useAppSelector((state)=>state.userslice.userBio);
    



    const fetchUserInfo = async () => {
        try {
            setLoading(true)
            // const res = await api.get('/service/all-services');
            const res = await api.get(`/user/get-user?userId=${id}`);
            const {token} = await getToken()
            // const resGigs = await api.get('gig/get-gigs');
            // console.log({ hereIsInfo: res.data?.payload })
            // console.log({ hereIsServ: res.data })
            if (res.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Login successful'
                })
                // setServices(res.data?.payload);
                setUserInfo(res.data?.payload);
                setLoading(false)
            }
        } catch (error) {
            console.log({ fetchedEr: error });
            setLoading(false)
        }

    }
    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('We cant access your gallery without your permission');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Store the image URI
        }
    };

    const fetchValue = async (key: string) => {
        try {
            const result = await SecureStore.getItemAsync(key);
            if (result) {
                const parsedResult: IUser = JSON.parse(result); // Parse the stored JSON string
                // console.log({ inStore: parsedResult })
                setInitialValues({ ...parsedResult}); // Set as initial values for Formik
                // console.log('Data retrieved:', parsedResult);
            } else {
                // console.log('No data found for key:', key);
            }
        } catch (error) {
            // console.log('Error fetching data', error);
        }
    };

    const fetchStates = async () => {
        try {
            const res = await api.get('/states');
            setStates(res.data)

        } catch (error) {
            // console.log('Error fetching data', error);
            setStates([])
        }
    };

    const fetchLgas = async () => {
        try {
            const res = await api.get(`/state/${stateId}`);
            // console.log({ resp: res.data })
            let lgs = res.data.map((lg: any, index: number) => ({ id: index + 1, state: lg, localGovernmentAreas: [] }))
            setLgas(lgs);

        } catch (error) {
            // console.log('Error fetching data LGA Data', error);
            setLgas([])
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await api.get(`/state/${stateId}`);
            // console.log({ resp: res.data })
            let lgs = res.data.map((lg: any, index: number) => ({ id: index + 1, state: lg, localGovernmentAreas: [] }))
            setLgas(lgs);

        } catch (error) {
            // console.log('Error fetching data LGA Data', error);
            setLgas([])
        }
    };

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().min(3, 'Cannot be less than 3 characters').required('Required'),
        phoneNumber: Yup.number()
            .typeError('Must be a number')
            .min(11, 'Cannot be less than 11 digits')
            .required('Required'),
        homeAddress: Yup.string().min(3, 'Cannot be less than 3 characters').required('Required'),
        lga: Yup.string().min(3, 'Cannot be less than 3 characters').required('Required'),
        state: Yup.string().min(3, 'Cannot be less than 3 characters').required('Required'),

    });

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    useEffect(() => {
        // fetchValue('userInfo'); // Fetch user info from SecureStore
        fetchUserInfo()
        fetchStates();
    }, [navigation]);

    useEffect(() => {
        fetchLgas();
    }, [stateId]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Update profile`,
            headerStyle: {
                backgroundColor: primaryColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => (
                <View>
                    <TouchableOpacity>
                        <Ionicons color={'#fff'} size={24} name={'person-outline'} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const handleUpdateUser = async (body: any) => {
        try {
            setLoading(true)
        const res = await api.post(`/user/update-user?userId=${body?.profile.id}`);
        if(res.status==200){
            setLoading(false)
            Toast.show({
                type:'success',
                text1:'Profile Updated Successfully'
            })
        }
      console.log({filledInfo:body})
            
        } catch (error:any) {
            Toast.show({
                type: 'error',
                text1: `Error Message: ${error}`
            });
            
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            <ScrollView>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Formik
                        initialValues={{
                            userId:userInfo?.profile.id||'',
                            fullName: userInfo?.profile.fullName||'',
                            phoneNumber: userInfo?.contact.phoneNumber||'',
                            homeAddress: userInfo?.userLocation.homeAddress||'',
                            lga: userInfo?.userLocation.lga||'',
                            state: userInfo?.userLocation.state||'',
                        }}
                        validationSchema={SignupSchema}
                        enableReinitialize
                        onSubmit={(values) => {
                            handleUpdateUser(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                            <Animated.View style={styles.container}>
                                <View style={{ minWidth: '100%', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={handleImagePick} style={{ minWidth: '100%', alignItems: 'center' }}>
                                        <Ionicons name="person-circle" size={50} />
                                        <CaptionText text="Profile picture" />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ minWidth: '100%', alignItems: 'center' }}>
                                    {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
                                </View>



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
                                    <BodyText text={'Phone number'} />
                                    <CustomInputField
                                        type='number'
                                        placeholder="Phone number"
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber.toString()}
                                        maxLength={11}
                                        keyboardType="numeric"
                                        extraStyle={{ borderColor: touched.phoneNumber && errors.phoneNumber ? 'red' : 'black' }}
                                        lIcon={'call-outline'} />
                                    {touched.phoneNumber && errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
                                </View>

                                <View style={[styles.inputContainer, {}]}>
                                    <BodyText text={'Street Address'} />
                                    <CustomInputField
                                        placeholder="22 first floor"
                                        onChangeText={handleChange('homeAddress')}
                                        onBlur={handleBlur('homeAddress')}
                                        value={values.homeAddress}
                                        extraStyle={{ borderColor: touched.homeAddress && errors.homeAddress ? 'red' : 'black' }}
                                        lIcon={'location-outline'} type={'text'} />
                                    {touched.homeAddress && errors.homeAddress ? <Text style={styles.errorText}>{errors.homeAddress}</Text> : null}
                                </View>

                                <View style={[styles.inputContainer, {borderRadius:10}]}>
                                    <BodyText text={'State'} />
                                    <CustomInputField
                                    type={'select'}
                                    data={states}
                                        placeholder="Select"
                                        onChangeText={(e: any) => { setStateId(e.id); setFieldValue('state', e.state) }}
                                        onBlur={()=>handleBlur('state')}
                                        value={values.state}
                                        extraStyle={{padding:0,paddingHorizontal:10, borderColor: touched.homeAddress && errors.homeAddress ? 'red' : 'black' }}
                                        lIcon={'bus-outline'} />
                                    
                                    {touched.state && errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
                                </View>

                                <View style={[styles.inputContainer, {borderRadius:10}]}>
                                    <BodyText text={'LGA'} />
                                    <CustomInputField
                                    type={'select'}
                                    data={lgas}
                                        placeholder="Select"
                                        onChangeText={(e: any) => {setFieldValue('lga', e.state) }}
                                        onBlur={()=>handleBlur('lga')}
                                        value={values.lga}
                                        extraStyle={{padding:0,paddingHorizontal:10, borderColor: touched.homeAddress && errors.homeAddress ? 'red' : 'black' }}
                                        lIcon={'bicycle-outline'} />
                                    
                                    {touched.state && errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
                                </View>



                                <Pressable
                                    onPress={() => handleSubmit()}
                                    style={({ pressed }) => pressed
                                        ? { opacity: 0.8, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53 }
                                        : { opacity: 1, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53 }}
                                >
                                    {
                                            loading?<ActivityIndicator size="small" color='#fff' />:
                                            <Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Update</Text>
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

export default UpdateProfileScreen;