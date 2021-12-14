/* eslint-disable no-use-before-define, arrow-parens */

import { startsWith, endsWith } from './utils';
import genderRules from './rules/genderRules';

export const MALE = 1;
export const FEMALE = 2;
export const ANDROGYNOUS = 4;

export type GenderConstT = typeof MALE | typeof FEMALE | typeof ANDROGYNOUS;

export type GenderStrT = 'male' | 'female' | 'androgynous';

export type FioT = {
  first?: string | null;
  last?: string | null;
  middle?: string | null;
};

export type GenderRulesT = {
  androgynous?: string[];
  female?: string[];
  male?: string[];
};

export type GenderRuleSetT = {
  exceptions?: GenderRulesT;
  suffixes?: GenderRulesT;
};

export function getFG(str: string): GenderConstT | null {
  return getGenderByRuleSet(str, genderRules.firstname);
}

export function getLG(str: string): GenderConstT | null {
  return getGenderByRuleSet(str, genderRules.lastname);
}

export function getMG(str: string): GenderConstT | null {
  return getGenderByRuleSet(str, genderRules.middlename);
}

export function getFirstnameGender(str: string): GenderStrT | null {
  return convertGenderStr(getFG(str));
}

export function getLastnameGender(str: string): GenderStrT | null {
  return convertGenderStr(getLG(str));
}

export function getMiddlenameGender(str: string): GenderStrT | null {
  return convertGenderStr(getMG(str));
}

export function mergeGenders(
  g1: GenderConstT | null,
  g2: GenderConstT | null
): GenderConstT | null {
  if (g1 === ANDROGYNOUS) return g2;
  if (g2 === ANDROGYNOUS) return g1;
  if (g1 === g2) return g1;
  return null;
}

export function _getGender(fio: FioT): GenderConstT | null {
  let result = ANDROGYNOUS as GenderConstT | null;
  const { middle, first, last } = fio;

  if (middle) {
    result = mergeGenders(result, getMG(middle.trim()));
  }

  if (first) {
    result = mergeGenders(result, getFG(first.trim()));
  }

  if (last) {
    const lastGender = getLG(last.trim());
    if (lastGender !== null) {
      result = mergeGenders(result, lastGender);
    }
  }

  return result;
}

export function getGender(fio: FioT): GenderStrT | null {
  return convertGenderStr(_getGender(fio));
}

export function getGenderByRuleSet(name: string, ruleSet: GenderRuleSetT): GenderConstT | null {
  if (!name || !ruleSet) {
    return null;
  }
  const nameLower = name.toLowerCase();
  if (ruleSet.exceptions) {
    const gender = getGenderByRule(ruleSet.exceptions, (some) => {
      if (startsWith(some, '-')) {
        return endsWith(nameLower, some.substr(1));
      }
      return some === nameLower;
    });
    if (gender) return gender;
  }
  return ruleSet.suffixes
    ? getGenderByRule(ruleSet.suffixes, (some) => endsWith(nameLower, some))
    : null;
}

export function getGenderByRule(
  rules: GenderRulesT,
  matchFn: (some: string) => boolean
): GenderConstT | null {
  const genders = Object.keys(rules).filter((genderKey) => {
    const array = (rules as any)[genderKey];
    return Array.isArray(array) && array.some(matchFn);
  });
  if (genders.length !== 1) {
    // DEBUG SEVERAL RULES
    Object.keys(rules).forEach((genderKey) => {
      const array = (rules as any)[genderKey];
      if (Array.isArray(array) && array.some(matchFn)) {
        // eslint-disable-next-line
        // console.log(genderKey, array);
      }
    });

    return null;
  }
  return getGenderConst(genders[0]);
}

export function getGenderConst(key: string | GenderConstT | null | undefined): GenderConstT | null {
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

export function convertGenderStr(
  cnst: string | GenderConstT | null | undefined
): GenderStrT | null {
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
