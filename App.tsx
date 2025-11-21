import React from 'react';
import getCurrentDate from './components/dateAutomation';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const AppScheduler = () => {
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <StatusBar hidden={true} translucent />

      <View style={styles.atas}>
        <View>
          <Text style={styles.h1}>My Test</Text>
          <Text>{getCurrentDate()}</Text>
        </View>
        <View>
          <Text>KANANHHHHHHH</Text>
        </View>
      </View>

      <View style={styles.bawah}>
        <View style={styles.pointerBar}>
          <TouchableOpacity>
            <Text>test</Text>
          </TouchableOpacity>
        </View>
        <Text>Jab Yoan</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },

  atas: {
    // flex: 0,
    height: '20%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  h1: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  bawah: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  pointerBar: {
    backgroundColor: 'grey',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default AppScheduler;
