/* @flow */

import { lvovich, inclineFirstname, inclineLastname, inclineMiddlename } from '../incline';

import { MALE, ANDROGYNOUS } from '../gender';

describe('lvovich/incline', () => {
  describe('lvovich()', () => {
    it('should autodetect gender and incline person', () => {
      expect(lvovich({ first: 'Павел' }, 'dative')).toEqual({
        first: 'Павлу',
        gender: MALE,
      });
    });

    it('should autodetect gender and incline person', () => {
      expect(lvovich({ first: 'Паша' }, 'instrumental')).toEqual({
        first: 'Пашей',
        gender: MALE,
      });
    });

    it('should incline person with androgynous name', () => {
      expect(lvovich({ first: 'Саша' }, 'dative')).toEqual({
        first: 'Саше',
        gender: ANDROGYNOUS,
      });
      expect(lvovich({ first: 'Саша', last: 'Иванов' }, 'dative')).toEqual({
        first: 'Саше',
        last: 'Иванову',
        gender: MALE,
      });
    });
  });

  describe('inclineFirstname()', () => {
    it('should incline firstname', () => {
      expect(inclineFirstname('Павел', 'genitive')).toEqual('Павла');
    });

    it('should accept gender for androgynous name', () => {
      expect(inclineFirstname('Женя', 'instrumental')).toEqual('Женя');
      expect(inclineFirstname('Женя', 'instrumental', 'male')).toEqual('Женей');
      expect(inclineFirstname('Женя', 'instrumental', 'female')).toEqual('Женей');
    });
  });

  describe('inclineMiddlename()', () => {
    it('should incline middlename', () => {
      expect(inclineMiddlename('Львович', 'genitive')).toEqual('Львовича');
    });
  });

  describe('inclineLastname()', () => {
    it('should incline middlename', () => {
      expect(inclineLastname('Иванова', 'genitive')).toEqual('Ивановой');
    });

    it('should accept gender for androgynous name', () => {
      expect(inclineLastname('Петросян', 'instrumental')).toEqual('Петросян');
      expect(inclineLastname('Петросян', 'instrumental', 'male')).toEqual('Петросяном');
    });
  });
});
