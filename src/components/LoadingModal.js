import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Modal,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../config";

const LoadingModal = ({ bgc, loading }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={loading}
      // onRequestClose={() => {}}
    >
      <StatusBar backgroundColor={"transparent"} />
      <View
        style={[
          styles.overlay,
          { backgroundColor: bgc || "rgba(0, 0, 0, 0.5)" },
        ]}>
        <ActivityIndicator
          size="large"
          color={Colors.apple}
          style={{ backgroundColor: "#000", padding: 8, borderRadius: 50 }}
        />
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
  },
});
