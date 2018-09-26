import { GenderStrT } from './gender';
import { DeclentionStrT } from './inclineRules';

export type LvovichPersonT = {
  first?: string | null;
  last?: string | null;
  middle?: string | null;
  gender?: GenderStrT | null;
};

export function inclineFirstname(
  str: string,
  declension?: DeclentionStrT,
  gender?: GenderStrT | null,
): string;

export function inclineLastname(
  str: string,
  declension: DeclentionStrT,
  gender?: GenderStrT | null,
): string;

export function inclineMiddlename(
  str: string,
  declension: DeclentionStrT,
  gender?: GenderStrT | null,
): string;

export function lvovich(
  person: LvovichPersonT,
  declension?: DeclentionStrT,
): LvovichPersonT;
