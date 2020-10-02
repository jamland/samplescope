# Samplescope

(Download Samplescope for Mac OS)[https://github.com/jamland/samplescope/releases/tag/v1.2.8]

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

| Command     | Description                            |
| ----------- | -------------------------------------- |
| start       | Start app in DEV mode                  |
| start:watch | Same and watch for changes             |
| make        | Compile ready-to-use app               |
| package     | `make`, notarize and publish to GitHub |
| lint        | Lint app                               |
| lint:app    | Lint app w/ `electron-forge`           |
| test        | Run tests                              |

## Private Keys

There are some 3rd-party API related credentials, Github token, Apple passwords and other sensative private credentials required to run, package, deploy this app. This credentials should not be published to repository for security reasons, and should be added manually by developer.  
Specifically:

- add new `.env` file. There is `.env.example` with example of required keys
- add `./private` folder
- add `./private/GH_TOKEN.txt` file with GitHub token
- add `./private/AppleIdPassword.txt` file with generated Apple Id Password
