import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { userInterests } from "../../data/interests";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { throwAlert, throwError } from "../../helpers/throwAlert";
import { httpRequest } from "../../lib";
import { SERVER_URL } from "../../utils";
import { useAuth } from "../../context/auth/AuthContext";
import axios from "axios";

export default function ManageInterests() {
  const { interests } = useRoute().params;
  const [uInterests, setUInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {
    state: { user },
    logOutUser,
    setActiveUser,
  } = useAuth();

  useEffect(() => {
    const filteredUserInterests = userInterests.filter((interest) =>
      interests.includes(interest)
    );
    setUInterests(filteredUserInterests);
  }, [interests]);

  const manageUserInterests = (interest) => {
    if (uInterests.includes(interest)) {
      setUInterests(uInterests.filter((cat) => cat !== interest));
    } else {
      setUInterests([...uInterests, interest]);
    }
  };

  async function updateUserInterests() {
    if (uInterests.length < 4)
      return throwError("Error ❌", "Interests must be at least 4");

    const credentials = { interests: uInterests };
    const authHeaders = {
      headers: { authorization: `Bearer ${user.token}` },
    };

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${SERVER_URL}/users`,
        credentials,
        authHeaders
      );
      if (response) {
        logOutUser();
        setActiveUser(response.data.updatedUser);
        setIsLoading(false);
        throwAlert(
          "Success ✅",
          "Your interests have ben successfully updated"
        );
        navigation.goBack();
      }
    } catch (error) {
      throwError(error?.response?.data?.message);
      setIsLoading(false);
    }

    setUInterests([]);
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={25} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Manage Your Interests</Text>
        <Text style={[styles.subText, { marginTop: 10 }]}>
          This would determine the blog posts you would see
        </Text>
        <View style={styles.interestsWrap}>
          {userInterests.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.interestItem,
                uInterests.includes(item) ? styles.active : null,
              ]}
              onPress={() => manageUserInterests(item)}
            >
              <Text
                style={[
                  styles.intText,
                  uInterests.includes(item) ? styles.activeText : null,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.btn} onPress={updateUserInterests}>
            {isLoading ? (
              <ActivityIndicator color={"#fff"} size="small" />
            ) : (
              <Text style={styles.btnText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
