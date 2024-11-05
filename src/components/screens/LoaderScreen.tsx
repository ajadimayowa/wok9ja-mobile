import { primaryColor } from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { Component, useLayoutEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

export default function LoaderScreen () {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/gifs/wok9jaloaderLarge.gif')}/>
      </View>
    )
}

const styles = ScaledSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    minWidth:'100%',
    backgroundColor:'#fff'
  }
})
