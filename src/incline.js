/* @flow */
/* eslint-disable no-use-before-define, no-continue, arrow-parens */

import { getGender, getFG, getLG, getMG } from './gender';
import { constantizeGenderInRules, inclineByRules } from './inclineRules';
import rulesLastname from './rules/inclineRulesLastname';
import rulesMiddlename from './rules/inclineRulesMiddlename';
import rulesFirstname from './rules/inclineRulesFirstname';

import type { GenderStrT } from './gender';
import type { DeclentionStrT } from './inclineRules';

constantizeGenderInRules(rulesLastname);
constantizeGenderInRules(rulesMiddlename);
constantizeGenderInRules(rulesFirstname);

export type LvovichPersonT = {
  first?: ?string,
  last?: ?string,
  middle?: ?string,
  gender?: ?GenderStrT,
};

export function inclineFirstname(
  str: string,
  declension?: DeclentionStrT = 'accusative',
  gender?: ?GenderStrT
): string {
  return inclineByRules(str, declension, gender || getFG(str), rulesFirstname);
}

export function inclineLastname(
  str: string,
  declension: DeclentionStrT = 'accusative',
  gender?: ?GenderStrT
): string {
  return inclineByRules(str, declension, gender || getLG(str), rulesLastname);
}

export function inclineMiddlename(
  str: string,
  declension: DeclentionStrT = 'accusative',
  gender?: ?GenderStrT
): string {
  return inclineByRules(str, declension, gender || getMG(str), rulesMiddlename);
}

export function incline(
  person: $Shape<LvovichPersonT>,
  declension?: DeclentionStrT
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
    res.middle = inclineMiddlename(person.middle.trim(), declension, res.gender);
  }

  return res;
}
