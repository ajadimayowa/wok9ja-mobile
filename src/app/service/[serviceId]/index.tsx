import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
// import { } from '../../../constants/colors'
import { accentColor, blackColor, dangerColor, darkColor, greyColor, lightColor, primaryColor, successColor, warningColor } from '@/src/constants/colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
});



interface ISellerGig {
    fullNameOfSeller: string,
    currentLevel: number,
    gigDescription: string,
    sellerCurrentRating: number,
    sellerTotalBuyers: number,
    sellerBasePrice: number,
    isFavourite: boolean
}

interface IService {
    id: string,
    nameOfService: string,
    briefDescription: string,
    colorCode: string,
    colorCode2: string,
    serviceIcon: string,
    iconLibraryIsIonic: boolean
}

interface ILatestNews {
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
        briefDescription: 'All fashion related services and consultations',
        colorCode: '#254200',
        colorCode2: '#706203',
        serviceIcon: 'machine',
        iconLibraryIsIonic: true
    },
    {
        id: '3',
        nameOfService: 'Sotware Development',
        briefDescription: 'All fashion related services and consultations',
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
        titleOfNews: 'Location filtering is now available',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },

    {
        titleOfNews: 'New face to kyc',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },

    {
        titleOfNews: 'You can now buy credit via vendors',
        newsDescription: 'All fashion related services and consultations',
        newsCoverImageUrl: 'sdsd',
        newsId: 'sds',
        newsUrl: 'ssss'
    },
]

const availableGigs: ISellerGig[] = [
    {
        fullNameOfSeller: 'Odeleye Olive',
        currentLevel: 4,
        gigDescription: 'Sew modern and stylish women clothing for all occasions',
        sellerCurrentRating: 4.3,
        sellerTotalBuyers: 40,
        sellerBasePrice: 5000,
        isFavourite: true
    },

    {
        fullNameOfSeller: 'Akintayo Charles',
        currentLevel: 3,
        gigDescription: 'Do all your graphics design jobs',
        sellerCurrentRating: 3.7,
        sellerTotalBuyers: 25,
        sellerBasePrice: 3600,
        isFavourite: false
    },

    {
        fullNameOfSeller: 'Chima Austine',
        currentLevel: 1,
        gigDescription: 'Build business landing pages with wordpress',
        sellerCurrentRating: 3.3,
        sellerTotalBuyers: 45,
        sellerBasePrice: 70000,
        isFavourite: true
    },
]



