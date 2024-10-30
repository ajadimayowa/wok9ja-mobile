import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor } from '../../constants/colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import CustomSearchBar from '@/src/components/inputs/search-input';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { IService } from '@/src/interfaces/interface';
import ServiceCard from '@/src/components/cards/services-card';
import GigCard from '@/src/components/cards/gig-card';
import { TitleText } from '@/src/constants/typography';
import api from '@/src/config/apiConfig';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { IUserBio } from '@/src/interfaces/user';
import { getToken } from '@/src/helpers';
import LoaderScreen from '@/src/components/screens/LoaderScreen';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
});



interface ISellerGig {
    id: string,
    fullNameOfSeller: string,
    currentLevel: number,
    gigDescription: string,
    sellerCurrentRating: number,
    sellerTotalBuyers: number,
    sellerBasePrice: number,
    isFavourite: boolean,
    gigCategoryId: string
}



interface ILatestNews {
    id: string,
    titleOfNews: string,
    newsDescription: string,
    newsCoverImageUrl: string,
    newsUrl: string,
    newsId: string,
}

const availableServices: IService[] = [
    {
        id: '1',
        nameOfService: 'Fashion & Tailoring',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#421300',
        colorCode2: '#DB6304',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '2',
        nameOfService: 'Gadget & Electronics',
        briefDescription: 'Sales of all kinds of electronics and repaire',
        colorCode: '#254200',
        colorCode2: '#706203',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '3',
        nameOfService: 'Programing & Tech',
        briefDescription: 'All programing related services',
        colorCode: '#00732E',
        colorCode2: '#D1F7E6',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '4',
        nameOfService: 'Photography and Design',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '5',
        nameOfService: 'Article and Writting',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#FF7640',
        colorCode2: '#D1F8E6',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '6',
        nameOfService: 'Social Media Marketing',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '7',
        nameOfService: 'Virtual Assistant',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#4D1727',
        colorCode2: '#BD5272',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '8',
        nameOfService: 'Interior Decor',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#00732E',
        colorCode2: '#BD5272',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '9',
        nameOfService: 'Beauty and Cosmetics',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '10',
        nameOfService: 'Catering Services',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#8F2900',
        colorCode2: '#CE6C39',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '11',
        nameOfService: 'Logistics',
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#687200',
        colorCode2: '#00732E',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
]

const latestNewsOnWok9ja: ILatestNews[] = [
    {
        id: '1',
        titleOfNews: 'Location filtering is now available',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },

    {
        id: '2',
        titleOfNews: 'New face to kyc',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },

    {
        id: '3',
        titleOfNews: 'You can now buy credit via vendors',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },
]

const availableGigs: ISellerGig[] = [
    {
        id: '1',
        fullNameOfSeller: 'Odeleye Olive',
        currentLevel: 4,
        gigDescription: 'Sew modern and stylish women clothing for all occasions',
        gigCategoryId: 'Fashion & Tailoring',
        sellerCurrentRating: 4.3,
        sellerTotalBuyers: 40,
        sellerBasePrice: 5000,
        isFavourite: true
    },

    {
        id: '2',
        fullNameOfSeller: 'Akintayo Charles',
        currentLevel: 3,
        gigCategoryId: 'Photography and Design',
        gigDescription: 'Do all your graphics design jobs',
        sellerCurrentRating: 3.7,
        sellerTotalBuyers: 25,
        sellerBasePrice: 3600,
        isFavourite: false
    },

    {
        id: '3',
        fullNameOfSeller: 'Chima Austine',
        currentLevel: 1,
        gigCategoryId: 'Programing & Tech',
        gigDescription: 'Build business landing pages with wordpress',
        sellerCurrentRating: 3.3,
        sellerTotalBuyers: 45,
        sellerBasePrice: 70000,
        isFavourite: true
    },
]


const DashboardScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true);
    const { id,token } = useAppSelector((state)=>state.userslice.userBio);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const userBio = useAppSelector((state) => state.userslice);
    const [userInfo,setUserInfo] = useState<IUserBio>();
    const [services,setServices] = useState<IService[]>([]);
    const [loading, setLoading] = useState(false);
    // const [userTOken,setUserToken]

    const handleTokenCheck = async () => {
        const {token} = await getToken();
        if (!token) {
            // setUserTok(token)
            router.replace('./home-unauth');
        } else {
            router.replace('./(dashboard)')
        }
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

    const handleNavigateToServiceViewScreen = (serviceId: string, serviceName: string) => {
        router.push({
            pathname: `../service/[serviceId]`,
            params: { serviceId: serviceId, serviceName: serviceName }
        })
    }

    const handleNavigateToGigViewScreen = (gigId: string, gigCategory: string) => {
        router.push({
            pathname: `../gig/[gigId]`,
            params: { gigId: gigId, gigCategory: gigCategory }
        })
    }
    const fetchServices = async () => {
        try {
            // const res = await api.get('/service/all-services');
            const res = await api.get(`/user/get-user?userId=${id}`);
            const {token} = await getToken()
            // const resGigs = await api.get('gig/get-gigs');
            console.log({ hereIsInfo: res.data?.payload })
            console.log({ hereIsServ: res.data })
            if (res.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Gotten User'
                })
                // setServices(res.data?.payload);
                setUserInfo(res.data?.payload)
            }
        } catch (error) {
            console.log({ fetchedEr: error })
        }

    }

    const fetchUserInfo = async () => {
        try {
            setLoading(true)
            // const res = await api.get('/service/all-services');
            const res = await api.get(`/user/get-user?userId=${id}`);
            const {token} = await getToken()
            // const resGigs = await api.get('gig/get-gigs');
            console.log({ hereIsInfo: res.data?.payload })
            console.log({ hereIsServ: res.data })
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

    useEffect(() => {
        fetchUserInfo()
    }, [navigation])
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            {
                loading? <LoaderScreen/>:
                <ScrollView style={styles.container}>
                <Animated.View
                    style={[styles.container,
                    {
                        transform: [{ translateY: slideAnim }], // Apply the animated translateY to the view
                    },
                    ]}
                >


                    <View style={{ minWidth: '100%', marginTop: 10 }}>
                        {
                            <TitleText extraStyle={{ fontSize: 14 }} text={`Welcome ${userInfo?.profile?.firstName}`} />
                        }
                        <TitleText text='Available services' />
                        

                    </View>

                    <ScrollView contentContainerStyle={{ padding: '2%', gap: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            availableServices.map((service: IService, index: number) => (
                                <TouchableOpacity key={index}>
                                    <ServiceCard index={index} serviceData={service} serviceImageUrl={require('../../assets/images/tailorImage.jpg')} />

                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>





                    <View style={{ minWidth: '100%', marginTop: 10, flexDirection: 'row', padding: '3%', justifyContent: 'space-between' }}>

                        <TitleText text='Recomended gigs' />
                        <TouchableOpacity>
                            <Text style={[styles.p, { color: darkColor }]}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 1, padding: '2%', minWidth: '100%' }} contentContainerStyle={{ gap: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            availableGigs.map((gigs: ISellerGig, index: number) => (
                                <TouchableOpacity key={index}>
                                    <GigCard gigData={gigs} index={index} gigImageUrl={require('../../assets/images/tailorImage.jpg')} />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <View style={styles.infomationCard}>
                            <Text style={[styles.headerText, { padding: 0, justifyContent: 'flex-start' }]}>Invite your friends and get rewards</Text>
                            <Text style={[styles.p, { color: '#fff' }]}>Because we are just starting out, invite your friends to sell on wok9ja and get perks and rewards!</Text>

                            <View style={{ width: '100%', paddingHorizontal: '1%', flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: '100%', alignItems: 'center', gap: 5, paddingHorizontal: '3%', flexDirection: 'row' }}>
                                    <Text style={[styles.p, { color: accentColor, alignItems: 'center' }]}>Invite</Text>
                                    <Ionicons name="arrow-forward" color={accentColor} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={{ minWidth: '100%', marginTop: 10, flexDirection: 'row', padding: '3%', justifyContent: 'space-between' }}>
                        <Text style={[styles.headerText, { color: darkColor }]}>Rising talents on wok9ja</Text>
                        <TouchableOpacity>
                            <Text style={[styles.p, { color: darkColor }]}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 1, padding: '2%', minWidth: '100%' }} contentContainerStyle={{ gap: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            availableGigs.map((gigs: ISellerGig, index: number) => (
                                <View style={styles.boxMedium} key={index}>
                                    <View style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        borderTopStartRadius: 10,
                                        borderTopEndRadius: 10, backgroundColor: 'purple', alignItems: 'center',
                                        maxHeight: '50%',

                                    }}>
                                        {/* <Ionicons name='shirt' size={50} /> */}
                                        {/* <Image
                                    source={{ uri: 'https://www.ronkita.biz/app_master/images/services/learn-to-sew/learn-to-sew_980x510.jpg' }} // Remote image URL
                                    style={{}}
                                    resizeMode="cover" // Adjusts how the image fits in the space (optional)
                                /> */}

                                        <Image
                                            source={require('../../assets/images/tailorImage.jpg')} // Remote image URL
                                            // source={{ uri: 'https://www.ronkita.biz/app_master/images/services/learn-to-sew/learn-to-sew_980x510.jpg' }} // Remote image URL
                                            style={{ height: '100%', maxWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                                        // resizeMode="contain" // Adjusts how the image fits in the space (optional)
                                        />
                                    </View>

                                    <View
                                        style={{
                                            width: '100%',
                                            justifyContent: 'flex-start',
                                            // padding:'2%',
                                            borderBottomStartRadius: 5,
                                            borderBottomEndRadius: 5, backgroundColor: '#fff', alignItems: 'center',
                                            minHeight: '50%',
                                        }}>
                                        <View style={{ padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                                <View >
                                                    <Image
                                                        style={{ height: 40, width: 40, borderRadius: 25 }}
                                                        source={require('../../assets/images/tailorImage.jpg')} /></View>
                                                <View>
                                                    <Text style={[styles.p, { color: '#000', fontSize: 12 }]}>{gigs.fullNameOfSeller}</Text>
                                                    <Text>{`Level ${gigs.currentLevel}`}</Text>
                                                </View>
                                            </View>
                                            <View><TouchableOpacity><Ionicons color={gigs.isFavourite ? 'red' : greyColor} size={24} name={gigs.isFavourite ? 'heart' : 'heart-outline'} /></TouchableOpacity></View>
                                        </View>

                                        <View style={{ padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <Text style={[styles.p, { fontSize: 14 }]}>{gigs.gigDescription}</Text>

                                        </View>

                                        <View style={{ padding: '2%', paddingVertical: 5, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <Text>Rating : </Text>
                                                    <Ionicons size={12} name='star' />
                                                    <Text>{gigs.sellerCurrentRating}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>

                                </View>
                            ))
                        }
                    </ScrollView>

                    <View style={{ minWidth: '100%', marginTop: 10 }}>
                        <Text style={[styles.headerText, { color: darkColor }]}>Latest on wok9ja</Text>
                    </View>

                    <ScrollView contentContainerStyle={{ padding: '2%', gap: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            latestNewsOnWok9ja.map((news: ILatestNews, index: number) => (
                                <View key={index} style={styles.box}>
                                    <View style={{ width: '100%', justifyContent: 'center', borderTopStartRadius: 5, borderTopEndRadius: 5, backgroundColor: primaryColor, alignItems: 'center', padding: '5%', height: '75%' }}>
                                        <Image
                                            source={require('../../assets/images/tailorImage.jpg')} // Remote image URL
                                            // source={{ uri: 'https://www.ronkita.biz/app_master/images/services/learn-to-sew/learn-to-sew_980x510.jpg' }} // Remote image URL
                                            style={{ height: '100%', maxWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                                        // resizeMode="contain" // Adjusts how the image fits in the space (optional)
                                        />
                                    </View>

                                    <Text style={{ fontFamily: 'primaryFont' }}>{news.titleOfNews}</Text>

                                </View>
                            ))
                        }

                    </ScrollView>

                </Animated.View>
            </ScrollView>
            }
        </SafeAreaView>
    );
};


DashboardScreen.options = {
    headerTitle: () => (
        <View
        //   style={styles.headerContainer}
        >
            <Text style={styles.headerText}>Centered Header</Text>
        </View>
    ),
    headerStyle: {
        backgroundColor: '#6200ee', // Customize background color of the header
    },
    headerTitleAlign: 'center', // Ensure the custom title view is centered
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
        gap: 10,
        paddingHorizontal: '1%',
        paddingVertical: '2%',
        paddingBottom: 40,
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

    serviceCard: {
        width: '150@s',
        maxHeight: '180@s',
        minHeight: '180@s',
        gap: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5, // Elevation for Android shadow
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'visible', // Allow overflow
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    box: {
        width: '150@s',
        maxHeight: '200@s',
        gap: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5, // Elevation for Android shadow
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'visible', // Allow overflow
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    boxLarge: {
        flex: 1,
        width: '250@s',
        minHeight: '260@s',
        maxHeight: '260@s',
        // backgroundColor: 'red',
        borderRadius: 15,
        elevation: 5, // Elevation for Android shadow
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'visible', // Allow overflow
        justifyContent: 'flex-start',
        alignItems: 'center',

    },

    boxMedium: {
        flex: 1,
        width: '150@s',
        minHeight: '260@s',
        maxHeight: '260@s',
        // backgroundColor: 'red',
        borderRadius: 15,
        elevation: 5, // Elevation for Android shadow
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'visible', // Allow overflow
        justifyContent: 'flex-start',
        alignItems: 'center',

    },

    infomationCard: {
        flex: 1,
        width: '100%',
        minHeight: '170@s',
        maxHeight: '170@s',
        backgroundColor: '#8A3D77',
        borderRadius: 15,
        elevation: 5, // Elevation for Android shadow
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 1, height: -1 },
        shadowOpacity: 0.3,
        shadowRadius: -5,
        overflow: 'visible', // Allow overflow
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5%'
    },
    boxLargeTitleText: {
        fontSize: 18,
        fontFamily: 'primaryFontSemiBold'
    },
    boxLargePText: {
        fontSize: 14,
        fontFamily: 'primaryFont'
    },

    boxText: {
        color: '#fff',
        fontSize: 14,
    },

    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '130@s',
        minWidth: '150@s',
        elevation: 4,
        shadowRadius: 4,
        borderRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#000',
        borderWidth: .1,
        overflow: 'visible'
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

export default DashboardScreen;