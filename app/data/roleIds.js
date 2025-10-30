import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeReadableId } from '../shared/id';

const KEYS = {
  INSTRUCTOR: 'SIMCRIT_INSTR_ID',
  STUDENT: 'SIMCRIT_STUD_ID',
};

export async function getOrCreateInstructorId() {
  let id = await AsyncStorage.getItem(KEYS.INSTRUCTOR);
  if (!id) {
    id = makeReadableId('INSTR');
    await AsyncStorage.setItem(KEYS.INSTRUCTOR, id);
  }
  return id;
}

export async function getOrCreateStudentId() {
  let id = await AsyncStorage.getItem(KEYS.STUDENT);
  if (!id) {
    id = makeReadableId('STUD');
    await AsyncStorage.setItem(KEYS.STUDENT, id);
  }
  return id;
}
