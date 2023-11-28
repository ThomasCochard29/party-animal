import { View, Text, Image, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";

// Data
import { pictureProfil } from "../pictureProfil";

// Components
import Button from "../components/Button";

// Constant
import COLORS from "../constant/color";
import axios from "axios";

export default function Profil({ navigation, route }) {
  const [userData, setUserData] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);

  // const id_user = route?.params?.id_user;
  const id_user = 1;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.19:5000/user/${id_user}`,
        {
          // Assurez-vous d'inclure les informations d'authentification si nécessaires
          headers: {
            Authorization: `Bearer VOTRE_TOKEN`,
          },
        }
      );

      setUserData(response.data);
      setShouldReload(false);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur",
        error
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (shouldReload) {
        getUser();
      }
    }, [shouldReload])
  );

  useEffect(() => {
    getUser();
  }, []);

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
      <View style={s.containerGlobal}>
        {userData && (
          <View style={s.containerImage}>
            <Image
              source={
                pictureProfil.find(
                  (animal) => animal.name === userData?.data.image_profil
                )?.uri
              }
              style={[s.imageBack, s.overlay]}
            />
          </View>
        )}
        <View style={s.container}>
          <View style={s.containerInfo}>
            <View style={s.containerText}>
              <View style={s.containerTitle}>
                <Text style={s.text}>Email</Text>
              </View>
              <View style={s.containerTitle}>
                <Text style={s.subtitle}>{userData?.data?.email_user}</Text>
              </View>
            </View>
            <View style={s.containerText}>
              <View style={s.containerTitle}>
                <Text style={s.text}>Nom</Text>
              </View>
              <View style={s.containerTitle}>
                <Text style={s.subtitle}>{userData?.data?.nom_user}</Text>
              </View>
            </View>
            <View style={s.containerText}>
              <View style={s.containerTitle}>
                <Text style={s.text}>Prenom</Text>
              </View>
              <View style={s.containerTitle}>
                <Text style={s.subtitle}>{userData?.data?.prenom_user}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={s.containerButton}>
          <Button
            title={"Update"}
            isChecked={true}
            bgColor={COLORS.backPicture}
            textColor={COLORS.subtitle}
            onPress={() => {
              setShouldReload(true); // Mettez shouldReload à true lorsque vous naviguez vers UpdateProfil
              navigation.navigate("UpdateProfil", { id_user, userData });
            }}
          />
          <View style={{ position: "relative", bottom: 26 }}>
            <Button
              title={"Déconnexion"}
              isChecked={true}
              bgColor={COLORS.backPicture}
              textColor={COLORS.subtitle}
              onPress={() => navigation.navigate("Welcome")}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  containerGlobal: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  containerImage: {
    position: "relative",
    top: 180,
    alignItems: "center",
    zIndex: 10,
  },
  imageBack: {
    height: 150,
    width: 150,
    borderRadius: 50,
    // transform: [{ translateX: 20 }, { translateY: 50 }, { rotate: "-15deg" }],
    backgroundColor: COLORS.backPicture,
  },
  container: {
    position: "relative",
    top: 100,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    minHeight: 400,
    marginHorizontal: 30,
    borderRadius: 40,
    // zIndex: 11
  },
  containerInfo: {
    alignSelf: "center",
    marginVertical: 100,
  },
  text: {
    fontSize: 26,
    color: COLORS.backPicture,
    fontWeight: "800",
    letterSpacing: 12,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 26,
    color: COLORS.subtitle,
    fontWeight: "800",
  },
  containerText: {
    marginBottom: 10,
  },
  containerTitle: {
    alignItems: "center",
  },
  containerButton: {
    marginHorizontal: 8,
  },
});
