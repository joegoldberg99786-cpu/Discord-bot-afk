import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

    if (!channel) {
      console.log("Voice channel not found");
      return;
    }

    // مجرد إبقاء الاتصال نشط (ما بيشغل صوت)
    await channel.guild.members.me.voice.setChannel(channel);
    console.log("Joined voice channel and staying connected");
  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);
