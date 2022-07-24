import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from '@rneui/themed';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );
        return unsubscribe;
    });

    return (
        <ListItem
            onPress={() => enterChat(id, chatName)}
            key={id}
        >
            <Avatar
                rounded
                source={{
                    uri:
                        chatMessages?.[0]?.photoURL ||
                        "https://i.ytimg.com/vi/3gDcG9qDfME/hqdefault.jpg",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
