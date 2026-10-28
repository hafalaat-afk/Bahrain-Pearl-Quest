# Bahrain Pearl Quest — live group play setup

The solo game works immediately without a backend. **Live multiplayer requires one Firebase project** because GitHub Pages alone cannot synchronize multiple phones. This package deliberately contains no fabricated multiplayer connection or exposed secret credentials.

## Part A: Set up Firebase (one-time)

1. Create a Firebase project: https://console.firebase.google.com/ (you may need to select a billing plan depending on your usage and regional availability).
2. In **Build → Authentication → Sign-in method**, enable **Anonymous** sign-in. This lets guests enter a username without creating accounts.
3. In **Build → Realtime Database**, create a Realtime Database in your preferred location. Use **locked mode**, not publicly readable test-mode rules.
4. Open the database **Rules** tab and replace its contents with `database.rules.json` from this ZIP. Click **Publish**. These rules restrict room controls to the original host and restrict guest submissions to their own answers during the current question.
5. Open **Project settings → General → Your apps → Add web app**. Copy the **firebaseConfig** properties. Include `databaseURL` from the Realtime Database page if it is not in the generated config.
6. Edit `firebase-config.js`. Replace `window.PEARL_FIREBASE_CONFIG = null;` with your config object. Keep `firebase-config.js` in your published website's root directory. The API key in a Firebase *web* config is designed to be public. **Never add a service-account JSON or administrative database credentials to GitHub.**
7. Open **Authentication → Settings → Authorized domains** and ensure your GitHub Pages hostname (`YOUR_USERNAME.github.io`) is authorized where required by your Firebase Authentication setup.

## Part B: Publish on GitHub Pages

1. Make a new public GitHub repository (e.g. `bahrain-pearl-quest`).
2. Upload the *contents* of this ZIP into the repository root: `index.html`, `multiplayer.js`, `multiplayer.css`, `firebase-config.js`, `vendor/`, and the guide files. All paths must stay intact.
3. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, `main`, `/(root)`, then **Save**. When the site is live, use its `https://USERNAME.github.io/REPO/` link.
4. Open the website, choose **Live group play → Host a new game**, and keep this host browser open on a projector or display.
5. Guests scan the QR shown on the host screen. The link opens the **username entry page** on their own devices. Each participant enters a name and joins the lobby.
6. Once enough guests have joined, press **START GAME FOR EVERYONE** on the host page.

## Gameplay

- **Individual:** Each guest opens oysters and answers alone. They receive an individual score and can replay.
- **Live:** All 16 illustrated oysters open automatically, in the same order and at the same time on every guest phone. Each question lasts **14 seconds**; the answer reveal lasts **3 seconds**. The full sequence takes approximately **4–5 minutes**.
- **Host:** Controls the start and runs the round timer. Keep the host tab open and the device awake. If the host tab is closed, reopen the same **host URL in the same browser** to resume. Guests' submitted answers remain in Firebase.
- **Scores:** 100 points for a correct answer plus 3 points per second remaining, based on the server-recorded submission time. The final screen shows every player's score, number of correct answers, rank, and a shared leaderboard. The host also sees the full leaderboard.
- **Names:** Guests choose usernames (2–24 characters). Repeated usernames are blocked at join time, subject to near-simultaneous joins.

## Important operational notes

- The Firebase Realtime Database and Firebase Authentication connections require internet access on the event venue's network and the guests' phones.
- Each guest must use a separate device/browser session, not multiple tabs in the same browser profile.
- The host uses their original authenticated browser session to resume the game. Do not use incognito for hosting if you might need to resume.
- Live room data is stored in your Firebase project. Set a data-retention policy and delete old `rooms` records through the Firebase console after the event.
- **Fairness:** Scoring is calculated from database-recorded answers and server timestamps. However, the question bank is included in public website JavaScript. This is a fun event game, **not a tamper-proof prize or exam platform**. For high-value prizes, use a protected server-side question/scoring service.
- The provided database rules restrict writes but grant room reads to authenticated visitors who know the room code. Avoid using real names or other sensitive information.
- Live mode is not operational until you enter your own Firebase configuration and publish rules. The ZIP cannot include your account's real Firebase credentials.

## Quick test before Bahrain National Day

1. Open the hosted website on your laptop and create a room.
2. Scan its QR on **two phones** and enter different usernames.
3. Confirm both names appear on the host screen.
4. Start from the laptop and confirm both phones receive Question 1 automatically.
5. Answer different options, let the remaining questions run, and verify each score/rank at the end.
6. Test an iPhone and an Android phone on the same network used for the actual event.

## Troubleshooting

- **Firebase setup warning:** Edit `firebase-config.js` and upload it again.
- **auth/operation-not-allowed:** Enable Anonymous Authentication.
- **permission_denied:** Publish the provided Realtime Database rules and confirm the URL in `firebase-config.js` matches that database.
- **QR opens a local file address:** Publish on GitHub Pages first. QR links must point to an HTTPS website guests can reach.
- **Timer freezes:** Keep the host page active. Reopen its `?host=ROOMCODE` link in the same browser.
- **Some phones don't update:** Check the venue Wi-Fi/mobile coverage, Firebase rules, and battery/background restrictions. Recommend keeping the game tab open.
