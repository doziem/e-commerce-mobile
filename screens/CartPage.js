import { View, Text, ScrollView, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity, removeFromCart } from '../redux/CartReducer'
import { useNavigation } from '@react-navigation/native';


const CartPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const cart = useSelector(state => state?.cart.cart)

    const total = cart.map(item => item?.price * item?.quantity).reduce((current, acc) => current + acc, 0)

    const increaseQuantity = (item) => {
        dispatch(increaseItemQuantity(item))
    }

    const decreaseQuantity = (item) => {
        dispatch(decreaseItemQuantity(item))

    }

    const deleteItem = (item) => {
        dispatch(removeFromCart(item))
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

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'semibold' }}>SubTotal : </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }} >₦{Math.round(total).toFixed(2)} </Text>
            </View>
            <Text style={{ marginHorizontal: 10 }}>EMI detail Available</Text>
            {cart?.length > 0 && (
                <Pressable
                    onPress={() => navigation.navigate('Confirm')}
                    style={{
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        marginTop: 10,
                        backgroundColor: '#ffc72c'
                    }}
                >
                    <Text>Proceed to buy {cart.length} Items</Text>
                </Pressable>

            )}
            <Text style={{ borderColor: '#d0d0d0', borderWidth: 1, height: 1, marginTop: 16 }} />

            <View style={{ marginHorizontal: 10 }}>
                {cart.map(item => (
                    <View
                        key={item?.id}
                        style={{
                            backgroundColor: '#fff',
                            marginVertical: 10,
                            borderBlockColor: '#f0f0f0',
                            borderWidth: 2,
                            borderLeftColor: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0
                        }}
                    >
                        <Pressable style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-around' }}>
                            <View>
                                <Image source={{ uri: item?.image }} height={140} width={140} resizeMode='contain' />
                            </View>
                            <View>
                                <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}>₦{item?.price}</Text>
                                <Image width={30} height={30} resizeMode='contain'
                                    source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png' }}
                                />
                                <Text style={{ color: 'green' }}>In stock </Text>
                                <Text style={{ marginTop: 6, fontWeight: 'regular' }}>{item?.rating?.rate} rating</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            style={{
                                marginTop: 15,
                                marginBottom: 10,
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 10
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                borderRadius: 10
                            }}>
                                {item?.quantity > 1 ?
                                    (
                                        <Pressable
                                            onPress={() => decreaseQuantity(item)}
                                            style={{
                                                backgroundColor: '#d8d8d8',
                                                padding: 7,
                                                borderTopLeftRadius: 6,
                                                borderBottomLeftRadius: 6
                                            }}>
                                            <AntDesign name='minus' size={24} color='black' />
                                        </Pressable>
                                    )
                                    : (
                                        <Pressable
                                            onPress={() => deleteItem(item)}
                                            style={{
                                                backgroundColor: '#d8d8d8',
                                                padding: 7,
                                                borderTopLeftRadius: 6,
                                                borderBottomLeftRadius: 6
                                            }}>
                                            <AntDesign name='delete' size={24} color='black' />
                                        </Pressable>
                                    )}

                                <Pressable style={{
                                    backgroundColor: '#fff',
                                    paddingHorizontal: 18,
                                    paddingVertical: 6
                                }}>
                                    <Text>{item?.quantity} </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => increaseQuantity(item)}
                                    style={{
                                        backgroundColor: '#d8d8d8',
                                        padding: 7,
                                        borderTopLeftRadius: 6,
                                        borderBottomLeftRadius: 6
                                    }}>
                                    <Feather name="plus" size={24} color="black" />

                                </Pressable>
                            </View>
                            <Pressable
                                onPress={() => deleteItem(item)}

                                style={{
                                    backgroundColor: '#fff',
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderWidth: 0.6,
                                    borderColor: '#c0c0c0'
                                }}
                            >
                                <Text>Delete</Text>

                            </Pressable>
                        </Pressable>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 15,
                        }}>
                            <Pressable style={{
                                backgroundColor: '#f5c00d',
                                padding: 7,
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6
                            }}>
                                <Text>Save For Later</Text>
                            </Pressable>
                            <Pressable style={{
                                backgroundColor: '#d8d8d8',
                                padding: 7,
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6
                            }}>
                                <Text>See More Like this</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                ))}

            </View>
        </ScrollView>
    )
}


export default CartPage