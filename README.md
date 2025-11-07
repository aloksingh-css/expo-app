# Expo Minimal Template

**🎯 Purpose:** This template demonstrates all the build tools, transformers, and processes used in production Expo apps.

## 🚀 Features

- **[Expo](https://expo.dev/)** - Universal React Native framework
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing for React Native
- **[Bun](https://bun.sh/)** - The designated package manager and test runner for this template.
- **[Lingui](https://lingui.dev/)** - Internationalization (i18n) framework
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code quality and formatting
- (Optional, can ignore) **[Maestro](https://maestro.mobile.dev/)** - End-to-end testing framework (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/)
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- XCode and iOS simulator image 26.1
- Optional (Can Ignore) - [Maestro CLI](https://maestro.mobile.dev/getting-started/installing-maestro) (for E2E tests)

For mobile development:

- **iOS**: Xcode (macOS only)
- **Android**: Android Studio and Android SDK

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Run on Specific Platform

#### iOS Development

**Important:** For iOS builds, Metro bundler must be running first:

```bash
# Terminal 1: Start Metro bundler
bun start

# Terminal 2 (after Metro is running): Build and run iOS
bun ios
```

Or use Expo Go for faster development (no build required):

```bash
bun start
# Then press 's' to switch to Expo Go mode and then i' to open in iOS simulator with Expo Go
```

#### Android / Web

```bash
# Android
bun android

# Web
bun web
```

## 🧪 Testing

### Unit Tests (Bun)

Run unit tests using Bun's built-in test runner:

```bash
bun test
```

## 🌍 Internationalization

This template uses Lingui for internationalization. To work with translations:

### Extract new messages from source code:

```bash
bun intl:extract
```

### Compile translations:

```bash
bun intl:compile
```

Translation files are located in `locales/en/messages.po`.

## 📝 Code Quality

### Lint and Format

```bash
# Check for linting and formatting issues
bun lint

# Auto-fix linting and formatting issues
bun format
```

## 🏛️ Architecture and Build Details

For an analysis of how this project could be supported by the Bazel build system, see the requirements document at [`bazel-requirements.md`](./bazel-requirements.md).
