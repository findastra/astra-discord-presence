# Development record

## 2026-09-12–13

- Requested: share GPT-6 Astra use on the user's own Discord profile, with elapsed time and the exact spiral from the OpenAI launch page; explain and push development on GitHub.
- Built a dependency-free Node.js Windows IPC companion, session timer, automatic metadata detector, local controls, and public download/preview surface.
- User reported unstyled file preview and broken links. Replaced root-relative static references with relative paths, separated hosted preview behavior from the local API, and changed the design to the reference's black/navy background, white sans-serif type, large star-field 6 and minimal controls.
- User selected Ghost Protocol as the publishing reference. Its repository is a static GitHub Pages app. Chosen publication: GitHub Pages from `main:/docs`, with a distributable Windows ZIP. A Sites registration was started before this clarification; it remains unpublished and is not the production host.
- The galaxy is a still of the actual reference animation. Ambient CSS motion is an adaptation, not a claim to ship OpenAI's original animation code.
- No callable Claude connector or local Claude CLI was found in the available tools or common executable locations; no Claude session was invoked.
- All shared activity text is fixed. The automatic detector reads model/timestamp only and is approximate. No credentials or conversation content belong in this repository.

## Validation and publication

- Seven automated tests passed, including session timing, metadata filtering, frame decoding, and a mock named-pipe handshake/activity acknowledgement/clear. Static HTML, CSS and PNG returned HTTP 200 with expected content types.
- Initial code pushed to the public findastra/astra-discord-presence repository (2c282b6). GitHub Pages configured for main:/docs; source save confirmed by GitHub.
- The user's missing Discord presence was traced to a stopped local companion and an empty Application ID. Restarted the companion as a hidden background process. Discord desktop is running. Application creation is prepared, awaiting the user's approval of Discord Developer Terms and Policy.
- Local setup now opens automatically when no Application ID is configured. Start/Automatic lead to setup instead of appearing to start a session without an ID.
- The user completed application creation in Discord. Configured its public Application ID locally, uploaded and saved the requested artwork as astra_galaxy, and started a manual session. The running companion reports connected:true and published:true after Discord acknowledged SET_ACTIVITY; the local UI displays the live elapsed timer. Visibility on another person's profile view remains unverified and depends on Discord activity privacy settings.
- Public GitHub Pages app verified at https://findastra.github.io/astra-discord-presence/. The Windows ZIP download returned HTTP 200 with ZIP content type; the native ZIP reader enumerated all 14 intended files. Seven automated checks passed again after the setup guidance fix.
