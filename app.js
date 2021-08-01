console.log('')
console.log('-------------------------------')
console.log('  Скрипт Запущен! ')
console.log('  Разработчик: Sergeu Shabolin')
console.log('  vk.com/shabolin209')

console.log('-------------------------------')
console.log('')


const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const frac = require('./frac.json');
const request = require('prequest');

function time() { 
let date = new Date(); 
let days = date.getDate(); 
let hours = date.getHours(); 
let minutes = date.getMinutes();  
let seconds = date.getSeconds(); 
if (hours < 10) hours = "0" + hours; 
if (minutes < 10) minutes = "0" + minutes; 
if (seconds < 10) seconds = "0" + seconds; 
var times = hours + ':' + minutes + ':' + seconds 
return times; 
};

const cars = [
   {
     name: 'Скутер', 
     cost: 1000,
     id: 1,
     att: 'photo528262675_457242541'
    }, 
    {
    name: 'Мотоцикл', 
    cost: 12000,
    id: 2,
    att: 'photo528262675_457242540'
    }, 
    {
name: 'Lads Vesta', 
cost: 1000000,
id: 3,
att: 'photo528262675_457242545'
}, 
{
name: ' BMW 7 Series', 
cost: 1600000,
id: 4,
att: 'photo528262675_457242546'
}, 
{
name: 'Mercedes AMG', 
cost: 2100000,
id: 5,
att: 'photo528262675_457242548'
}, 
{
name: 'Lamborghini Huracan Coupe', 
cost: 3000000,
id: 6,
att: 'photo528262675_457242549'
}
];

const businesses = [
	{
		name: 'Кофе',
		cost: 50000,
		earn: 400,
		id: 1,
		icon: '🏬'
	},
	{
		name: 'Супер-маркет',
		cost: 100000,
		earn: 700,
		id: 2,
		icon: '🏪'
	},
	{
		name: 'Заправка',
		cost: 300000,
		earn: 2500,
		id: 3,
		icon: '⛽'
	}
];

const works = [
	{
		name: 'Дворник',
		requiredLevel: 1,
		min: 1000,
		max: 1500,
		id: 1
	},
	{
		name: 'Охранник',
		requiredLevel: 3,
		min: 2000,
		max: 3500,
		id: 2
	},
	{
		name: 'Фермер',
		requiredLevel: 5,
		min: 3000,
		max: 4500,
		id: 3
	},
	{
		name: 'Администратор кофе',
		requiredLevel: 8,
		min: 4000,
		max: 5500,
		id: 4
	},
	{
		name: 'Пилот',
		requiredLevel: 10,
		min: 6500,
		max: 7000,
		id: 5
	},
	{
		name: 'Секретарь',
		requiredLevel: 14,
		min: 9000,
		max: 9489,
		id: 6
	},
	{
		name: 'Депутат',
		requiredLevel: 22,
		min: 10000,
		max: 12500,
		id: 7
	},
	{
		name: 'Премьер-Министр',
		requiredLevel: 25,
		min: 12500,
		max: 13500,
		id: 8
	},
	{
		name: 'Создатель бота',
		requiredLevel: 49,
		min: 160000,
		max: 170500,
		id: 9
	}
];

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	rn: (int, fixed) => {
		if (int === null) return null;
		if (int === 0) return '0';
		fixed = (!fixed || fixed < 0) ? 0 : fixed;
		let b = (int).toPrecision(2).split('e'),
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'ДОХЕРА');

		return e;
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

const rotateText = {
	q: 'q',
	w: 'ʍ',
	e: 'ǝ',
	r: 'ɹ',
	t: 'ʇ',
	y: 'ʎ',
	u: 'u',
	i: 'ᴉ',
	o: 'o',
	p: 'p',
	a: 'ɐ',
	s: 's',
	d: 'd',
	f: 'ɟ',
	g: 'ƃ',
	h: 'ɥ',
	j: 'ɾ',
	k: 'ʞ',
	l: 'l',
	z: 'z',
	x: 'x',
	c: 'ɔ',
	v: 'ʌ',
	b: 'b',
	n: 'n',
	m: 'ɯ',

	й: 'ņ',
	ц: 'ǹ',
	у: 'ʎ',
	к: 'ʞ',
	е: 'ǝ',
	н: 'н',
	г: 'ɹ',
	ш: 'm',
	щ: 'm',
	з: 'ε',
	х: 'х',
	ъ: 'q',
	ф: 'ф',
	ы: 'ıq',
	в: 'ʚ',
	а: 'ɐ',
	п: 'u',
	р: 'd',
	о: 'о',
	л: 'v',
	д: 'ɓ',
	ж: 'ж',
	э: 'є',
	я: 'ʁ',
	ч: 'һ',
	с: 'ɔ',
	м: 'w',
	и: 'и',
	т: 'ɯ',
	ь: 'q',
	б: 'ƍ',
	ю: 'oı'
}

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

