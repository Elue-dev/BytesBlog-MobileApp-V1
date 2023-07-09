import { Button } from "react-native";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { styles } from "./styles";

export default function StepOne({ nextStep }) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>Step One</Text>
      <Button title="NEXT" onPress={nextStep} />
    </SafeAreaView>
  );
}
