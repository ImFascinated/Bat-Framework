**This Package is still under development and not all features are done.**
---

**NPM**
---
```
npm install @imfascinated/bat-framework
```

**Setup**
---
After you have installed BatFramework there is a simple setup process.
```js
const Discord = require('discord.js');
const { Client } = require('@imfascinated/bat-framework');

// Create a discord client instance.
const client = new Discord.Client();
// Initialize Bat-Framework.
const Bot = new Client(client, {
    commandsDirectory: 'commands',
    eventsDirectory: 'events',
    showWarns: true // Show warnings about the bot.
});
client.login('your token');
```

**Creating a Command**
---
This is a simple test command to see if the framework is working.
```js
// File name: Test.js
// Folder: /src/Commands (Can also be folders in folders ex: /src/Commands/Info)

const { Message } = require('discord.js');
const { CommandBase } = require('@imfascinated/bat-framework');

module.exports = class MessageEvent extends CommandBase {
    constructor() {
        super({
            name: 'test', // Command name
            description: 'This a test command!', // Command description
            alises: ['testy'] // Command aliases
        });
    }

    /**
     * @param {Message} message 
     * @param {string[]} args 
     */

    async run(message, args) {
        message.channel.send('testy!');
    }
}
```

**Creating a Event**
---
Events can be anything that is called from the DiscordJS Client.

```js
// File name: ready.js
// Folder: /src/Events

const { EventBase } = require('@imfascinated/bat-framework');

module.exports = class ReadyEvent extends EventBase {
    constructor(...args) {
        super(...args);
    }

    run() {
        console.log('Hey mum! Look at me!!');
    }
}
```

**Support & Feature Requests**
---
This package is looking for feedback and ideas to help cover more use cases. If you have any ideas feel free to share them me on discord at Fascinated#4735
