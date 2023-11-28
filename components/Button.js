import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";
import React from "react";

// Constant
import COLORS from "../constant/color";

export default function Button(props) {
  return (
    <>
      {!props.isChecked && (
        <View style={s.errorContainer}>
          <Text style={s.error}>Veuillez Accepter les conditions ! </Text>
        </View>
      )}
      <TouchableOpacity
        style={[
          s.button,
          {
            backgroundColor: props.bgColor,
            borderColor: props.bdColor || COLORS.primary,
          },
        ]}
        onPress={props.onPress}
        disabled={!props.isChecked}
      >
        <Text style={[s.text, { color: props.textColor }]}>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
}

const s = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotateZ: "4deg" }],
    marginVertical: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
  },
  error: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
