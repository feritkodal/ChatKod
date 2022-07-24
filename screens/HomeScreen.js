import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from '@rneui/themed';
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase';
import { SimpleLineIcons } from "@expo/vector-icons"


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    useEffect(() => {
        const unsubscrite = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubscrite;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "ChatKod",
            headerStyle: { backgroundColor: "#EF8A2D" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",

            headerLeft: () => (
                <View>
                    <View style={{ borderColor: "white", borderWidth: 2, borderRadius: 25, marginRight: 125 }}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </View>
                </View>
            ),

            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Icon name='logout' size={24} color="white" style={{}} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
            <View style={styles.footer} >
                <View
                    style={{
                        flexDirection: 'row',
                        marginRight: 20,
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddChat')}
                        activeOpacity={0.5}
                    >
                        <SimpleLineIcons name="plus" size={24} color='white' style={{ marginLeft: 190 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15,
        backgroundColor: "#EF8A2D"
    },
})
