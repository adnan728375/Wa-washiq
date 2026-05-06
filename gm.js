const fs = require("fs-extra");

module.exports.config = {
    name: "gm",
    version: "1.1.1",
    role: 2,
    author: "Adnan",
    description: "Control and send messages to all groups from one place.",
    category: "admin",
    guide: "{pn}",
    coolDown: 5
};

module.exports.onStart = async function ({ api, event }) {
    const allThreads = await api.getThreadList(100, null, ["INBOX"]);
    const groupList = allThreads.filter(group => group.isGroup);

    if (groupList.length === 0) return api.sendMessage("Bot is not in any groups.", event.threadID);

    let msg = "[ BOT GROUP LIST ]\n\n";
    groupList.forEach((group, index) => {
        msg += `${index + 1}. ${group.name || "Unnamed Group"}\nID: ${group.threadID}\n\n`;
    });

    msg += "Reply to this message with: [Number] [Your Message]";

    return api.sendMessage(msg, event.threadID, (err, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            groupList: groupList
        });
    }, event.messageID);
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { author, groupList } = handleReply;
    if (event.senderID != author) return;

    const body = event.body.trim();
    const firstSpaceIndex = body.indexOf(" ");
    
    if (firstSpaceIndex === -1) {
        return api.sendMessage("Invalid format. Use: [Number] [Message]", event.threadID, event.messageID);
    }

    const indexNumber = body.substring(0, firstSpaceIndex);
    const messageToSend = body.substring(firstSpaceIndex).trim();
    const index = parseInt(indexNumber) - 1;

    if (isNaN(index) || index < 0 || index >= groupList.length) {
        return api.sendMessage("Invalid selection number.", event.threadID, event.messageID);
    }

    if (!messageToSend) {
        return api.sendMessage("Please provide a message after the number.", event.threadID, event.messageID);
    }

    const targetGroup = groupList[index];

    try {
        await api.sendMessage(messageToSend, targetGroup.threadID);
        return api.sendMessage(`Successfully sent to: ${targetGroup.name}`, event.threadID, event.messageID);
    } catch (error) {
        return api.sendMessage(`Failed to send: ${error.message}`, event.threadID, event.messageID);
    }
};
  
