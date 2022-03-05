import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import SearchScreen from "./SearchScreen";

export default function SearchHome({navigation}) {

    return( 
        <View style={styles.root}>
        <SearchScreen />
      </View>
    )
}