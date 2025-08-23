const aedSequences = {
  Sinus: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'auto' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show Sinus rhythm', action: 'show' },

    { text: 'No shock advised', action: 'auto' },
    { text: 'Start CPR — push to match the tone', action: 'cpr' },
    { text: 'Push harder', action: 'cpr' },
    { text: 'Good compression', action: 'cpr' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show Sinus rhythm', action: 'show' },
    { text: 'No shock advised', action: 'auto' },
    { text: '(Repeat CPR/analysis cycle)', action: 'auto' },
  ],

  VFib: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'auto' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show VFib rhythm', action: 'show' },

    { text: 'Shock advised (button glow)', action: 'shockGlow' },
    { text: 'Don’t touch patient', action: 'auto' },
    { text: 'Press flashing shock button', action: 'shock' },
    { text: 'Shock delivered', action: 'auto' },
    { text: 'Start CPR — push to match the tone', action: 'cpr' },
    { text: 'Push harder', action: 'cpr' },
    { text: 'Good compression', action: 'cpr' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show VFib rhythm', action: 'show' },
    { text: 'Shock advised (button glow)', action: 'auto' },
    { text: '(Repeat shock + CPR cycle)', action: 'auto' },
  ],

  VTach: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'auto' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'auto' },
    { text: 'Attach pads to patient’s bare chest', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show VTach rhythm', action: 'show' },

    { text: 'Shock advised (button glow)', action: 'auto' },
    { text: 'Don’t touch patient', action: 'auto' },
    { text: 'Press flashing shock button', action: 'shock' },
    { text: 'Shock delivered', action: 'auto' },
    { text: 'Start CPR — push to match the tone', action: 'cpr' },
    { text: 'Push harder', action: 'cpr' },
    { text: 'Good compression', action: 'cpr' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show VTach rhythm', action: 'show' },
    { text: 'Shock advised (button glow)', action: 'auto' },
    { text: '(Repeat shock + CPR cycle)', action: 'auto' },
  ],

  Asystole: [
    { text: 'Turn on AED', action: 'power' },
    { text: 'Stay calm', action: 'auto' },
    { text: 'Check responsiveness', action: 'auto' },
    { text: 'Call for help', action: 'auto' },
    { text: 'Remove pad package', action: 'remove' },
    { text: 'Cut or tear clothing to expose bare chest', action: 'auto' },
    { text: 'Open pad package', action: 'auto' },
    { text: 'Attach pads to patient’s bare chest', action: 'attach' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show Asystole rhythm', action: 'show' },

    { text: 'No shock advised', action: 'auto' },
    { text: 'Start CPR — push to match the tone', action: 'cpr' },
    { text: 'Push harder', action: 'cpr' },
    { text: 'Good compression', action: 'cpr' },
    { text: 'Stop CPR', action: 'auto' },

    { text: 'Don’t touch patient. Analyzing…', action: 'analyze' },
    { text: 'Show Asystole rhythm', action: 'show' },
    { text: 'No shock advised', action: 'auto' },
    { text: '(Repeat CPR/analysis cycle)', action: 'auto' },
  ],
};

export default aedSequences;