let users = require('./users.json');
let config = require('./settings.json');
let buttons = [];

setInterval(async () => {
	await saveUsers();
	
	console.log(' База данных успешно сохранена.');
	console.log('');
}, 30000);

setInterval(async () => {

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

}, 1);

setInterval(async () => {
	users.filter(x=> x.settings.old == false).map(x=> {
		x.settings.old == true;
	});
}, 604800);

setInterval(async () => {
	users.map(user => {
		if(user.business)
		{
			const biz = businesses.find(x=> x.id === user.business);
			if(!biz) return;

			user.biz += biz.earn;
		}
	});
}, 3600000);


function clearTemp()
{
	users.map(user => {
		user.timers.hasWorked = false;
		user.timers.bonus = false;
		user.energy = 10;
	});
}

function msgError(messagetext)
{
	return bot(`${messagetext} ${utils.pick([`😯`, `🙂`, `🤑`, `☺`])}`);
}

clearTemp();

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

async function saveConfig()
{
	require('fs').writeFileSync('./settings.json', JSON.stringify(config, null, '\t'));
	return true;
}

vk.setOptions({ token: config.grouptoken, pollingGroupId: config.groupid });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[public206188420\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public206188420\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 500,
			bank: 0,
			texrab: false, 
			promo: true, 
			tag: user_info.first_name,
			mention: true, 
			nicklimit: 15,
			biz: 0,
			business: 0,
			bizlvl: 0,
			exp: 1,
			level: 1,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			timers: {
				displayTime: false, 
				bonus: false, 
				hasWorked: false, 
				work: false
			},
		   tag: user_info.first_name,
			notifications: true,
			referal: null, 
			transport: {
			car: 0,
			}, 
			settings: {
			adm: 1,
			firstmsg: true, 
				trade: true,
 			limit: 100000,
            }, 
            });
            console.log(` Зарегистрировался новый игрок [Игроков: ${users.length}]`);
		console.log(``);
		saveUsers();
	}

	message.user = users.find(x=> x.id === message.senderId);

	const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	if(message.user.ban) return bot(`🔸› Ваш аккаун заблокирован!`);

	const command = commands.find(x=> x[0].test(message.text));

	if(message.user.settings.firstmsg)
	{
bot(`
🇷🇺Добро пожаловать в Russia Bot | Игровой бот ! 
❤Подписывайся на группу и  не пропускай новости! 
👑Russia Bot | Игровой бот - это развлекательный бот с разными прикольными и интересными командами, зарабатывай деньги и становись самым богатым!`, 
        {
			keyboard:JSON.stringify(
		{
			"one_time": false, 
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "👑 Бонус"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "🇷🇺 Помощь"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "👤 Профиль"
		},
			"color": "primary"
		}
]
		]
			})
		});
		
		message.user.settings.firstmsg = false;
		
		vk.api.messages.send({chat_id: 1 ,message: `🔥 K нами присоединился игрок:
		 📝 Имя: @id${user_info.id}(${user_info.first_name})
		 ✅ Я ему присвоил uid: ${message.user.uid}
		 🌐 Всего игроков: ${users.length}`, random_id: 0}).catch((error) => { console.log(` Ошибка. ${error}`);})
		 console.log(`+1 чел ${utils.rn(users.length)}`);
		
		saveUsers();
		return;

	}

	if(!command)
	{

		if(!message.isChat) return bot(`🇷🇺Упс...Команда не найдена!  Введите "Помощь" чтоб узнать подробный список команд. `);
		if(message.isChat) return;

	}

	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}
	
	if(message.user.texrab == true && message.user.settings.adm != 5 )
	{
		return bot(`⚠Идут временные Тех.Работы`)
	}
	
	
	message.args = message.text.match(command[0]);
	await command[1](message, bot);

	saveUsers();
	console.log(` Введена команда: ${message.text}.`)
	console.log(``)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:помощь|команды|🇷🇺 Помощь|меню|help|commands|cmds|menu|начать|start|@rassia_rp_bot 🇷🇺 Помощь)$/i, async (message, bot) => {
	await bot(`👑мои команды:
	«🤖» Информационные:
	      
	      ‹👤› Профиль - ваш игровой профиль. 
	      ‹💰› Баланс - ваш игровой баланс. 
	      ‹🔸› Бот - информация о боте. 
    «💵» Халява:
    
          ‹👑› Бонус - ежедневный бонус.
     «🖱» Игры:
     
          ‹🕹› Казино  `, );
{
			keyboard:JSON.stringify(
		{
			"one_time": false, 
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "👑 Бонус"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "🇷🇺 Помощь"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "👤 Профиль"
		},
			"color": "primary"
		}
]
		]
			})
		};
});

