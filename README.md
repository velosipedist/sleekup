# Installation

## Build the extension
```bash
npm install
npm run build
```

To load the extension, go to Chrome Settings > Extensions, turn on Developer Mode switch.

Use Load Unpacked button to locate and load the extension files under `/dist` folder.

WIP: Publish the extension to Chrome Web Store.

# Usage
Open the Clickup Page. Choose or create a list view that would work for you.

Tick the tasks you wish to list for reporting somewhere like Slack standup message.

Then click the extension icon and click Copy to get the tasks list readymade!

# Development
Start the dev server.

```bash
npm install
npm run dev
```

All the changes in js/css sources, popup.html will be recompiled to `/dist` folder on change.