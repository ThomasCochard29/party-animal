import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

// Components
import Button from "../components/Button";

// Constant
import COLORS from "../constant/color";

export default function Welcome({ navigation }) {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primary, COLORS.secondary, COLORS.tertiary]}
    >
      <StatusBar style="inverted" backgroundColor="transparent" />
      <View>
        <View>
          <Image
            source={require("../assets/images/catSimple.jpg")}
            style={[
              s.imgBack,
              {
                top: 10,
                transform: [
                  { translateX: 20 },
                  { translateY: 50 },
                  { rotate: "-15deg" },
                ],
              },
            ]}
          />
          <Image
            source={require("../assets/images/catParty.jpg")}
            style={[
              s.imgBack,
              {
                top: -30,
                left: 100,
                transform: [
                  { translateX: 50 },
                  { translateY: 50 },
                  { rotate: "-5deg" },
                ],
              },
            ]}
          />

          <Image
            source={require("../assets/images/catGlasses.jpg")}
            style={[
              s.imgBack,
              {
                top: 130,
                left: -50,
                transform: [
                  { translateX: 50 },
                  { translateY: 50 },
                  { rotate: "15deg" },
                ],
              },
            ]}
          />

          <Image
            source={require("../assets/images/catThug.jpg")}
            style={[
              s.imgBack,
              {
                width: 200,
                height: 200,
                top: 140,
                left: 100,
                transform: [
                  { translateX: 50 },
                  { translateY: 50 },
                  { rotate: "-15deg" },
                ],
              },
            ]}
          />
        </View>
        <View style={s.container}>
          <View style={s.containerTitle}>
            <Text style={s.title}>It's Time</Text>
            <Text
              style={[
                s.title,
                {
                  fontSize: 46,
                  color: COLORS.text,
                },
              ]}
            >
              To Shine
            </Text>
          </View>

          <Button
            title="Rejoins Nous"
            onPress={() => navigation.navigate("Register")}
            style={s.button}
            isChecked={true}
            bgColor={COLORS.buttonBack}
            textColor={COLORS.subtitle}
          />

          <View style={s.viewLogin}>
            <Text style={s.subtitle}>Tu as déjà un compte ?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={s.textLogin}>Connexion</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  imgBack: {
    position: "absolute",
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  container: {
    paddingHorizontal: 30,
    position: "relative",
    top: 480,
  },
  containerTitle: {
    marginBottom: 30,
  },
  title: {
    fontSize: 50,
    color: COLORS.title,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
  },
  button: {
    marginTop: 22,
    width: "100%",
  },
  viewLogin: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  textLogin: {
    fontSize: 18,
    color: COLORS.subtitle,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
