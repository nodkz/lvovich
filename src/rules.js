/* @flow */
/* eslint-disable no-use-before-define, no-continue, arrow-parens */

import { getGenderConst, ANDROGYNOUS } from './gender';
import type { LvovichGenderStrT, LvovichGenderT } from './gender';

export const NOMINATIVE: 1 = 1; // именительный
export const GENITIVE: 2 = 2; // родительный
export const DATIVE: 3 = 3; // дательный
export const ACCUSATIVE: 4 = 4; // винительный
export const INSTRUMENTAL: 5 = 5; // предложный
export const PREPOSITIONAL: 6 = 6; // предложный

export type LvovichDeclentionT =
  | typeof NOMINATIVE
  | typeof GENITIVE
  | typeof DATIVE
  | typeof ACCUSATIVE
  | typeof INSTRUMENTAL
  | typeof PREPOSITIONAL;

export type LvovichDeclentionStrT =
  | 'nominative'
  | 'genitive'
  | 'dative'
  | 'accusative'
  | 'instrumental'
  | 'prepositional'
  | LvovichDeclentionT;

export type LvovichDeclentionModsT = [string, string, string, string, string] | [];

export type LvovichDeclensionRuleT = {
  gender: LvovichGenderStrT,
  test: string[],
  mods: LvovichDeclentionModsT,
  tags?: string[],
};

export type LvovichDeclensionRuleSetT = {
  exceptions?: LvovichDeclensionRuleT[],
  suffixes?: LvovichDeclensionRuleT[],
};

export function constantizeGenderInRules(rules: LvovichDeclensionRuleSetT) {
  if (Array.isArray(rules.exceptions)) {
    rules.exceptions.forEach(rule => {
      rule.gender = getGenderConst(rule.gender); // eslint-disable-line
    });
  }
  if (Array.isArray(rules.suffixes)) {
    rules.suffixes.forEach(rule => {
      rule.gender = getGenderConst(rule.gender); // eslint-disable-line
    });
  }
}

export function inclineByRules(
  str: string,
  declensionStr: LvovichDeclentionT | LvovichDeclentionStrT,
  genderStr: LvovichGenderT | LvovichGenderStrT,
  ruleSet: LvovichDeclensionRuleSetT
) {
  const declension = getDeclensionConst(declensionStr);
  const gender = getGenderConst(genderStr);

  const parts = str.split('-');
  const result = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isFirstWord = i === 0 && parts.length > 1;

    const rule = findRule(part, gender, ruleSet, {
      firstWord: isFirstWord,
    });

    if (rule) {
      result.push(applyRule(rule, part, declension));
    } else {
      result.push(part);
    }
  }
  return result.join('-');
}

export function findRule(
  str: string,
  gender: LvovichGenderT,
  ruleSet: LvovichDeclensionRuleSetT,
  tags?: { firstWord?: boolean } = {}
): ?LvovichDeclensionRuleT {
  if (!str) {
    return null;
  }
  const strLower = str.toLowerCase();

  const tagList = [];
  Object.keys(tags).forEach(key => {
    if (tags[key]) {
      tagList.push(key);
    }
  });

  if (ruleSet.exceptions) {
    const rule = findExactRule(ruleSet.exceptions, gender, some => some === strLower, tagList);
    if (rule) return rule;
  }

  return ruleSet.suffixes
    ? findExactRule(ruleSet.suffixes, gender, some => strLower.endsWith(some), tagList)
    : null;
}

export function findExactRule(
  rules: LvovichDeclensionRuleT[],
  gender: LvovichGenderT,
  matchFn: (some: string) => boolean,
  tags: string[] = []
): ?LvovichDeclensionRuleT {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    // rule with tag should be skipped if tag not listed in args
    if (rule.tags) {
      if (!rule.tags.find(t => tags.indexOf(t) !== -1)) {
        continue;
      }
    }

    // rule must have same gender or be `androgynous`
    if (rule.gender !== ANDROGYNOUS && gender !== rule.gender) {
      continue;
    }

    if (rule.test) {
      for (let j = 0; j < rule.test.length; j++) {
        if (matchFn(rule.test[j])) {
          return rule;
        }
      }
    }
  }
  return null;
}

function getModByIdx(mods: LvovichDeclentionModsT, i: number): string {
  if (mods && mods.length >= i) {
    return mods[i];
  }
  return '.';
}

export function applyRule(
  rule: LvovichDeclensionRuleT | { mods: LvovichDeclentionModsT },
  str: string,
  declension?: ?LvovichDeclentionT
) {
  let mod;
  switch (declension) {
    case NOMINATIVE:
      mod = '.';
      break;
    case GENITIVE:
      mod = getModByIdx(rule.mods, 0);
      break;
    case DATIVE:
      mod = getModByIdx(rule.mods, 1);
      break;
    case ACCUSATIVE:
      mod = getModByIdx(rule.mods, 2);
      break;
    case INSTRUMENTAL:
      mod = getModByIdx(rule.mods, 3);
      break;
    case PREPOSITIONAL:
      mod = getModByIdx(rule.mods, 4);
      break;
    default:
      mod = '.';
  }

  return applyMod(str, mod);
}

export function applyMod(str: string, mod: string): string {
  for (let i = 0; i < mod.length; i++) {
    const chr = mod[i];
    switch (chr) {
      case '.':
        break;
      case '-':
        str = str.substr(0, str.length - 1); // eslint-disable-line no-param-reassign
        break;
      default:
        str += chr; // eslint-disable-line no-param-reassign
    }
  }
  return str;
}

export function getDeclensionConst(key: ?LvovichDeclentionStrT): ?LvovichDeclentionT {
  switch (key) {
    case 'nominative':
    case NOMINATIVE:
      return NOMINATIVE;
    case 'genitive':
    case GENITIVE:
      return GENITIVE;
    case 'dative':
    case DATIVE:
      return DATIVE;
    case 'accusative':
    case ACCUSATIVE:
      return ACCUSATIVE;
    case 'instrumental':
    case INSTRUMENTAL:
      return INSTRUMENTAL;
    case 'prepositional':
    case PREPOSITIONAL:
      return PREPOSITIONAL;
    default:
      return null;
  }
}

export function getDeclensionStr(cnst: LvovichDeclentionT | string | null): ?LvovichDeclentionStrT {
  switch (cnst) {
    case 'nominative':
    case NOMINATIVE:
      return 'nominative';
    case 'genitive':
    case GENITIVE:
      return 'genitive';
    case 'dative':
    case DATIVE:
      return 'dative';
    case 'accusative':
    case ACCUSATIVE:
      return 'accusative';
    case 'instrumental':
    case INSTRUMENTAL:
      return 'instrumental';
    case 'prepositional':
    case PREPOSITIONAL:
      return 'prepositional';
    default:
      return null;
  }
}
