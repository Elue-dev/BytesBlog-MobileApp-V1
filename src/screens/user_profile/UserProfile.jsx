import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-navigation";
import { styles } from "./styles";

export default function UserProfile() {
  const { user } = useRoute().params;

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>
        Welcome to {user.firstName}'s Profile 👋
      </Text>
    </SafeAreaView>
  );
}
