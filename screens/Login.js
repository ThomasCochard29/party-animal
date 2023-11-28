import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

// Components
import Button from "../components/Button";

// Constant
import COLORS from "../constant/color";

export default function Login({ navigation }) {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setEmailErrorMessage("");
      return true;
    } else {
      setEmailErrorMessage("Veuillez entrer une adresse e-mail valide.");
      return false;
    }
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      axios
        .post("http://192.168.1.19:5000/user/login", { email, password })
        .then((res) => {
          const userData = res?.data.user;

          if (userData && userData?.id_user) {
            const id_user = userData?.id_user;
            navigation.navigate("Profil", { id_user });
          } else {
            console.error(
              "Les données de l'utilisateur ou l'ID de l'utilisateur ne sont pas disponibles."
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Erreur dans la connexion !");
        });
    } else {
      setErrorMessage("Email ou mot de passe incorrect !");
    }
  };

  const handleClear = () => {
    setEmail("");
    setEmailErrorMessage("");
    setPassword("");
    setErrorMessage("");
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primary, COLORS.secondary, COLORS.tertiary]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 60, marginHorizontal: 10 }}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Image
            source={require("../assets/images/arrow.png")}
            style={{
              transform: [{ rotateZ: "180deg" }],
              width: 50,
              height: 33,
            }}
          />
        </TouchableOpacity>
        <View style={s.container}>
          <View style={s.containerTitle}>
            <Text style={s.title}>Connexion</Text>

            <Text style={s.subtitle}>Viens t'amuser avec tes ami(e)s !</Text>
          </View>

          <View style={s.viewInput}>
            <Text style={s.labelInput}>Email</Text>

            <View style={s.input}>
              <TextInput
                placeholder="Entrez Votre Adresse Email"
                placeholderTextColor={COLORS.white}
                keyboardType="email-address"
                defaultValue={email}
                style={{
                  width: "100%",
                  fontSize: 16,
                }}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          {/* Affichage du message d'erreur pour l'email */}
          {emailErrorMessage !== "" && (
            <View style={s.errorMessageContainer}>
              <Text style={s.errorMessage}>{emailErrorMessage}</Text>
            </View>
          )}

          <View style={s.viewInput}>
            <Text style={s.labelInput}>Mot de Passe</Text>

            <View style={s.input}>
              <TextInput
                placeholder="Entrez votre Mot de Passe"
                placeholderTextColor={COLORS.white}
                secureTextEntry={isPasswordShown}
                defaultValue={password}
                style={{
                  width: "100%",
                  fontSize: 16,
                }}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={s.eyePassword}
              >
                {isPasswordShown == false ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.subtitle} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.title} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Affichage du message d'erreur si la connexion n'a pas réussi */}
          {errorMessage !== "" && (
            <View style={s.errorMessageContainer}>
              <Text style={s.errorMessage}>{errorMessage}</Text>
            </View>
          )}

          <View style={s.viewButton}>
            <Button
              title="CONNEXION"
              filled
              isChecked={true}
              onPress={handleLogin}
              bgColor={COLORS.buttonBack}
              textColor={COLORS.subtitle}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={s.subtitleInfo}>Vous n'avez pas de compte ?</Text>
            <Pressable
              onPress={() => {
                handleClear();
                navigation.navigate("Register");
              }}
            >
              <Text style={s.textLogin}>Inscription</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: "center",
    alignContent: "center",
  },
  containerTitle: {
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.subtitle,
    fontWeight: "800",
    fontStyle: "italic",
  },
  viewInput: {
    marginBottom: 12,
  },
  labelInput: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 8,
    color: COLORS.text,
  },
  input: {
    fontSize: 16,
    width: "100%",
    height: 48,
    borderColor: COLORS.title,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  eyePassword: {
    position: "absolute",
    right: 12,
  },
  viewCheckbox: {
    flexDirection: "row",
    marginVertical: 10,
  },
  viewButton: {
    marginTop: 20,
    marginBottom: 4,
  },
  textLogin: {
    fontSize: 18,
    color: COLORS.subtitle,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitleInfo: {
    fontSize: 18,
    color: COLORS.white,
  },
  errorMessageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
  },
  errorMessage: {
    alignSelf: "center",
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
