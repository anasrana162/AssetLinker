import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../config";

const { width, height } = Dimensions.get("screen");

const ContactUs = ({ navigation }) => {
  // Contact Information Text
  const contactInfo = {
    address:
      "Plot No 29-C, Mez Floor #3, 21st Commercial Street PH II Ext, DHA, Karachi",
    phone: "+92 21 35395410-13",
    whatsApp: "+92 300 290 4737",
    email: "info@assetslinkers.com",
    accountNumber: "1346789213456",
  };

  return (
    <View style={styles.container}>
      {/* Arrow Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={28} color={Colors.blue} />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      {/* Scrollable Contact Information */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Contact Information</Text>
          <View style={styles.infoBox}>
            <View style={styles.infoContainer}>
              <Icon name="call" size={20} color={Colors.blue} />
              <Text style={styles.infoText}>Phone:</Text>
            </View>
            <Text style={styles.cardText}>{contactInfo.phone}</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoContainer}>
              <Icon name="logo-whatsapp" size={20} color={Colors.blue} />
              <Text style={styles.infoText}>WhatsApp:</Text>
            </View>
            <Text style={styles.cardText}>{contactInfo.whatsApp}</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoContainer}>
              <Icon name="mail" size={20} color={Colors.blue} />
              <Text style={styles.infoText}>Email:</Text>
            </View>
            <Text style={styles.cardText}>{contactInfo.email}</Text>
          </View>
          {contactInfo.accountNumber ? (
            <View style={styles.infoBox}>
              <View style={styles.infoContainer}>
                <Icon name="card" size={20} color={Colors.blue} />
                <Text style={styles.infoText}>Account Number:</Text>
              </View>
              <Text style={styles.cardText}>{contactInfo.accountNumber}</Text>
            </View>
          ) : null}
          <View style={styles.infoBox}>
            <View style={styles.infoContainer}>
              <Icon name="location" size={20} color={Colors.blue} />
              <Text style={styles.infoText}>Address:</Text>
            </View>
            <Text style={styles.cardText}>{contactInfo.address}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginTop: width * 0.09,
    alignSelf: "flex-start",
    color: "#000",
    borderWidth: 1,
    padding: 8,
    borderColor: Colors.blue,
    borderRadius: 8,
    marginLeft: 5,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.16,
    resizeMode: "contain",
    alignSelf: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.blue,
    borderRadius: 12,
    padding: width * 0.05,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    fontSize: width * 0.063,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cardText: {
    color: "#000",
    fontSize: 16,
    flex: 1,
    textAlign: "right",
  },
});
