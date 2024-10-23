import { greyColor, primaryColor } from '@/src/constants/colors'
import { IService } from '@/src/interfaces/interface'
import gigCardStyle from '@/src/utils/styles/componentStyles'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const GigCard: React.FC<any> = ({ gigData, gigImageUrl, index }) => {

  const handleNavigateToGigViewScreen = (gigId: string, gigCategory: string) => {
    router.push({
        pathname: `../gig/[gigId]`,
        params: { gigId: gigId, gigCategory: gigCategory }
    })
}

  return (

    <TouchableOpacity key={index} onPress={() => handleNavigateToGigViewScreen(gigData.id, gigData.gigCategory)}>
      <View style={styles.boxLarge}>
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
            source={gigImageUrl} // Remote image URL
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
                  source={require('../../assets/images/tailorImage.jpg')} />
              </View>
              <View>
                <Text style={[styles.p, { color: '#000', fontSize: 12 }]}>{gigData.fullNameOfSeller}</Text>
                <Text>{`Level ${gigData.currentLevel}`}</Text>
              </View>
            </View>
            <View><TouchableOpacity><Ionicons color={gigData.isFavourite ? 'red' : greyColor} size={24} name={gigData.isFavourite ? 'heart' : 'heart-outline'} /></TouchableOpacity></View>
          </View>

          <View style={{ padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Text style={[styles.p, { fontSize: 14 }]}>{gigData.gigDescription}</Text>

          </View>

          <View style={{ padding: '2%', paddingVertical: 5, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Ionicons size={12} name='star' />
                <Text>{gigData.sellerCurrentRating}</Text>
                <Text>{`(${gigData.sellerTotalBuyers}) buyers`}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              {/* <Text><Ionicons name='cash'/></Text> */}
              <Text>From</Text>
              <Text style={styles.p}>{gigData.sellerBasePrice}</Text>

            </View>
          </View>
        </View>

      </View>
    </TouchableOpacity>
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

export default GigCard
