import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Feather, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { styles } from "./styles";
import { COLORS } from "../../common/colors";
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";

export default function BottomSheetComponent() {
  const { logOutUser, toggleBottomSheet, toggleOverlay } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const SheetRef = useRef(null);
  const snapPoints = Platform.OS === "android" ? ["40%"] : ["35%"];

  function toggleSwitch() {
    setIsEnabled((previousState) => !previousState);
  }

  function handleBottomSheetActions(route) {
    toggleBottomSheet();
    toggleOverlay();
    navigation.navigate(route);
  }

  function handleLogoutAction() {
    toggleBottomSheet();
    toggleOverlay();
    logOutUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  return (
    <BottomSheet
      ref={SheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onClose={handleBottomSheetActions}
      style={{ zIndex: 30 }}
    >
      <BottomSheetView>
        <View style={styles.bottomSheetWrap}>
          {/* <TouchableOpacity style={styles.bottomSheetItem}>
            <Switch
              trackColor={{ false: "#767577", true: COLORS.primaryColor }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
            <Text style={styles.sheetText}>Light/Dark Mode</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => handleBottomSheetActions("AddPost")}
          >
            <FontAwesome5 name="pen-fancy" size={28} color={COLORS.gray600} />
            <Text style={styles.sheetText}>Add Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => handleBottomSheetActions("Profile")}
          >
            <Feather name="user" size={28} color={COLORS.gray600} />
            <Text style={styles.sheetText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={handleLogoutAction}
          >
            <SimpleLineIcons name="logout" size={24} color={COLORS.gray600} />
            <Text style={styles.sheetText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
