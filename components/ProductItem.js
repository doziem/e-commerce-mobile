import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ item }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const cart = useSelector(state => state?.cart.cart)

    const dispatch = useDispatch()

    const addItemToCart = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)

        }, 6000)
    }

    return (
        <Pressable style={{ marginVertical: 25, marginHorizontal: 20 }}>
            <Image source={{ uri: item?.image }} style={{ width: 140, aspectRatio: 1, resizeMode: 'contain' }} />
            <Text numberOfLines={2} style={{ width: 140, marginTop: 10 }}>{item?.title} </Text>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>₦{item?.price}</Text>
                <Text style={{ fontWeight: 'bold', color: '#ffc72c' }}>{item?.rating?.rate} rating</Text>
            </View>
            <Pressable
                onPress={() => addItemToCart(item)}
                style={{ padding: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 10, backgroundColor: '#ffc72c' }}>
                {addedToCart ? (

                    <View>
                        <Text>Added to Cart</Text>
                    </View>
                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>
        </Pressable>
    )
}

export default ProductItem