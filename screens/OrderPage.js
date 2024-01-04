import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const OrderPage = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Main");
        }, 1300);
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <LottieView
                source={require("../assets/thumbs.json")}
                // ref={animation}
                style={{
                    height: 260,
                    width: 300,
                    alignSelf: "center",
                    marginTop: 40,
                    justifyContent: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
            <Text
                style={{
                    marginTop: 20,
                    fontSize: 19,
                    fontWeight: "600",
                    textAlign: "center",
                }}
            >
                Your Order Has been Recieved
            </Text>
            <LottieView
                source={require("../assets/sparkle.json")}
                style={{
                    height: 300,
                    position: "absolute",
                    top: 100,
                    width: 300,
                    alignSelf: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
        </SafeAreaView>
    );
}

export default OrderPage