const aedSequences = {
  Sinus: [
    { text: 'Turn on AED', action: 'power', audio: 'turn_on_aed.mp3' },
    { text: 'Stay calm', action: 'auto', audio: 'stay_calm.mp3' },
    {
      text: 'Check responsiveness',
      action: 'auto',
      audio: 'check_responsiveness.mp3',
    },
    { text: 'Call for help', action: 'auto', audio: 'call_for_help.mp3' },
    {
      text: 'Remove pad package',
      action: 'remove',
      audio: 'remove_pad_package.mp3',
    },
    {
      text: 'Cut or tear clothing to expose bare chest',
      action: 'auto',
      audio: 'cut_or_tear_clothing_to_expose_bare_chest.mp3',
    },
    { text: 'Open pad package', action: 'open', audio: 'open_pad_package.mp3' },
    {
      text: 'Attach pads to patient’s bare chest',
      action: 'attach',
      audio: 'attach_pads_to_patients_bare_chest.mp3',
    },
    {
      text: 'Don’t touch patient. Analyzing…',
      action: 'analyze',
      audio: 'dont_touch_patient_analyzing.mp3',
    },
    {
      text: 'Showing Sinus Rhythm',
      action: 'auto',
      audio: 'showing_sinus_rhythm.mp3',
    },
    { text: 'No shock advised', action: 'auto', audio: 'no_shock_advised.mp3' },
    {
      text: 'Start CPR — push to match the tone',
      action: 'auto',
      audio: 'start_cpr_push_to_match_the_tone.mp3',
    },
    { text: 'Push harder', action: 'auto', audio: 'push_harder.mp3' },
    { text: 'Good compression', action: 'auto', audio: 'good_compression.mp3' },
    { text: 'Stop CPR', action: 'auto', audio: 'stop_cpr.mp3' },
    {
      text: 'Resume CPR — push to match the tone',
      action: 'auto',
      audio: 'resume_cpr_push_to_match_the_tone.mp3',
    },
  ],

  VFib: [
    { text: 'Turn on AED', action: 'power', audio: 'turn_on_aed.mp3' },
    { text: 'Stay calm', action: 'auto', audio: 'stay_calm.mp3' },
    {
      text: 'Check responsiveness',
      action: 'auto',
      audio: 'check_responsiveness.mp3',
    },
    { text: 'Call for help', action: 'auto', audio: 'call_for_help.mp3' },
    {
      text: 'Remove pad package',
      action: 'remove',
      audio: 'remove_pad_package.mp3',
    },
    {
      text: 'Cut or tear clothing to expose bare chest',
      action: 'auto',
      audio: 'cut_or_tear_clothing_to_expose_bare_chest.mp3',
    },
    { text: 'Open pad package', action: 'open', audio: 'open_pad_package.mp3' },
    {
      text: 'Attach pads to patient’s bare chest',
      action: 'attach',
      audio: 'attach_pads_to_patients_bare_chest.mp3',
    },
    {
      text: 'Don’t touch patient. Analyzing…',
      action: 'analyze',
      audio: 'dont_touch_patient_analyzing.mp3',
    },
    {
      text: 'Showing VFib Rhythm',
      action: 'auto',
      audio: 'showing_ventricular_fibrillation_rhythm.mp3',
    },
    { text: 'Shock advised', action: 'auto', audio: 'shock_advised.mp3' },
    {
      text: 'Don’t touch patient',
      action: 'auto',
      audio: 'dont_touch_patient.mp3',
    },
    {
      text: 'Press flashing shock button',
      action: 'shock',
      flashing: true,
      audio: 'press_flashing_shock_button.mp3',
    },
    { text: 'Shock delivered', action: 'auto', audio: 'shock_delivered.mp3' },
    {
      text: 'Start CPR — push to match the tone',
      action: 'auto',
      audio: 'start_cpr_push_to_match_the_tone.mp3',
    },
    { text: 'Push harder', action: 'auto', audio: 'push_harder.mp3' },
    { text: 'Good compression', action: 'auto', audio: 'good_compression.mp3' },
    { text: 'Stop CPR', action: 'auto', audio: 'stop_cpr.mp3' },
    {
      text: 'Prepare to shock again',
      action: 'auto',
      flashing: true,
      audio: 'prepare_to_shock_again.mp3',
    },
  ],

  VTach: [
    { text: 'Turn on AED', action: 'power', audio: 'turn_on_aed.mp3' },
    { text: 'Stay calm', action: 'auto', audio: 'stay_calm.mp3' },
    {
      text: 'Check responsiveness',
      action: 'auto',
      audio: 'check_responsiveness.mp3',
    },
    { text: 'Call for help', action: 'auto', audio: 'call_for_help.mp3' },
    {
      text: 'Remove pad package',
      action: 'remove',
      audio: 'remove_pad_package.mp3',
    },
    {
      text: 'Cut or tear clothing to expose bare chest',
      action: 'auto',
      audio: 'cut_or_tear_clothing_to_expose_bare_chest.mp3',
    },
    { text: 'Open pad package', action: 'open', audio: 'open_pad_package.mp3' },
    {
      text: 'Attach pads to patient’s bare chest',
      action: 'attach',
      audio: 'attach_pads_to_patients_bare_chest.mp3',
    },
    {
      text: 'Don’t touch patient. Analyzing…',
      action: 'analyze',
      audio: 'dont_touch_patient_analyzing.mp3',
    },
    {
      text: 'Showing VTach Rhythm',
      action: 'auto',
      audio: 'showing_ventricular_tachycardia_rhythm.mp3',
    },
    { text: 'Shock advised', action: 'auto', audio: 'shock_advised.mp3' },
    {
      text: 'Don’t touch patient',
      action: 'auto',
      audio: 'dont_touch_patient.mp3',
    },
    {
      text: 'Press flashing shock button',
      action: 'shock',
      flashing: true,
      audio: 'press_flashing_shock_button.mp3',
    },
    { text: 'Shock delivered', action: 'auto', audio: 'shock_delivered.mp3' },
    {
      text: 'Start CPR — push to match the tone',
      action: 'auto',
      audio: 'start_cpr_push_to_match_the_tone.mp3',
    },
    { text: 'Push harder', action: 'auto', audio: 'push_harder.mp3' },
    { text: 'Good compression', action: 'auto', audio: 'good_compression.mp3' },
    { text: 'Stop CPR', action: 'auto', audio: 'stop_cpr.mp3' },
    {
      text: 'Prepare to shock again',
      action: 'auto',
      flashing: true,
      audio: 'prepare_to_shock_again.mp3',
    },
  ],

  Asystole: [
    { text: 'Turn on AED', action: 'power', audio: 'turn_on_aed.mp3' },
    { text: 'Stay calm', action: 'auto', audio: 'stay_calm.mp3' },
    {
      text: 'Check responsiveness',
      action: 'auto',
      audio: 'check_responsiveness.mp3',
    },
    { text: 'Call for help', action: 'auto', audio: 'call_for_help.mp3' },
    {
      text: 'Remove pad package',
      action: 'remove',
      audio: 'remove_pad_package.mp3',
    },
    {
      text: 'Cut or tear clothing to expose bare chest',
      action: 'auto',
      audio: 'cut_or_tear_clothing_to_expose_bare_chest.mp3',
    },
    { text: 'Open pad package', action: 'open', audio: 'open_pad_package.mp3' },
    {
      text: 'Attach pads to patient’s bare chest',
      action: 'attach',
      audio: 'attach_pads_to_patients_bare_chest.mp3',
    },
    {
      text: 'Don’t touch patient. Analyzing…',
      action: 'analyze',
      audio: 'dont_touch_patient_analyzing.mp3',
    },
    {
      text: 'Showing Asystole Rhythm',
      action: 'auto',
      audio: 'showing_asystole_rhythm.mp3',
    },
    { text: 'No shock advised', action: 'auto', audio: 'no_shock_advised.mp3' },
    {
      text: 'Start CPR — push to match the tone',
      action: 'auto',
      audio: 'start_cpr_push_to_match_the_tone.mp3',
    },
    { text: 'Push harder', action: 'auto', audio: 'push_harder.mp3' },
    { text: 'Good compression', action: 'auto', audio: 'good_compression.mp3' },
    { text: 'Stop CPR', action: 'auto', audio: 'stop_cpr.mp3' },
    {
      text: 'Resume CPR — push to match the tone',
      action: 'auto',
      audio: 'resume_cpr_push_to_match_the_tone.mp3',
    },
  ],
};

export default aedSequences;
