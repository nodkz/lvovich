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

export function getFG(str: string): GenderConstT | null;

export function getLG(str: string): GenderConstT | null;

export function getMG(str: string): GenderConstT | null;

export function getFirstnameGender(str: string): GenderStrT | null;

export function getLastnameGender(str: string): GenderStrT | null;

export function getMiddlenameGender(str: string): GenderStrT | null;

export function mergeGenders(
  g1: GenderConstT | null,
  g2: GenderConstT | null,
): GenderConstT | null;

export function _getGender(fio: FioT): GenderConstT | null;

export function getGender(fio: FioT): GenderStrT | null;

export function getGenderByRuleSet(
  name: string,
  ruleSet: GenderRuleSetT,
): GenderConstT | null;

export function getGenderByRule(
  rules: GenderRulesT,
  matchFn: (some: string) => boolean,
): GenderConstT | null;

export function getGenderConst(
  key: GenderStrT | GenderConstT | null,
): GenderConstT | null;

export function convertGenderStr(
  cnst: GenderStrT | GenderConstT | null,
): GenderStrT | null;
