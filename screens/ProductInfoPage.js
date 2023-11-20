import { View, Text, ScrollView, Pressable, TextInput, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductInfoPage = () => {
    const route = useRoute()
    const dispatch = useDispatch()
    const { width } = Dimensions.get("window");
    // const navigation = useNavigation();
    const [addedToCart, setAddedToCart] = useState(false);
    const height = (width * 100) / 100;
    const cart = useSelector(state => state?.cart.cart)

    const addItemToCart = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)

        }, 60000)
    }

    return (
        <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: "#00ced1", padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, borderRadius: 3, gap: 10, backgroundColor: '#fff', height: 30, flex: 1 }}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="gray" />
                    <TextInput placeholder='Search Amazon' />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route?.params?.carouselImages.map((item, i) => (
                    <ImageBackground
                        key={i}
                        source={{ uri: item }}
                        style={{ width, height, marginTop: 25, resizeMode: 'contain' }}
                    >
                        <View
                            style={{
                                padding: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#C60C30",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontWeight: "600",
                                        fontSize: 12,
                                    }}
                                >
                                    20% off
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#e0e0e0",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                            </View>

                        </View>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#e0e0e0",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: 'auto',
                                marginLeft: 20,
                                marginBottom: 20,

                            }}
                        >
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'semibold' }}>{route?.params?.title} </Text>
                <Text style={{ fontSize: 18, fontWeight: 'semibold', marginTop: 6 }}>₦{route?.params?.price} </Text>
            </View>
            <Text style={{ height: 1, borderWidth: 1, borderColor: '#d0d0d0' }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Text>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{route?.params?.color} </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{route?.params?.size} </Text>
            </View>

            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
                    Total : ₦{route.params.price}
                </Text>
                <Text style={{ color: "#00CED1" }}>
                    FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <Ionicons name="location" size={24} color="black" />

                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        Deliver To Sujan - Bangalore 560019
                    </Text>
                </View>
            </View>

            <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "semibold" }}>
                IN Stock
            </Text>

            <Pressable
                onPress={() => addItemToCart(route?.params?.item)}
                style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            >
                {addedToCart ? (

                    <View>
                        <Text>Added to Cart</Text>
                    </View>
                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>

            <Pressable
                style={{
                    backgroundColor: "#FFAC1C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            >
                <Text>Buy Now</Text>
            </Pressable>

        </ScrollView>
    )
}

export default ProductInfoPage