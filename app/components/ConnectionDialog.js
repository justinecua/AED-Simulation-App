import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getOrCreateInstructorId, getOrCreateStudentId } from '../data/roleIds';

const ConnectionDialog = ({
  visible,
  role,
  id: idProp,
  status,
  onContinue,
}) => {
  const [id, setId] = useState('');

  useEffect(() => {
    if (!visible) return;

    (async () => {
      try {
        if (idProp) {
          setId(idProp);
          return;
        }

        const r = (role || '').toString().toLowerCase();
        if (r === 'instructor') {
          const existing = await getOrCreateInstructorId();
          setId(existing);
        } else {
          const existing = await getOrCreateStudentId();
          setId(existing);
        }
      } catch (e) {
        console.warn('ConnectionDialog: failed to load ID', e);
      }
    })();
  }, [visible, role, idProp]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View className="dialog" style={styles.dialog}>
          {!!status && <Text style={styles.title}>{status}</Text>}

          <Text style={styles.message}>
            Your ID: <Text style={styles.id}>{id || '...'}</Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConnectionDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: { fontSize: 19, fontWeight: 'bold', marginBottom: 8 },
  message: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 10,
  },
  id: { fontWeight: 'bold', color: '#2563eb' },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 6,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
