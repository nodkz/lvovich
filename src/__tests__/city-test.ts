/* eslint-disable no-use-before-define, no-continue, arrow-parens */

import { cityIn, cityFrom, cityTo } from '../city';
import { cityRules } from '../rules/cityRules';
import { findRule } from '../inclineRules';
import { ANDROGYNOUS } from '../gender';

describe('lvovich/city', () => {
  describe('cityIn() cityFrom(), cityTo()', () => {
    function expect3fn(str: string) {
      const lines = str
        .split(/\n|\r/g)
        .map((s) => s.trim())
        .map((s) => s.replace(/#.*|\/\/.*/, ''))
        .filter((s) => !!s);
      lines.forEach((line) => {
        const [arg, res1, res2, res3] = line.split(',').map((s) => s.trim());

        const generated = `${arg}, ${cityIn(arg)}, ${cityFrom(arg)}, ${cityTo(arg)}`;
        const fromTest = `${arg}, ${res1}, ${res2}, ${res3}`;
        if (generated !== fromTest) {
          console.error(
            'Format HINT: [city|именит, cityIn|предлож, cityFrom|родит, cityTo|направительный]\n' +
              `Generated:    ${arg}, в ${cityIn(arg)}, из ${cityFrom(arg)}, to ${cityTo(arg)}\n` +
              `In test file: ${arg}, в ${res1}, из ${res2}, to ${res3}`
          );
          const cityRule = findRule(arg, ANDROGYNOUS, cityRules);
          if (cityRule) {
            console.error(
              `Was used rule from cityRules.js: ${JSON.stringify(cityRule)}` +
                '\nYou need to review this rule firstly!'
            );
          }
        }
        expect(generated).toMatch(fromTest);
      });
    }

    function expect3fnFromDemo(str: string) {
      if (!str) return;
      const s = str.replace(/(, в)|(, из)|(, to)/gi, ', ');
      expect3fn(s);
    }

    it('correct declension for KZ cities', () => {
      expect3fn(
        `
        Абай, Абае, Абая, Абай
        Акколь, Акколе, Акколя, Акколь
        Аксай, Аксае, Аксая, Аксай
        Аксу, Аксу, Аксу, Аксу
        Актау, Актау, Актау, Актау
        Актобе, Актобе, Актобе, Актобе
        Алга, Алге, Алги, Алгу
        Алматы, Алматы, Алматы, Алматы
        Аральск, Аральске, Аральска, Аральск
        Аркалык, Аркалыке, Аркалыка, Аркалык
        Арысь, Арысе, Арыся, Арысь
        Астана, Астане, Астаны, Астану
        Нур-Султан, Нур-Султане, Нур-Султана, Нур-Султан
        Атбасар, Атбасаре, Атбасара, Атбасар
        Атырау, Атырау, Атырау, Атырау
        Аягоз, Аягозе, Аягоза, Аягоз
        Байконыр, Байконыре, Байконыра, Байконыр
        Балхаш, Балхаше, Балхаша, Балхаш
        Булаево, Булаево, Булаево, Булаево
        Державинск, Державинске, Державинска, Державинск
        Ерейментау, Ерейментау, Ерейментау, Ерейментау
        Есик, Есике, Есика, Есик
        Есиль, Есиле, Есиля, Есиль
        Жанаозен, Жанаозене, Жанаозена, Жанаозен
        Жанатас, Жанатасе, Жанатаса, Жанатас
        Жаркент, Жаркенте, Жаркента, Жаркент
        Жезказган, Жезказгане, Жезказгана, Жезказган
        Жем, Жеме, Жема, Жем
        Жетысай, Жетысае, Жетысая, Жетысай
        Житикара, Житикаре, Житикары, Житикару
        Зайсан, Зайсане, Зайсана, Зайсан
        Зыряновск, Зыряновске, Зыряновска, Зыряновск
        Казалинск, Казалинске, Казалинска, Казалинск
        Кандыагаш, Кандыагаше, Кандыагаша, Кандыагаш
        Капчагай, Капчагае, Капчагая, Капчагай
        Караганда, Караганде, Караганды, Караганду
        Каражал, Каражале, Каражала, Каражал
        Карасу, Карасу, Карасу, Карасу
        Каратау, Каратау, Каратау, Каратау
        Каркаралинск, Каркаралинске, Каркаралинска, Каркаралинск
        Каскелен, Каскелене, Каскелена, Каскелен
        Кентау, Кентау, Кентау, Кентау
        Кокшетау, Кокшетау, Кокшетау, Кокшетау
        Костанай, Костанае, Костаная, Костанай
        Кронштадт, Кронштадте, Кронштадта, Кронштадт
        Кульсары, Кульсарах, Кульсар, Кульсары
        Курчатов, Курчатове, Курчатова, Курчатов
        Кызылорда, Кызылорде, Кызылорды, Кызылорду
        Ленгер, Ленгере, Ленгера, Ленгер
        Лисаковск, Лисаковске, Лисаковска, Лисаковск
        Макинск, Макинске, Макинска, Макинск
        Мамлютка, Мамлютке, Мамлютки, Мамлютку
        Павлодар, Павлодаре, Павлодара, Павлодар
        Петропавловск, Петропавловске, Петропавловска, Петропавловск
        Приозёрск, Приозёрске, Приозёрска, Приозёрск
        Риддер, Риддере, Риддера, Риддер
        Рудный, Рудном, Рудного, Рудный
        Сарань, Сарани, Сарани, Сарань
        Сарканд, Сарканде, Сарканда, Сарканд
        Сарыагаш, Сарыагаше, Сарыагаша, Сарыагаш
        Сатпаев, Сатпаеве, Сатпаева, Сатпаев
        Семей, Семее, Семея, Семей
        Сергеевка, Сергеевке, Сергеевки, Сергеевку
        Серебрянск, Серебрянске, Серебрянска, Серебрянск
        Степногорск, Степногорске, Степногорска, Степногорск
        Степняк, Степняке, Степняка, Степняк
        Тайынша, Тайынше, Тайынши, Тайыншу
        Талгар, Талгаре, Талгара, Талгар
        Талдыкорган, Талдыкоргане, Талдыкоргана, Талдыкорган
        Тараз, Таразе, Тараза, Тараз
        Текели, Текели, Текели, Текели
        Темир, Темире, Темира, Темир
        Темиртау, Темиртау, Темиртау, Темиртау
        Туркестан, Туркестане, Туркестана, Туркестан
        Уральск, Уральске, Уральска, Уральск
        Ушарал, Ушарале, Ушарала, Ушарал
        Уштобе, Уштобе, Уштобе, Уштобе
        Хромтау, Хромтау, Хромтау, Хромтау
        Шардара, Шардаре, Шардары, Шардару
        Шалкар, Шалкаре, Шалкара, Шалкар
        Шар, Шаре, Шара, Шар
        Шахтинск, Шахтинске, Шахтинска, Шахтинск
        Шемонаиха, Шемонаихе, Шемонаихи, Шемонаиху
        Шу, Шу, Шу, Шу
        Шымкент, Шымкенте, Шымкента, Шымкент
        Щучинск, Щучинске, Щучинска, Щучинск
        Экибастуз, Экибастузе, Экибастуза, Экибастуз
        Эмба, Эмбе, Эмбы, Эмбу
        Усть-Каменогорск, Усть-Каменогорске, Усть-Каменогорска, Усть-Каменогорск
        Форт-Шевченко, Форт-Шевченко, Форт-Шевченко, Форт-Шевченко
        село Чемолган, селе Чемолган, села Чемолган, село Чемолган
        вахтовый поселок Тенгиз, вахтовом поселке Тенгиз, вахтового поселка Тенгиз, вахтовый поселок Тенгиз,
      `
      );
      // city, cityIn, cityFrom, cityTo
    });

    it('correct declension for RU cities', () => {
      expect3fn(
        `
        Москва, Москве, Москвы, Москву
        Новосибирск, Новосибирске, Новосибирска, Новосибирск
        Екатеринбург, Екатеринбурге, Екатеринбурга, Екатеринбург
        Казань, Казани, Казани, Казань
        Челябинск, Челябинске, Челябинска, Челябинск
        Омск, Омске, Омска, Омск
        Самара, Самаре, Самары, Самару
        Уфа, Уфе, Уфы, Уфу
        Красноярск, Красноярске, Красноярска, Красноярск
        Воронеж, Воронеже, Воронежа, Воронеж
        Волгоград, Волгограде, Волгограда, Волгоград
        Краснодар, Краснодаре, Краснодара, Краснодар
        Саратов, Саратове, Саратова, Саратов
        Тольятти, Тольятти, Тольятти, Тольятти
        Ижевск, Ижевске, Ижевска, Ижевск
        Барнаул, Барнауле, Барнаула, Барнаул
        Иркутск, Иркутске, Иркутска, Иркутск
        Ульяновск, Ульяновске, Ульяновска, Ульяновск
        Хабаровск, Хабаровске, Хабаровска, Хабаровск
        Владивосток, Владивостоке, Владивостока, Владивосток
        Махачкала, Махачкале, Махачкалы, Махачкалу
        Томск, Томске, Томска, Томск
        Оренбург, Оренбурге, Оренбурга, Оренбург
        Кемерово, Кемерово, Кемерово, Кемерово
        Новокузнецк, Новокузнецке, Новокузнецка, Новокузнецк
        Рязань, Рязани, Рязани, Рязань
        Астрахань, Астрахани, Астрахани, Астрахань
        Пенза, Пензе, Пензы, Пензу
        Липецк, Липецке, Липецка, Липецк
        Киров, Кирове, Кирова, Киров
        Чебоксары, Чебоксарах, Чебоксар, Чебоксары
        Тула, Туле, Тулы, Тулу
        Калининград, Калининграде, Калининграда, Калининград
        Курск, Курске, Курска, Курск
        Улан-Удэ, Улан-Удэ, Улан-Удэ, Улан-Удэ
        Балашиха, Балашихе, Балашихи, Балашиху
        Тверь, Твери, Твери, Тверь
        Магнитогорск, Магнитогорске, Магнитогорска, Магнитогорск
        Иваново, Иваново, Иваново, Иваново
        Брянск, Брянске, Брянска, Брянск
        Сочи, Сочи, Сочи, Сочи
        Белгород, Белгороде, Белгорода, Белгород
        Владимир, Владимире, Владимира, Владимир
        Архангельск, Архангельске, Архангельска, Архангельск
        Сургут, Сургуте, Сургута, Сургут
        Чита, Чите, Читы, Читу
        Калуга, Калуге, Калуги, Калугу
        Смоленск, Смоленске, Смоленска, Смоленск
        Курган, Кургане, Кургана, Курган
        Вологда, Вологде, Вологды, Вологду
        Саранск, Саранске, Саранска, Саранск
        Владикавказ, Владикавказе, Владикавказа, Владикавказ
        Якутск, Якутске, Якутска, Якутск
        Мурманск, Мурманске, Мурманска, Мурманск
        Подольск, Подольске, Подольска, Подольск
        Тамбов, Тамбове, Тамбова, Тамбов
        Грозный, Грозном, Грозного, Грозный
        Стерлитамак, Стерлитамаке, Стерлитамака, Стерлитамак
        Петрозаводск, Петрозаводске, Петрозаводска, Петрозаводск
        Кострома, Костроме, Костромы, Кострому
        Нижневартовск, Нижневартовске, Нижневартовска, Нижневартовск
        Новороссийск, Новороссийске, Новороссийска, Новороссийск
        Йошкар-Ола, Йошкар-Оле, Йошкар-Олы, Йошкар-Олу
        Таганрог, Таганроге, Таганрога, Таганрог
        Сыктывкар, Сыктывкаре, Сыктывкара, Сыктывкар
        Нальчик, Нальчике, Нальчика, Нальчик
        Шахты, Шахты, Шахты, Шахты
        Нижнекамск, Нижнекамске, Нижнекамска, Нижнекамск
        Братск, Братске, Братска, Братск
        Дзержинск, Дзержинске, Дзержинска, Дзержинск
        Орск, Орске, Орска, Орск
        Ангарск, Ангарске, Ангарска, Ангарск
        Благовещенск, Благовещенске, Благовещенска, Благовещенск
        Псков, Пскове, Пскова, Псков
        Бийск, Бийске, Бийска, Бийск
        Прокопьевск, Прокопьевске, Прокопьевска, Прокопьевск
        Южно-Сахалинск, Южно-Сахалинске, Южно-Сахалинска, Южно-Сахалинск
        Балаково, Балаково, Балаково, Балаково
        Рыбинск, Рыбинске, Рыбинска, Рыбинск
        Армавир, Армавире, Армавира, Армавир
        Люберцы, Люберцах, Люберц, Люберцы
        Северодвинск, Северодвинске, Северодвинска, Северодвинск
        Абакан, Абакане, Абакана, Абакан
        Норильск, Норильске, Норильска, Норильск
        Сызрань, Сызрани, Сызрани, Сызрань
        Волгодонск, Волгодонске, Волгодонска, Волгодонск
        Новочеркасск, Новочеркасске, Новочеркасска, Новочеркасск
        Златоуст, Златоусте, Златоуста, Златоуст
        Уссурийск, Уссурийске, Уссурийска, Уссурийск
        Электросталь, Электростале, Электросталя, Электросталь
        Салават, Салавате, Салавата, Салават
        Находка, Находке, Находки, Находку
        Альметьевск, Альметьевске, Альметьевска, Альметьевск
        Рубцовск, Рубцовске, Рубцовска, Рубцовск
        Копейск, Копейске, Копейска, Копейск
        Пятигорск, Пятигорске, Пятигорска, Пятигорск
        Красногорск, Красногорске, Красногорска, Красногорск
        Майкоп, Майкопе, Майкопа, Майкоп
        Коломна, Коломне, Коломны, Коломну
        Одинцово, Одинцово, Одинцово, Одинцово
        Ковров, Коврове, Коврова, Ковров
        Хасавюрт, Хасавюрте, Хасавюрта, Хасавюрт
        Кисловодск, Кисловодске, Кисловодска, Кисловодск
        Серпухов, Серпухове, Серпухова, Серпухов
        Новомосковск, Новомосковске, Новомосковска, Новомосковск
        Нефтекамск, Нефтекамске, Нефтекамска, Нефтекамск
        Новочебоксарск, Новочебоксарске, Новочебоксарска, Новочебоксарск
        Нефтеюганск, Нефтеюганске, Нефтеюганска, Нефтеюганск
        Первоуральск, Первоуральске, Первоуральска, Первоуральск
        Щёлково, Щёлково, Щёлково, Щёлково
        Дербент, Дербенте, Дербента, Дербент
        Черкесск, Черкесске, Черкесска, Черкесск
        Батайск, Батайске, Батайска, Батайск
        Орехово-Зуево, Орехово-Зуево, Орехово-Зуево, Орехово-Зуево
        Невинномысск, Невинномысске, Невинномысска, Невинномысск
        Домодедово, Домодедово, Домодедово, Домодедово
        Димитровград, Димитровграде, Димитровграда, Димитровград
        Кызыл, Кызыле, Кызыла, Кызыл
        Назрань, Назрани, Назрани, Назрань
        Камышин, Камышине, Камышина, Камышин
        Обнинск, Обнинске, Обнинска, Обнинск
        Каспийск, Каспийске, Каспийска, Каспийск
        Муром, Муроме, Мурома, Муром
        Новошахтинск, Новошахтинске, Новошахтинска, Новошахтинск
        Северск, Северске, Северска, Северск
        Пушкино, Пушкино, Пушкино, Пушкино
        Ноябрьск, Ноябрьске, Ноябрьска, Ноябрьск
        Евпатория, Евпатории, Евпатории, Евпаторию
        Ачинск, Ачинске, Ачинска, Ачинск
        Арзамас, Арзамасе, Арзамаса, Арзамас
        Элиста, Элисте, Элисты, Элисту
        Новокуйбышевск, Новокуйбышевске, Новокуйбышевска, Новокуйбышевск
        Бердск, Бердске, Бердска, Бердск
        Ногинск, Ногинске, Ногинска, Ногинск
        Долгопрудный, Долгопрудном, Долгопрудного, Долгопрудный
        Реутов, Реутове, Реутова, Реутов
        Пермь, Перми, Перми, Пермь
        Тюмень, Тюмени, Тюмени, Тюмень
        Керчь, Керчи, Керчи, Керчь
        Ярославль, Ярославле, Ярославля, Ярославль
        Ставрополь, Ставрополе, Ставрополя, Ставрополь
        Севастополь, Севастополе, Севастополя, Севастополь
        Симферополь, Симферополе, Симферополя, Симферополь
        Королёв, Королёве, Королёва, Королёв
        Артём, Артёме, Артёма, Артём
        Орёл, Орле, Орла, Орёл
        Елец, Елеце, Елеца, Елец
        Череповец, Череповеце, Череповеца, Череповец
        Миасс, Миассе, Миасса, Миасс
        Энгельс, Энгельсе, Энгельса, Энгельс
        Химки, Химках, Химков, Химки
        Березники, Березниках, Березников, Березники
        Ессентуки, Ессентуках, Ессентуков, Ессентуки
        Мытищи, Мытищах, Мытищ, Мытищи
        Нижний Новгород, Нижнем Новгороде, Нижнего Новгорода, Нижний Новгород
        Нижний Тагил, Нижнем Тагиле, Нижнего Тагила, Нижний Тагил
        Великий Новгород, Великом Новгороде, Великого Новгорода, Великий Новгород
        Новый Уренгой, Новом Уренгое, Нового Уренгоя, Новый Уренгой
        Санкт-Петербург, Санкт-Петербурге, Санкт-Петербурга, Санкт-Петербург
        Ростов-на-Дону, Ростове-на-Дону, Ростова-на-Дону, Ростов-на-Дону
        Комсомольск-на-Амуре, Комсомольске-на-Амуре, Комсомольска-на-Амуре, Комсомольск-на-Амуре
        Старый Оскол, Старом Осколе, Старого Оскола, Старый Оскол
        Волжский, Волжском, Волжского, Волжский
        Октябрьский, Октябрьском, Октябрьского, Октябрьский
        Жуковский, Жуковском, Жуковского, Жуковский
        Раменское, Раменском, Раменского, Раменское
        Рижская, Рижской, Рижской, Рижскую
        Рижский, Рижском, Рижского, Рижский
        Сергиев Посад, Сергиевом Посаде, Сергиева Посада, Сергиев Посад
        Каменск-Уральский, Каменске-Уральском, Каменска-Уральского, Каменск-Уральский
        Петропавловск-Камчатский, Петропавловске-Камчатском, Петропавловска-Камчатского, Петропавловск-Камчатский
        Набережные Челны, Набережных Челнах, Набережных Челнов, Набережные Челны
        Вышний Волочёк, Вышнем Волочке, Вышнего Волочка, Вышний Волочёк
        Чик, Чике, Чика, Чик
        Хлевище, Хлевище, Хлевища, Хлевище
        Щучье, Щучье, Щучья, Щучье
        Холмечь, Холмечи, Холмечи, Холмечь
        Чепеничи, Чепеничах, Чепеничей, Чепеничи
        Ропша, Ропше, Ропши, Ропшу
        Крым, Крыму, Крыма, Крым
      `
      );
    });

    it('correct declension for other cities', () => {
      expect3fn(
        `
        Тбилиси, Тбилиси, Тбилиси, Тбилиси
        Утрехт, Утрехте, Утрехта, Утрехт
        Апелдорн, Апелдорне, Апелдорна, Апелдорн
        Ситтард-Гелен, Ситтард-Гелене, Ситтард-Гелена, Ситтард-Гелен
        Хельсинки, Хельсинки, Хельсинки, Хельсинки
      `
      );
    });

    it('correct declension from demo https://codesandbox.io/s/nr8k2241wj', () => {
      expect3fnFromDemo(`
        красный боец, в красном боеце, из красного боеца, to красный боец
        Ропша, в Ропше, из Ропши, to Ропшу
        стрый, в стром, из строго, to стрый
        Актау, в Актау, из Актау, to Актау
        Барнаул, в Барнауле, из Барнаула, to Барнаул
        Бель, в Беле, из Беля, to Бель
        Боровичи, в Боровичах, из Боровичей, to Боровичи
        великие луки, в великих луках, из великих луков, to великие луки
        Владимир, в Владимире, из Владимира, to Владимир
        Екатеринбург, в Екатеринбурге, из Екатеринбурга, to Екатеринбург
        Калязин, в Калязине, из Калязина, to Калязин
        Комсомольск-на-Амуре, в Комсомольске-на-Амуре, из Комсомольска-на-Амуре, to Комсомольск-на-Амуре
        Красноармейск, в Красноармейске, из Красноармейска, to Красноармейск
        Краснодар, в Краснодаре, из Краснодара, to Краснодар
        Краснощеково, в Краснощеково, из Краснощеково, to Краснощеково
        Красный Боец, в Красном Боеце, из Красного Боеца, to Красный Боец
        Красный май, в Красном мае, из Красного мая, to Красный май
        Красный Яр, в Красном Яре, из Красного Яра, to Красный Яр
        николаевск-на-амуре, в николаевске-на-амуре, из николаевска-на-амуре, to николаевск-на-амуре
        новосиб, в новосибе, из новосиба, to новосиб
        Обухов, в Обухове, из Обухова, to Обухов
        Оскемен, в Оскемене, из Оскемена, to Оскемен
        Павел, в Павле, из Павла, to Павел
        Пески-Речицкие, в Песках-Речицких, из Песков-Речицких, to Пески-Речицкие
        питер, в питере, из питера, to питер
        Порча, в Порче, из Порчи, to Порчу
        пушкино, в пушкино, из пушкино, to пушкино
        Саша, в Саше, из Саши, to Сашу
        Симферополь, в Симферополе, из Симферополя, to Симферополь
        Тюрли, в Тюрли, из Тюрли, to Тюрли
        Усть-Камменогорск, в Усть-Камменогорске, из Усть-Камменогорска, to Усть-Камменогорск
        уфа, в уфе, из уфы, to уфу
        Удомля, в Удомле, из Удомли, to Удомлю
        тарасовка, в тарасовке, из тарасовки, to тарасовку
        Бельтны, в Бельтнах, из Бельтнов, to Бельтны
        Великие Кочаны, в Великих Кочанах, из Великих Кочанов, to Великие Кочаны
        Вышний Волочек, в Вышнем Волочке, из Вышнего Волочка, to Вышний Волочек
        Гавнарь, в Гавнари, из Гавнари, to Гавнарь
        шереметьево, в шереметьево, из шереметьево, to шереметьево
        Душанбе, в Душанбе, из Душанбе, to Душанбе
        Екат, в Екате, из Еката, to Екат
        Иванов, в Иванове, из Иванова, to Иванов
        Казахстане, в Казахстане, из Казахстане, to Казахстане
        Каменский, в Каменском, из Каменского, to Каменский
        Кемерово, в Кемерово, из Кемерово, to Кемерово
        Красный, в Красном, из Красного, to Красный
        Москва, в Москве, из Москвы, to Москву
        Коломинск, в Коломинске, из Коломинска, to Коломинск
        Ново-Ебенёва, в Ново-Ебенёве, из Ново-Ебенёвы, to Ново-Ебенёву
        Питер, в Питере, из Питера, to Питер
        Освенцим, в Освенциме, из Освенцима, to Освенцим
        Санкт-Петербург, в Санкт-Петербурге, из Санкт-Петербурга, to Санкт-Петербург
        Саратов, в Саратове, из Саратова, to Саратов
        тбилиси, в тбилиси, из тбилиси, to тбилиси
        Жордрехт, в Жордрехте, из Жордрехта, to Жордрехт
        Дордрехт, в Дордрехте, из Дордрехта, to Дордрехт
        Ситтард-Гелен, в Ситтард-Гелене, из Ситтард-Гелена, to Ситтард-Гелен
        Хельсинки, в Хельсинки, из Хельсинки, to Хельсинки
        Утрехт, в Утрехте, из Утрехта, to Утрехт
        Апелдорн, в Апелдорне, из Апелдорна, to Апелдорн
        Шушары, в Шушарах, из Шушар, to Шушары
        Камень-на-оби, в Камне-на-оби, из Камня-на-оби, to Камень-на-оби
        чебоксары, в чебоксарах, из чебоксар, to чебоксары
        Бельцы, в Бельцах, из Бельц, to Бельцы
        Киев, в Киеве, из Киева, to Киев
        Кёльн, в Кёльне, из Кёльна, to Кёльн
        минеральные воды, в минеральных водах, из минеральных вод, to минеральные воды
        Урочище зеленая роща, в Урочище зеленая роща, из Урочища зеленая роща, to Урочище зеленая роща
        верхние киги, в верхних кигах, из верхних киг, to верхние киги
        норильский никель, в норильском никеле, из норильского никеля, to норильский никель
        Гленц, в Гленце, из Гленца, to Гленц
        Гримм, в Гримме, из Гримма, to Гримм
        Гузерипль, в Гузерипле, из Гузерипля, to Гузерипль
        Углич, в Угличе, из Углича, to Углич
        Черновцы, в Черновцах, из Черновцов, to Черновцы
      `);
    });

    it('correct declension for some place words', () => {
      expect3fnFromDemo(
        `
        область, в области, из области, to область
        регион, в регионе, из региона, to регион
        станица, в станице, из станицы, to станицу
        станиция, в станиции, из станиции, to станицию
        аул, в ауле, из аула, to аул
        село, в селе, из села, to село
        поселок, в поселке, из поселка, to поселок
        город, в городе, из города, to город
        деревня, в деревне, из деревни, to деревню
        урочище, в урочище, из урочища, to урочище
        река, в реке, из реки, to реку
        озеро, в озере, из озера, to озеро
        море, в море, из моря, to море
        гора, в горе, из горы, to гору
        холм, в холме, из холма, to холм
        место, в месте, из места, to место
        дорога, в дороге, из дороги, to дорогу
        пирс, в пирсе, из пирса, to пирс
        порт, в порте, из порта, to порт
        лодка, в лодке, из лодки, to лодку
      `
      );
    });
  });
});