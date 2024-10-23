import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
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
