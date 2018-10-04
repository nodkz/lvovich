/* @flow */

import { ANDROGYNOUS } from '../gender';
import type { DeclentionModsT, DeclensionRuleSetT } from '../inclineRules';

export type DeclensionCityRuleT = {|
  test: string[],
  mods: DeclentionModsT,
  tags?: string[],
|};

export type DeclensionCityRuleSetT = {|
  exceptions: DeclensionCityRuleT[],
  suffixes: DeclensionCityRuleT[],
|};

export const frozenWords = ['форт-шевченко'];

export const frozenParts = [
  '-',
  ' ',
  'в',
  'на',
  'баден', // баден-Бадене
  'бледно',
  'буэнос',
  'вице', // вице-президенту
  'гаврилов',
  'йошкар', // Йошкар-Ола
  'коста',
  'лос',
  'норд',
  'нью', // Нью-Йорку,
  'орехово',
  'принс',
  'сан', // Сан-Франциско
  'санкт', // Санкт-Петербург
  'санта',
  'северо',
  'ситтард',
  'темно',
  'улан',
  'усолье', // Усолье-Сибирское
  'усть', // Усть-Каменогорске, Усть-Илимск
  'форт', // Форт-Шевченко
  'царь', // царь-пушке
  'экс', // экс-чемпиону
  'юго',
  'юрьев',
];

// do not decline words after this words
export const frozenPartsAfter = ['село', 'поселок', 'аул', 'город', 'деревня'];

const cityInflections: DeclensionCityRuleSetT = {
  exceptions: [
    {
      test: ['сочи', 'тбилиси'],
      mods: ['', '', '', '', ''],
    },
    {
      test: ['село'],
      mods: ['-а', '-у', '', 'м', '-е'],
    },
  ],
  suffixes: [
    {
      test: ['чёк', 'чек'], // Волочёк, Чернечек
      mods: ['--ка', '--ку', '', '--ком', '--ке'],
    },
    {
      test: ['чик'], // Чик
      mods: ['а', 'у', '', 'ом', 'е'],
    },
    {
      test: ['жний', 'хний', 'шний', 'щий'], // Нижний, Вышний, Верхний
      mods: ['--его', '--ему', '', '-м', '--ем'],
    },
    {
      test: ['ще'], // Хлевище, Городище
      mods: ['-а', '-у', '', 'м', ''],
    },
    {
      test: ['чье'], // Щучье
      mods: ['-я', '-ю', '', 'м', ''],
    },
    {
      test: ['чь'], // Холмечь
      mods: ['-и', '-и', '', 'ю', '-и'],
    },
    {
      test: ['чи'], // Чепеничи
      mods: ['-ей', '-ам', '', '-ами', '-ах'],
    },
    {
      test: ['ые', 'ие'], // Набережные
      mods: ['-х', '-м', '', '-ми', '-х'],
    },
    {
      test: ['ый', 'ий', 'ое'], // Рижский, Раменское
      mods: ['--ого', '--ому', '', '-м', '--ом'],
    },
    {
      test: ['ая'], // Рижская
      mods: ['--ой', '--ой', '--ую', '--ой', '--ой'],
    },
    {
      test: ['иев'], // Сергиев Посад
      mods: ['а', 'у', '', 'ым', 'ом'],
    },
    {
      test: ['ны'], // Челны
      mods: ['-ов', '-ам', '', '-ами', '-ах'],
    },
    {
      test: ['ша'], // Ропша
      mods: ['-и', '-е', '-у', '-ей', '-е'],
    },
  ],
};

export const cityRules: DeclensionRuleSetT = {
  exceptions: cityInflections.exceptions.map(o => ({ ...o, gender: ANDROGYNOUS })),
  suffixes: cityInflections.suffixes.map(o => ({ ...o, gender: ANDROGYNOUS })),
};
