import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { parseText } from "../../utils";
import moment from "moment";
import Categories from "./Categories";

export default function BlogDetails({ data, isLoading }) {
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#169639" />
      ) : (
        <View>
          <Categories />
          <FlatList
            keyExtractor={(data) => data.id}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.topContent}>
                    <View style={styles.authorDetails}>
                      <Image
                        source={{
                          uri:
                            item.author.avatar ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuoNupr5Y7ATlXqQbipRPidHyWTmqGv4dhNw&usqp=CAU",
                        }}
                        style={styles.avatar}
                      />

                      <Text style={styles.username}>
                        {item.author.firstName} {item.author.lastName}
                      </Text>
                      <Text style={styles.date}>
                        {" "}
                        - {moment(item.createdAt).fromNow()}
                      </Text>
                    </View>
                    <View style={styles.readTime}>
                      <EvilIcons name="clock" size={20} />
                      <Text style={styles.readTimeText}>
                        {item.readTime} mins read
                      </Text>
                    </View>
                  </View>
                  <View style={styles.main}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>
                      {parseText(item.content.slice(0, 200))}...
                    </Text>
                  </View>
                  <Text style={styles.readMore}>Read More</Text>
                  <View style={styles.stats}>
                    <Text>
                      <View style={styles.statsContent}>
                        <EvilIcons name="like" size={30} />
                        <Text>
                          {item.likes.length}{" "}
                          {item.likes?.length > 1
                            ? "likes"
                            : item.likes?.length === 0
                            ? "likes"
                            : "like"}
                        </Text>
                      </View>
                    </Text>
                    <View style={styles.statsContent}>
                      <Feather name="bookmark" size={20} />
                      <Text>{item.bookmarks.length} bookmarks</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
