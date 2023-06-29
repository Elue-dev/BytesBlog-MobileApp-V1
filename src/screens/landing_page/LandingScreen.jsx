import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-navigation";
import Header from "../../components/header/Header";
import { styles } from "./styles";
import Hero from "../../components/hero/Hero";
import { offers } from "../../data/offers";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../context/auth/AuthContext";

export default function LandingScreen({ navigation }) {
  const {
    state: { user },
  } = useAuth();
  const [scrollPage, setScrollPage] = useState(false);
  const scrollViewRef = useRef();
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 80) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  useEffect(() => {
    const scrollView = scrollViewRef.current;
    scrollView.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <View style={styles.main}>
      <Header scrollPage={scrollPage} />
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SafeAreaView>
          <Hero />
          <View style={styles.offers}>
            <Text style={styles.heading}>What we offer you</Text>
            <View style={styles.offersContent}>
              {offers.map((offer) => (
                <View style={styles.offersWrap} key={offer.id}>
                  <Image source={offer.imgPath} style={styles.offersImg} />
                  <View>
                    <Text style={styles.offersHeading}>{offer.heading}</Text>
                    <Text style={styles.subText}>{offer.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.landingBottom}>
            <View style={styles.flexImg}>
              <Image
                source={require("../../../assets/landingImg.png")}
                style={styles.landingImg}
              />
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.bottomHeading}>
                Join a community of creative geniuses
              </Text>
              <Text style={styles.subText}>
                Connect with curious minds, tell your story and share your
                knowledge even just the way you want it
              </Text>
              {user !== null ? (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={styles.gerStarted}>Visit Blog</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate("Create")}
                >
                  <Text style={styles.gerStarted}>Get Started</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.footer}>
          <LinearGradient
            colors={["rgba(122, 200, 143, 0.25)", "rgba(122, 200, 143, 0)"]}
            style={{ flex: 1 }}
            start={[0.5, 1]}
            end={[0.5, 0]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
