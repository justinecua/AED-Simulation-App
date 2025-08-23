import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { Play, Square, Pause } from 'lucide-react-native';

const ModeControls = ({
  started,
  paused,
  onPowerPress,
  onPausePress,
  onStopPress,
}) => {
  return (
    <View style={style.startContainer}>
      {/* Start / Resume Button */}
      <TouchableOpacity
        style={[
          style.PlayButton,
          started && !paused && { backgroundColor: '#09E979' },
        ]}
        onPress={onPowerPress}
      >
        <Play
          size={20}
          color={started && !paused ? '#ffffff' : Colors.heartRateBackground}
        />
      </TouchableOpacity>

      {/* Pause Button */}
      {started && !paused && (
        <TouchableOpacity style={style.PauseButton} onPress={onPausePress}>
          <Pause size={20} color={Colors.heartRateBackground} />
        </TouchableOpacity>
      )}

      {/* Stop Button */}
      <TouchableOpacity style={style.StopButton} onPress={onStopPress}>
        <Square size={20} color={Colors.heartRateBackground} />
      </TouchableOpacity>
    </View>
  );
};

export default ModeControls;

const style = StyleSheet.create({
  PauseButton: {
    borderRadius: 30,
    padding: 9,
  },
  StopButton: {
    borderRadius: 30,
    padding: 9,
  },
  PlayButton: {
    borderRadius: 30,
    padding: 9,
  },
  startContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 6,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    shadowColor: Colors.heartRateBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
