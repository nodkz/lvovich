import { GenderStrT } from './gender';

// предложный, в каком городе живете/находитесь?
export function cityIn(name: string, gender?: GenderStrT): string;

// родительный, из какого города приехали?
export function cityFrom(name: string, gender?: GenderStrT): string;

// в какой город направляетесь?
export function cityTo(name: string): string;
