/* @flow */
/* eslint-disable no-use-before-define, arrow-parens */

import genderRules from './rules/genderRules';

export const MALE: 1 = 1;
export const FEMALE: 2 = 2;
export const ANDROGYNOUS: 4 = 4;

export type GenderConstT = typeof MALE | typeof FEMALE | typeof ANDROGYNOUS;

export type GenderStrT = 'male' | 'female' | 'androgynous';

export type FioT = {
  first?: ?string,
  last?: ?string,
  middle?: ?string,
};

export type GenderRulesT = {|
  androgynous?: string[],
  female?: string[],
  male?: string[],
|};

export type GenderRuleSetT = {|
  exceptions?: GenderRulesT,
  suffixes?: GenderRulesT,
|};

export function getFG(str: string): ?GenderConstT {
  return getGenderByRuleSet(str, genderRules.firstname);
}

export function getLG(str: string): ?GenderConstT {
  return getGenderByRuleSet(str, genderRules.lastname);
}

export function getMG(str: string): ?GenderConstT {
  return getGenderByRuleSet(str, genderRules.middlename);
}

export function getFirstnameGender(str: string): ?GenderStrT {
  return convertGenderStr(getFG(str));
}

export function getLastnameGender(str: string): ?GenderStrT {
  return convertGenderStr(getLG(str));
}

export function getMiddlenameGender(str: string): ?GenderStrT {
  return convertGenderStr(getMG(str));
}

export function mergeGenders(g1: ?GenderConstT, g2: ?GenderConstT): ?GenderConstT {
  if (g1 === ANDROGYNOUS) return g2;
  if (g2 === ANDROGYNOUS) return g1;
  if (g1 === g2) return g1;
  return null;
}

export function _getGender(fio: FioT): ?GenderConstT {
  let result = ANDROGYNOUS;

  if (fio.middle) {
    result = mergeGenders(result, getMG(fio.middle.trim()));
  }

  if (fio.first) {
    result = mergeGenders(result, getFG(fio.first.trim()));
  }

  if (fio.last) {
    result = mergeGenders(result, getLG(fio.last.trim()));
  }

  return result;
}

export function getGender(fio: FioT): ?GenderStrT {
  return convertGenderStr(_getGender(fio));
}

export function getGenderByRuleSet(name: string, ruleSet: GenderRuleSetT): ?GenderConstT {
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
  rules: GenderRulesT,
  matchFn: (some: string) => boolean
): ?GenderConstT {
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
        // console.log(genderKey, array);
      }
    });

    return null;
  }
  return getGenderConst(genders[0]);
}

export function getGenderConst(key: ?GenderStrT | GenderConstT): ?GenderConstT {
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

export function convertGenderStr(cnst: ?GenderStrT | GenderConstT): ?GenderStrT {
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
