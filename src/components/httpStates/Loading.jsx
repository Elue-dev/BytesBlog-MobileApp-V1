import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-navigation";

export default function LoadingScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ActivityIndicator
        size="large"
        color="#169639"
        style={{ paddingTop: 30 }}
      />
    </SafeAreaView>
  );
}
