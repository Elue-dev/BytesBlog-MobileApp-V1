import { View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ActivityIndicator
        size="large"
        color="#169639"
        style={{ paddingTop: 60 }}
      />
    </View>
  );
}
