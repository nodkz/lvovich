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
  first?: string | null;
  last?: string | null;
  middle?: string | null;
  gender?: GenderStrT | null;
};

export function inclineFirstname(
  str: string,
  declension: DeclentionStrT = 'accusative',
  gender?: GenderStrT | null
): string {
  return inclineByRules(str, declension, gender || getFG(str), rulesFirstname);
}

export function inclineLastname(
  str: string,
  declension: DeclentionStrT = 'accusative',
  gender?: GenderStrT | null
): string {
  return inclineByRules(str, declension, gender || getLG(str), rulesLastname);
}

export function inclineMiddlename(
  str: string,
  declension: DeclentionStrT = 'accusative',
  gender?: GenderStrT | null
): string {
  return inclineByRules(str, declension, gender || getMG(str), rulesMiddlename);
}

export function incline(
  person: Partial<LvovichPersonT>,
  declension?: DeclentionStrT
): LvovichPersonT {
  const res = {} as LvovichPersonT;

  const gender = getGender(person);
  res.gender = gender;

  const { first, last, middle } = person;
  if (first) {
    res.first = inclineFirstname(first.trim(), declension, gender);
  }
  if (last) {
    res.last = inclineLastname(last.trim(), declension, gender);
  }
  if (middle) {
    res.middle = inclineMiddlename(middle.trim(), declension, gender);
  }

  return res;
}
