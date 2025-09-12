const aedSequences = {
  Sinus: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'open' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Showing Sinus Rhythm', action: 'auto' },
    { text: 'No shock advised', action: 'auto' },

    { text: 'Start CPR — push to match the tone', action: 'auto' },
    { text: 'Push harder', action: 'auto' },
    { text: 'Good compression', action: 'auto' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'auto' },
    { text: 'Showing Sinus Rhythm', action: 'auto' },
    { text: 'No shock advised', action: 'auto' },
    { text: 'Resume CPR — push to match the tone', action: 'auto' },
  ],

  VFib: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'open' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Showing VFib Rhythm', action: 'auto' },
    { text: 'Shock advised', action: 'auto' },

    { text: 'Don’t touch patient', action: 'auto' },
    { text: 'Press flashing shock button', action: 'shock', flashing: true },
    { text: 'Shock delivered', action: 'auto' },

    { text: 'Start CPR — push to match the tone', action: 'auto' },
    { text: 'Push harder', action: 'auto' },
    { text: 'Good compression', action: 'auto' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Showing VFib Rhythm', action: 'auto' },
    { text: 'Shock advised', action: 'auto' },
    { text: 'Prepare to shock again', action: 'shock', flashing: true },
  ],

  VTach: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'open' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Showing VTach Rhythm', action: 'auto' },
    { text: 'Shock advised', action: 'auto' },

    { text: 'Don’t touch patient', action: 'auto' },
    { text: 'Press flashing shock button', action: 'shock', flashing: true },
    { text: 'Shock delivered', action: 'auto' },

    { text: 'Start CPR — push to match the tone', action: 'auto' },
    { text: 'Push harder', action: 'auto' },
    { text: 'Good compression', action: 'auto' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'auto' },
    { text: 'Showing VTach Rhythm', action: 'auto' },
    { text: 'Shock advised', action: 'auto' },
    { text: 'Prepare to shock again', action: 'shock', flashing: true },
  ],

  Asystole: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'open' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Showing Asystole Rhythm', action: 'auto' },
    { text: 'No shock advised', action: 'auto' },

    { text: 'Start CPR — push to match the tone', action: 'auto' },
    { text: 'Push harder', action: 'auto' },
    { text: 'Good compression', action: 'auto' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'auto' },
    { text: 'Showing Asystole Rhythm', action: 'auto' },
    { text: 'No shock advised', action: 'auto' },
    { text: 'Resume CPR — push to match the tone', action: 'auto' },
  ],
};

export default aedSequences;
