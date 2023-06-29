import { Alert } from "react-native";

export function throwError(heading, message) {
  return Alert.alert(heading || "Something went wrong ❌", message, [
    { text: "CLOSE" },
  ]);
}

export function throwAlert(heading, message) {
  Alert.alert(heading, message, [{ text: "CLOSE" }]);
}
