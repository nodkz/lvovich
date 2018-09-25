/* @flow */
/* eslint-disable no-use-before-define, arrow-parens */

import genderRules from './rules/genderRules';

export const MALE: 1 = 1;
export const FEMALE: 2 = 2;
export const ANDROGYNOUS: 4 = 4;

export type LvovichGenderT = typeof MALE | typeof FEMALE | typeof ANDROGYNOUS | null;

export type LvovichGenderStrT = 'male' | 'female' | 'androgynous' | LvovichGenderT;

export type FioT = {
  first?: ?string,
  last?: ?string,
  middle?: ?string,
};

export type LvovichGenderRulesT = {
  androgynous?: string[],
  female?: string[],
  male?: string[],
};

export type LvovichGenderRuleSetT = {
  exceptions?: LvovichGenderRulesT,
  suffixes?: LvovichGenderRulesT,
};

export function getFirstnameGender(str: string): LvovichGenderT {
  return getGenderByRuleSet(str, genderRules.firstname);
}

export function getLastnameGender(str: string): LvovichGenderT {
  return getGenderByRuleSet(str, genderRules.lastname);
}

export function getMiddlenameGender(str: string): LvovichGenderT {
  return getGenderByRuleSet(str, genderRules.middlename);
}

export function mergeGenders(g1: LvovichGenderT, g2: LvovichGenderT): LvovichGenderT {
  if (!g1 || g1 === ANDROGYNOUS) return g2 || g1;
  if (!g2 || g2 === ANDROGYNOUS) return g1 || g2;
  if (g1 === g2) return g1;
  return null;
}

export function getGender(fio: FioT): LvovichGenderT {
  let result = null;

  if (fio.middle) {
    result = mergeGenders(result, getMiddlenameGender(fio.middle.trim()));
  }

  if (fio.first) {
    result = mergeGenders(result, getFirstnameGender(fio.first.trim()));
  }

  if (fio.last) {
    result = mergeGenders(result, getLastnameGender(fio.last.trim()));
  }

  return result;
}

export function getGenderByRuleSet(name: string, ruleSet: LvovichGenderRuleSetT): LvovichGenderT {
  if (!name || !ruleSet) {
    return null;
  }
  const nameLower = name.toLowerCase();
  if (ruleSet.exceptions) {
    const gender = getGenderByRule(ruleSet.exceptions, some => {
      if (some.startsWith('-')) {
        return nameLower.endsWith(some.substr(1));
      }
      return some === nameLower;
    });
    if (gender) return gender;
  }
  return ruleSet.suffixes
    ? getGenderByRule(ruleSet.suffixes, some => nameLower.endsWith(some))
    : null;
}

export function getGenderByRule(
  rules: LvovichGenderRulesT,
  matchFn: (some: string) => boolean
): LvovichGenderT {
  const genders = Object.keys(rules).filter(genderKey => {
    const array = rules[genderKey];
    return Array.isArray(array) && array.some(matchFn);
  });
  if (genders.length !== 1) {
    // DEBUG SEVERAL RULES
    Object.keys(rules).forEach(genderKey => {
      const array = rules[genderKey];
      if (Array.isArray(array) && array.some(matchFn)) {
        // eslint-disable-next-line
        console.log(genderKey, array);
      }
    });

    return null;
  }
  return getGenderConst(genders[0]);
}

export function getGenderConst(key: string | LvovichGenderStrT): LvovichGenderT {
  switch (key) {
    case 'male':
    case MALE:
      return MALE;
    case 'female':
    case FEMALE:
      return FEMALE;
    case 'androgynous':
    case ANDROGYNOUS:
      return ANDROGYNOUS;
    default:
      return null;
  }
}

export function getGenderStr(cnst: LvovichGenderStrT): ?string {
  switch (cnst) {
    case 'male':
    case MALE:
      return 'male';
    case 'female':
    case FEMALE:
      return 'female';
    case 'androgynous':
    case ANDROGYNOUS:
      return 'androgynous';
    default:
      return null;
  }
}
