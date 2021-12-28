import React, { useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import EditModal from './EditModal'
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";

const UserDetail = (passedData) => {
    const { data } = passedData?.route?.params
    const [name, setName] = useState(data?.name)
    const [email, setEmail] = useState(data?.email)
    const [age, setAge] = useState(data?.age)


    const [onToggle, setToggle] = useState(false);
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const [disable, setDisable] = useState(false)
    const entityRef = firebase.firestore().collection("users").doc(data?.id);

    const openModal = () => {
        setToggle(!onToggle);
    }

    const deleteUser = () => {
        setLoader(true)
        setDisable(true)
        entityRef.delete().then(() => {
            setLoader(false)
            setDisable(false)
            navigation.navigate("Home")
        }
        ).catch(err => {
            setLoader(false)
            setDisable(false)
        }
        )
    }
    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={{ alignItems: 'center', marginTop: 30 }} >
                {loader ? (
                    <>
                        <ActivityIndicator size={"large"} color={"red"} />
                        <Text style={{ fontSize: 30, color: 'red' }} >Deleting User</Text>
                    </>
                )

                    : (<>
                        <View style={styles.row} >
                            <Text style={{ fontSize: 20 }} >Name</Text>
                            <Text style={{ fontSize: 20 }}>{name}</Text>
                        </View>
                        <View style={[styles.row]} >
                            <Text style={{ fontSize: 20, borderColor: 'gray' }}>Email</Text>
                            <Text style={{ fontSize: 20, borderColor: 'gray' }}>{email}</Text>
                        </View>
                        <View style={styles.row} >
                            <Text style={{ fontSize: 20 }}>Age</Text>
                            <Text style={{ fontSize: 20 }}>{age}</Text>
                        </View>
                    </>)
                }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end', marginTop: '30%' }} >
                <TouchableOpacity disabled={disable} onPress={deleteUser} style={{ backgroundColor: 'red', padding: 10, width: 150 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={disable} onPress={openModal} style={{ backgroundColor: 'blue', padding: 10, width: 150 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }} >Edit</Text>
                </TouchableOpacity>
            </View>
            <EditModal seteditEmail={setEmail} seteditAge={setAge} seteditName={setName} editname={data?.name} editemail={data?.email} editage={data?.age} id={data?.id} ontoggle={onToggle} openModal={openModal} />

        </ScrollView>
    )
}

export default UserDetail

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
        marginTop: 30,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'whitesmoke'
    }
})
