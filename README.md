# VidyaBot

**VidyaBot** is a multilingual AI tutor aimed at **offline STEM education in rural India**. It is built as a **React Native + Expo** mobile experience for learners, with a separate **teacher web** dashboard, shared packages for AI, speech, curriculum data, sync, internationalization, and gamification, plus native Android bindings for on-device inference.

## What VidyaBot does

- Delivers tutoring and practice **without assuming reliable internet**; offline behavior is the default path.
- Runs **on-device AI inference** (llama.cpp GGUF via a custom Android JNI module) within strict **memory and battery** budgets.
- Supports **22 Indian scheduled languages** with offline-capable ASR and TTS pipelines (Whisper.cpp, VITS/MMS via native modules).
- Stores curriculum and progress in **SQLite** (expo-sqlite), not generic key-value storage for structured learning data.
- Keeps learner engagement through **gamification** and optional **sync** when connectivity exists.

## Tech stack

| Area | Choice |
|------|--------|
| Mobile app | React Native 0.76, Expo SDK 55 |
| Language | TypeScript (strict) |
| State | Zustand |
| Navigation | React Navigation 6 |
| Local DB | expo-sqlite |
| On-device LLM | llama.cpp (GGUF), Android JNI |
| Speech | Whisper.cpp (ASR), VITS/MMS (TTS), native modules |
| Vision | MediaPipe, expo-camera |
| Monorepo | Yarn workspaces (`apps/*`, `packages/*`) |

## Prerequisites

- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://yarnpkg.com/) (classic or Berry with workspaces)
- For Android: Android Studio, SDK, and a device or emulator
- For teacher web: modern browser after `yarn dev` in `apps/teacher-web`

## How to run

From the **repository root**:

```bash
yarn install
```

### Mobile (Expo)

```bash
yarn mobile
```

In another terminal, for Android:

```bash
yarn android
```

Production-style bundle/export (when configured in the mobile app):

```bash
yarn build:mobile
```

### Teacher web

```bash
cd apps/teacher-web
yarn install
yarn dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

## Folder structure

```
vidyabot-monorepo/
├── apps/
│   ├── mobile/           # VidyaBot learner app (Expo / React Native)
│   └── teacher-web/      # Teacher dashboard (Vite + React)
├── packages/
│   ├── ai-engine/        # On-device inference orchestration, queues, model lifecycle
│   ├── curriculum-db/    # SQLite schema, migrations, curriculum queries
│   ├── speech/           # ASR/TTS adapters and offline speech pipelines
│   ├── sync/             # Optional online sync when network is available
│   ├── i18n/             # Translation keys, locale loading, formatting
│   └── gamification/     # XP, badges, streaks, rewards
├── native/
│   └── llama-android/    # Android JNI / NDK project for llama.cpp integration
├── scripts/              # Repo automation (build, codegen, data pipelines)
└── docs/                 # Architecture notes, ADRs, runbooks
```

Shared libraries under `packages/*` are consumed by `apps/mobile` and optionally by `apps/teacher-web` via workspace dependencies (`@vidyabot/*`).

## License

Private monorepo unless otherwise specified in `LICENSE`.
