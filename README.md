# Samplescope

Download [Samplescope for Mac OS](https://github.com/jamland/samplescope/releases/)

## Simply

Samplescope is app to search audio samples over internet

## Detailed

There are 2 main stimulus for this app:

- Give a user a simple (quick and easy) way to search over online samples
- Research the field of available online audio resources.

# Development

## TBA: Description followed open source project on github

## Commands

Some script commands uses `cross-env` to ensure to set and use environment variables across platforms.

| Command     | Description                                 |
| ----------- | ------------------------------------------- |
| start       | Start app in DEV mode                       |
| start:watch | Same and watch for changes                  |
| make        | Compile ready-to-use app                    |
| package     | Compile app (not distributable, use `make`) |
| publish     | `make`, notarize and publish to GitHub      |
| lint        | Lint app                                    |
| lint:app    | Lint app w/ `electron-forge`                |
| test        | Run tests                                   |

Details on [Electron Forge docs for CLI](https://www.electronforge.io/cli)

### Notarize

The config could be found in `forge.config`.

macOS: `APPLE_ID` & `APPLE_ID_PASSWORD` tokens needs to be added to `.env` file. All notarization works done by `src/hooks/notarize` hook on `publish` cmd.

Windows: Code-sign certificate need to be placed within `private/` folder.

The rest of the work for both platforms done automatically on `npm run publish` cmd.

### Publish

This command will attempt to make the forge application and then publish it to the publish targets defined in `forge.config`.

It will post to (or create if not exist) Github's Draft Releases with name of last version.
You need to run publish on each platform you want to support, so `Samplescope-X.X.X.Setup.exe` will be made on posted from Win and `Samplescope-darwin-x64-X.X.X.zip` on MacOS.

## Private Keys

There are some 3rd-party API related credentials, Github token, Apple passwords and other sensative private credentials required to run, package, deploy this app. This credentials should not be published to repository for security reasons, and should be added manually by developer.  
Specifically:

- add new `.env` file. There is `.env.example` with example of required keys
- add `./private` folder
- add `./private/GH_TOKEN.txt` file with GitHub token
- add `./private/AppleIdPassword.txt` file with generated Apple Id Password
