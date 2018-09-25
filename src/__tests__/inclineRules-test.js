/* @flow */

import {
  NOMINATIVE,
  GENITIVE,
  DATIVE,
  ACCUSATIVE,
  INSTRUMENTAL,
  PREPOSITIONAL,
  getDeclensionConst,
  getDeclensionStr,
  applyRule,
  findExactRule,
  findRule,
  inclineByRules,
  applyMod,
} from '../inclineRules';

import { MALE, FEMALE, ANDROGYNOUS } from '../gender';

describe('lvovich/rules', () => {
  describe('getDeclensionConst()', () => {
    it('return DECLENSION as const', () => {
      expect(getDeclensionConst('nominative')).toEqual(NOMINATIVE);
      expect(getDeclensionConst(NOMINATIVE)).toEqual(NOMINATIVE);

      expect(getDeclensionConst('genitive')).toEqual(GENITIVE);
      expect(getDeclensionConst(GENITIVE)).toEqual(GENITIVE);

      expect(getDeclensionConst('dative')).toEqual(DATIVE);
      expect(getDeclensionConst(DATIVE)).toEqual(DATIVE);

      expect(getDeclensionConst('accusative')).toEqual(ACCUSATIVE);
      expect(getDeclensionConst(ACCUSATIVE)).toEqual(ACCUSATIVE);

      expect(getDeclensionConst('instrumental')).toEqual(INSTRUMENTAL);
      expect(getDeclensionConst(INSTRUMENTAL)).toEqual(INSTRUMENTAL);

      expect(getDeclensionConst('prepositional')).toEqual(PREPOSITIONAL);
      expect(getDeclensionConst(PREPOSITIONAL)).toEqual(PREPOSITIONAL);
    });

    it('return null', () => {
      expect(getDeclensionConst(null)).toEqual(null);
      // $FlowFixMe
      expect(getDeclensionConst('strange')).toEqual(null);
    });
  });

  describe('getDeclensionStr()', () => {
    it('return DECLENSION as string', () => {
      expect(getDeclensionStr('nominative')).toEqual('nominative');
      expect(getDeclensionStr(NOMINATIVE)).toEqual('nominative');

      expect(getDeclensionStr('genitive')).toEqual('genitive');
      expect(getDeclensionStr(GENITIVE)).toEqual('genitive');

      expect(getDeclensionStr('dative')).toEqual('dative');
      expect(getDeclensionStr(DATIVE)).toEqual('dative');

      expect(getDeclensionStr('accusative')).toEqual('accusative');
      expect(getDeclensionStr(ACCUSATIVE)).toEqual('accusative');

      expect(getDeclensionStr('instrumental')).toEqual('instrumental');
      expect(getDeclensionStr(INSTRUMENTAL)).toEqual('instrumental');

      expect(getDeclensionStr('prepositional')).toEqual('prepositional');
      expect(getDeclensionStr(PREPOSITIONAL)).toEqual('prepositional');
    });

    it('return null', () => {
      expect(getDeclensionStr(null)).toEqual(null);
      expect(getDeclensionStr('strange')).toEqual(null);
    });
  });

  describe('applyMod()', () => {
    it('should skip . in mod', () => {
      expect(applyMod('test', '.')).toEqual('test');
    });

    it('should remove char on -', () => {
      expect(applyMod('test', '-')).toEqual('tes');
      expect(applyMod('test', '--')).toEqual('te');
      expect(applyMod('test', '---ABC')).toEqual('tABC');
    });

    it('should add char otherwise', () => {
      expect(applyMod('test', 'ABC')).toEqual('testABC');
    });
  });

  describe('applyRule()', () => {
    it('should choose correct declension mod', () => {
      const rule = { mods: ['-ы', '-е', '-у', '-ой', '-Е'] };
      expect(applyRule(rule, 'мама', NOMINATIVE)).toEqual('мама');
      expect(applyRule(rule, 'мама', GENITIVE)).toEqual('мамы');
      expect(applyRule(rule, 'мама', DATIVE)).toEqual('маме');
      expect(applyRule(rule, 'мама', ACCUSATIVE)).toEqual('маму');
      expect(applyRule(rule, 'мама', INSTRUMENTAL)).toEqual('мамой');
      expect(applyRule(rule, 'мама', PREPOSITIONAL)).toEqual('мамЕ');
    });
  });

  describe('findExactRule()', () => {
    it('should return null if rule not found', () => {
      const rules = [{ gender: FEMALE, mods: [], test: ['а'] }];
      expect(findExactRule(rules, MALE, () => true, [])).toEqual(null);
    });

    it('should filter by matchFn', () => {
      const rules = [
        { gender: MALE, test: ['а', 'б'], mods: [] },
        { gender: MALE, test: ['в'], mods: [] },
      ];
      expect(findExactRule(rules, MALE, s => 'ввв'.endsWith(s))).toEqual(rules[1]);
      expect(findExactRule(rules, MALE, s => 'ббб'.endsWith(s))).toEqual(rules[0]);
      expect(findExactRule(rules, MALE, s => 'ффф'.endsWith(s))).toEqual(null);
    });

    it('should filter by same gender', () => {
      const rules = [
        { gender: MALE, test: ['а'], tags: ['firstWord'], mods: [] },
        { gender: MALE, test: ['а'], mods: [] },
        { gender: FEMALE, test: ['а'], mods: [] },
      ];
      expect(findExactRule(rules, MALE, () => true)).toEqual(rules[1]);
      expect(findExactRule(rules, FEMALE, () => true)).toEqual(rules[2]);
    });

    it('should filter by tags', () => {
      const rules = [
        { gender: FEMALE, mods: [], test: ['а'] },
        { gender: MALE, test: ['а'], tags: ['firstWord'], mods: [] },
        { gender: MALE, test: ['а'], mods: [] },
      ];
      expect(findExactRule(rules, MALE, () => true, ['firstWord'])).toEqual(rules[1]);
      expect(findExactRule(rules, MALE, () => true, ['someTag'])).toEqual(rules[2]);
    });

    it('should accept ANDROGYNOUS for male and female', () => {
      const rules = [{ gender: ANDROGYNOUS, test: ['а'], mods: [] }];
      expect(findExactRule(rules, ANDROGYNOUS, () => true)).toEqual(rules[0]);
      expect(findExactRule(rules, MALE, () => true)).toEqual(rules[0]);
      expect(findExactRule(rules, FEMALE, () => true)).toEqual(rules[0]);
    });
  });

  describe('findRule()', () => {
    const ruleSet = {
      exceptions: [
        {
          gender: MALE,
          test: ['лев'],
          mods: ['--ьва', '--ьву', '--ьва', '--ьвом', '--ьве'],
        },
      ],
      suffixes: [
        {
          gender: MALE,
          test: ['б', 'в'],
          mods: ['а', 'у', 'а', 'ом', 'е'],
        },
      ],
    };

    it('should return null if empty string', () => {
      expect(findRule('', MALE, ruleSet)).toEqual(null);
    });

    it('should firstly look exceptions by matching whole string', () => {
      expect(findRule('лев', MALE, ruleSet)).toEqual(ruleSet.exceptions[0]);
    });

    it('should look suffixes by matching end of string', () => {
      expect(findRule('ярослав', MALE, ruleSet)).toEqual(ruleSet.suffixes[0]);
    });

    it('should lowercase string', () => {
      expect(findRule('ЛЕВ', MALE, ruleSet)).toEqual(ruleSet.exceptions[0]);
      expect(findRule('ЯРОСЛАВ', MALE, ruleSet)).toEqual(ruleSet.suffixes[0]);
    });
  });

  describe('inclineByRules()', () => {
    const ruleSet = {
      exceptions: [
        {
          gender: MALE,
          test: ['лев'],
          mods: ['--ьва', '--ьву', '--ьва', '--ьвом', '--ьве'],
        },
      ],
      suffixes: [
        {
          gender: MALE,
          test: ['б', 'в'],
          mods: ['а', 'у', 'а', 'ом', 'е'],
        },
      ],
    };

    it('should incline word by rules', () => {
      expect(inclineByRules('лев', GENITIVE, MALE, ruleSet)).toEqual('льва');
      expect(inclineByRules('лев', DATIVE, MALE, ruleSet)).toEqual('льву');
      expect(inclineByRules('лев', ACCUSATIVE, MALE, ruleSet)).toEqual('льва');
      expect(inclineByRules('вячеслав', INSTRUMENTAL, MALE, ruleSet)).toEqual('вячеславом');
      expect(inclineByRules('вячеслав', PREPOSITIONAL, MALE, ruleSet)).toEqual('вячеславе');
    });

    it('should incline both words written via dash', () => {
      expect(inclineByRules('лев-лев', DATIVE, MALE, ruleSet)).toEqual('льву-льву');
    });
  });
});
