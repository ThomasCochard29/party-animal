import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import axios from "axios";

// Components
import Button from "../components/Button";

// Constant
import COLORS from "../constant/color";
import CardProfil from "../components/CardProfil";

// Data
import { pictureProfil } from "../pictureProfil";

export default function Register({ navigation }) {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    "Les mots de passe ne corresponde pas !"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isPasswordMatch = password === confirmPassword;

  const handleSelectPicture = (picture) => {
    setSelectedPicture(picture);
  };

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

  const handleRegister = () => {
    const isEmailValid = validateEmail(email);

    if (isPasswordMatch && isEmailValid && isChecked && selectedPicture) {
      const { name: imageName } = selectedPicture;
      axios
        .post("http://192.168.1.19:5000/user/register", {
          email,
          password,
          imageName,
        })
        .then((res) => {
          console.log(res.data), navigation.navigate("Login");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Erreur dans la création de votre compte !");
        });
    } else {
      setErrorMessage(
        "Vous devez remplir tous les champs et choisir une image de profil !"
      );
    }
  };

  const handleClear = () => {
    setEmail("");
    setEmailErrorMessage("");
    setPassword("");
    setErrorMessage("");
    setSelectedPicture(null);
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
            <Text style={s.title}>Inscription</Text>

            <Text style={s.subtitle}>
              Inscrit toi pour rejoindre tes ami(e)s !
            </Text>
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
          <View style={s.viewInput}>
            <Text style={s.labelInput}>Confirmation du Mot de Passe</Text>

            <View style={s.input}>
              <TextInput
                placeholder="Confirmation du Mot de Passe"
                placeholderTextColor={COLORS.white}
                secureTextEntry={isConfirmPasswordShown}
                defaultValue={confirmPassword}
                style={{
                  width: "100%",
                  fontSize: 16,
                }}
                onChangeText={(text) => setConfirmPassword(text)}
              />

              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordShown(!isConfirmPasswordShown)
                }
                style={s.eyePassword}
              >
                {isConfirmPasswordShown == false ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.subtitle} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.title} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Affichage du message d'erreur en temps réel */}
          {!isPasswordMatch ? (
            <View style={s.errorMessageContainer}>
              <Text style={s.errorMessage}>{passwordErrorMessage}</Text>
            </View>
          ) : null}

          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {pictureProfil.map((picture, index) => (
                <CardProfil
                  key={index}
                  picture={picture.uri}
                  marginRight={index !== pictureProfil.length - 1}
                  isSelected={selectedPicture === picture}
                  onSelect={() => handleSelectPicture(picture)}
                  name={picture.name}
                />
              ))}
            </ScrollView>
          </View>

          {/* Affichage de l'image sélectionnée */}
          {selectedPicture && (
            <View style={s.selectedImageContainer}>
              <Image source={selectedPicture.uri} style={s.selectedImage} />
            </View>
          )}

          {/* Affichage du message d'erreur si la connexion n'a pas réussi */}
          {errorMessage !== "" && (
            <View style={[s.errorMessageContainer, { marginVertical: 10 }]}>
              <Text style={s.errorMessage}>{errorMessage}</Text>
            </View>
          )}

          <View style={s.viewCheckbox}>
            <Checkbox
              style={{ marginRight: 10, position: "relative", top: 2.5 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
              borderColor={isChecked ? COLORS.primary : undefined}
            />

            <Text
              style={s.subtitleInfo}
              onPress={() => setIsChecked(!isChecked)}
            >
              J'accepte les termes et conditions.
            </Text>
          </View>

          <View style={s.viewButton}>
            <Button
              title="INSCRIPTION"
              filled
              isChecked={isChecked}
              onPress={handleRegister}
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
            <Text style={s.subtitleInfo}>Tu as déjà un compte ?</Text>
            <Pressable
              onPress={() => {
                handleClear();
                navigation.navigate("Login");
              }}
            >
              <Text style={s.textLogin}>Connexion</Text>
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
    marginVertical: 20,
  },
  viewButton: {
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
  selectedImageContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(206, 255, 61, 0.6)",
  },
  selectedImage: {
    height: 80,
    width: 80,
  },
  errorMessageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
  },
  errorMessage: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
