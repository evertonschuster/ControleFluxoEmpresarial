import React, { useEffect } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        let header: StackHeaderOptions = {
            headerRight: () => (
                <View style={headerStyles.container}>
                    <TouchableOpacity
                        style={headerStyles.button}
                        onPress={() => { }} >
                        <View>
                            <Icon size={25} name="search" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={headerStyles.button}
                        onPress={() => { }} >
                        <View>
                            <Icon size={25} name="add" />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        navigation.dangerouslyGetParent()?.setOptions(header)
    }, [navigation])

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}


const headerStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    button: {
        justifyContent: "center",
        padding: 8
    }
});

export default HomeScreen
