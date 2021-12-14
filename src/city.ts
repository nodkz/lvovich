/* eslint-disable no-use-before-define, no-continue, arrow-parens */

import { endsWith } from './utils';
import { ANDROGYNOUS } from './gender';
import {
  PREPOSITIONAL,
  GENITIVE,
  constantizeGenderInRules,
  findRule,
  applyRule,
  applyMod,
} from './inclineRules';
import type { DeclentionT } from './inclineRules';
import { inclineFirstname } from './incline';
import { frozenWords, frozenParts, frozenPartsAfter, cityRules } from './rules/cityRules';
import type { GenderStrT } from './gender';

constantizeGenderInRules(cityRules);

function declineTo(name: string, wordCase: DeclentionT, gender?: GenderStrT) {
  if (isFrozen(name, frozenWords)) return name;
  return name
    .split(/(\s|-)/g)
    .map((part, i, parts) => {
      if (isFrozenPart(part, i, parts)) return part;

      const rule = findRule(part, ANDROGYNOUS, cityRules);
      if (rule) {
        return applyRule(rule, part, wordCase);
      }

      return inclineFirstname(part, wordCase, gender) || part;
    })
    .join('');
}

/**
 * предложный, в каком городе живете/находитесь?
 */
export function cityIn(name: string, gender?: GenderStrT) {
  return declineTo(name, PREPOSITIONAL, gender);
}

/**
 * родительный, из какого города приехали?
 */
export function cityFrom(name: string, gender?: GenderStrT) {
  return declineTo(name, GENITIVE, gender);
}

/**
 * винительный, в какой город направляетесь?
 */
export function cityTo(name: string) {
  if (!name) return name;
  return name
    .split(/(\s|-)/g)
    .map((part, i, parts) => {
      if (isFrozenPart(part, i, parts)) return part;

      const partLower = part.toLowerCase();

      if (endsWith(partLower, 'а')) {
        return applyMod(part, '-у');
      } else if (endsWith(partLower, 'ая')) {
        return applyMod(part, '--ую');
      } else if (endsWith(partLower, 'ия')) {
        return applyMod(part, '--ию');
      } else if (endsWith(partLower, 'я')) {
        return applyMod(part, '-ю');
      }

      return part;
    })
    .join('');
}

function isFrozen(str: string, words: string[]): boolean {
  const strLower = str.toLowerCase();
  for (let k = 0; k < words.length; k++) {
    if (words[k] === strLower) {
      return true;
    }
  }
  return false;
}

function isFrozenPart(part: string, i: number, parts: string[]) {
  if (parts.length > 1) {
    if (isFrozen(part, frozenParts)) return true;
    for (let k = 0; k < i; k++) {
      if (isFrozen(parts[k], frozenPartsAfter)) return true;
    }
  }
  return false;
}
