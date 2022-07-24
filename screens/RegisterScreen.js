import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Input, Image, Text } from '@rneui/themed';
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Kayıt Ol",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://i.ytimg.com/vi/3gDcG9qDfME/hqdefault.jpg"
                })
            })
            .catch(error => alert(error.message));
    };

    return (
        <View behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image source={require('../assets/ChatKod_logo.png')}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Ad - Soyad (Zorunlu)"
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="E-posta Adresi (Zorunlu)"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Şifre (Zorunlu)"
                    secureTextEntry
                    type="password "
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Profil Resmi Url'si (Zorunlu Değil)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <TouchableOpacity
                style={styles.SignInButton}
                onPress={register}
            >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}> Kayıt Ol </Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
        marginTop: 20,
    },
    SignInButton: {
        alignItems: 'center',
        backgroundColor: '#EF8A2D',
        padding: 10,
        width: 200,
        borderRadius: 10,
    },
});
