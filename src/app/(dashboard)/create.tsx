import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Image, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../../constants/colors'
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomSearchBar from '@/src/components/inputs/search-input';
import { useNavigation, useRouter } from 'expo-router';
import { CustomInputField } from '@/src/components/inputs/inputField';
import { BodyText, CaptionText, TitleText } from '@/src/constants/typography';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'
import api from '@/src/config/apiConfig';
import { Picker } from '@react-native-picker/picker';
import { useAppSelector } from '@/src/store/store';
import { getToken } from '@/src/helpers';
import Toast from 'react-native-toast-message';
import { IUserBio } from '@/src/interfaces/user';
import LoaderScreen from '@/src/components/screens/LoaderScreen';



interface IUser {
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

const verificationIdType = [
    {
        id: '1',
        state: 'Voters Card',
        localGovernmentAreas: ''

    },
    {
        id: '2',
        state: 'NIN',
        localGovernmentAreas: ''

    },
    {
        id: '3',
        state: 'International Passport',
        localGovernmentAreas: ''

    }
]

const KycScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const navigation = useNavigation();
    const [image, setImage] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<IUserBio>();
    const [initialValues, setInitialValues] = useState<IUser | null>(null);
    const [states, setStates] = useState<IStates[]>([{ id: '', state: '', localGovernmentAreas: '' }]);
    const [lgas, setLgas] = useState<IStates[]>([{ id: '', state: '', localGovernmentAreas: '' }]);
    const [stateId, setStateId] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const { id, token } = useAppSelector((state) => state.userslice.userBio);



    const fetchUserInfo = async () => {
        try {
            setLoading(true)
            // const res = await api.get('/service/all-services');
            const res = await api.get(`/user/get-user?userId=${id}`);
            const { token } = await getToken()
            if (res.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'FetchedInfooo'
                })
                // setServices(res.data?.payload);
                setUserInfo(res.data?.payload);
                setLoading(false);
                setStateId(res.data?.payload?.userLocation?.stateId)
            }
        } catch (error) {
            // console.log({ fetchedEr: error });
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
                setInitialValues({ ...parsedResult }); // Set as initial values for Formik
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
        fetchStates();
        fetchUserInfo()

    }, [navigation]);

    useEffect(() => {
        fetchLgas();
    }, [stateId]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Create gig`,
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

    const handleUpdateUser = (body: IUser) => {
        // console.log({ filledInfo: body })
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            {
                loading ?
                    <LoaderScreen /> :
                    <Animated.View
                        style={[
                            styles.container,
                            {
                                transform: [{ translateY: slideAnim }],
                                // backgroundColor:'red',
                                flex: 1
                            },
                        ]}
                    >
                        {userInfo?.kyc.isVerified ?
                            <ScrollView>
                                <Formik
                                    initialValues={initialValues || {
                                        fullName: '',
                                        phoneNumber: '',
                                        homeAddress: '',
                                        lga: '',
                                        state: ''
                                    }}
                                    validationSchema={SignupSchema}
                                    enableReinitialize
                                    onSubmit={(values) => {
                                        handleUpdateUser(values);
                                    }}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                                        <>
                                            <View style={[styles.inputContainer, {}]}>
                                                <BodyText extraStyle={{ marginTop: '5%' }} text={'Select ID Type'} />
                                                <CustomInputField
                                                    type={'select'}
                                                    data={verificationIdType}
                                                    placeholder="Select"
                                                    onChangeText={(e: any) => { setStateId(e.id); setFieldValue('state', e.state) }}
                                                    onBlur={() => handleBlur('state')}
                                                    value={values.state}
                                                    extraStyle={{ padding: 0, paddingHorizontal: 10, borderColor: touched.homeAddress && errors.homeAddress ? 'red' : 'black' }}
                                                    lIcon={'id-card-outline'} />
                                                {touched.fullName && errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
                                            </View>

                                            <View style={[styles.inputContainer, {}]}>
                                                <BodyText text={'ID Number'} />
                                                <CustomInputField
                                                    type='text'
                                                    placeholder=""
                                                    onChangeText={handleChange('phoneNumber')}
                                                    onBlur={handleBlur('phoneNumber')}
                                                    value={values.phoneNumber}
                                                    maxLength={11}
                                                    keyboardType="numeric"
                                                    extraStyle={{ borderColor: touched.phoneNumber && errors.phoneNumber ? 'red' : 'black' }}
                                                    lIcon={'create-outline'} />
                                                {touched.phoneNumber && errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
                                            </View>



                                            <View style={{ minWidth: '100%', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={handleImagePick} style={{ minWidth: '100%', alignItems: 'center' }}>
                                                    <MaterialCommunityIcons name="camera-plus-outline" size={50} />
                                                    <CaptionText text="Tap to upload document" />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ minWidth: '100%', alignItems: 'center', marginBottom: '10%' }}>
                                                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
                                            </View>



                                            <Pressable
                                                onPress={() => handleSubmit()}
                                                style={({ pressed }) => pressed
                                                    ? { opacity: 0.8, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53 }
                                                    : { opacity: 1, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53 }}
                                            >
                                                <Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Verify</Text>
                                            </Pressable>
                                        </>
                                    )}
                                </Formik>
                            </ScrollView>
                            :
                            <View style={{ gap: 20 }}>
                                <View style={{ width: '100%', paddingHorizontal: '2%' }}>
                                    <TitleText text='Not verified.' />
                                    <BodyText text='We need to verify your documents before you can become a seller.' />
                                </View>
                                <Pressable
                                    disabled={loading}
                                    onPress={() => router.navigate('../user-screens/kyc-screen')}
                                    style={({ pressed }) => pressed ?
                                        { opacity: .8, minWidth: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53, }
                                        :
                                        { opacity: 1, minWidth: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53, maxHeight: 53 }}
                                >{
                                        loading ? <ActivityIndicator size="small" color='#fff' /> :
                                            <Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Proceed to Kyc</Text>
                                    }
                                </Pressable>
                            </View>
                        }
                    </Animated.View>
            }
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: 'red',
        margin: 0,
        padding: 0
    },
    container: {
        maxWidth: '100%',
        flex: 1,
        padding: '15@s'
    },
    layerOne: {
        // gap: 5,
        backgroundColor: primaryColor,
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

export default KycScreen;