import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import getCurrentDate from './components/dateAutomation';
import { Task } from './types/types';
import styles from './style';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal, 
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
} from 'react-native';

const AppScheduler = () => {
  const [activeItem, setActiveItem] = useState('list');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStart, setNewStart] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isDeadlinePickerVisible, setDeadlinePickerVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [enableDeadline, setEnableDeadline] = useState(false);


  const [banner, setBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const projectOptions = [
    'No Project',
    'Website Redesign',
    'Q4 Marketing Goals',
  ];

  const handleConfirmStart = (date: Date) => {
    const iso = date.toISOString().split("T")[0];
    setNewStart(iso);
    setStartPickerVisible(false);
  };

  const handleConfirmDeadline = (date: Date) => {
    const iso = date.toISOString().split("T")[0];
    setNewDeadline(iso);
    setDeadlinePickerVisible(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    
    const date = new Date(dateString);

    if (date.getFullYear() === 1) return "-";

    return date.toLocaleDateString("en-GB");
  };





  const fetchTasks = () => {
    fetch("http://10.0.2.2:9000/tasks")
      .then(async (res) => {
        const text = await res.text();
        console.log("Response raw:", text);
        return JSON.parse(text);
      })
      .then(data => {
        const mapped = data.map((task: any) => ({
          id: task.id.toString(),
          title: task.title,
          desc: task.description,
          dueDate: task.due_date ? new Date(task.due_date) : null,
          deadline: task.dl_time ? new Date(task.dl_time) : null,
          status: task.status === "done",
          project: task.project || null,
        }));
        setTasks(mapped);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);





  const toggleCheck = async (id: string) => {
    const currentTask = tasks.find(item => item.id === id);
    if (!currentTask) return;
    const newDoneStatus = !currentTask.status;
    setTasks(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newDoneStatus } : item
      )
    );

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`http://10.0.2.2:9000/tasks/${id}/toggle`, {
        method: "PATCH",
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        },
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(item =>
          item.id === updatedTask.id
            ? { ...item, status: updatedTask.status === "done" }
            : item
        )
      );

    } catch (err) {
      console.error("Failed to toggle task:", err);

      setTasks(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: currentTask.status } : item
        )
      );

      Alert.alert("Error", "Gagal mengubah status task. Cek koneksi atau server.");
    }
  };



  const saveTask = async () => {
    if (!newTitle.trim()) {
      Alert.alert("Error", "Title cannot be empty!");
      return;
    }

    const body = {
      title: newTitle,
      description: newDesc,
      due_date: newStart ? newStart + "T00:00:00Z" : null,
      dl_time: newDeadline ? newDeadline + "T00:00:00Z" : null,
      status: "pending",
      project: selectedProject || "No Project",
    };

    const url = isEditMode && editingId
      ? `http://10.0.2.2:9000/tasks/${editingId}`
      : "http://10.0.2.2:9000/tasks";

    const method = isEditMode && editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      console.log("SERVER RAW RESPONSE:", text);
      if (!res.ok) throw new Error("Failed to save task");

      setModalAdd(false);
      setNewTitle('');
      setNewDesc('');
      setNewStart('');
      setNewDeadline('');
      setSelectedProject(null);
      setEditingId(null);
      setIsEditMode(false);

      setBanner({
        type: 'success',
        message: 'Task updated successfully',
      }); 
      setTimeout(() => setBanner(null), 2500);


      fetchTasks();
    } catch (err) {
      console.error(err);
      setBanner({ type: 'error', message: 'Failed to save task' });
      setTimeout(() => setBanner(null), 2500);
    }
  };


  const deleteTask = (id: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(`http://10.0.2.2:9000/tasks/${id}`, {
                method: "DELETE",
              });

              if (!res.ok) throw new Error("Failed to delete");

              setTasks(prev => prev.filter(t => t.id !== id));

              setBanner({ 
                type: 'success', 
                message: 'Task deleted successfully' 
              });
              setTimeout(() => setBanner(null), 2500);

            } catch (err) {
              console.error(err);
              setBanner({
                type: 'error',
                message: 'Failed to delete task',
              });
              setTimeout(() => setBanner(null), 2500);
            }
          },
        },
      ]
    );
  };


  const openEditModal = (task: Task) => {
    setIsEditMode(true);
    setEditingId(task.id);
    setNewTitle(task.title);
    setNewDesc(task.desc);
    setNewStart(task.dueDate ? task.dueDate.toISOString().split('T')[0] : '');
    setNewDeadline(task.deadline ? task.deadline.toISOString().split('T')[0] : '');
    setSelectedProject(task.project || null);
    setModalAdd(true);
  };











    // ==== DERIVED STATS (UNTUK PERSENTASE & BADGE) ====

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const isSameDay = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status).length;
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  // task yg dueDate = hari ini
  const todayTasksCount = tasks.filter(
    t => t.dueDate && isSameDay(t.dueDate, startOfToday),
  ).length;

  // jumlah project unik (selain "No Project")
  const projectCount = Array.from(
    new Set(
      tasks
        .filter(t => t.project && t.project !== 'No Project')
        .map(t => t.project),
    ),
  ).length;

  // task telat = deadline < hari ini dan status belum done
  const overdueTasks = tasks.filter(
    t => t.deadline && t.deadline < startOfToday && !t.status,
  );
  const overdueCount = overdueTasks.length;















  
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <StatusBar hidden={true} translucent />

      <View style={styles.atasWrapper}>
        <View style={styles.atas}>
          <View>
            <Text style={styles.h1}>My Test</Text>
            <Text>{getCurrentDate()}</Text>
          </View>
          <View style={styles.progressWrapper}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>{completionRate}%</Text>
            </View>
          </View>
        </View>
      {overdueCount > 0 && (
        <View style={styles.overdueBanner}>
          <Icon name="exclamation-circle" size={14} color="#D93025" />
          <Text style={styles.overdueText}>
            {overdueCount} overdue task{overdueCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}
      </View>



      
      {banner && (
        <View
          style={[
            styles.banner,
            banner.type === 'error' ? styles.bannerError : styles.bannerSuccess,
          ]}
        >
          <Text style={styles.bannerText}>{banner.message}</Text>
        </View>
      )}

      <View style={styles.bawah}>
        <View style={styles.pointerBar}>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'list' && styles.itemBarActive,]} onPress={() => setActiveItem('list')}>
            <Icon name="list" size={14} color="#000" />
            {todayTasksCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{todayTasksCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'folder' && styles.itemBarActive,]} onPress={() => setActiveItem('folder')}>
            <Icon name="folder" size={14} color="#000" />
            {todayTasksCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{todayTasksCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'calendar' && styles.itemBarActive,]} onPress={() => setActiveItem('calendar')}>
            <Icon name="calendar" size={14} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemBar, activeItem === 'info' && styles.itemBarActive,]} onPress={() => setActiveItem('info')}>
            <Icon name="info-circle" size={14} color="#000" />
            {todayTasksCount > 0 && (
              <View
                style={[
                  styles.badge,
                  overdueCount > 0 && { backgroundColor: '#F04438' }, // merah kalau ada late
                ]}
              >
                <Text style={styles.badgeText}>{overdueCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.bodyList}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { setSelectedTask(item); setModalDetail(true); }}>
              <View style={[ styles.bodyPost, {opacity: item.status ? 0.8 : 1, borderLeftColor: item.status ? '#74c777ff': '#2a85d0'} ]}>
                  <View style={[ styles.bodyPostItemLeft, {opacity: item.status ? 0.5 : 1, width: '50%'} ]}>
                    <TouchableOpacity onPress={() => toggleCheck(item.id)} style={styles.buttonCheck}>
                      <View style={[ styles.checkActivated, {borderColor: item.status ? '#74c777ff' : '#555'} ]}>
                        {item.status && (
                          <Icon name="check" size={14} color="#74c777ff" />
                        )}
                      </View>
                    </TouchableOpacity>
                    <View>
                      <Text>{item.title}</Text>
                      <Text style={{ fontSize: 12, color: '#555' }}>{item.desc}</Text>
                      <View style={{ flexDirection: 'row', gap: 20, marginTop: 15, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 15 }}>
                          <Icon name="calendar" size={12} color="black" />
                          <Text style={{ fontSize: 12, color: '#555' }}>{item.dueDate ? item.dueDate.toLocaleDateString('en-GB') : '-'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 15, alignItems: 'center' }}>
                          <Icon name="clock" size={12} color="black" />
                          <Text style={{ fontSize: 12, color: '#555' }}>Due: {formatDate(item.deadline)}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  
                  <View style={[ styles.bodyPostItemRight, {opacity: item.status ? 0.5 : 1} ]}>
                    {/* <TouchableOpacity><Icon name="pen" size={12} color="#000" /></TouchableOpacity> */}
                    <TouchableOpacity onPress={() => openEditModal(item)}>
                      <Icon name="pen" size={12} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(item.id)}>
                      <Icon name="trash" size={12} color="red" />
                    </TouchableOpacity>
                  </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>


      <TouchableOpacity
        onPress={() => {
          setIsEditMode(false);
          setEditingId(null);
          setNewTitle('');
          setNewDesc('');
          setNewStart('');
          setNewDeadline('');
          setSelectedProject(null);
          setModalAdd(true);
        }}
        style={styles.buttonAdd}
      >
        <Icon name="plus" size={21} color="white" />
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdd}
        onRequestClose={() => setModalAdd(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalAdd(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  maxHeight: '80%',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                }}
              >
                <ScrollView>
                  <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>
                    Add New Task
                  </Text>
                  <Text style={{ fontWeight: '600' }}>Title</Text>
                  <TextInput
                    placeholder="Enter task title"
                    style={styles.inputBox}
                    value={newTitle}
                    onChangeText={setNewTitle}
                  />

                  <Text style={{ fontWeight: '600', marginTop: 10 }}>Description</Text>
                  <TextInput
                    placeholder="Enter description"
                    style={[styles.inputBox, { height: 90, textAlignVertical: 'top' }]}
                    multiline
                    value={newDesc}
                    onChangeText={setNewDesc}
                  />

                  <Text style={{ fontWeight: '600' }}>Project (Optional)</Text>
                  <View style={{ marginTop: 10 }}>
                    {/* Header dropdown */}
                    <TouchableOpacity
                      style={styles.projectSelect}
                      onPress={() => setIsProjectOpen(prev => !prev)}
                      activeOpacity={0.8}
                    >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {selectedProject && (
                        <View
                          style={[
                            styles.projectDot,
                            selectedProject === 'Website Redesign' && { backgroundColor: '#7C4DFF' },
                            selectedProject === 'Q4 Marketing Goals' && { backgroundColor: '#FF9800' },
                          ]}
                        />
                      )}
                      <Text style={styles.projectSelectText}>
                        {selectedProject || 'Select a project'}
                      </Text>
                    </View>

                      <Text style={styles.projectSelectIcon}>
                        {isProjectOpen ? '▲' : '▼'}
                      </Text>
                    </TouchableOpacity>

                    {isProjectOpen && (
                      <View style={styles.projectDropdown}>
                        {projectOptions.map(option => {
                          const isActive =
                            (selectedProject === null && option === 'No Project') ||
                            selectedProject === option;

                          return (
                            <TouchableOpacity
                              key={option}
                              style={[styles.projectOptionRow, isActive && styles.projectOptionActive]}
                              onPress={() => {
                                setSelectedProject(option === 'No Project' ? null : option);
                                setIsProjectOpen(false);
                              }}
                            >
                              <View
                                style={[
                                  styles.projectDot,
                                  option === 'Website Redesign' && { backgroundColor: '#7C4DFF' },
                                  option === 'Q4 Marketing Goals' && { backgroundColor: '#FF9800' },
                                ]}
                              />
                              <Text style={styles.projectOptionText}>{option}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>

                  <Text style={{ fontWeight: '600', marginTop: 10 }}>Start Date</Text>
                  <TouchableOpacity
                    onPress={() => setStartPickerVisible(true)}
                    style={[styles.inputBox, { justifyContent: "center" }]}
                  >
                    <Text style={{ color: newStart ? "#000" : "#888" }}>
                      {newStart || "YYYY-MM-DD"}
                    </Text>
                  </TouchableOpacity>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                  <Text style={{ flex: 1, fontWeight: '600' }}>Multi-day Timeline</Text>
                    

                    <Switch
                      value={enableDeadline}
                      onValueChange={(val) => {
                        setEnableDeadline(val);
                        if (!val) setNewDeadline(""); // reset jika toggle dimatikan
                      }}
                    />
                  </View>

                  {enableDeadline && (
                    <View>
                      <Text style={{ fontWeight: '600', marginTop: 10 }}>Deadline</Text>
                      <TouchableOpacity
                        onPress={() => setDeadlinePickerVisible(true)}
                        style={[styles.inputBox, { justifyContent: "center" }]}
                      >
                        <Text style={{ color: newDeadline ? "#000" : "#888" }}>
                          {newDeadline || "YYYY-MM-DD"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}


                </ScrollView>

                <TouchableOpacity
                  onPress={saveTask}
                  style={{
                    backgroundColor: '#4CAF50',
                    padding: 12,
                    borderRadius: 10,
                    marginTop: 15,
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
                    Save Task
                  </Text>
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      
      
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDetail}
        onRequestClose={() => setModalDetail(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalDetail(false)}>
          <View style={{
            flex: 1,
            backgroundColor: 'tranasparent',
            justifyContent: 'flex-end',
          }}>
            <View style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              // width: '100%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20
            }}>
              {selectedTask && (
                <ScrollView>
                  <Text style={styles.titleModal}>
                    {selectedTask.title}
                  </Text>
                  <Text style={styles.titleProject}>Project</Text>
                  <Text style={styles.textModal}>{selectedTask.title}</Text>
                  <Text style={styles.titleProject}>Description</Text>
                  <Text style={styles.textModal}>{selectedTask.desc}</Text>
                  <Text style={styles.titleProject}>Start Date</Text>
                  <Text style={styles.textModal}>{selectedTask.dueDate.toLocaleDateString()}</Text>
                  <Text style={styles.titleProject}>Deadline</Text>
                  <Text style={styles.textModal}>{selectedTask.deadline.toLocaleDateString()}</Text>
                  <Text style={styles.titleProject}>Status</Text>
                  <Text style={styles.textModal}>{selectedTask.status ? 'Done' : 'Pending'}</Text>
                </ScrollView>
              )}

              <TouchableOpacity
                onPress={async () => {
                  if (selectedTask) {
                    await toggleCheck(selectedTask.id);
                    setSelectedTask({ ...selectedTask, status: !selectedTask.status });
                  }
                  setModalDetail(false);
                }}
                style={styles.buttonComplete}
              >
                <Text style={{ color: 'white', alignSelf: 'center' }}>{selectedTask?.status ? 'Mark as Incomplete' : 'Mark as Complete'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        onConfirm={handleConfirmStart}
        onCancel={() => setStartPickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isDeadlinePickerVisible}
        mode="date"
        onConfirm={handleConfirmDeadline}
        onCancel={() => setDeadlinePickerVisible(false)}
      />
    </SafeAreaView>
  );
};

export default AppScheduler;