const ServiceScreen = () => {
    const scale = useSharedValue(1);
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(50)).current; // Start the view off-screen (500 units down)
    const [secure, setSecure] = useState(true)

    useEffect(() => {
        // Trigger the animation on component mount
        Animated.timing(slideAnim, {
            toValue: 0, // Move it to its final position (0 units down)
            duration: 500, // Animation duration
            useNativeDriver: true, // Improves performance by using the native animation driver
        }).start();
    }, [slideAnim]);


    const { serviceId, serviceName } = useLocalSearchParams();
    const navigation = useNavigation();
    const [gigInfo, setGigInfo] = useState<ISellerGig>({
        fullNameOfSeller: '',
        currentLevel: 0,
        gigDescription: '',
        sellerCurrentRating: 0,
        sellerTotalBuyers: 0,
        sellerBasePrice: 0,
        isFavourite: false
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${serviceName}`, // Custom title
            headerStyle: {
                backgroundColor: primaryColor, // Set the background color
            },
            headerTintColor: '#fff', // Set the color of the back button and title
            headerTitleStyle: {
                fontWeight: 'bold', // Customize title font style
            },
            headerRight: ({ size, color }: any) => (
                <View><TouchableOpacity><Ionicons color={gigInfo.isFavourite ? '#fff' : greyColor} size={30} name={gigInfo.isFavourite ? 'heart' : 'heart-outline'} /></TouchableOpacity></View>
            )
        });
    }, [navigation, serviceId]);


    const handleNavigateToLogin = () => {
        router.back()
    }

    const handleNavigateToServiceViewScreen = (serviceId: string) => {
        router.navigate({
            pathname: './service-view',
            params: { id: serviceId }
        })
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            <ScrollView style={styles.container}>
                <Animated.View
                    style={[styles.container,
                    {
                        transform: [{ translateY: slideAnim }], // Apply the animated translateY to the view
                    },
                    ]}
                >

                    <ScrollView contentContainerStyle={{ padding: '2%', gap: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            availableServices.map((service: IService, index: number) => (
                                <TouchableOpacity key={index}
                                // onPress={() => handleNavigateToServiceViewScreen(service.id)}
                                >
                                    <Image
                                        source={require('../../../assets/images/tailorImage.jpg')} // Remote image URL
                                        // source={{ uri: 'https://www.ronkita.biz/app_master/images/services/learn-to-sew/learn-to-sew_980x510.jpg' }} // Remote image URL
                                        style={{ height: 200, width: 300 }}
                                    // resizeMode="contain" // Adjusts how the image fits in the space (optional)
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                    <View style={{ minWidth: '100%', marginTop: 10, flexDirection: 'row', padding: '3%', justifyContent: 'space-between' }}>
                        <Text style={[styles.headerText, { color: darkColor }]}>Reviews</Text>
                        <TouchableOpacity>
                            <Ionicons name='mail' size={25} color={warningColor}/>
                            {/* <Text style={[styles.p, { color: darkColor }]}>View all</Text> */}
                        </TouchableOpacity>
                    </View>


                    <View style={{ minWidth: '100%', marginTop: 10 }}>
                        <Text style={[styles.headerText, { color: darkColor }]}>Design proffesional business logo with mother feel</Text>
                    </View>

                    <View style={{ minWidth: '100%' }}>
                        <Text style={[styles.p, { color: darkColor, fontSize: 14 }]}>I will design proffesional business logo that you will solve so much</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{ minWidth: '100%', padding: '2%', borderRadius: 5, justifyContent: 'center', backgroundColor: successColor }}>
                            <Text style={[styles.p, { color: '#fff', textAlign: 'center', fontFamily: 'primaryFontBold' }]}>Place order</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{ minWidth: '100%', marginTop: 10, flexDirection: 'row', padding: '3%', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={[styles.p, { color: darkColor }]}>Delivery rate</Text>
                            <Text style={[styles.p, { color: darkColor }]}>Quality of Work</Text>
                            <Text style={[styles.p, { color: darkColor }]}>Communication level</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Ionicons name='star' />
                                <Text style={[styles.p, { color: darkColor }]}>4.3</Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Ionicons name='star' />
                                <Text style={[styles.p, { color: darkColor }]}>4.3</Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Ionicons name='star' />
                                <Text style={[styles.p, { color: darkColor }]}>4.3</Text>
                            </View>
                        </View>



                    </View>

                    <View style={{ minWidth: '100%', marginTop: 10, flexDirection: 'row', padding: '3%', justifyContent: 'space-between' }}>
                        <Text style={[styles.headerText, { color: darkColor }]}>Reviews</Text>
                        <TouchableOpacity>
                            <Text style={[styles.p, { color: darkColor }]}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ flex: 1, padding: '2%', minWidth: '100%' }} contentContainerStyle={{ gap: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            availableGigs.map((gigs: ISellerGig, index: number) => (
                                <View style={styles.reviewCard} key={index}>

                                    <View
                                        style={{
                                            width: '100%',
                                            justifyContent: 'flex-start',
                                            // padding:'2%',
                                            borderBottomStartRadius: 5,
                                            borderBottomEndRadius: 5, backgroundColor: '#fff', alignItems: 'center',
                                            minHeight: '100%',
                                        }}>
                                        <View style={{ padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                                <View >
                                                    <Image
                                                        style={{ height: 40, width: 40, borderRadius: 25 }}
                                                        source={require('../../../assets/images/tailorImage.jpg')} />
                                                </View>
                                                <View>
                                                    <Text style={[styles.p, { color: '#000', fontSize: 12 }]}>{gigs.fullNameOfSeller}</Text>
                                                    <Text>{`Oyo state`}</Text>
                                                </View>
                                            </View>
                                            {/* <View><TouchableOpacity><Ionicons color={gigs.isFavourite ? 'red' : greyColor} size={24} name={gigs.isFavourite ? 'heart' : 'heart-outline'} /></TouchableOpacity></View> */}
                                        </View>

                                        <View style={{ padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <Text style={[styles.p, { fontSize: 14 }]}>{gigs.gigDescription}</Text>

                                        </View>

                                        <View style={{ padding: '2%', paddingVertical: 5, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <Ionicons size={12} name='star' />
                                                    <Text>{gigs.sellerCurrentRating}</Text>
                                                    <Text>{'Lagos state'}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                {/* <Text><Ionicons name='cash'/></Text> */}
                                               
                                                <Text style={styles.p}>{'2 weeks ago'}</Text>

                                            </View>
                                        </View>
                                    </View>

                                </View>
                            ))
                        }
                    </ScrollView>

                    <View style={{ minWidth: '100%', marginTop: 10, flexDirection: 'row', padding: '3%', justifyContent: 'center' }}>
                        
                        <TouchableOpacity>
                        <Text style={[styles.headerText, { color: primaryColor }]}>Report Seller</Text>
                        </TouchableOpacity>
                    </View>

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

    reviewCard: {
        flex: 1,
        width: '250@s',
        minHeight: '150@s',
        maxHeight: '150@s',
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

export default ServiceScreen;