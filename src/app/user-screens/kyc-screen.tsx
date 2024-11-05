import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Image, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
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
import { IKyc } from '@/src/interfaces/interface';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '@/src/store/store';





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
    const [initialValues, setInitialValues] = useState<IKyc | null>(null);
    const [states, setStates] = useState<IStates[]>([{ id: '', state: '', localGovernmentAreas: '' }]);
    const [lgas, setLgas] = useState<IStates[]>([{ id: '', state: '', localGovernmentAreas: '' }]);
    const { id, token } = useAppSelector((state) => state.userslice.userBio);
    const [stateId, setStateId] = useState<number>(1);




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
        idType: Yup.string().min(3, 'Cannot be less than 3 characters').required('Required'),
        idNumber: Yup.string().min(3, 'Cannot be less than 3 characters').required('Required'),
    });

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    useEffect(() => {
        fetchStates();
    }, [navigation]);

    useEffect(() => {
        fetchLgas();
    }, [stateId]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `User Verification`,
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

    const handleCompleteKyc = async (body: IKyc) => {
        try {
            if(image){
                let formData = new FormData();
                formData.append('idType',body?.idType);
                formData.append('idNumber',body?.idNumber);
                formData.append('idDocumentFile',image);
                formData.append('userId',id);

                console.log({sending:formData})
                const res = await api.post('/user/kyc',formData);
                if(res.status==200){
                    Toast.show({
                        type:'success',
                        text1:'Kyc completed'
                    })
                    router.navigate('../(dashboard)/create')
                }
                }
           
        } catch (error) {
            console.log({errorHere:error})
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
                    <View style={{ width: '100%', paddingHorizontal: '2%' }}>
                        <TitleText text='Upload documents.' />
                        <BodyText text='We need to verify your documents before you can become a seller.' />
                    </View>
                    <Formik
                        initialValues={{
                            idType: '',
                            idNumber: '',
                        }}
                        validationSchema={SignupSchema}
                        // enableReinitialize
                        onSubmit={(values) => {
                            handleCompleteKyc(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                            <Animated.View style={styles.container}>

                                <View style={[styles.inputContainer, {}]}>
                                    <BodyText extraStyle={{ marginTop: '5%' }} text={'Select ID Type'} />
                                    <CustomInputField
                                        type={'select'}
                                        data={verificationIdType}
                                        placeholder="Select"
                                        onChangeText={(e: any) => { setFieldValue('idType', e.state) }}
                                        onBlur={() => handleBlur('state')}
                                        value={values.idType}
                                        extraStyle={{ padding: 0, paddingHorizontal: 10, borderColor: touched.idType && errors.idType ? 'red' : 'black' }}
                                        lIcon={'id-card-outline'} />
                                    {touched.idType && errors.idType ? <Text style={styles.errorText}>{errors.idType}</Text> : null}
                                </View>


                                <View style={[styles.inputContainer, {}]}>
                                    <BodyText text={'ID Number'} />
                                    <CustomInputField
                                        type='text'
                                        placeholder=""
                                        onChangeText={handleChange('idNumber')}
                                        onBlur={handleBlur('idNumber')}
                                        value={values.idNumber}
                                        extraStyle={{ borderColor: touched.idNumber && errors.idNumber ? 'red' : 'black' }}
                                        lIcon={'create-outline'} />
                                    {touched.idNumber && errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}
                                </View>

                                <View style={{ minWidth: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={handleImagePick} style={{ alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="camera-plus-outline" size={50} />
                                    </TouchableOpacity>

                                    {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
                                </View>
                                {
                                    !image &&
                                    <View style={{ minWidth: '100%', alignItems: 'center', marginBottom: '10%' }}>
                                        <CaptionText text='Tap to upload file' />
                                    </View>
                                }

                                <Pressable
                                    onPress={() => handleSubmit()}
                                    style={({ pressed }) => pressed
                                        ? { opacity: 0.8, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53 }
                                        : { opacity: 1, minWidth: 50, alignItems: 'center', borderRadius: 7, backgroundColor: blackColor, padding: '3%', minHeight: 53 }}
                                >
                                    <Text style={[styles.p, { color: '#fff', fontSize: 18 }]}>Verify</Text>
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

export default KycScreen;