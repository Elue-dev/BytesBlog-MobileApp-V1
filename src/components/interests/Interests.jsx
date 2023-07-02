import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { userInterests } from "../../data/interests";
import { styles } from "./styles";
import { SERVER_URL } from "../../utils";
import { throwError } from "../../helpers/throwAlert";
import { httpRequest } from "../../lib";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth/AuthContext";

function Interests({ values, interests, setInterests, previousStep }) {
  const [isLoading, setIsLoading] = useState(false);
  const { firstname, lastname, email, password } = values;
  const navigation = useNavigation();
  const { setActiveUser } = useAuth();

  const setUserInterests = (int) => {
    if (interests.includes(int)) {
      setInterests(interests.filter((cat) => cat !== int));
    } else {
      setInterests([...interests, int]);
    }
  };

  async function registerUser() {
    if (interests.length < 4)
      return throwError("Error ❌", "Interests must be at least 4");

    const isGoogle = false;
    const credentials = isGoogle
      ? {
          firstname: "",
          lastname: "",
          email: "",
          avatar: "",
          password: Date.now().toString(),
          interests,
          withGoogle: true,
        }
      : { firstname, lastname, email, password, interests, withGoogle: false };

    try {
      setIsLoading(true);
      const response = await httpRequest.post(
        `${SERVER_URL}/auth/signup`,
        credentials
      );
      if (response.data.status === "success") {
        setIsLoading(false);
        setActiveUser(response.data.user);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      throwError(errorMessage);
      if (errorMessage.includes("sign in instead"))
        navigation.navigate("Login");
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => previousStep()}>
          <AntDesign name="leftcircleo" size={30} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Select Your Interests</Text>
        <Text style={[styles.subText, { marginTop: 10 }]}>
          This would determine the blog posts you would see
        </Text>
        <View style={styles.interestsWrap}>
          {userInterests.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.interestItem,
                interests.includes(item) ? styles.active : null,
              ]}
              onPress={() => setUserInterests(item)}
            >
              <Text
                style={[
                  styles.intText,
                  interests.includes(item) ? styles.activeText : null,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.btn} onPress={registerUser}>
            {isLoading ? (
              <ActivityIndicator color={"#fff"} size="small" />
            ) : (
              <Text style={styles.btnText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Interests;
