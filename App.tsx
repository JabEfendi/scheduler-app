import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import getCurrentDate from './components/dateAutomation';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

const AppScheduler = () => {
  const [activeItem, setActiveItem] = useState('list');
  const tasks = [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
  ];

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
          <TouchableOpacity style={[styles.itemBar, activeItem === 'list' && styles.itemBarActive,]} onPress={() => setActiveItem('list')}>
            <Icon name="list" size={14} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'folder' && styles.itemBarActive,]} onPress={() => setActiveItem('folder')}>
            <Icon name="folder" size={14} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'calendar' && styles.itemBarActive,]} onPress={() => setActiveItem('calendar')}>
            <Icon name="calendar" size={14} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'info' && styles.itemBarActive,]} onPress={() => setActiveItem('info')}>
            <Icon name="info-circle" size={14} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ marginTop: 20 }}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
        />
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
    marginTop: 20,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  pointerBar: {
    backgroundColor: '#dedede',
    width: '90%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  itemBar: {
    width: 80,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemBarActive: {
    elevation: 2,
    backgroundColor: 'white',
  },


  bodyPost: {
    marginTop: 30,
  }
});

export default AppScheduler;
