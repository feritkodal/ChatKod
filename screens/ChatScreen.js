import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from '@rneui/themed';
import { Ionicons } from "@expo/vector-icons"
import { KeyboardAvoidingView, Image } from 'react-native';
import { db, auth } from '../firebase';
import *as firebase from "firebase";
import { BackgroundImage } from '@rneui/base/dist/helpers';


const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                    <Avatar
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL,
                        }}
                        borderColor="white"
                        borderWidth={2}
                        borderRadius={25}
                    />
                    <Text style={styles.chatName}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
        });
    }, [navigation, messages])

    const sendMessage = () => {
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundImage source={require('../assets/cbg.jpg')} style={styles.backgroundImage} >
                <StatusBar style="light" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                    keyboardVerticalOffset={90}
                    inverted
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <>
                            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                                {messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.reciever} >
                                            <Avatar
                                                position="absolute"
                                                rounded
                                                containerStyle={{
                                                    position: "absolute",
                                                    bottom: -15,
                                                    right: -5,
                                                }}
                                                right={-5}
                                                bottom={-15}
                                                size={30}
                                                source={{
                                                    uri: data.photoURL,
                                                }}
                                                borderColor="white"
                                                borderWidth={2}
                                                borderRadius={25}
                                            />
                                            <Text style={styles.recieverText}>{data.message}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sender} >
                                            <Avatar
                                                position="absolute"
                                                rounded
                                                containerStyle={{
                                                    position: "absolute",
                                                    bottom: -15,
                                                    right: -5,
                                                }}
                                                bottom={-15}
                                                size={30}
                                                source={{
                                                    uri: data.photoURL,
                                                }}
                                                borderColor="white"
                                                borderWidth={2}
                                                borderRadius={25}
                                            />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                        </View>
                                    )))}
                            </ScrollView>
                            <View style={styles.footer}>
                                <TextInput
                                    value={input}
                                    onChangeText={(text) => setInput(text)}
                                    onSubmitEditing={sendMessage}
                                    placeholder="Mesajınızı yazınz"
                                    style={styles.textInput}
                                />
                                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                    <Ionicons name='send' size={24} color="#EF8A2D" />
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </BackgroundImage>
        </SafeAreaView>
    );
};

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#EF8A2D",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    chatName: {
        color: "white",
        marginLeft: 10,
        fontWeight: "700",
        fontSize: 20
    }
})
