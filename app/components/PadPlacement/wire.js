import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Wire = ({ from, to }) => {
  const dx = (to.x - from.x) / 2;
  const control1 = { x: from.x + dx, y: from.y };
  const control2 = { x: from.x + dx, y: to.y };

  const pathData = `M ${from.x},${from.y} C ${control1.x},${control1.y} ${control2.x},${control2.y} ${to.x},${to.y}`;

  return (
    <Svg
      style={{ position: 'absolute', left: 0, top: 0 }}
      height="100%"
      width="100%"
    >
      <Path
        d={pathData}
        stroke="#02081582"
        strokeWidth={2}
        fill="none"
        strokeLinecap="square"
        strokeDasharray={[4, 4]}
      />
    </Svg>
  );
};

export default Wire;
