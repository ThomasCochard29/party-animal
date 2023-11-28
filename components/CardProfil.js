import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CardProfil({
  picture,
  marginRight,
  isSelected,
  onSelect,
  name,
}) {
  return (
    <TouchableOpacity
      style={[s.container, marginRight && s.containerMargin]}
      onPress={onSelect}
    >
      <View style={isSelected ? s.overlayChoise : s.overlay} />
      <Image source={picture} alt={name} style={s.image} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    width: 80,
    borderRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(59, 0, 202, 0.5)", // Ajustez l'opacité ici
  },
  overlayChoise: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(206, 255, 61, 0.5)", // Ajustez l'opacité ici
  },
  image: {
    height: 80,
    width: 80,
  },
  containerMargin: {
    marginRight: 10,
  },
});
