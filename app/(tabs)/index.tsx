import { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface FunctionItem {
  id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const PRIORITIES = ['High', 'Medium', 'Low'];

export default function HomeScreen() {
  const [functions, setFunctions] = useState<FunctionItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');

  const addFunction = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a function name');
      return;
    }
    setFunctions([
      {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false,
      },
      ...functions,
    ]);
    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  const toggleComplete = (id: string) => {
    setFunctions(functions.map((f) => (f.id === id ? { ...f, completed: !f.completed } : f)));
  };

  const deleteFunction = (id: string) => {
    setFunctions(functions.filter((f) => f.id !== id));
  };

  const filtered = functions.filter((f) => {
    if (filter === 'Pending') return !f.completed;
    if (filter === 'Completed') return f.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>

      {/* Add Function Form */}
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Function name"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 50, textAlignVertical: 'top' }]}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.optionRow}>
          {PRIORITIES.map((p) => (
            <Pressable
              key={p}
              onPress={() => setPriority(p)}
              style={[styles.optionBtn, priority === p && styles.optionBtnActive]}
            >
              <Text style={[styles.optionText, priority === p && styles.optionTextActive]}>
                {p}
              </Text>
            </Pressable>
          ))}
        </View>

        <Button title="Add Function" onPress={addFunction} color="#6366f1" />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {['All', 'Pending', 'Completed'].map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {/* Function List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.completed && styles.taskDone]}>
            <Pressable onPress={() => toggleComplete(item.id)} style={styles.checkArea}>
              <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
                {item.completed && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
                  {item.title}
                </Text>
                {item.description ? <Text style={styles.taskDesc}>{item.description}</Text> : null}
                <Text style={styles.taskMeta}>{item.priority}</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => deleteFunction(item.id)}>
              <Text style={styles.deleteBtn}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No functions yet. Add one above!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formSection: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  optionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  optionBtnActive: {
    backgroundColor: '#6366f1',
  },
  optionText: {
    fontSize: 12,
    color: '#555',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  filterBtnActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 13,
    color: '#555',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskDone: {
    opacity: 0.5,
  },
  checkArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#6366f1',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDesc: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  taskMeta: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },
  deleteBtn: {
    color: '#e53935',
    fontSize: 13,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});
