import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import getCurrentDate from './components/dateAutomation';
import styles from './style';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

const AppScheduler = () => {
  const [activeItem, setActiveItem] = useState('list');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', desc: 'Ini deskripsi task 1 Ini deskripsi task 1 Ini deskripsi task 1 Ini deskripsi task 1', done: false },
    { id: '2', title: 'Task 2', desc: 'Ini deskripsi task 2', done: false },
    { id: '3', title: 'Task 3', desc: 'Ini deskripsi task 3', done: false },
    { id: '4', title: 'Task 4', desc: 'Ini deskripsi task 4', done: false },
    { id: '5', title: 'Task 5', desc: 'Ini deskripsi task 5', done: false },
    { id: '6', title: 'Task 6', desc: 'Ini deskripsi task 6', done: false },
    { id: '7', title: 'Task 7', desc: 'Ini deskripsi task 7', done: false },
    { id: '8', title: 'Task 8', desc: 'Ini deskripsi task 8', done: false },
    { id: '9', title: 'Task 9', desc: 'Ini deskripsi task 9', done: false },
  ]);

  const toggleCheck = (id) => {
    setTasks(prev =>
      prev.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

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
          style={styles.bodyList}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[ styles.bodyPost, {opacity: item.done ? 0.8 : 1, borderLeftColor: item.done ? '#74c777ff': '#2a85d0'} ]}>
                <View style={[ styles.bodyPostItemLeft, {opacity: item.done ? 0.5 : 1, width: '50%'} ]}>
                  <TouchableOpacity onPress={() => toggleCheck(item.id)} style={styles.buttonCheck}>
                    <View style={[ styles.checkActivated, {borderColor: item.done ? '#74c777ff' : '#555'} ]}>
                      {item.done && (
                        <Icon name="check" size={14} color="#74c777ff" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Text>{item.title}</Text>
                    <Text style={{ fontSize: 12, color: '#555' }}>{item.desc}</Text>
                  </View>
                </View>
                <View style={[ styles.bodyPostItemRight, {opacity: item.done ? 0.5 : 1} ]}>
                  <TouchableOpacity><Icon name="pen" size={12} color="#000" /></TouchableOpacity>
                  <TouchableOpacity><Icon name="trash" size={12} color="red" /></TouchableOpacity>
                </View>
            </View>
          )}
        />
      </View>


      <TouchableOpacity style={styles.buttonAdd}>
        <Icon name="plus" size={21} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppScheduler;
