const { Telegraf } = require('telegraf');

// Твой токен
const bot = new Telegraf('8212649208:AAF7QHMiNEVCkxogcMmef4lfxZv8SCRITpo');
const webAppUrl = 'https://sanichzenich-ru.github.io/neighbor-rent/';

bot.start((ctx) => {
  ctx.reply('Привет! 👋 Открой прокат кнопкой ниже:', {
    reply_markup: {
      keyboard: [[{ text: "📦 Открыть прокат", web_app: { url: webAppUrl } }]],
      resize_keyboard: true
    }
  });
});

bot.on('web_app_data', async (ctx) => {
  try {
    const rawData = ctx.message.web_app_data.data;

    // Сценарий 1: Добавление нового товара
    if (rawData.startsWith('NEW_ITEM|')) {
      const [_, name, price] = rawData.split('|');
      
      const htmlBlock = `
<div class="bg-white p-5 rounded-2xl shadow-md flex items-center border-l-8 border-orange-500">
    <div class="ml-4 flex-grow">
        <h2 class="font-bold text-xl text-gray-900">${name}</h2>
        <p class="text-gray-600 font-semibold">${price}</p>
    </div>
    <button onclick="orderItem('${name}')" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold active:scale-95">ВЗЯТЬ</button>
</div>`;

      await ctx.reply(`➕ КОД ДЛЯ НОВОГО ТОВАРА:\n\nСкопируй блок ниже и вставь его в index.html перед КНОПКОЙ АДМИНА:`);
      await ctx.reply(`<code>${htmlBlock}</code>`, { parse_mode: 'HTML' });
      
      console.log(`Сгенерирован код для: ${name}`);
    } 
    
    // Сценарий 2: Обычный заказ
    else if (rawData.startsWith('ORDER:')) {
      const itemName = rawData.replace('ORDER:', '');
      await ctx.reply(`✅ Заявка на "${itemName}" отправлена владельцу!`);
      console.log(`ЗАКАЗ: ${itemName} от @${ctx.from.username || ctx.from.first_name}`);
    }

  } catch (error) {
    console.error('Ошибка:', error.message);
  }
});

bot.launch();
console.log('Бот запущен. Ожидаю заказы или новые товары...');