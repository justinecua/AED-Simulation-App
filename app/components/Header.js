import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, UserRound } from 'lucide-react-native';
import Colors from '../constants/colors';
import { Roles } from '../constants/roles';
import style from '../styles/InstructorTestScenarioStyle';
import { getOrCreateInstructorId, getOrCreateStudentId } from '../data/roleIds';

const Header = ({ goBack, role = 'student' }) => {
  const roleColor = Roles[role] || Roles.student;
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (role === 'instructor') {
          const id = await getOrCreateInstructorId();
          setDeviceId(id);
        } else {
          const id = await getOrCreateStudentId();
          setDeviceId(id);
        }
      } catch (e) {
        console.warn('Error loading role ID:', e);
      }
    })();
  }, [role]);

  return (
    <View style={style.header}>
      <TouchableOpacity style={style.boxIcon} onPress={goBack}>
        <ChevronLeft color={Colors.button} size={25} />
      </TouchableOpacity>

      <View style={style.wrapper}>
        <View
          style={[
            style.boxUser,
            { backgroundColor: roleColor.userIconBackground },
          ]}
        >
          <UserRound color="white" size={22} />
        </View>

        <View>
          {deviceId ? <Text style={style.headerText}>{deviceId}</Text> : null}
        </View>
      </View>
    </View>
  );
};

export default Header;
