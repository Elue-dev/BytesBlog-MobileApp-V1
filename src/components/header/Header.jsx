import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth/AuthContext";
import { DEFAULT_AVATAR } from "../../utils";
import { Feather } from "@expo/vector-icons";
import { SharedElement } from "react-native-shared-element";
import { styles } from "./styles";
import BottomSheetComponent from "../bottom_sheet/BottomSheet";

function Header({ scrollPage, fromBlog }) {
  const navigation = useNavigation();
  const { bottomSheetOpen, toggleBottomSheet, toggleOverlay } = useAuth();

  const {
    state: { user },
  } = useAuth();

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
  }

  return (
    <>
      <View
        style={[
          styles.wrapper,
          scrollPage ? styles.borders : null,
          fromBlog === true ? { marginVertical: 30 } : null,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Image source={require("../../../assets/logo.png")} />
        </TouchableOpacity>

        {bottomSheetOpen && (
          <TouchableOpacity
            onPress={handleBottomSheetActions}
            style={styles.overlay}
          >
            <SharedElement id="overlay" style={styles.overlay}>
              <View />
            </SharedElement>
          </TouchableOpacity>
        )}

        <View style={styles.authBtnWrapper}>
          {user !== null ? (
            <TouchableOpacity onPress={handleBottomSheetActions}>
              <Text style={{ fontSize: 20, fontWeight: 500 }}>
                <Image
                  source={{ uri: user?.avatar || DEFAULT_AVATAR }}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    // resizeMode: "cover",
                  }}
                />
                <Feather name="chevron-down" size={25} />
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.authBtn, styles.signInBtn]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.authBtn, styles.signUpBtn]}
                onPress={() => navigation.navigate("Create")}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {/* ======== BOTTOM SHEET ========= */}
      {bottomSheetOpen && <BottomSheetComponent />}
    </>
  );
}

export default Header;
