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
			tag: user_info.first_name,
			mention: true, 
			nicklimit: 15,
			exp: 1,
			level: 1,
			regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
			timers: {
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
          ‹👑› Бонус - ежедневный бонус. `, );
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
	text += `💰 Баланс: ${utils.sp(message.user.balance)}₽\n`;
	text += `🏦 Банк: ${utils.sp(message.user.bank)}₽\n`;
	text += `📊 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;
	
	if(message.user.transport.car)
	{
		text += `\n📜 Имущество:\n`;

		if(message.user.transport.car) text += `⠀🏎 Машина: ${cars[message.user.transport.car - 1].name}\n`;
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

	if(message.user.timers.bonus) return bot(`бонус можно получить раз в 24 часа ${smileerror}`);

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
		return bot(`вы выиграли 1.000$ на свой банковский счёт ${smilesuccess}`);
	}
	if(prize === 10)
	{
		message.user.bank += 5000;
		return bot(`вы выиграли 5.000$ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 11)
	{
		message.user.bank += 10000;
		return bot(`вы выиграли 10.000$ на свой банковский счёт ${smilesuccess}`);
	}

	if(prize === 12)
	{
		message.user.bank += 50000;
		return bot(`вы выиграли 50.000$ на свой банковский счёт ${smilesuccess}`);
	}
});

cmd.hear(/^(?:бот)$/i, async (message, bot) => {
	await bot(`
❤Зарегистрировано ${utils.sp(users.length)} игроков.
👑Создатель бота - @shabolin209(Sergeu Shabolin) 
👤Группа бота - @rassia_rp_bot(Rassia RP | от бомжа до миллионера) 
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
});