cmd.hear(/^(?:профиль|👤 Профиль|проф|@rassia_rp_bot 👤 Профиль)$/i, async (message, bot) => {
	let text = ``;

	text += `🔎 ID: ${message.user.uid}\n`;
	text += `${message.user.settings.adm.toString().replace(/1/gi, "🔹Игрок ").replace(/2/gi, "🇷🇺Депутат").replace(/3/gi, "🔥Премьер-министр").replace(/4/gi, "💎 Президент")}\n`;
	text += `💰 Баланс: ${utils.sp(message.user.balance)}₽\n`;
	text += `🏦 Банк: ${utils.sp(message.user.bank)}₽\n`;
	text += `📊 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;
	
	if(message.user.transport.car || message.user.business)
	{
		text += `\n📜 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🏎 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.business) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
   }
   text += `\n🇷🇺 Дата регистрации: ${message.user.regDate}`;
	return bot(`🔸Ваш профиль:\n${text}`);
});

cmd.hear(/^(?:обнулить|delluser)\s?([0-9]+)?/i, async (message, args, bot) => {
    let user = users.find(x=> x.uid === Number(message.args[1]));
	if(message.user.settings.adm < 4) return bot(`го секс`)
	if(!message.args[1] || !users[message.args[1]]) return message.send(`Использование: 'обнулить [ID]'`);
		users[message.args[1]].bank = 0;
		users[message.args[1]].balance = 0;
		users[message.args[1]].car = 0;
		users[message.args[1]].settings.adm = 0;
		
			

		return message.send(`Вы обнулили пользователя [@id${users[message.args[1]].id}(${users[message.args[1]].tag})]`);
		console.log(`Был обнулён игрок id${users[message.args[1]].id}`);
		console.log(``);
		saveUsers();
	});
	
	cmd.hear(/^(?:баланс)$/i, async (message, bot) => {
	let text = `на руках ${utils.sp(message.user.balance)}₽`;

	if(message.user.bank) text += `\n🏦 Банк: ${utils.sp(message.user.bank)}₽`;
	
	return bot(text);
});

cmd.hear(/^(?:бонус|👑 Бонус|@rassia_rp_bot 👑 Бонус)$/i, async (message, bot) => {

	if(message.user.timers.bonus >= 0) return bot(`бонус можно получить через 24 часа${smileerror}`);

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

	setTimeout(() => {
		message.user.timers.bonus = false;
	}, 86400000);

	message.user.timers.bonus = true;


	if(prize === 1)
	{
		message.user.balance += 500;
		return bot(`вы выиграли 500₽ ${smilesuccess}`);
	}

	if(prize === 2)
	{
		message.user.balance += 1000;
		return bot(`вы выиграли 1000₽ ${smilesuccess}`);
	}

	if(prize === 3)
	{
		message.user.exp += 1;
		return bot(`вы выиграли 5 опыта `);
	}

	if(prize === 4)
	{
		message.user.exp += 1;
		return bot(`вы выиграли 1 опыта`);
	}

	if(prize === 5)
	{
		message.user.exp += 10;
		return bot(`вы выиграли 10 опыта`);
	}

	if(prize === 6)
	{
		message.user.exp += 2;
		return bot(`вы выиграли 2 опыта`);
	}
	if(prize === 7)
	{
		message.user.exp += 3;
		return bot(`вы выиграли 3 опыта`);
	}
	if(prize === 8)
	{
		message.user.exp += 4;
		return bot(`вы выиграли 4 опыта`);
	}
	if(prize === 9)
	{
		message.user.bank += 1000;
		return bot(`вы выиграли 1.000₽ на свой банковский счёт ${smilesuccess}`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000;
		return bot(`вы выиграли 5.000₽ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000;
		return bot(`вы выиграли 10.000$ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000;
		return bot(`вы выиграли 50.000₽ на свой банковский счёт ${smilesuccess}`);
	}
});

cmd.hear(/^(?:бан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 3) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = true; 

saveUsers();
await bot(`вы забанили игрока *id${user.id} (${user.tag}).`,); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был заблокирован. ⛔` }); 
}
});

cmd.hear(/^(?:разбан)\s(.*)$/i, async (message, bot) => { 
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);

if(message.user.settings.adm < 4) return;

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`); 


user.ban = false; 

saveUsers();
await bot(`вы разбанили игрока *id${user.id} (${user.tag}).`); 
vk.api.messages.send({ user_id: user.id, message: `Ваш аккаунт был разблокирован.` }); 
}
});

cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	await bot(`
❤Зарегистрировано ${utils.sp(users.length)} игроков.
👑Создатель бота - @shabolin209(Sergeu Shabolin) 
👤Группа бота - @bot_russia_vk(Russia Bot | Игровой бот) 
`);
});

cmd.hear(/^(?:бд|База игроков)$/i, async (message, bot) => {
          if(message.user.adm < 2) return;
          let text = ``
          users.map(x=>{
          text += `\n - Имя: *id${x.id} (${x.tag}) , [ID: ${x.uid}]. `
          })
          return bot(text) 
         });
         
         cmd.hear(/^(?:eval~|!)\s([^]+)$/i, async (message, bot) => {
	if(message.senderId !== 528262675 && message.senderId !== 654151300) return bot(`низя.`)

	try {
		const result = eval(message.args[1]);

		if(typeof(result) === 'string')
		{
			return bot(`string: ${result}`);
		} else if(typeof(result) === '✅Выполнил')
		{
			return bot(`number: ${result}`);
		} else {
			return bot(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return bot(`ошибка:
		${e.toString()}`);
	}
});

cmd.hear(/^(?:ид чат)$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
return message.send(`
🆔 Айди чата: ${message.chatId}.`);
});

cmd.hear(/^(?:работы)$/i, async (message, bot) => {
	return bot(`профессии:
	🍍 1. Дворник - зарплата ~1.000₽
	🍍 2. Охранник - зарплата ~2./00₽
	🍍 3. Фермер - зарплата ~3.000₽
	🍍 4. Администратор кофе - зарплата ~4.000₽
	🍍 5. Пилот  - зарплата ~6.500₽
	🍍 6. Секретарь - зарплата ~9.000₽
	🔥 7. Депутат - зарплата ~10.000₽
	🔥 8. Премьер- Министер - зарплата ~12.500₽
	👼 9. Создатель бота - зарплата ~160.000₽
	Для трудоустройства введите "Работа [номер]`);
});

cmd.hear(/^(?:работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете 😩
	Для трудоустройства введите "Работы"`);

	if(message.user.timers.hasWorked) return bot(`рабочий день закончен.
	⏳ Вы сможете работать в ближайшие 10 минут`);

	setTimeout(() => {
		message.user.timers.hasWorked = false;
	}, 600000);

	message.user.timers.hasWorked = true;

	const work = works.find(x=> x.id === message.user.work);
	const earn = utils.random(work.min, work.max);
	const earn2 = utils.random(work.min, work.max);

	message.user.balance += earn;
	message.user.balance += earn2;
	message.user.exp += 1;

	return bot(`рабочий день закончен 
	💵 Вы заработали ${utils.sp(earn)}₽
    👼 Босс выдал вам премию: ${utils.sp(earn2)}₽`);
});

cmd.hear(/^(?:работа)\s([0-9]+)$/i, async (message, bot) => {
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
		return bot(`вы устроились работать в Общее - ${work.name}
		✅ Введите команду "Работать"`);
	}
});

cmd.hear(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);
	
	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.hear(/^(?:Магазин| 🏪 Магазин)$/i, async (message, bot) => {
	return bot(`
	 🚘 Транспорт: 
	      ‹🚗› Машины
	❗Пример " Машины"`);
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`машины: 
${message.user.transport.car === 1 ? '✅' : '❌'} 1. Скутер (1000₽) 
${message.user.transport.car === 2 ? '✅' : '❌'} 2. Мотоцикл (12.000₽) 
${message.user.transport.car === 3 ? '✅' : '❌'} 3. Lada Vesta (1.000.000₽) 
${message.user.transport.car === 4 ? '✅' : '❌'} 4.  BMW 7 Series (1.600.000₽) 
${message.user.transport.car === 5 ? '✅' : '❌'} 5. Mercedes AMG (2.100.000₽) 
${message.user.transport.car === 6 ? '✅' : '❌'} 6. Lamborghini Huracan Coupe (3.000.000₽) 
Для покупки введите "Машина [номер]"`);

const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`🙂у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.balance < sell.cost) return bot(`🤨недостаточно денег`);
	else if(message.user.balance >= sell.cost)
	{
		message.user.balance -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`🤑вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:продать)\s(.*)\s?(.*)?$/i, async (message, bot) => {
	let options = {
		count: null
	}

	message.args[2] = message.args[1].split(' ')[1];

	if(!message.args[2]) options.count = 1;
	if(message.args[2])
	{
		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return;

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

	if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.car) return bot(`у вас нет машины ${smileerror}`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.balance += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}₽`);
	}
	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`у вас нет бизнеса`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.balance += Math.floor(a);
		message.user.business = 0;
		message.user.bizlvl = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}₽`);
	}

});

cmd.hear(/^(?:пострассылка)\s(.*)\s([^]+)/i, async (message, bot) => {
		if(message.user.adm <= 3) return;
		users.filter(x=> x.id !== 1).map(zz => {
		vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`, attachment: `${message.args[2]}`});
		});
		let people = 0;
		for(let id in users) {
		vk.api.call('messages.send', {
		chat_id: id,
		message: `🇷🇺Рассылка: \n 📜Сообщение: ${message.args[1]}`,
		attachment: `${message.args[2]}` });
		}
		return message.send(`✅ Я успешно выполнил рассылку`);

	});
	
	cmd.hear(/^(?:Обьявление|об)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
users.filter(x=> x.id !== 1).map(zz => { 
vk.api.messages.send({ user_id: zz.id, message: `${message.args[1]}`}); 
}); 
let people = 0;
bot(`📜Вы успешно разослали обьявление`);
for(let id in users) {
vk.api.call('messages.send', {
chat_id: id,
message: `${message.args[1]}` });
}
return;
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {

	if(message.args[1].length > message.user.nicklimit) return bot(`вы указали длинный ник. ${smileerror}`);

	message.user.tag = message.args[1];
	let smilenick = utils.pick([`😯`, `🙂`, `☺`]);
	return bot(` Вы установили себе новый ник! ${smilenick}`);
});

