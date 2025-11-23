import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './style';

const ModalAdd = ({ visible, onClose, task, setTask, handleSave }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        display: visible ? 'flex' : 'none'
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          maxHeight: '80%',
        }}>
          <ScrollView>
            <Text style={styles.titleModal}>Tambah Task Baru</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan title"
              value={task.title}
              onChangeText={text => setTask({ ...task, title: text })}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Masukkan deskripsi"
              value={task.desc}
              onChangeText={text => setTask({ ...task, desc: text })}
              multiline
            />

            <Text style={styles.label}>Deadline</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={task.deadline}
              onChangeText={text => setTask({ ...task, deadline: text })}
            />

            <TouchableOpacity
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: '#2a85d0',
                borderRadius: 5,
                alignItems: 'center'
              }}
              onPress={handleSave}
            >
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: '#aaa',
                borderRadius: 5,
                alignItems: 'center'
              }}
              onPress={onClose}
            >
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ModalAdd;
