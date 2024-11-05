import { greyColor, primaryColor } from '@/src/constants/colors'
import { IService } from '@/src/interfaces/interface'
import gigCardStyle from '@/src/utils/styles/componentStyles'
import { router } from 'expo-router'
import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const ServiceCard: React.FC<any> = ({ serviceData, serviceImageUrl,index }) => {

  return (
      <View key={index} style={[styles.serviceCard, { backgroundColor: serviceData.colorCode, flex: 1, alignItems: 'flex-start', padding: 5 }]}>
        <View style={{ borderRadius: 10, padding: '4%', minWidth: '100%', minHeight: '30%', maxHeight: '30%' }}>
          <Text style={[styles.p, { fontSize: 14, fontFamily: 'primaryFontBold', color: '#fff' }]}>{serviceData.nameOfService}</Text>
        </View>



        <View style={{ borderRadius: 10, backgroundColor: serviceData.colorCode2, padding: '4%', minWidth: '100%', minHeight: '70%', maxHeight: '70%', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={serviceImageUrl} // Remote image URL
            // source={{ uri: 'https://www.ronkita.biz/app_master/images/services/learn-to-sew/learn-to-sew_980x510.jpg' }} // Remote image URL
            style={{ height: '100%', maxWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
          // resizeMode="contain" // Adjusts how the image fits in the space (optional)
          />
        </View>
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

export default ServiceCard
