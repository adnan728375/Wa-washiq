const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
    name: "murgi",
    aliases: ["roast", "চুদা"],
    version: "1.0.5",
    role: 1,
    author: "Adnan",
    description: "Roasts the target continuously (Works with Mention or Reply).",
    category: "nsfw",
    guide: "{pn} @mention | reply to a message | [on/off]",
    coolDown: 5
};

module.exports.onStart = async function({ api, args, Users, event }) {
    const path = __dirname + "/cache/murgi.json";
    let state;

    try {
        state = await fs.readJson(path);
    } catch (e) {
        state = { status: "on" };
        await fs.outputJson(path, state);
    }

    if (args[0] === "off") {
        state.status = "off";
        await fs.outputJson(path, state);
        return api.sendMessage("『 Murgi 』 system deactivated.", event.threadID);
    }
    if (args[0] === "on") {
        state.status = "on";
        await fs.outputJson(path, state);
        return api.sendMessage("『 Murgi 』 system activated.", event.threadID);
    }

    if (state.status === "off") return api.sendMessage("Command is currently OFF.", event.threadID);

    let targetID, targetName;
    if (event.type === "message_reply") {
        targetID = event.messageReply.senderID;
        targetName = await Users.getNameUser(targetID);
    } else if (Object.keys(event.mentions).length > 0) {
        targetID = Object.keys(event.mentions)[0];
        targetName = event.mentions[targetID].replace('@', '');
    } else {
        return api.sendMessage("Boss Adnan, please reply or mention someone to roast! 🫂", event.threadID);
    }

    const mentions = [{ id: targetID, tag: targetName }];
    const send = (txt) => api.sendMessage({ body: txt, mentions }, event.threadID);

    send(`তোরে চুদলো Adnan বস 🥵`);

    const insults = [
        { msg: "ভোদাই জানে চোদার মজা তোর মাকে জিজ্ঞেস কর কেমন দিছিলাম চোদা 🥰।", delay: 3000 },
        { msg: "খাংকির পোলা তর কচি বোন রে চুদি 😍.. ", delay: 6000 },
        { msg: "মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰", delay: 9000 },
        { msg: "তুর মারে আটলান্টিক মহাসাগরের মাঝামাঝি গলা টিপে ধরে চুদতে চুদতে ভুদার মাসিক চেন্জ করমো 🙈", delay: 12000 },
        { msg: "খাংকি মাগির পোলা কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম 💥", delay: 15000 },
        { msg: "Depression থেকেও তর মাইরে চু*** দি 🤬", delay: 18000 },
        { msg: "তর আম্মু রে আচার এর লোভ দেখিয়ে আমি চুদি মাগির পোলা 🤬", delay: 21000 },
        { msg: "বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু 🤟", delay: 24000 },
        { msg: "উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট 💉", delay: 27000 },
        { msg: "অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা, Adnan তর বাপ চিরকাল মনে রাখবি 😘", delay: 30000 },
        { msg: "তোর মার ভোদায় উম্মাহ 🥵🥰🫦", delay: 33000 },
        { msg: "তোর মাকে ৩৬৫ দিন পদ্মা সেতুর নিচে নিয়ে চুদি 🥵", delay: 36000 },
        { msg: "আপনার মারে ভুতের গল্প সুনিয়ে আসতে আসতে শির শির ভাবে চুদতে জায় 👍🥀", delay: 39000 },
        { msg: "তোর মাকে গ্রীন লাইন গাড়ির ছাদের উপর ফালিয়ে ভোদার উপর পাড়া দিয়া চুদবো 🚌💦", delay: 42000 },
        { msg: "DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম। 🧬", delay: 45000 },
        { msg: "ফাটা কন্ডমের ফসল, যা ভাগ এখান থেকে! 🤖", delay: 48000 }
    ];

    insults.forEach(item => {
        setTimeout(() => {
            send(`${item.msg} ${targetName}`);
        }, item.delay);
    });
};
         
