const fs = require("fs-extra");

module.exports.config = {
    name: "spam",
    version: "1.0.1",
    role: 0,
    author: "Adnan",
    description: "Sends an ultra-long blank spam message.",
    category: "fun",
    guide: "{pn}",
    coolDown: 5
};

module.exports.onStart = async function({ api, event }) {
    // Ultra long gap to maximize the "feet" of empty space
    const gap = "\n".repeat(40); 
    const pattern = `🔺${gap}🔻${gap}`;
    
    // Repeating the pattern 50 times for maximum height
    const spamMessage = pattern.repeat(50);
    
    return api.sendMessage(spamMessage, event.threadID);
};
