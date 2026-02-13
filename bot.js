const { Telegraf } = require('telegraf');

// Твой токен из BotFather
const bot = new Telegraf('8212649208:AAEbYe-hL-FMTookxjoJo6EcRig7NCuUtAE');

// Команда /start
bot.start((ctx) => {
  ctx.reply('Добро пожаловать в Соседский прокат!', {
    reply_markup: {
      keyboard: [
        [{ text: "Открыть прокат", web_app: { url: 'https://ggggtttt121488-ai.github.io/neighbor-rent/' } }]
      ],
      resize_keyboard: true
    }
  });
});

// Слушаем данные из Web App
bot.on('web_app_data', (ctx) => {
  const data = ctx.webAppData.data(); 
  ctx.reply(`🔥 НОВЫЙ ЗАКАЗ!\nСосед хочет: ${data}\n\nСвяжись с ним прямо сейчас!`);
});

bot.launch();
console.log('Бот запущен и слушает...');