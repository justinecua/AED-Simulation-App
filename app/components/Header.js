import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, UserRound } from 'lucide-react-native';
import Colors from '../constants/colors';
import { Roles } from '../constants/roles';
import style from '../styles/InstructorTestScenarioStyle';

const Header = ({ goBack, role = 'student' }) => {
  const roleColor = Roles[role] || Roles.student;

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
          <UserRound color="white" size={25} />
        </View>
        <Text style={style.headerText}>{roleColor.headerText}</Text>
      </View>
    </View>
  );
};

export default Header;
