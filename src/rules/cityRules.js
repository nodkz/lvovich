/* @flow */

import type { DeclensionRuleSetT } from '../inclineRules';

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

export const customInflections: DeclensionRuleSetT = {
  exceptions: [
    {
      gender: 'androgynous',
      test: ['сочи', 'тбилиси'],
      mods: ['', '', '', '', ''],
    },
    {
      gender: 'androgynous',
      test: ['село'],
      mods: ['-а', '-у', '', 'м', '-е'],
    },
  ],
  suffixes: [
    {
      gender: 'androgynous',
      test: ['чёк', 'чек'], // Волочёк, Чернечек
      mods: ['--ка', '--ку', '', '--ком', '--ке'],
    },
    {
      gender: 'androgynous',
      test: ['чик'], // Чик
      mods: ['а', 'у', '', 'ом', 'е'],
    },
    {
      gender: 'androgynous',
      test: ['жний', 'хний', 'шний', 'щий'], // Нижний, Вышний, Верхний
      mods: ['--его', '--ему', '', '-м', '--ем'],
    },
    {
      gender: 'androgynous',
      test: ['ще'], // Хлевище, Городище
      mods: ['-а', '-у', '', 'м', ''],
    },
    {
      gender: 'androgynous',
      test: ['чье'], // Щучье
      mods: ['-я', '-ю', '', 'м', ''],
    },
    {
      gender: 'androgynous',
      test: ['чь'], // Холмечь
      mods: ['-и', '-и', '', 'ю', '-и'],
    },
    {
      gender: 'androgynous',
      test: ['чи'], // Чепеничи
      mods: ['-ей', '-ам', '', '-ами', '-ах'],
    },
    {
      gender: 'androgynous',
      test: ['ые', 'ие'], // Набережные
      mods: ['-х', '-м', '', '-ми', '-х'],
    },
    {
      gender: 'androgynous',
      test: ['ый', 'ий', 'ое'], // Рижский, Раменское
      mods: ['--ого', '--ому', '', '-м', '--ом'],
    },
    {
      gender: 'androgynous',
      test: ['ая'], // Рижская
      mods: ['--ой', '--ой', '--ую', '--ой', '--ой'],
    },
    {
      gender: 'androgynous',
      test: ['иев'], // Сергиев Посад
      mods: ['а', 'у', '', 'ым', 'ом'],
    },
    {
      gender: 'androgynous',
      test: ['ны'], // Челны
      mods: ['-ов', '-ам', '', '-ами', '-ах'],
    },
    {
      gender: 'androgynous',
      test: ['ша'], // Ропша
      mods: ['-и', '-е', '-у', '-ей', '-е'],
    },
  ],
};
