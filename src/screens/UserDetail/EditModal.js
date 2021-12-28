import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from "react-native"; import Modal from "react-native-modal";
import { firebase } from "../../firebase/config";

const EditModal = ({ ontoggle, openModal, id, editname, editemail, editage ,seteditEmail,seteditAge,seteditName}) => {
    const entityRef = firebase.firestore().collection("users").doc(id);

    const [loader, setLoader] = useState(false)
    const [name, setName] = useState(editname)
    const [email, setEmail] = useState(editemail)
    const [age, setAge] = useState(editage)


    const addUser = () => {
        if (name == '' || name == ' ') {
            alert("Invalid name")
            return;
        }
        if (email == '') {
            alert("Invalid email")
            return;
        }
        if (age == '') {
            alert("Invalid age")
            return;
        }
        else {
            setLoader(true)

            entityRef.update({
                name,
                email,
                age,
            }).then(() => {
                setLoader(false)
                openModal()
                seteditEmail(email)
                seteditAge(age)
                seteditName(name)
                setName("")
                setEmail("")
                setAge("")

            }).catch(() => {
                setLoader(false)
                alert(
                    "something went wrong"
                )
               
            })

        }
    }




    return (
        <Modal isVisible={ontoggle}>
            <View style={styles.modalContainer}>
                <View style={styles.closeButtonContainer}>
                    <View style={styles.titleText}>
                        <Text onPress={openModal} style={{ fontSize: 20, fontWeight: "bold" }}>
                            {""}
                        </Text>
                    </View>
                    <View style={styles.titleText}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {"Edit User"}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={openModal}>
                        <View style={styles.closeButton}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{"X"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={{ marginVertical: 10, width: '100%', paddingHorizontal: 10 }} >

                        <Text style={{ fontSize: 16, color: 'black' }}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(e) => setName(e)}
                            style={{ backgroundColor: 'whitesmoke', width: '100%', padding: 10, fontSize: 15, color: 'black' }}
                            placeholder={`Enter Name`}
                        />
                    </View>

                    <View style={{ marginVertical: 10, width: '100%', paddingHorizontal: 10 }} >
                        <Text style={{ fontSize: 16, color: 'black' }}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                            style={{ backgroundColor: 'whitesmoke', width: '100%', padding: 10, fontSize: 15, color: 'black' }}
                            placeholder={`Enter Email`}
                        />
                    </View>
                    <View style={{ marginVertical: 10, width: '100%', paddingHorizontal: 10 }} >

                        <Text style={{ fontSize: 16, color: 'black' }} >Age</Text>
                        <TextInput
                            value={age}
                            onChangeText={(e) => setAge(e)}
                            keyboardType="number-pad"
                            maxLength={2}
                            style={{ backgroundColor: 'whitesmoke', width: '100%', padding: 10, fontSize: 15, color: 'black' }}
                            placeholder={`Enter Age`}
                        />
                    </View>

                </View>
                {loader ? <ActivityIndicator color={'blue'} size={'large'} /> :
                    <TouchableOpacity onPress={addUser} style={{ backgroundColor: 'blue', alignItems: 'center', padding: 10, marginHorizontal: 10, borderRadius: 100 }} >
                        <Text style={{ color: 'white', fontSize: 20 }} >Edit User</Text>
                    </TouchableOpacity>
                }

            </View>
        </Modal>
    )
}

export default EditModal

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    modalContainer: { backgroundColor: "#fff", paddingBottom: 20 },
    touchableOpacityStyle: {
        position: "absolute",
        width: 50,
        height: 50,
        // alignItems: "center",
        // justifyContent: "center",
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: "contain",
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    head: {
        height: 40,
        backgroundColor: "#808B97",
    },
    text: { margin: 6, color: "#fff", textAlign: "center" },
    row: { flexDirection: "row", backgroundColor: "red" },
    btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
    btnText: { textAlign: "center", color: "#fff" },
    closeButtonContainer: {
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        paddingHorizontal: 15,
    },
    closeButton: {
        flex: 1,
        justifyContent: "center",
    },
    titleText: {
        flexGrow: 1,
    },
    input: {
        borderWidth: 0.5,
        borderColor: "lightgrey",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "80%",
        marginTop: 15,
    },
    formContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    button__container: {
        backgroundColor: "blue",
        width: "30%",
        borderRadius: 50,
        alignItems: "center",
    },
    button__text: {
        textAlign: "center",
        padding: 10,
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    footerBtn: {
        paddingTop: 20,
        alignItems: "center",
    },
})
