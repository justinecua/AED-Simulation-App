// hooks/useAudioPrompts.js
import { useRef, useCallback, useEffect } from 'react';
import Sound from 'react-native-sound';

// IMPORTANT (Android):
// - Put your .mp3 files in android/app/src/main/res/raw (names must be lowercase, no dashes)
// - Then play them by base name (e.g. 'turn_on_aed')
// iOS: add to bundle resources and keep the extension in the filename parameter below if needed.

export default function useAudioPrompts() {
  const currentRef = useRef(null);

  const stop = useCallback(() => {
    if (currentRef.current) {
      try {
        currentRef.current.stop(() => {
          currentRef.current?.release();
          currentRef.current = null;
        });
      } catch (e) {
        // ignore safe-guard
      }
    }
  }, []);

  const play = useCallback(
    (name /* e.g. 'turn_on_aed' */) => {
      // stop any currently playing file first
      stop();

      // ANDROID (raw/): pass without extension; iOS may require "file.mp3"
      const file = name;
      const snd = new Sound(file, Sound.MAIN_BUNDLE, err => {
        if (err) {
          console.warn('Audio load error:', err);
          return;
        }
        currentRef.current = snd;
        snd.play(success => {
          // release after play ends
          try {
            snd.release();
          } catch {}
          currentRef.current = null;
          if (!success) console.warn('Audio playback failed:', name);
        });
      });
    },
    [stop],
  );

  useEffect(() => stop, [stop]); // cleanup on unmount

  return { play, stop };
}
