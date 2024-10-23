import { View, Text } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { blackColor, darkColor } from "./colors"

const HeaderText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.headerStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const TitleText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.titleStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const LinkText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.linkStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const BodyText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.bodyText, extraStyle]}>
            {
                text
            }
        </Text>)
}

const ButtonText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.buttonStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const CaptionText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.captionStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const CaptionBoldText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.captionBoldStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const LargeCaptionText = ({ text, extraStyle }: any) => {
    return (

        <Text style={[style.captionLargeStyle, extraStyle]}>
            {
                text
            }
        </Text>)
}

const style = ScaledSheet.create({
    
    headerStyle: {
        fontSize: '24@s',
        fontFamily:'primaryFontBold',
        lineHeight:'32@s'
    },
    titleStyle: {
        fontSize: '18@s',
        fontFamily:'primaryFontBold'
    },
    linkStyle: {
        fontSize: '16@s',
        fontFamily:'primaryFontSemiBold'
    },
    bodyText: {
        fontSize: '14@s',
        fontFamily:'primaryFont',
        lineHeight:'18@s'
    },
    buttonStyle: {
        fontSize: '14@s',
        fontFamily:'primaryFontSemiBold',
        color:'#fff'
    },
    captionStyle: {
        fontSize: '12@s',
        fontFamily:'primaryFont'
    },

    captionBoldStyle: {
        fontSize: '12@s',
        fontFamily:'primaryFontBold'
    },

    captionLargeStyle: {
        fontSize: '14@s',
        fontFamily:'primaryFontSemiBold',
        color:blackColor
    },
})

export  {TitleText,HeaderText,ButtonText,BodyText,CaptionText,LargeCaptionText,LinkText,CaptionBoldText};