import { ApplicationCommandOption, Client, ClientOptions } from "discord.js";
import { Collection } from 'discord.js';
import { promises, readdirSync } from 'fs';
import { join } from 'path';

class bot extends Client {
    commands: Collection<string, Command> = new Collection();
    categoires: Array<string> = readdirSync(join(__dirname, '../commands'));
    extension: string = "ts";
    constructor(options: ClientOptions) {
        super(options);
        if (join(__dirname, '../commands').includes("build\\")) {
            this.extension = "js";
        }

        this.setCommands();
        this.handleEvents();
    }

    async setCommands() {
        const categories = await promises.readdir(join(__dirname, `../commands`));

        categories.forEach(async cat => {
            const commands = (await promises.readdir(join(__dirname, `../commands/${cat}`))).filter(file => file.endsWith(this.extension));

            for (let i = 0; i < commands.length; i++) {
                const file = commands[i];
                const command: Command = require(`../commands/${cat}/${file}`)?.default || {};
                if (!command.name || typeof (command.run) !== "function") throw new SyntaxError("A command should have `data` property and a `execute` method");
                console.log(`🔧 Commands - /${command.name}`)
                this.commands.set(command.name, command);
            }
        })
    }

    async handleEvents() {
        const events = await promises.readdir(join(__dirname, `../events`));

        for (let i = 0; i < events.length; i++) {

            const event = require(`../events/${events[i]}`)?.default || {};

            if (!event || typeof (event) !== "function") return; 
            console.log(`📂 Events - ${events[i].split(".")[0]}`)
            this.on(events[i].split(".")[0], (...args) => event(this, ...args))
        }
    }
}

export default bot;

interface Command {
    name: string,
    description: string,
    category: string,
    slash: boolean,
    args?: string,
    aliases?: Array<string>,
    timeout?: number,
    options: ApplicationCommandOption[],
    run: Function
}