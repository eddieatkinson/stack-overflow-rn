import React, { Component, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Right, Icon } from "native-base";
import data from "./data";

const RenderContactsItem = ({ item, index }) => {
  const [like, setLike] = useState(false);
  const [color, setColor] = useState("white");

  const toggleLike = () => {
    setLike(!like);
    if (like) {
      setColor("red");
    } else {
      setColor("white");
    }
  };

  return (
    <View style={[styles.itemContainer]}>
      {/* <Image
       style={styles.avatar}
       source={{ uri: item.image }} /> */}
      <View style={styles.textContainer}>
        <Text style={([styles.name], { color: "#fafafa" })}>
          {item.first_name}
        </Text>
        <Text style={{ color: "#fafafa" }}>{item.last_name}</Text>
      </View>
      <Right style={{ justifyContent: "center" }}>
        <TouchableWithoutFeedback onPress={toggleLike}>
          <Icon
            name="heart"
            type="FontAwesome"
            size={32}
            style={{ color, paddingRight: 10 }}
          />
        </TouchableWithoutFeedback>
      </Right>
    </View>
  );
};

export default class FlatListComponent extends Component {
  state = {
    text: "",
    contacts: data,
    // like: false,
    like: {},
    color: "white",
  };

  componentDidMount() {
    console.log(data);
  }

  // toggleLike = () => {
  //   this.setState({
  //     like: !this.state.like,
  //   });

  //   if (this.state.like) {
  //     this.setState({
  //       color: "red",
  //     });
  //   } else {
  //     this.setState({
  //       color: "white",
  //     });
  //   }
  // };

  toggleLike = (index) => {
    let newLike = { ...this.state.like };
    newLike[index] = !Boolean(newLike[index]);
    console.log(newLike);
    this.setState({
      like: newLike,
    });
  };

  renderContactsItem = ({ item, index }) => {
    return (
      <View style={[styles.itemContainer]}>
        {/* <Image
      style={styles.avatar}
      source={{ uri: item.image }} /> */}
        <View style={styles.textContainer}>
          <Text style={([styles.name], { color: "#fafafa" })}>
            {item.first_name}
          </Text>
          <Text style={{ color: "#fafafa" }}>{item.last_name}</Text>
        </View>
        <Right style={{ justifyContent: "center" }}>
          <TouchableWithoutFeedback onPress={() => this.toggleLike(index)}>
            {/*{this.like ? (
            <Icon name="heart" type='FontAwesome' style={{paddingRight: 10, fontSize: 30, color: 'red'}} />
          ) : 
          ( <Icon name="heart" type='FontAwesome' style={{paddingRight: 10, fontSize: 30, color: 'white'}} /> )
        }*/}
            {/* <Icon
              name="heart"
              type="FontAwesome"
              size={32}
              style={{
                color: this.state.color === "white" ? "white" : "red",
                paddingRight: 10,
              }}
            /> */}
            <Icon
              name="heart"
              type="FontAwesome"
              size={32}
              style={{
                color: this.state.like[index] ? "red" : "white",
                paddingRight: 10,
              }}
            />
            {/*<Icon name="heart" type='FontAwesome' style={{paddingRight: 10, fontSize: 30, color: this.state.color}} />*/}
          </TouchableWithoutFeedback>
        </Right>
      </View>
    );
  };

  searchFilter = (text) => {
    const newData = data.filter((item) => {
      const listItems = `${item.first_name.toLowerCase()}`;
      return listItems.indexOf(text.toLowerCase()) > -1;
    });

    this.setState({
      contacts: newData,
    });
  };

  renderHeader = () => {
    const { text } = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text) => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ marginTop: 40, backgroundColor: "black" }}>
        <FlatList
          ListHeaderComponent={this.renderHeader()}
          // renderItem={this.renderContactsItem}
          renderItem={({ item, index }) => {
            return <RenderContactsItem item={item} index={index} />;
          }}
          keyExtractor={(item) => item.id}
          data={this.state.contacts}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: "space-around",
  },
  name: {
    fontSize: 16,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
});
