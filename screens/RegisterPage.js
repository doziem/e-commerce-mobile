
import React, { useState } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const RegisterPage = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("")
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                marginTop: 50,
            }}
        >
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                        uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
                    }}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: 'bold',
                            fontSize: 17,
                            marginTop: 12,
                            color: '#041e42',
                        }}
                    >
                        Create an Acount
                    </Text>
                </View>

                <View style={{ marginTop: 40 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#d0d0d0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <Ionicons
                            style={{ marginLeft: 8 }}
                            name="ios-person"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: name ? 16 : 16,
                            }}
                            placeholder="enter your Name"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#d0d0d0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="enter your email"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#d0d0d0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <AntDesign
                            name="lock1"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 16,
                            }}
                            placeholder="enter your Password"
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: '#007fff', fontWeight: 'semibold' }}>
                        Forgot Password
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Pressable
                        style={{
                            width: 200,
                            backgroundColor: '#febe18',
                            borderRadius: 5,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 15
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}
                        >
                            Rgister
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 15 }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Already have an Acount? Login</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterPage

const styles = StyleSheet.create({})