import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";

export default function SearchBar({
  term,
  setTerm,
  onTermChange,
  onTermSubmit,
}) {
  return (
    <View style={styles.backgroundStyle}>
      <AntDesign name="search1" size={20} style={{ marginLeft: 10 }} />
      <TextInput
        autoCapitalize="none"
        style={styles.inputStyle}
        value={term}
        placeholder="Search posts by title, authors"
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
      {term && (
        <AntDesign
          name="close"
          size={20}
          style={{ marginLeft: 10 }}
          onPress={() => setTerm("")}
        />
      )}
    </View>
  );
}
