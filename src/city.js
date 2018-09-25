/* @flow */
/* eslint-disable no-use-before-define, no-continue, arrow-parens */

import { ANDROGYNOUS } from './gender';
import {
  PREPOSITIONAL,
  GENITIVE,
  constantizeGenderInRules,
  findRule,
  applyRule,
  applyMod,
} from './inclineRules';
import { inclineFirstname } from './incline';
import { frozenWords, frozenParts, frozenPartsAfter, customInflections } from './rules/cityRules';
import type { GenderStrT } from './gender';

constantizeGenderInRules(customInflections);

// предложный, в каком городе живете/находитесь?
export function cityIn(name: string, gender?: GenderStrT) {
  if (isFrozen(name, frozenWords)) return name;
  return name
    .split(/(\s|-)/g)
    .map((part, i, parts) => {
      if (isFrozenPart(part, i, parts)) return part;

      const rule = findRule(part, ANDROGYNOUS, customInflections);
      if (rule) {
        return applyRule(rule, part, PREPOSITIONAL);
      }

      return inclineFirstname(part, PREPOSITIONAL, gender) || part;
    })
    .join('');
}

// родительный, из какого города приехали?
export function cityFrom(name: string, gender?: GenderStrT) {
  if (isFrozen(name, frozenWords)) return name;
  return name
    .split(/(\s|-)/g)
    .map((part, i, parts) => {
      if (isFrozenPart(part, i, parts)) return part;

      const rule = findRule(part, ANDROGYNOUS, customInflections);
      if (rule) {
        return applyRule(rule, part, GENITIVE);
      }

      return inclineFirstname(part, GENITIVE, gender) || part;
    })
    .join('');
}

// в какой город направляетесь?
export function cityTo(name: string) {
  if (!name) return name;
  const nameLower = name.toLowerCase();
  if (nameLower.endsWith('а')) {
    return applyMod(name, '-у');
  } else if (nameLower.endsWith('ая')) {
    return applyMod(name, '--ую');
  }
  return name;
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

function isFrozenPart(part, i, parts) {
  if (parts.length > 1) {
    if (isFrozen(part, frozenParts)) return true;
    for (let k = 0; k < i; k++) {
      if (isFrozen(parts[k], frozenPartsAfter)) return true;
    }
  }
  return false;
}
