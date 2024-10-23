import {ScaledSheet} from 'react-native-size-matters';

const gigCardStyle = ScaledSheet.create({
    container : {
        backgroundColor:'#fff',
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        margin:'10@s',
        shadowColor:'#000',
        elevation:5,
        shadowOpacity:1,
        shadowRadius:5,
        shadowOffset:{width:0,height:1}
    }
})

export default gigCardStyle;