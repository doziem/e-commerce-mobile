import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserType } from '../UserContext';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddressPage = () => {
    const navigation = useNavigation()
    const [fullName, setFullName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landMark, setLandMark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType)

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authtoken");

            const decodeToken = jwtDecode(token)
            const userId = decodeToken.userId
            setUserId(userId)
        }
        fetchUser()
    }, [])

    const handleAddress = () => {

        const address = {
            name: fullName,
            mobileNo,
            houseNo,
            street,
            landMark,
            postalCode
        }
        axios.post("http://192.168.43.110:8000/addresses", { userId, address })
            .then(response => {
                Alert.alert("Success", "Address Added Successfully")
                setFullName("");
                setMobileNo("");
                setHouseNo("");
                setStreet("");
                setLandMark("");
                setPostalCode("");

                setTimeout(() => {
                    navigation.goBack()
                }, 500)

            }).catch(error => {
                Alert.alert("Error", "Failed to Create Address")
                console.log("Error:::", error);
            })
    }
    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ height: 50, backgroundColor: '#00ced1' }} />
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 12 }}>Add new Address</Text>
            <TextInput placeholderTextColor={'black'} placeholder='Nigeria'
                style={{
                    padding: 10,
                    borderColor: '#d0d0d0',
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    margin: 8
                }}
            />
            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>Full Name (First and Last Name)</Text>
                <TextInput placeholderTextColor={'black'} placeholder='Enter Your Name'
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    style={{
                        padding: 10,
                        borderColor: '#d0d0d0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        margin: 8
                    }}
                />
            </View>

            <View >
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>Mobile Number</Text>
                <TextInput placeholderTextColor={'black'} placeholder='Mobile Number'
                    value={mobileNo}
                    onChangeText={text => setMobileNo(text)}
                    style={{
                        padding: 10,
                        borderColor: '#d0d0d0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        margin: 8
                    }}
                />
            </View>

            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>Flat, House no, Building,Company</Text>
                <TextInput placeholderTextColor={'black'} placeholder='Home Address'
                    value={houseNo}
                    onChangeText={text => setHouseNo(text)}
                    style={{
                        padding: 10,
                        borderColor: '#d0d0d0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        margin: 8
                    }}
                />
            </View>

            <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>Area,Street,Section,Village</Text>
                <TextInput placeholderTextColor={'black'} placeholder=''
                    value={street}
                    onChangeText={text => setStreet(text)}
                    style={{
                        padding: 10,
                        borderColor: '#d0d0d0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        margin: 8
                    }}
                />
            </View>

            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>Landmark</Text>
                <TextInput placeholderTextColor={'black'} placeholder='Eg. Near polo park'
                    value={landMark}
                    onChangeText={text => setLandMark(text)}
                    style={{
                        padding: 10,
                        borderColor: '#d0d0d0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        margin: 8
                    }}
                />
            </View>


            <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>Pincode</Text>
                <TextInput placeholderTextColor={'black'} placeholder='Enter Pincode'
                    value={postalCode}
                    onChangeText={text => setPostalCode(text)}
                    style={{
                        padding: 10,
                        borderColor: '#d0d0d0',
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                        margin: 8
                    }}
                />
            </View>
            <Pressable
                onPress={handleAddress}
                style={{ marginHorizontal: 10, padding: 14, backgroundColor: '#ffc72c', borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 18 }}>
                <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
            </Pressable>
        </ScrollView>
    )
}

export default AddressPage
