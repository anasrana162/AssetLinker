import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Modal,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../config";

const LoadingModal = ({ loading }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={loading}
      // onRequestClose={() => {}}
    >
      <StatusBar backgroundColor={"transparent"} />
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={Colors.apple} />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
