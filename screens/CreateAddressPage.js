import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Feather, AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import axios from 'axios';


const CreateAddressPage = () => {

    const navigation = useNavigation()
    const { userId, setUserId } = useContext(UserType);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {

        fetchAddresses()
    }, [])

    const fetchAddresses = async () => {
        const res = await axios.get(`http://192.168.43.110:8000/addresses/${userId}`);

        setAddresses(res.data)
    }

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View
                style={{
                    backgroundColor: "#00ced1",
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Pressable
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 7,
                        borderRadius: 3,
                        gap: 10,
                        backgroundColor: '#fff',
                        height: 30,
                        flex: 1
                    }}
                >
                    <AntDesign
                        style={{ paddingLeft: 10 }}
                        name="search1"
                        size={22}
                        color="gray"
                    />
                    <TextInput placeholder='Search Amazon' />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Addresses</Text>
                <Pressable
                    onPress={() => navigation.navigate('Add')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                    }}
                >
                    <Text style={{}}>Add new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default CreateAddressPage