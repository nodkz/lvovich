# Lvovich (Львович) - JS library to inflect people names, cities names in Russian

[![npm](https://img.shields.io/npm/v/lvovich.svg)](https://www.npmjs.com/package/lvovich)
[![codecov coverage](https://img.shields.io/codecov/c/github/nodkz/lvovich.svg)](https://codecov.io/github/nodkz/lvovich)
[![Travis](https://img.shields.io/travis/nodkz/lvovich.svg?maxAge=2592000)](https://travis-ci.org/nodkz/lvovich)
[![npmtrends](https://img.shields.io/npm/dt/lvovich.svg)](http://www.npmtrends.com/lvovich)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![TypeScript compatible](https://img.shields.io/badge/typescript-compatible-brightgreen.svg)
![FlowType compatible](https://img.shields.io/badge/flowtype-compatible-brightgreen.svg)

Этот пакет для:

- склонения названий городов (работает для большинства составных названий: Санкт-Петербург, Ростов-на-Дону и пр.)
- определения пола по имени фамилии и отчеству
- склонения падежей русских имен, фамилий и отчеств

Может использоваться как в браузере, так и на сервере. Нет никаких зависимостей и работает в оффлайне. Самое то:

- для генерации красивых писем с [mjml](https://github.com/mjmlio/mjml)
- для генерации PDF c [@react-pdf](https://github.com/diegomura/react-pdf)
- для генерации SEO-заголовков c [головой на плечах](https://comic.browserling.com/seo-expert-ru.png)
- чтоб по максимуму избавиться от **Уважаемый(-ая)**, когда есть ФИО но нет пола

**Минифицированный размер пакета 20KB, gzipped 6KB.** Бедные, бедные иностранцы - им надо загрузить в голову 20 килобайт правил и уметь быстро ими пользоваться в разговорной речи. Ужос!

PS. Если вдруг вы ищете список всех городов и сел с гео-координатами [России](https://maps.vlasenko.net/russia/ru-list.csv), [Белоруси](https://maps.vlasenko.net/belarus/by-list.csv) и [Украины](https://maps.vlasenko.net/ukraine/ua-list.csv) - их можно найти в формате csv на сайте [https://maps.vlasenko.net/](https://maps.vlasenko.net/).

## [Live Demo](https://codesandbox.io/s/nr8k2241wj)

[<img width="250" alt="Live Demo" src="https://user-images.githubusercontent.com/1946920/46339651-32b45900-c655-11e8-8f34-8c204caefad2.png">](https://codesandbox.io/s/nr8k2241wj)

## Cклонение названий городов

```js
import { cityIn, cityFrom, cityTo } from 'lvovich';
```

### `cityIn(name: string, gender?: GenderStrT): string` - в каком городе живете/находитесь? (предложный падеж)

```js
  cityIn('Санкт-Петербург'); // вернет `Санкт-Петербурге`
```

### `cityFrom(name: string, gender?: GenderStrT): string` - из какого города приехали? (родительный падеж)

```js
  cityFrom('Санкт-Петербург'); // вернет `Санкт-Петербурга`
```

### `cityTo(name: string): string` - в какой город направляетесь? (направительный или посылательный падеж :)

```js
  cityTo('Санкт-Петербург'); // вернет `Санкт-Петербург`
  cityTo('Москва'); // вернет `Москву`
```

## Определения пола по имени фамилии и отчеству

```js
import { getGender, getFirstnameGender, getLastnameGender, getMiddlenameGender } from 'lvovich';
```

Методы определения пола возвращают тип `GenderStrT`:

- `male` - мужской,
- `female` - женский,
- `androgynous` - может быть и мальчиком и девочкой
- `null` - не удалось определить пол

### `getGender(fio: FioT): ?GenderStrT` - передаете ФИО, получаете пол

Входящий аргумент `fio` являеется объектов со следующими необязательными полями:

```js
type FioT = {
  first?: ?string,
  last?: ?string,
  middle?: ?string,
}
```

```js
  getGender({ last: 'Друзь', first: 'Саша', middle: 'Петрович' }); // вернет `male`
  getGender({ first: 'Саша' }); // вернет `androgynous`, т.к. может быть мальчик или девочка
  getGender({ first: 'Саша', middle: 'Петровна'  }); // вернет `female`
  getGender({ last: 'Абуова', first: 'Андрей' }); // вернет `null`, ну нафиг гадать т.к. вроде фамилия женская и имя мужское.
```

### `getFirstnameGender(str: string): ?GenderStrT` - вернет пол для Имени

```js
  getFirstnameGender('Павел'); // вернет `male`
  getFirstnameGender('Анна'); // вернет `female`
  getFirstnameGender('Саша'); // вернет `androgynous`
  getFirstnameGender('аааа'); // вернет `null`
```

### `getLastnameGender(str: string): ?GenderStrT` - вернет пол для Фамилии

```js
  getLastnameGender('Градский'); // вернет `male`
  getLastnameGender('Таптыгина'); // вернет `female`
  getLastnameGender('Борейко'); // вернет `androgynous`
  getLastnameGender('аааа'); // вернет `null`
```

### `getMiddlenameGender(str: string): ?GenderStrT` - вернет пол для Отчества

```js
  getMiddlenameGender('Павлович'); // вернет `male`
  getMiddlenameGender('Петрова'); // вернет `female`
  getMiddlenameGender('иваново'); // вернет `null`
  getMiddlenameGender('аааа'); // вернет `null`
```

## Cклонения падежей русских имен, фамилий и отчеств

```js
import { incline, inclineFirstname, inclineLastname, inclineMiddlename } from 'lvovich';
```

Падежи (тип `DeclentionStrT`):

- `nominative` - именительный (кто? что?)
- `genitive` - родительный (кого? чего?)
- `dative` - дательный (кому? чему?)
- `accusative` - винительный (кого? что?)
- `instrumental` - творительный (кем? чем?)
- `prepositional` - предложный (о ком? о чем?)

### `incline(person: LvovichPersonT, declension?: DeclentionStrT): LvovichPersonT` - просклонять по падежам

Если не указан `declension`, то будет использован винительный падеж.

```js
  incline({ first: 'Саша', last: 'Иванов' }, 'dative');
  // вернет { first: 'Саше', last: 'Иванову', gender: 'male' }

  incline({ first: 'Паша' }, 'instrumental');
  // вернет { first: 'Пашей', gender: 'male' })
```

Тип `LvovichPersonT` для `incline(person: LvovichPersonT)` является объектом с необязательными полями:

```js
{
  first?: ?string,
  last?: ?string,
  middle?: ?string,
  gender?: ?GenderStrT,
}
```

### `inclineFirstname(str: string, declension?: DeclentionStrT, gender?: GenderStrT): string` - просклонять Имя по падежам

Если пол `gender` не указан, то будет запущено автоопределение, если не указано склонение `declension` то будет применен винительный падеж.

```js
  inclineFirstname('Павел', 'genitive'); // вернет 'Павла'
  inclineFirstname('Женя', 'instrumental'); // вернет 'Женя'
  inclineFirstname('Женя', 'instrumental', 'male'); // вернет 'Женей'
  inclineFirstname('Женя', 'instrumental', 'female'); // вернет 'Женей'
```

### `inclineLastname(str: string, declension?: DeclentionStrT, gender?: GenderStrT): string` - просклонять Фамилию по падежам

```js
  inclineLastname('Иванова', 'genitive'); // вернет 'Ивановой'
  inclineLastname('Петросян', 'instrumental'); // вернет 'Петросян'
  inclineLastname('Петросян', 'instrumental', 'male'); // вернет 'Петросяном'
```

### `inclineMiddlename(str: string, declension?: DeclentionStrT, gender?: GenderStrT): string` - просклонять Отчество по падежам

```js
  inclineMiddlename('Львович', 'genitive'); // вернет 'Львовича'
```

## Установка

Через npm:

```bash
npm install lvovich
```

Или в браузере:

```html
<script src="https://cdn.jsdelivr.net/npm/lvovich/dist/lvovich.min.js"></script>
<script>
  var city = 'Москва';
  document.writeln('Найдено в ' + lvovich.cityIn(city) + '<br/>');
  document.writeln('Из ' + lvovich.cityFrom(city) + '<br/>');
  document.writeln('Еду в ' + lvovich.cityTo(city) + '<br/>');
</script>
```

## Разработчику

Сборка новой версии пакета происходит автоматически через [semantic-release](https://github.com/semantic-release/semantic-release) и Travis. Ваши изменения я могу опубликовать хоть с телефона.

От вас просто необходимо склонировать репозиторий, внести изменения в код и открыть Pull Request.

Клонирование репозитория и установка модулей:

```bash
git clone https://github.com/nodkz/lvovich.git
cd lvovich
yarn install
```

Тесты находятся в директории ```src/__tests__```. Запуск тестов:

```bash
yarn test
```

## Лицензия

[MIT](./LICENSE.md)

В основу этого пакета лег код и правила из [petrovich-js](https://github.com/petrovich/petrovich-js). Код был переписан и оптимизирован, часть правил была расширена. API полностью был изменен, и стал использовать `camelCase`.
