import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../../config';

const AgreementModal = ({ isVisible, closeModal, onAccept, agreementText }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Text style={{
                            fontSize: 24,
                            color: Colors.light_blue,
                            marginVertical: 10,
                            fontWeight: "bold"
                        }}>Terms and Conditions</Text>
                        <Text style={styles.modalText}>
                            (1) Your identity, your recognition {"\n"}
                            (2) In order to improve your prestige and quality in property problems, to make your work easier so that you can easily sell or purchase to professional agents from any corner of the world. {"\n"}
                            (3) On the Assets Linkers App, you can add your property by yourself and delete it yourself when it is sold. {"\n"}
                            (4) Assets Linkers is providing you with a real estate form that will promote you to pledge your estate to make the estate known to agents in other cities so that they can easily contact each other. {"\n"}
                            (5) Assets Linkers provides you with professional agents and builder profile to improve your confidence and reputation. {"\n"}
                            (6) Access to the Association News may be given to all Association Presidents and Media Secretary regarding property in the Association Journal Body Meeting to report on meetings and property developments to all Bayer/Seller Candidate Associations. See you on Ashan News. {"\n"}
                            (7) Uploaded to or made available on the Website or App Any material or information on which any may also be considered under the jurisdictional law is where the website can be accessed. {"\n"}
                            (8) Illegal, immoral, obscene images, pornography, Racist, politically insulting liar incompetent Credibility misleading or in any way intended for adults Harm, defamation, obscenity, obscenity or WHATEVER MAY INFRINGE THE RIGHTS OF THIRD PARTIES of nature or illegal possessions and images of animals or Assets linkers for any video violations After one ring in the web, block his account {"\n"}
                            (9) Builder and developers all their projects together And can advertise separately Company and user was contracted for the same period as Company will be bound for that particular time {"\n"}
                            (10) Company reserves all rights for any reasons that company can block any account not responsible for it. {"\n"}
                            (11) In Assets linkers Company will upload advertisement and add contact information post by themself and also will delete by themself {"\n"}
                            (12) Assets Linkers is bound by contract with all users and users as well. {"\n"}
                            (13) All consult and builder will up their mobile number, email address, location and state name company and will list their own profile Buyer / Seller will only give name number and email on which they can be contacted. {"\n"}
                            (14) Assets linkers will not be responsible for the transactions in between consultants builders or buyer and sellers.
                        </Text>
                    </ScrollView>
                    <View style={{ flexDirection: "row", width: "100%", alignSelf: 'center', justifyContent: "space-around", alignItems: "center" }}>
                        <TouchableOpacity
                            style={{ ...styles.closeButton, backgroundColor: '#2196F3' }}
                            onPress={onAccept}
                        >
                            <Text style={styles.textStyle}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.closeButton, backgroundColor: '#2196F3' }}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '80%', // Limit modal height if needed
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
        lineHeight: 24,
        color:"black"
    },
    closeButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AgreementModal;