require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '!'; // ユーザーによるコマンド認識用のprefix

// 薬の情報を格納するオブジェクト
let medicines = {
// 'user_id_1': [], // ユーザー１の薬のリスト
// 'user_id_2': [] // ユーザー２の薬のリスト
};

// 薬の摂取履歴を格納するオブジェクト
let history = {
// 'user_id_1': [], // ユーザー１の薬の履歴リスト
// 'user_id_2': [] // ユーザー２の薬の履歴リスト
};

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
if (message.author.bot) return; // Bot自身の発言を無視する
if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if (command === 'addmedicine') { // 薬の登録用コマンド
const name = args[0];
const volume = args[1];
const time = args[2];

if (!name || !volume || !time) {
message.reply('Usage: !addmedicine [名前] [容量] [服用時間]');
return;
}

// ユーザーの薬のリストに情報を追加
if (!medicines[message.author.id]) {
medicines[message.author.id] = [];
}

medicines[message.author.id].push({ name: name, volume: volume, time: time });
message.channel.send(`Medicine ${name} has been added!`);
}

if (command === 'remind') { // リマインダーの設定用コマンド
// ここで、定期的にリマインダーを送信する処理を実装します。
// 薬の登録時に指定された時間になったら、Botがリマインダーメッセージを送信するようにします。
// 必要に応じて、ユーザーは「!snooze」を使ってリマインダーを再設定することができます。
}

if (command === 'history') { // 薬の履歴確認用コマンド
let str = '';
history[message.author.id].forEach(med => {
str += `${med.name}: ${med.volume}, ${med.time}\n`;
});
message.channel.send(str);
}

if (command === 'schedule') { // スケジュール確認用コマンド
let str = '';
medicines[message.author.id].forEach(med => {
str += `${med.name}: ${med.volume}, ${med.time}\n`;
});
message.channel.send(str);
}

});

client.login(process.env.DISCORD_BOT_TOKEN);