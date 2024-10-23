import { greyColor, primaryColor } from '@/src/constants/colors'
import { BodyText } from '@/src/constants/typography'
import { IService } from '@/src/interfaces/interface'
import gigCardStyle from '@/src/utils/styles/componentStyles'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const ActivityListFullCard: React.FC<any> = ({ data }) => {

  const handleNavigateToGigViewScreen = (gigId: string, gigCategory: string) => {
    router.push({
      pathname: `../gig/[gigId]`,
      params: { gigId: gigId, gigCategory: gigCategory }
    })
  }

  return (


    <View style={styles.boxLarge}>
      {
        data.map((task: any, index:number) => (
        <TouchableOpacity key={index}>
          <View style={[styles.listStyle]}>
            <Ionicons name={task?.icon} />
            <BodyText text={task?.title} />
            <BodyText text={task?.count} />
          </View>
          </TouchableOpacity>
        ))
      }
    </View>
  )

}


const styles = ScaledSheet.create({
  listStyle: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: '10@s',
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-start',
    borderColor: '#0000',
    minWidth: '100%',
    borderWidth: 5,
    overflow: 'hidden'
  },

  serviceCard: {
    minWidth: '50%',
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
    gap:1,
    width: '100%',
    maxHeight: '260@s',
    backgroundColor: '#fff',
    borderRadius: "5@s",
    elevation: 3, // Elevation for Android shadow
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'hidden', // Allow overflow
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

export default ActivityListFullCard
