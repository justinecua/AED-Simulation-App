const heartRhythms = {
  Sinus: {
    name: 'Normal Sinus Rhythm',
    color: '#00E0D8',
    bpm: '75 bpm',
    generate: () => {
      const pattern = [];
      const cycle = [0, 0.1, 0.2, 1, -0.5, 0, 0.3, 0];
      for (let i = 0; i < 10; i++) {
        pattern.push(...cycle);
      }
      return pattern;
    },
  },
  VFib: {
    name: 'Ventricular Fibrillation',
    color: '#FF6B6B',
    bpm: 'N/A',
    generate: () => {
      const pattern = [];
      for (let i = 0; i < 80; i++) {
        pattern.push((Math.random() - 0.5) * 3);
      }
      return pattern;
    },
  },
  VTach: {
    name: 'Ventricular Tachycardia',
    color: '#FFA500',
    bpm: '180 bpm',
    generate: () => {
      const pattern = [];
      const cycle = [0, 1, -1, 0];
      for (let i = 0; i < 20; i++) {
        pattern.push(...cycle);
      }
      return pattern;
    },
  },
  Asystole: {
    name: 'Asystole (Flatline)',
    color: '#808080',
    bpm: '0 bpm',
    generate: () => {
      return Array(80).fill(0);
    },
  },
};

export default heartRhythms;
