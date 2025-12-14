import React, { useRef, useState, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import styles from '../../styles/PadPlacementStyle';
import { SNAP_RADIUS } from './padConfig';

const DraggablePad = ({
  label,
  targetX,
  targetY,
  initialX,
  initialY,
  onMove,
  onRelease,
  padStyle,
  padSize,
}) => {
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const lastOffset = useRef({ x: initialX, y: initialY });
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const id = pan.addListener(val => onMove?.(val.x, val.y, label));
    return () => pan.removeListener(id);
  }, [pan, onMove, label]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(lastOffset.current);
        pan.setValue({ x: 0, y: 0 });
        setIsPressed(true);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        setIsPressed(false);

        const { w, h } = padSize;
        const x = pan.x._value;
        const y = pan.y._value;

        const padCenter = { x: x + w / 2, y: y + h / 2 };
        const targetCenter = { x: targetX + w / 2, y: targetY + h / 2 };
        const dist = Math.hypot(
          padCenter.x - targetCenter.x,
          padCenter.y - targetCenter.y,
        );

        if (dist < SNAP_RADIUS) {
          Animated.spring(pan, {
            toValue: { x: targetX, y: targetY },
            useNativeDriver: false,
          }).start(() => {
            lastOffset.current = { x: targetX, y: targetY };
            onRelease?.(targetX, targetY, label, true);
          });
        } else {
          lastOffset.current = { x, y };
          onRelease?.(x, y, label, false);
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        {
          position: 'absolute',
          width: padSize.w,
          height: padSize.h,
          borderRadius: 8,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          transform: [{ scale: isPressed ? 1.05 : 1 }],
        },
        padStyle,
      ]}
    >
      <View style={styles.padInner}>
        <Text style={styles.padLabel}>{label.replace('Pad ', '')}</Text>
        <View style={styles.padConnector} />
      </View>
    </Animated.View>
  );
};

export default DraggablePad;
