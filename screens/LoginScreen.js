import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Input, Image } from '@rneui/themed';
import { auth } from "../firebase";


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscrite = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscrite;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "ChatKod'a Hoşgeldin",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
    }

    return (
        <View behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image source={require('../assets/ChatKod_logo.png')}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="E-posta"
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder="Şifre"
                    secureTextEntry type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <TouchableOpacity
                style={styles.SignInButton}
                onPress={signIn}
            >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}> Giriş Yap </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.RegisterButton}
                onPress={() => navigation.navigate("Register")}
                type="outline"
            >
                <Text style={{ color: "#EF8A2D", fontSize: 16, fontWeight: "bold", textAlign: "center" }}> Kayıt Ol </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

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
    RegisterButton: {
        width: 200,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        borderColor: "#EF8A2D",
        borderWidth: 1
    }
});