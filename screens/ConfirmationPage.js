import { View, Text, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserType } from '../UserContext';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../redux/CartReducer';

const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
]

const ConfirmationPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { userId, setUserId } = useContext(UserType);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [option, setOption] = useState(false)
    const [selectedOption, setselectedOption] = useState("")

    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {

        fetchAddresses()
    }, [])

    const cart = useSelector(state => state?.cart.cart)

    const total = cart.map(item => item?.price * item?.quantity).reduce((current, acc) => current + acc, 0)


    const fetchAddresses = async () => {
        const res = await axios.get(`http://192.168.43.110:8000/addresses/${userId}`);

        setAddresses(res.data)
    }

    const handleOrder = async () => {
        try {

            const orderData = {
                userId: userId,
                cartItems: cart,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOption,
                totalPrice: total
            }

            const response = await axios.post("http://192.168.43.110:8000/order", orderData)

            if (response?.status === 201) {
                navigation.navigate("Order")
                dispatch(cleanCart())
                // Alert.alert("Successful", "Order Created Successfully")
            } else {
                console.log("Error Creating Order", response?.data);
            }
        } catch (error) {
            console.log("Error:::", error);
        }
    }

    const payOnline = async () => {
        try {

        } catch (error) {
            console.log("Error:::", error);
        }
    }
    return (
        <ScrollView style={{ marginTop: 55 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, }}>
                    {steps?.map((step, index) => (
                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {index > 0 && (
                                <View style={[{ flex: 1, height: 2, backgroundColor: 'green' }, index <= currentStep && { backgroundColor: 'green' }]} />
                            )}
                            <View style={[{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }, index < currentStep && { backgroundColor: 'green' }]}>
                                {index < currentStep ?
                                    (<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>&#10003;</Text>) :
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{index + 1} </Text>}
                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 5 }}>{step?.title} </Text>
                        </View>
                    ))}
                </View>
            </View>
            {currentStep === 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15 }}> Select Delivery Address </Text>
                    <Pressable>
                        {addresses.map((item, index) => (
                            <Pressable key={index} style={{ borderWidth: 1, borderColor: '#d0d0d0', flexDirection: 'column', padding: 10, gap: 5, paddingBottom: 17, marginVertical: 7, borderRadius: 7 }}>
                                {selectedAddress && selectedAddress?._id === item?._id ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                ) : (

                                    <Entypo onPress={() => setSelectedAddress(item)} name="circle" size={20} color="gray" />
                                )}
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name} </Text>

                                    <Text style={{ fontSize: 15, color: '#181818' }}>{item?.houseNo}, {item?.street} </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <Entypo name="location-pin" size={20} color="red" />
                                        <Text style={{ fontSize: 15, color: '#181818' }}>{item.landMark} </Text>
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#181818' }}>Enug, Nigeria </Text>
                                    <Text style={{ fontSize: 15, color: '#181818' }}>Phone No: {item?.mobileNo} </Text>
                                    <Text style={{ fontSize: 15, color: '#181818' }}>Pin Code: {item?.postalCode} </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 7 }}>
                                        <Pressable
                                            style={{
                                                backgroundColor: '#f5f5f5',
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderColor: '#d0d0d0',
                                                borderWidth: 0.9

                                            }}
                                        >
                                            <Text>Edit</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{
                                                backgroundColor: '#f5f5f5',
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderColor: '#d0d0d0',
                                                borderWidth: 0.9

                                            }}
                                        >
                                            <Text>Remove</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{
                                                backgroundColor: '#f5f5f5',
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderColor: '#d0d0d0',
                                                borderWidth: 0.9

                                            }}
                                        >
                                            <Text>Set as default</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        {selectedAddress && selectedAddress?._id === item?._id && (
                                            <Pressable
                                                onPress={() => setCurrentStep(1)}
                                                style={{
                                                    backgroundColor: '#fc500d', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10,
                                                }}
                                            >
                                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Deliver To This Address</Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>

            )}
            {currentStep === 1 && (

                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Choose your delivery options</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#d0d0d0', borderWidth: 1, padding: 8, gap: 15, marginTop: 10 }}
                    >
                        {option ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#008397" />

                        ) : (
                            <Entypo name="circle" size={20} color="gray"
                                onPress={() => setOption(!option)}
                            />

                        )}

                        <Text style={{ flex: 1 }}> <Text style={{ color: 'green', fontWeight: '500' }}>Tomorrow by 10am</Text> --FREE delivery with your Prime Membership</Text>

                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(2)}
                        style={{
                            backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 15
                        }}
                    >
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}
            {currentStep === 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select your Payment Method</Text>

                    <View style={{ backgroundColor: '#fff', padding: 8, borderWidth: 1, borderColor: '#d0d0d0', flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 12, borderRadius: 4 }}>
                        {selectedOption === 'cash' ? (<FontAwesome5 name="dot-circle" size={20} color="#008397" />) :
                            (<Entypo name="circle" size={20} color="gray" onPress={() => setselectedOption("cash")} />)}
                        <Text>Cash on Delivery</Text>
                    </View>


                    <View style={{ backgroundColor: '#fff', padding: 8, borderWidth: 1, borderColor: '#d0d0d0', flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 12, borderRadius: 4 }}>
                        {selectedOption === 'card' ? (<FontAwesome5 name="dot-circle" size={20} color="#008397" />) :
                            (<Entypo name="circle" size={20} color="gray" onPress={() => {
                                setselectedOption("card")
                                Alert.alert("UPI/Debit Card", "Pay Online", [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel on Press")
                                    },
                                    {
                                        text: "Ok",
                                        onPress: () => payOnline()
                                    }
                                ])
                            }} />)}
                        <Text>UPI/Credit or debit card</Text>
                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(3)}
                        style={{
                            backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 15
                        }}
                    >
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}

            {currentStep === 3 && selectedOption === 'cash' && (
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, backgroundColor: '#fff', padding: 8, borderColor: '#d0d0d0', borderWidth: 1, marginTop: 10 }}>
                        <View >
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Save 5% and never run out</Text>
                            <Text style={{ fontSize: 15, color: 'gray', marginTop: 10 }}>Turn on auto delivery</Text>
                        </View>
                        <MaterialIcons
                            name='keyboard-arrow-right'
                            size={24}
                            color='black'
                        />
                    </View>
                    <View style={{ backgroundColor: '#fff', padding: 8, borderColor: '#d0d0d0', borderWidth: 1, marginTop: 10 }}>
                        <Text>Shipping to {selectedAddress?.name}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>Items</Text>
                            <Text style={{ fontSize: 16, color: 'gray' }}>₦{total}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>Delivery</Text>
                            <Text style={{ fontSize: 16, color: 'gray' }}>₦0</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Order Total</Text>
                            <Text style={{ fontSize: 16, color: '#c60c30', fontWeight: 'bold' }}>₦{total}</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#fff', padding: 8, borderColor: '#d0d0d0', borderWidth: 1, marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: 'gray' }}>Pay With</Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>Pay on Delivery (Cash)</Text>
                    </View>

                    <Pressable
                        onPress={handleOrder}
                        style={{
                            backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 15
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Place Your Order</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    )
}

export default ConfirmationPage