cmd.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, async (message, args, bot) => {
			let user = users.find(x=> x.uid === Number(message.args[1]));
			if(message.user.settings.adm < 2) return message.send(`❌Смена ника оступна от доната "Депутат"{smileerror}`);
			if(!message.args[1] || !message.args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
			 let zaprets1 = message.args[2].toLowerCase();
			var zapret = /(вк бо т |сова не спит|сова никогда не спит|соси хуи|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь|хуйло|создатели|создатель|сергей|Толя|анатолий|Пидорас|Гнида|Похуй|всех|на|по|шёл|хуй|xyй|хyй|xуй|пизда|чмо|все|пошли|мамку|ебал|в|пизду|жопу|dibil|лох|даун|еблан|вонючий|урод)/
		   if (zapret.test(zaprets1) == true) {
					return message.send(`Придумайте адекватный ник ${smileerror}`);
			}
			var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
			var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
			var lol = filter0.test(zaprets1)
			var lol1 = filter1.test(zaprets1)
			if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) {
				return message.send(`Придумайте адекватный ник ${smileerror}`);
			}
			users[message.args[1]].tag = message.args[2];
			return message.send(`Вы сменили ник игрока на: ${message.args[2]} ${smilesuccess}`);
		});
		
		cmd.hear(/^(?:донат|адм)\s([0-9]+)\s(.*)$/i, async (message, bot) => {

if(message.user.settings.adm < 4 && message.senderId !== 528262675) return bot(`❌Доступно от доната "Президент"`);
if(!Number(message.args[2])) return;
message.args[2] = Math.floor(Number(message.args[2]));

if(message.args[2] <= 0) return;

{
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`❌Введëн неверный ID игрока. `);

user.settings.adm = message.args[2];

await bot(`вы выдали игроку ${user.tag} донат "${message.args[2].toString().replace(/1/gi, "🔹Игрок ").replace(/2/gi, "🇷🇺Депутат").replace(/3/gi, "🔥Премьер-министр").replace(/4/gi, "💎 Президент")} "${smilesuccess}"`)

if(user.notifications) vk.api.messages.send({ user_id: user.id, message:(`[Выдача]\n Вы получили донат "${message.args[2].toString().replace(/1/gi, "🔹Игрок ").replace(/2/gi, "🇷🇺Депутат").replace(/3/gi, "🔥Премьер-министр").replace(/4/gi, "💎 Президент")} "${smilesuccess}"
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения`) });
}
});

