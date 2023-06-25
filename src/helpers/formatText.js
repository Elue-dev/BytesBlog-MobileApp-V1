import React from "react";
import { View, Text } from "react-native";
import HTML from "react-native-render-html";

export default function PostContent({ content }) {
  return (
    <View>
      <Text>{/* Other components or text */}</Text>
      <HTML source={{ html: content }} />
    </View>
  );
}
