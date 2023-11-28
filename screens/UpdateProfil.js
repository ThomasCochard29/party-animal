import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

// Components
import Button from "../components/Button";
import CardProfil from "../components/CardProfil";

// Constant
import COLORS from "../constant/color";

// Data
import { pictureProfil } from "../pictureProfil";

export default function UpdateProfil({ navigation, route }) {
  const id_user = route?.params?.id_user;
  const userData = route?.params.userData;

  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);

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

  const handleUpdate = async () => {
    const isEmailValid = validateEmail(
      email !== "" ? email : userData.data.email_user
    );

    if (isEmailValid) {
      const updatedInfo = {
        email: email !== "" ? email : userData.data.email_user,
        nom: nom !== "" ? nom : userData.data.nom_user,
        prenom: prenom !== "" ? prenom : userData.data.prenom_user,
        imageProfil:
          selectedPicture !== null
            ? selectedPicture.name
            : userData.data.image_profil,
      };

      console.log(updatedInfo);

      axios
        .put(`http://192.168.1.19:5000/user/update/${id_user}`, updatedInfo)
        .then((res) => {
          const updatedUserData = res?.data.id_user;

          navigation.navigate("Profil", { id_user: updatedUserData });
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Erreur dans la mise à jour de votre compte !");
        });
    } else {
      setErrorMessage("Email ou mot de passe incorrect !");
    }
  };

  const handleDelete = () => {
    axios
      .put(`http://192.168.1.19:5000/user/delete/${id_user}`)
      .then((res) => {
        navigation.navigate("Welcome");
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
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
        <View style={s.container}>
          <View style={s.containerTitle}>
            <Text style={s.title}>Update</Text>

            <Text style={s.subtitle}>Changer vos informations ici !</Text>
          </View>
          <View style={s.viewInput}>
            <Text style={s.labelInput}>Email</Text>

            <View style={s.input}>
              <TextInput
                placeholder="Entrez Votre Adresse Email"
                placeholderTextColor={COLORS.white}
                defaultValue={userData?.data.email_user}
                keyboardType="email-address"
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
            <Text style={s.labelInput}>Nom</Text>

            <View style={s.input}>
              <TextInput
                placeholder="Entrez votre Nom"
                placeholderTextColor={COLORS.white}
                defaultValue={userData?.data.nom_user}
                style={{
                  width: "100%",
                  fontSize: 16,
                }}
                onChangeText={(text) => setNom(text)}
              />
            </View>
          </View>
          <View style={s.viewInput}>
            <Text style={s.labelInput}>Prenom</Text>

            <View style={s.input}>
              <TextInput
                placeholder={"Entrez votre Prenom"}
                placeholderTextColor={COLORS.white}
                defaultValue={userData?.data.prenom_user}
                style={{
                  width: "100%",
                  fontSize: 16,
                }}
                onChangeText={(text) => setPrenom(text)}
              />
            </View>
          </View>

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

          <View style={s.viewButton}>
            <Button
              title="Update"
              filled
              isChecked={true}
              onPress={handleUpdate}
              bgColor={COLORS.buttonBack}
              textColor={COLORS.subtitle}
            />
            <Button
              title="Desactiver le compte"
              filled
              isChecked={true}
              onPress={() => setModalVisible(true)}
              bgColor={COLORS.tertiary}
              textColor={COLORS.white}
              bdColor={COLORS.error}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={s.subtitleInfo}>Ne pas faire de mise à jour ?</Text>
            <Pressable onPress={() => navigation.navigate("Profil")}>
              <Text style={s.textLogin}>Profil</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={s.centeredView}>
            <View style={s.containerModal}>
              <Text style={[s.subtitle, { textAlign: "center" }]}>
                Es-tu sûr de vouloir supprimer ton compte ?
              </Text>
              <View style={[s.viewButton, { width: 300 }]}>
                <Button
                  title="Supprimer le compte"
                  filled
                  isChecked={true}
                  onPress={handleDelete}
                  bgColor={COLORS.buttonBack}
                  textColor={COLORS.subtitle}
                />
                <Button
                  title="Annuler"
                  filled
                  isChecked={true}
                  onPress={() => setModalVisible(false)}
                  bgColor={COLORS.buttonBack}
                  textColor={COLORS.subtitle}
                />
              </View>
            </View>
          </View>
        </Modal>
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
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  containerModal: {
    backgroundColor: COLORS.backPicture,
    minHeight: 400,
    minWidth: 350,
    marginHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 200,
    justifyContent: "center",
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
});
