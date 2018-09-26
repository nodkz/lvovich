import { GenderStrT, GenderConstT } from './gender';

export const NOMINATIVE = 1; // именительный
export const GENITIVE = 2; // родительный
export const DATIVE = 3; // дательный
export const ACCUSATIVE = 4; // винительный
export const INSTRUMENTAL = 5; // творительный
export const PREPOSITIONAL = 6; // предложный

export type DeclentionT =
  | typeof NOMINATIVE
  | typeof GENITIVE
  | typeof DATIVE
  | typeof ACCUSATIVE
  | typeof INSTRUMENTAL
  | typeof PREPOSITIONAL;

export type DeclentionStrT =
  | 'nominative'
  | 'genitive'
  | 'dative'
  | 'accusative'
  | 'instrumental'
  | 'prepositional'
  | DeclentionT;

export type DeclentionModsT = [string, string, string, string, string] | [];

export type DeclensionRuleT = {
  gender: GenderStrT | GenderConstT | null;
  test: string[];
  mods: DeclentionModsT;
  tags?: string[];
};

export type DeclensionRuleSetT = {
  exceptions?: DeclensionRuleT[];
  suffixes?: DeclensionRuleT[];
};

export function constantizeGenderInRules(rules: DeclensionRuleSetT): void;

export function inclineByRules(
  str: string,
  declensionStr: DeclentionT | DeclentionStrT,
  genderStr: GenderConstT | GenderStrT | null,
  ruleSet: DeclensionRuleSetT,
): string;

export function findRule(
  str: string,
  gender: GenderConstT | null,
  ruleSet: DeclensionRuleSetT,
  tags?: { firstWord?: boolean },
): DeclensionRuleT | null;

export function findExactRule(
  rules: DeclensionRuleT[],
  gender: GenderConstT | null,
  matchFn: (some: string) => boolean,
  tags: string[],
): DeclensionRuleT | null;

export function applyRule(
  rule: DeclensionRuleT | { mods: DeclentionModsT },
  str: string,
  declension?: DeclentionT | null,
): string;

export function applyMod(str: string, mod: string): string;

export function getDeclensionConst(
  key: DeclentionStrT | null,
): DeclentionT | null;

export function getDeclensionStr(
  cnst: DeclentionT | string | null,
): DeclentionStrT | null;
