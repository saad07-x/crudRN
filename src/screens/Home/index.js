import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import Modal from './Modal'
import { firebase } from "../../firebase/config";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
    const [onToggle, setToggle] = useState(false);
    const [fetchedData, setFetchedData] = useState([])
    const [loader, setLoader] = useState(false)
    const entityRef = firebase.firestore().collection("users");
    const navigation = useNavigation()
    const isFocused = useIsFocused();

    useEffect(() => {
        getData()
    }, [isFocused])

    const openModal = () => {
        setToggle(!onToggle);
    }

    const getData = () => {
        setLoader(true)
        let data = [];
        entityRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(" => ", doc.data());
                data.push(doc?.data())
                setFetchedData(data)
            });
            setLoader(false)
            console.log("finised")
        })
            .catch((error) => {
                setLoader(false)
                console.log("Error getting documents: ", error);
            });

    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:20 }} >
                <Text style={{textDecorationLine:'underline', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }} onPress={openModal} >+Add User</Text>
            </TouchableOpacity>

            <View>
                {!fetchedData?.length && (
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 200 }} >
                        {loader ? <ActivityIndicator size={'large'} color={'blue'} /> : <Text style={{textDecorationLine:'underline', fontSize: 30, fontWeight: 'bold' }} >No user found</Text>}
                    </View>
                )
                }
                {!loader && fetchedData.length > 0 && <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
                    <Text style={{textDecorationLine:'underline', color: 'black', fontSize: 30,fontWeight:'bold',padding:10 }}>Users</Text>
                </View>}
                {!loader && fetchedData.length > 0 && fetchedData?.map((item) => {
                    // console.log("singleItem", item)
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("UserDetail", { data: item })} style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                            <Entypo name="dot-single" size={30} />
                            <Text style={{ color: 'blue', fontSize: 24 }} >
                                {item?.name}</Text>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <Modal getData={getData} ontoggle={onToggle} openModal={openModal} />
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({})
