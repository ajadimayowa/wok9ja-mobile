import { blackColor } from "@/src/constants/colors"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters";
import { Picker } from '@react-native-picker/picker';
import { FieldProps } from 'formik';

interface DropdownSelectProps extends FieldProps {
    items: Array<{ label: string; value: string }>;
    placeholder: string;
}

interface IStates {
    id: string;
    state: string;
    localGovernmentAreas: string;
}

const CustomInputField = ({ type, disabled, extraStyle, onBlur, onChangeText, rIcon, lIcon, placeholder, value, data }: any) => {
    const [secureEntry, setSecureEntry] = useState(false)
    if (type == 'number') {
        return (

            <View style={[styles.inputFieldWrapper, extraStyle]}>
                {lIcon && <Ionicons name={lIcon} size={18} />}
                <TextInput
                    onBlur={onBlur} placeholder={placeholder} value={value} keyboardType="numeric" onChangeText={onChangeText} style={[styles.input]} />
                {rIcon && <Ionicons name="eye-outline" size={18} />}
            </View>


        )
    }
    if (type == 'select') {
        return (
            <View style={[styles.inputFieldWrapper, extraStyle]}>
                {lIcon && <Ionicons name={lIcon} size={18} />}
                <Picker
                    selectedValue={value}
                    onValueChange={(e:any)=>onChangeText(e)}
                    onBlur={onBlur}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label={value== '' ? 'Select' : value} value={value} />
                    {data.map((item: IStates) => (
                        <Picker.Item key={item?.id} label={item.state} value={item} />
                    ))}
                </Picker>
                {rIcon && <Ionicons name="eye-outline" size={18} />}
            </View>
        )
    }

    else {
        return (

            <View style={[styles.inputFieldWrapper, extraStyle]}>
                {lIcon && <Ionicons name={lIcon} size={18} />}
                <TextInput
                    onBlur={onBlur} placeholder={placeholder} value={value}
                    secureTextEntry={secureEntry} onChangeText={onChangeText} style={[styles.input]} />
                {rIcon && <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}><Feather name={secureEntry ? "eye" : 'eye-off'} size={18} /></TouchableOpacity>}
            </View>


        )
    }

}

const styles = ScaledSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    inputFieldWrapper: {
        minWidght: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'pink',
        padding: '10@s',
        gap: 2,
        borderWidth: '1@s',
        borderRadius: '5@s',
        marginVertical: '10@s'
    },
    input: {
        flex: 2
    },
    picker: {
        padding: 0,
        flex: 2,
        margin: 0,
        // backgroundColor:'green'
    },
})

export { CustomInputField }

