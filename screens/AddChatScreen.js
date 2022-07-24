import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Input } from '@rneui/themed';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Yeni Bir Sohbet Ekle",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input
            })
            .then(() => {
                navigation.goBack()
            })
            .catch((error) => alert(error));
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Input
                placeholder="Sohbet Adını Giriniz"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={{
                    type: 'font-awesome',
                    name: 'comment',
                    color: 'black',
                    style: { marginRight: 5 }
                }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={createChat}
                disabled={!input}
            >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}> Sohbeti Oluştur </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#EF8A2D',
        padding: 10,
        borderRadius: 10
    }
})
