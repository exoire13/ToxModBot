require("module-alias/register");
const mongo = require("mongoose");

const Website = require('./website/server');
const Client = require('./client/index');

(async () => {
    
    let client = await Client.init();

    console.log('[Tox Mod | Bot] Connected to the Discord API');

    await new Website(client).listen(process.env.PORT);

    console.log(`[Tox Mod | Web] Running on port: ${process.env.PORT}`);
})()
