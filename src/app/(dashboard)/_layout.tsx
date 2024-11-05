import { accentColor, greyColor, primaryColor } from "@/src/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { router, Tabs } from "expo-router"
import { TouchableOpacity, View, Text } from "react-native"
import { ScaledSheet } from "react-native-size-matters"

const DashboardLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: primaryColor,
            tabBarStyle:{padding:'2%', alignItems:'center',justifyContent:'center'},
            tabBarIconStyle:{alignItems:'center',justifyContent:'center'}
        }}>
            <Tabs.Screen name="index" options={{
                headerStyle: { backgroundColor: primaryColor },
                headerTitle: () => (
                    <View style={[styles.headerContainer, { width: '100%' }]}>
                        <TouchableOpacity style={{
                            backgroundColor: '#fff', width: '100%',
                            padding: '3%',
                            borderRadius: 5,
                        }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Ionicons name="search" size={24} />
                                <Text>Search service here...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ),

                headerTitleAlign: 'center',
                tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={24} />)
            }} />
            <Tabs.Screen name="messaging" options={{
                tabBarIcon: ({ color, size }) => (<Ionicons name="mail-outline" color={color} size={24} />)
            }} />

            <Tabs.Screen name="create" options={{
                tabBarIcon: ({ color, size }) => (<Ionicons name="add-circle-outline" color={primaryColor} size={40} />)
            }} />
            <Tabs.Screen name="orders" options={{
                tabBarIcon: ({ color, size }) => (<Ionicons name="receipt-outline" color={color} size={24} />)
            }} />

            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" color={color} size={24} />)
            }} />
        </Tabs>


    )
}

const styles = ScaledSheet.create({

    headerContainer: {
        flexDirection: 'row', // Ensures horizontal layout
        justifyContent: 'center', // Centers the content horizontally
        alignItems: 'center', // Centers the content vertically
        width: '100%', // Make the view take full width of the header
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
    },
});
export default DashboardLayout