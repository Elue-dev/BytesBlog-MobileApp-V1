import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { throwAlert, throwError } from "../../helpers/throwAlert";
import { uploadImageToCloud } from "../../helpers/imageUpload";
import { DEFAULT_AVATAR, SERVER_URL } from "../../utils";
import { httpRequest } from "../../lib";
import { useQueryClient } from "@tanstack/react-query";
import { styles } from "./styles";
import { useAuth } from "../../context/auth/AuthContext";

export default function EditProfile() {
  const { user } = useRoute().params;
  const { logOutUser, setActiveUser } = useAuth();
  const navigation = useNavigation();
  const [inputHeight, setInputHeight] = useState(40);
  const [imageHasChanged, setImageHasChanged] = useState(false);
  const [image, setImage] = useState(user.avatar);
  const [bio, setBio] = useState(user?.bio);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Profile",
    });
  }, []);

  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageHasChanged(true);
    }
  }

  function handleContentSizeChange(event) {
    const { contentSize } = event.nativeEvent;
    const inputHeight = contentSize.height;
    setInputHeight(inputHeight);
  }

  async function updateUserProfile() {
    if (!firstName)
      return throwError("Missing Fields Detected", "First Name is required");
    if (!lastName)
      return throwError("Missing Fields Detected", "Last Name is required");

    if (
      firstName === user?.firstName &&
      lastName === user?.lastName &&
      bio === user?.bio &&
      !imageHasChanged
    )
      return throwError("You have not made any changes to your profile");
    try {
      setLoading(true);
      let imageUrl;
      if (imageHasChanged) imageUrl = await uploadImageToCloud(image);

      const credentials = {
        firstName: firstName || user?.firstName,
        lastName: lastName || user?.lastName,
        avatar: imageUrl || user?.avatar,
        bio: bio || user?.bio,
      };

      const authHeaders = {
        headers: { authorization: `Bearer ${user?.token}` },
      };
      const response = await httpRequest.put(
        `${SERVER_URL}/users`,
        credentials,
        authHeaders
      );
      if (response) {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["likes"]);
        queryClient.invalidateQueries(["bookmarks"]);
        queryClient.invalidateQueries(["comments"]);
        logOutUser();
        setActiveUser(response.data.updatedUser);
        setLoading(false);
        navigation.goBack();
        throwAlert("Success ✅", "Your profile has been updated");
      }
    } catch (error) {
      console.log(error);
      throwError(error.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headingText}>Photo</Text>
        <View style={styles.flexTop}>
          <Image
            source={{ uri: image || DEFAULT_AVATAR }}
            style={styles.avatar}
          />
          <View>
            <TouchableOpacity onPress={pickImageAsync}>
              <Text style={styles.replaceText}>Replace Photo</Text>
            </TouchableOpacity>
            <Text style={styles.subText}>JPG and PNG are acceptable</Text>
          </View>
        </View>

        <View style={styles.namesSec}>
          <Text style={styles.headingText}>Names</Text>
          <View style={styles.flexInput}>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(newName) => setFirstName(newName)}
            />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(newName) => setLastName(newName)}
            />
          </View>
          <Text style={styles.subText}>
            This will appear on your posts and profile.
          </Text>

          <View style={styles.bioSec}>
            <Text style={styles.bioText}>Bio</Text>
            <Text style={styles.subText}>
              {" "}
              This will be shown when others view your profile
            </Text>
            <TextInput
              style={[styles.bioInput, { height: inputHeight }]}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
              value={bio}
              onChangeText={(newBio) => setBio(newBio)}
            />
            <Text style={styles.bioLength}>{bio.length}/200 words</Text>
          </View>

          <View style={styles.btnFlex}>
            <TouchableOpacity
              style={[styles.btn, styles.cancelBtn]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.btnText, styles.cancelBtnText]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.saveBtn]}
              onPress={updateUserProfile}
            >
              {loading ? (
                <ActivityIndicator color={"#fff"} size="small" />
              ) : (
                <Text style={[styles.btnText, styles.saveBtnText]}>
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
