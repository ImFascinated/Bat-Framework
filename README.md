# This Package is still under development and not all features are done.

# Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Creating a Command](#creating-a-command)
- [Creating a Event](#creating-a-event)
- [Guild Data](#guild-data)
- [Command Permissions](#command-permissions)
- [Command Cooldowns](#command-cooldowns)

# Installation

**NPM**
```bash
npm install @imfascinated/bat-framework
```

**Setup**
---
After you have installed BatFramework there is a simple setup process.
```js
const Discord = require('discord.js');
const { Client } = require('@imfascinated/bat-framework');
require('dotenv').config()

// Create a discord client instance.
const client = new Discord.Client();
// Initialize Bat-Framework.
const Bot = new Client(client, {
    commandsDirectory: 'Commands',
    eventsDirectory: 'Events',
    showWarns: true,
    autoSaveInterval: 300000, // Guild auto save interval
    databaseOptions: {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
});
// Set your Mongo URI path so the framework can use it.
Bot.setMongoPath(process.env.MONGO_URI);
// Set the bots default command prefix, it is ! by default.
Bot.setDefaultPrefix('?');

Bot.on('databaseConnected', () => {
    console.log('Bot » Database connected!');
});

client.login(process.env.TOKEN);
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
Note: The file name can be anything, the "event" option is the event called internally.
Example: event: 'message'

```js
// File name: ready.js
// Folder: /src/Events

const { EventBase } = require('@imfascinated/bat-framework');

module.exports = class ReadyEvent extends EventBase {
    constructor() {
        super({
            event: 'ready'
        });
    }
    
    /**
     * 
     * @param {BatClient} instance 
     * @param {Client} client
     */

    run(instance, client) {
        console.log(`Bot » Ready!`);
    }
}
```

**Guild Data**
---
Guild data can be set to anything since it's stored as an Object (key: String, value: Object)

```js
const { Message } = require('discord.js');
const { CommandBase } = require('@imfascinated/bat-framework');

module.exports = class MessageEvent extends CommandBase {
    constructor() {
        super({
            name: 'setprefix',
            description: 'Simple set prefix command.',
            aliases: ['prefix']
        });
    }

    /**
     * @param {Message} message 
     * @param {string[]} args 
     */

    async run(message, args, guildData) {
        if (args.length < 1) {
            // A simple example below on how to retrieve guild data.
            return message.channel.send(`Your prefix: \`${guildData.getData('prefix')}\``);
        }
        const prefix = args[0];
        // A simple example below is how to set guild data.

        await guildData.setData('prefix', prefix, true).then(data => {
            message.channel.send(`Your guilds prefix has been updated to \`${data.value}\`.`);
        });
    }
}
```

**Command Permissions**
---
Permissions required by the user (or client) to use the command.
```js
const { Message } = require('discord.js');
const { CommandBase } = require('@imfascinated/bat-framework');

module.exports = class MessageEvent extends CommandBase {
    constructor() {
        super({
            name: 'testy',
            description: 'What did you expect to read',
            clientPermissions: [ // The permissions the bot needs to run this command
                'KICK_MEMBERS'
            ],
            userPermissions: [ // The permissions the user needs to run this command
                'ADMINISTRATOR'
            ]
        });
    }

    /**
     * @param {Message} message 
     * @param {string[]} args 
     */

    async run(message, args, guildData) {}
}
```

**Command Cooldowns**
---
I don't recommend you use them for cooldowns over 5 mins yet since there is no database integration yet
```js
const { Message } = require('discord.js');
const { CommandBase } = require('../../dist/index');

module.exports = class MessageEvent extends CommandBase {
    constructor() {
        super({
            name: 'cooldowntest',
            cooldown: 30000 // 30 Seconds
        });
    }

    /**
     * @param {Message} message 
     * @param {string[]} args 
     */

    async run(message, args, guildData) {}
}```

**Support & Feature Requests**
---
This package is looking for feedback and ideas to help cover more use cases. If you have any ideas feel free to share them me on discord at Fascinated#4735
