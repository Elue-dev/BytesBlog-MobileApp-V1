import { View, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";

export default function PostContent({ content }) {
  const windowWidth = useWindowDimensions().width;

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <HTML
        source={{
          html: `<div 
            style='color: #636366; 
            font-size: 1.2rem; 
            line-height: 2rem'
          >
            ${content}
          </div>`,
        }}
        contentWidth={windowWidth}
      />
    </View>
  );
}
