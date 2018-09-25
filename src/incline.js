/* @flow */
/* eslint-disable no-use-before-define, no-continue, arrow-parens */

import { getGender, getFirstnameGender, getLastnameGender, getMiddlenameGender } from './gender';
import { constantizeGenderInRules, inclineByRules } from './rules';
import rulesLastname from './inclineRulesLastname';
import rulesMiddlename from './inclineRulesMiddlename';
import rulesFirstname from './inclineRulesFirstname';

import type { LvovichGenderStrT } from './gender';
import type { LvovichDeclentionStrT } from './rules';

constantizeGenderInRules(rulesLastname);
constantizeGenderInRules(rulesMiddlename);
constantizeGenderInRules(rulesFirstname);

export type LvovichPersonT = {
  first?: ?string,
  last?: ?string,
  middle?: ?string,
  gender?: LvovichGenderStrT,
};

export function inclineFirstname(
  str: string,
  declension?: LvovichDeclentionStrT = 'accusative',
  gender?: LvovichGenderStrT
) {
  return inclineByRules(str, declension, gender || getFirstnameGender(str), rulesFirstname);
}

export function inclineLastname(
  str: string,
  declension: LvovichDeclentionStrT = 'accusative',
  gender?: LvovichGenderStrT
) {
  return inclineByRules(str, declension, gender || getLastnameGender(str), rulesLastname);
}

export function inclineMiddlename(
  str: string,
  declension: LvovichDeclentionStrT = 'accusative',
  gender?: LvovichGenderStrT
) {
  return inclineByRules(str, declension, gender || getMiddlenameGender(str), rulesMiddlename);
}

export function lvovich(
  person: LvovichPersonT,
  declension?: LvovichDeclentionStrT
): LvovichPersonT {
  const res = {};

  if (!res.gender) {
    res.gender = getGender(person);
  }

  if (person.first) {
    res.first = inclineFirstname(person.first.trim(), declension, res.gender);
  }

  if (person.last) {
    res.last = inclineLastname(person.last.trim(), declension, res.gender);
  }

  if (person.middle) {
    res.last = inclineMiddlename(person.middle.trim(), declension, res.gender);
  }

  return res;
}
