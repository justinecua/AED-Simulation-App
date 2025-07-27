# AED-Simulation-App

An offline-first mobile simulation app for AED (Automated External Defibrillator) training, built with React Native. Designed for role-based interaction between instructors and students with encrypted peer-to-peer communication over Bluetooth.

## Features

- Offline-first support with encrypted local storage
- Role-based interface for student and instructor
- Peer-to-peer Bluetooth data exchange
- Global state managed via Context API (Redux optional)
- Persistent storage using SQLite and AsyncStorage
- Modular, reusable code structure

## Folder Structure

```bash
  app/
  ├── assets/        # Icons, audio, images
  ├── components/    # Reusable UI components
  ├── constants/     # Roles, enums, settings
  ├── contexts/      # Global and auth contexts
  ├── data/          # Static or mock data
  ├── encryption/    # Encryption/decryption logic
  ├── hooks/         # Custom hooks (e.g., Bluetooth)
  ├── interfaces/    # TypeScript interfaces
  ├── navigation/    # Stack/tab navigation
  ├── screens/       # App screens grouped by role
  ├── services/      # Bluetooth, storage, core logic
  ├── state/         # Redux (optional)
  ├── utils/         # Helper functions
  test/              # Unit tests
  docs/              # Documentation files

```

## Installation

```bash
git clone https://github.com/justinecua/AED-Simulation-App.git
cd AED-Simulation-App
npm install
npx react-native run-android   # or run-ios
```
