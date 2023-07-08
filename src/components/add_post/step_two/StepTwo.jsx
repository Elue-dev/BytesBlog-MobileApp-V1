import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function StepTwo({ previousStep }) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>Step Two</Text>
    </SafeAreaView>
  );
}
