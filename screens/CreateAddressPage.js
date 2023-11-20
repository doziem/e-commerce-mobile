import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Feather, AntDesign } from '@expo/vector-icons';


const CreateAddressPage = () => {
    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ backgroundColor: "#00ced1", padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, borderRadius: 3, gap: 10, backgroundColor: '#fff', height: 30, flex: 1 }}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="gray" />
                    <TextInput placeholder='Search Amazon' />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>
        </ScrollView>
    )
}

export default CreateAddressPage