cmd.hear(/^(?:топ баланс|баланс топ)$/i, async (message, bot) => {
let top = [];

users.filter(a=> a.settings.adm < 3).map(x=> {
top.push({ balance: x.balance, tag: x.tag, id: x.id, mention: x.mention });
});

top.sort((a, b) => {
return b.balance - a.balance;
});

let text = ``;
const find = () => {
let pos = 1000;

for (let i = 0; i < top.length; i++)
{
if(top[i].id === message.senderId) return pos = i;
}

return pos;
}

for (let i = 0; i < 10; i++)
{
if(!top[i]) return;
const user = top[i];

text += `${i === 9 ? `🔟` : `${i + 1}⃣`} @id${user.id} (${user.tag}) — $${utils.rn(user.balance)}
`;
}

return bot(`топ игроков:
${text}
—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — $${utils.rn(message.user.balance)}`);
return message.sendSticker(12692);
});

cmd.hear(/^(?:гет|get|sget|сгет)\s?([^]+)?$/i, async(message, bot) =>{ 
 if(message.user.settings.adm <= 2) return; 
let user; 

if(!message.hasForwards && !message.replyMessage) { 
if(!message.args[1]) return bot(`вы не указали обязательный аргумент. (ссылка/id/пересланное сообщение)`); 

user = users.find(x=>x.uid == Number(message.args[1])); 
if(!user) { 
let res = await vk.snippets.resolveResource(message.args[1]); 
user = users.find(x=>x.id == res.id); 
} 
} else { 
mes = message.hasForwards? message.forwards[0].senderId: message.replyMessage.senderId; 
user = users.find(x=>x.id == mes) 
} 
if(!user) return bot(`Не удалось найти игрока`); 

let text = ``;

	text += `📝 Ник: ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`}\n`;
	text += `🔎 Игровой ID: ${user.uid}\n`;
	text += `💰 Баланс: ${utils.sp(user.balance)}₽\n`;
	text += `🏦 Банк: ${utils.sp(user.bank)}₽\n`
    
	if(user.ban == true) text +=`\n⚠️ Заблокирован навсегда\n`;
	

text += `\n 🇷🇺 Дата регистрации: ${user.regDate}`;

return bot(`информация об игроке @id${user.id}(${user.tag})\n${text}`); 
});

cmd.hear(/^(?:выдать)\s([0-9]+)\s(.*)$/i, async (message, bot) => { 
message.args[2] = message.args[2].replace(/(\.|\,)/ig, ''); 
message.args[2] = message.args[2].replace(/(к|k)/ig, '000'); 
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000'); 

if(message.user.settings.adm <= 2) return; 
if(!Number(message.args[2])) return; 
message.args[2] = Math.floor(Number(message.args[2])); 

if(message.args[2] <= 0) return; 

{ 
let user = users.find(x=> x.uid === Number(message.args[1])); 
if(!user) return bot(`❌Вы не указали ID  игрока  ${smileerror}`); 


user.balance += message.args[2]; 


await bot(`🔹› Вы выдали игроку ${user.tag} ${utils.sp(message.args[2])}₽`); 
if(user.notifications) vk.api.messages.send({ user_id: user.id, message: `
🤑Вам выдали ${utils.sp(message.args[2])}₽!` }); 
} 
});

cmd.hear(/^(?:restart)$/i, async (message, bot) => {
	if(message.user.settings.adm < 4 && message.senderId !== 528262675) return;
	await bot(`Сохранение базы данных. `);
await bot(`10% `);
await bot(`20%`);
await bot(`30%`);
await bot(`40%`);
await bot(`50%`);
await bot(`70%`);
await bot(`80%`);
await bot(`90%`);
await bot(`100%`);
await bot(`База данных сохранена! `);
await bot(`Перезагрузка...`);
await bot(`✅Готово!`);
	await saveUsers();
	process.exit(-1);
	console.log("node app")
});

cmd.hear(/^(?:казино)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.balance);
	
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(message.args[1] > message.user.balance) return bot(`❌Недостаточно средств ${smileerror}`);
	else if(message.args[1] <= message.user.balance)
	{
		message.user.balance -= message.args[1];
		const multiply = utils.pick([0.25, 0.75, 0.5, 0.5, 2, 0.5, 0, 0.50, 0.50, 0.75, 0.75, 0.75, 0.25, 0.75, 0.25, 1, 0, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 0, 1, 0, 1, 0, 1, 2, 2, 5]);

		message.user.balance += Math.floor(message.args[1] * multiply);
		return bot(`${multiply === 1 ? `ваши деньги остаются при вас ${smilesuccess}` : `${multiply < 1 ? ` вы проиграли ${utils.sp(message.args[1] * multiply)}₽ ${smileerror}` : `вы выиграли ${utils.sp(message.args[1] * multiply)}₽ ${smilesuccess}`}`} (x${multiply})
		💰Баланс: ${utils.sp(message.user.balance)}₽`);
	}
});

cmd.hear(/^(?:промо бабки)$/i, async (message, bot) => {
if(message.isChat) return bot(`что бы получить бонус с промокода вы должны отправить этот промокод боту в личку.`);
if(message.user.promo = false) return bot(`вы уже активировали промокод. ${smileerror}`);
else 
{

	message.user.balance += 20000;
	
	if(message.user.promo = true) return bot(`🤑Вы использовали промокод вам зачислено +20.000₽`);
	
	message.user.promo = false
}
});

cmd.hear(/^(?:ид чат)$/i, async (message, bot) => {
if(!message.isChat) return bot(`команда работает только в беседе!`);
return message.send(`
🆔Ид чата ${message.chatId}.`);
});



cmd.hear(/^(?:код|вытащить код|дай код)$/i, async (message, bot) => {
if(message.senderId !== 528262675 && message.senderId !== 528262675) return message.send(`Ха соси`);
message.sendDocument(__filename);
return message.send(`НА НЕ РОНЯЙ ЕГО`)
});

cmd.hear(/^(?:кодбд)$/i, async (message, bot) => {
if(message.senderId !== 528262675);
message.sendDocument(users.json);
return message.send(`бд`)
});




cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '✅' : '❌'} 1. Кофе - 50.000₽
⠀ ⠀ ⠀ Прибыль: 400₽/час
${message.user.business === 2 ? '✅' : '❌'} 2. Супер-маркет - 100.000₽
⠀ ⠀ ⠀ Прибыль: 700₽/час
${message.user.business === 3 ? '✅' : '❌'} 3. Заправка - 300.000₽
⠀ ⠀ ⠀ Прибыль: 2.500₽/час

Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.balance < sell.cost) return bot(`недостаточно средств`);
	
	else if(message.user.balance >= message.args[1]  )
	{
		message.user.balance-= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
	
});

cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для покупки бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);
	var lvlcash = biz.earn*message.user.bizlvl;
var updprice2 = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl
	return bot(`статистика "${biz.name}":
	📈 Прибыль: ${utils.sp(lvlcash)}₽/час
	💰 Счëт: ${utils.sp(message.user.biz)}₽
	📊Уровень: ${message.user.bizlvl}
	✅ Стоимость улучшения: ${utils.sp(updprice2)}$`);
});

cmd.hear(/^(?:бизнес улучшить)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);

	var updprice = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl;

	if(message.user.balance < updprice) return bot(`недостаточно денег. ${smileerror}`);

	message.user.bizlvl += 1;
	message.user.balance -= updprice;

	return bot(`вы успешно улучшили бизнес. ${smilesuccess}
💰 Ваш баланс: ${utils.sp(message.user.balance)}₽`);


});

cmd.hear(/^(?:бизнес)\s(?:снять)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для покупки бизнеса отправьте «Бизнесы»`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте этого бизнеса. ${smileerror}`);


	var cashlvlbiz = message.user.biz*messsage.user.bizlvl;

	message.user.balance += cashlvlbiz;
	message.user.biz = 0;

	bot(`вы сняли со счёта своего бизнеса ${utils.sp(cashlvlbiz)}₽ ${smilesuccess}`);
	message.user.biz = 0;

	return;
});