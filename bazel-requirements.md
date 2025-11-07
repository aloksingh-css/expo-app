# Requirements for Bazel Support for Expo Applications

## 1. Introduction

This document outlines the requirements for adding first-class support for building Expo (React Native) applications with Bazel. Expo provides a toolchain that simplifies the development and build process for universal React Native apps. Integrating Expo with Bazel would bring significant benefits like improved caching, reproducibility, and seamless integration into larger monorepos.

The goal is to create a new Bazel ruleset (e.g., `rules_expo`) that can manage the entire lifecycle of an Expo application, from local development to production builds.

## 2. Core Concepts & Tooling

A Bazel integration must understand and correctly orchestrate the following tools:

- **Package Manager (`bun` or `pnpm`)**: The project currently uses `bun` as its package manager and task runner. However, since Bazel's `rules_nodejs` has out-of-the-box support for `pnpm`, the project can be migrated to `pnpm` if it simplifies the integration effort.
- **Expo CLI (`expo`)**: The central tool for development and building. It abstracts away the complexity of native builds.
- **Metro Bundler**: A JavaScript bundler used by Expo. It's responsible for code bundling, transformations (e.g., JSX, TypeScript), and providing the **Hot Module Replacement (HMR)** server during development.
- **Native Build Tools (`xcodebuild`, `gradle`)**: The underlying compilers for iOS and Android, respectively. The Expo CLI calls these tools under the hood.
- **EAS CLI (`eas`)**: The CLI for Expo Application Services, which provides cloud build and submission services. While developers might still use EAS for distribution, the goal here is to **replace the build portion (`eas build`) with a hermetic Bazel build** that can run on any CI/CD platform.
- **Preprocessors**: The build process often involves preprocessing steps. This project uses:
  - **NativeWind/TailwindCSS**: Processes CSS utility classes into React Native styles at build time.
  - **Lingui**: Compiles internationalization (i18n) message catalogs.

## 3. Required Build & Development Flows

Bazel must support two primary workflows:

### Flow 1: Local Development & HMR

This flow is optimized for a fast developer feedback loop.

**Current Process:**

1.  A developer runs `bun start` (which calls `expo start`).
2.  This command starts the Metro bundler as a persistent development server.
3.  The developer then opens the app on a simulator or device, which connects to the Metro server.
4.  When a source file is changed, Metro pushes an update to the client (HMR) without a full app reload.

**Bazel Support Requirements:**

- A `bazel run` target (e.g., `expo_local_dev`) should be able to start and manage the Metro development server.
- Bazel should not interfere with Metro's own file-watching and HMR capabilities. The server process should remain active.
- The rule should also be able to trigger the initial build and installation of the native shell app onto a simulator (similar to `expo run:ios` or `expo run:android`).

### Flow 2: Production Build

This flow is optimized for creating a standalone, release-ready application binary (`.ipa` or `.aab`).

**Current Process:**

1.  The developer runs a command like `eas build` (for cloud builds) or `expo export` + native compilation.
2.  **JS Bundling**: Metro is invoked to bundle all JavaScript and assets into a production-optimized format.
3.  **Native Compilation**: The native shell app (`ios` and `android` projects) is compiled using `xcodebuild` or `gradle`.
4.  **Asset Embedding**: The JavaScript bundle from step 2 is embedded into the native app binary.
5.  **Code Signing**: The final binary is signed with the appropriate certificates and provisioning profiles.

**Bazel Support Requirements:**

- A `bazel build` target (e.g., `expo_application`) must execute the entire production build hermetically.
- **Dependency Management**: The rules must work with `rules_nodejs` to ensure `node_modules` are handled correctly.
- **Preprocessing as Actions**: Steps like NativeWind/Tailwind and Lingui compilation must be modeled as Bazel actions with defined inputs and outputs to enable caching.
- **Metro as an Action**: The Metro bundling step must be a cacheable Bazel action. The action would take all source files and dependencies as input and produce a bundled JavaScript file and assets as output.
- **Integration with Native Rules**: The output of the Metro action must feed directly into native build rules like `rules_apple`'s `ios_application` and `rules_android`'s `android_binary`.
- **Code Signing**: The rules must provide a standard Bazel mechanism for configuring code signing credentials.

## 4. Proposed Bazel Ruleset (`rules_expo`)

A potential implementation could look like this:

```bzl
# Hypothetical BUILD file for an Expo app

load("@rules_expo//:defs.bzl", "expo_application")

expo_application(
    name = "my_app",
    srcs = glob(["src/**/*.tsx"]),
    assets = glob(["assets/**/*"]),
    package_json = "//:package.json",
    # Preprocessing rules would be defined here
    # and linked to the main application
    lingui_messages = "//locales:compiled_messages",
    # Dependencies on other Bazel targets
    deps = [
        "//:node_modules",
        "//components:my_component",
    ],
)
```

### Example minimal requirements for the Ruleset:

1.  **`expo_application` Rule**: The primary rule to define an Expo app. It should have attributes for sources, assets, dependencies, and platform-specific features.
2.  **Metro Integration**: Provide a mechanism to run the Metro bundler as a Bazel action, with inputs/outputs correctly declared for caching.
3.  **Native Rules Interoperability**: The `expo_application` rule should be a macro or wrapper that configures and calls the underlying `ios_application` and `android_binary` rules, injecting the bundled JS assets at the appropriate stage.
4.  **Configuration**: The rules must allow for easy configuration of different environments (development vs. production) and build settings (e.g., bundle entry file, asset destinations).
