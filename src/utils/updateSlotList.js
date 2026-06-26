import { db } from "./database.js";

export async function updateSlotList(client) {

const slotChannel = await client.channels.fetch(
process.env.SLOT_LIST_CHANNEL_ID
);

const registrations = await db.list("registration:");

let slots = [];

for (const key of registrations) {
const data = await db.get(key);

if (data?.status === "approved") {
  slots.push(
    `${data.slot} - ${data.ingameName}`
  );
}

}

slots.sort((a, b) => {
const slotA = parseInt(a.match(/\d+/)[0]);
const slotB = parseInt(b.match(/\d+/)[0]);
return slotA - slotB;
});

const pages = [];
let currentPage = [];

for (const slot of slots) {
currentPage.push(slot);

if (currentPage.length === 50) {
  pages.push(currentPage);
  currentPage = [];
}

}

if (currentPage.length) {
pages.push(currentPage);
}

const messages = await slotChannel.messages.fetch({
limit: 100
});

const botMessages = messages
.filter(m => m.author.id === client.user.id)
.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

let index = 0;

for (const page of pages) {

const content =
  `🎟 **TOURNAMENT SLOT LIST (${index + 1}/${pages.length})**\n\n` +
  page.join("\n");

if (botMessages.at(index)) {
  await botMessages.at(index).edit({
    content
  });
} else {
  await slotChannel.send({
    content
  });
}

index++;

}

}
