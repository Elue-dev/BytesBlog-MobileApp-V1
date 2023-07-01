import { View, Text, Button } from "react-native";
import { COLORS } from "../../common/colors";

export default function ErrorScreen({ refetch }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: 700, fontSize: 20 }}>
        SOMETHING WENT WRONG ☹️
      </Text>
      <Button color={COLORS.primaryColor} title="Retry" onPress={refetch} />
    </View>
  );
}
