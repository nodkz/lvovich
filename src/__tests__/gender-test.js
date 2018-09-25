/* @flow */

import {
  getFirstnameGender,
  getMiddlenameGender,
  getLastnameGender,
  getGender,
  mergeGenders,
  MALE,
  FEMALE,
  ANDROGYNOUS,
  getGenderConst,
  getGenderStr,
  getGenderByRule,
  getGenderByRuleSet,
} from '../gender';

function expectList(fn, str) {
  const lines = str
    .split(/\n|\r/g)
    .map(s => s.trim())
    .map(s => s.replace(/#.*|\/\/.*/, ''))
    .filter(s => !!s);
  lines.forEach(line => {
    const [arg, res] = line.split(/\s+/g);
    expect(`${arg} ${JSON.stringify(fn(arg))}`).toEqual(`${arg} ${res}`);
  });
}

describe('lvovich/gender', () => {
  describe('internal methods', () => {
    describe('mergeGenders()', () => {
      it('return ANDROGYNOUS', () => {
        expect(mergeGenders(ANDROGYNOUS, null)).toEqual(ANDROGYNOUS);
        expect(mergeGenders(null, ANDROGYNOUS)).toEqual(ANDROGYNOUS);
        expect(mergeGenders(ANDROGYNOUS, ANDROGYNOUS)).toEqual(ANDROGYNOUS);
      });

      it('return MALE', () => {
        expect(mergeGenders(MALE, null)).toEqual(MALE);
        expect(mergeGenders(MALE, ANDROGYNOUS)).toEqual(MALE);
        expect(mergeGenders(null, MALE)).toEqual(MALE);
        expect(mergeGenders(ANDROGYNOUS, MALE)).toEqual(MALE);
      });

      it('return FEMALE', () => {
        expect(mergeGenders(FEMALE, null)).toEqual(FEMALE);
        expect(mergeGenders(FEMALE, ANDROGYNOUS)).toEqual(FEMALE);
        expect(mergeGenders(null, FEMALE)).toEqual(FEMALE);
        expect(mergeGenders(ANDROGYNOUS, FEMALE)).toEqual(FEMALE);
      });

      it('return null if gender not match', () => {
        expect(mergeGenders(null, null)).toEqual(null);
        expect(mergeGenders(FEMALE, MALE)).toEqual(null);
        expect(mergeGenders(MALE, FEMALE)).toEqual(null);
      });
    });

    describe('getGenderConst()', () => {
      it('return GENDER', () => {
        expect(getGenderConst('male')).toEqual(MALE);
        expect(getGenderConst('female')).toEqual(FEMALE);
        expect(getGenderConst('androgynous')).toEqual(ANDROGYNOUS);
        expect(getGenderConst(MALE)).toEqual(MALE);
        expect(getGenderConst(FEMALE)).toEqual(FEMALE);
        expect(getGenderConst(ANDROGYNOUS)).toEqual(ANDROGYNOUS);
      });

      it('return null', () => {
        expect(getGenderConst(null)).toEqual(null);
        expect(getGenderConst('strange')).toEqual(null);
      });
    });

    describe('getGenderStr()', () => {
      it('return GENDER', () => {
        expect(getGenderStr(MALE)).toEqual('male');
        expect(getGenderStr(FEMALE)).toEqual('female');
        expect(getGenderStr(ANDROGYNOUS)).toEqual('androgynous');
        expect(getGenderStr('male')).toEqual('male');
        expect(getGenderStr('female')).toEqual('female');
        expect(getGenderStr('androgynous')).toEqual('androgynous');
      });

      it('return null', () => {
        expect(getGenderStr(null)).toEqual(null);
        // $FlowFixMe
        expect(getGenderStr('strange')).toEqual(null);
      });
    });

    describe('getGenderByRule()', () => {
      it('should return GENDER', () => {
        const rules = {
          female: ['ова'],
          male: ['ов'],
          androgynous: ['о'],
        };

        expect(getGenderByRule(rules, some => 'Петров'.endsWith(some))).toEqual(MALE);

        expect(getGenderByRule(rules, some => 'Иванова'.endsWith(some))).toEqual(FEMALE);

        expect(getGenderByRule(rules, some => 'Зубко'.endsWith(some))).toEqual(ANDROGYNOUS);
      });

      it('should return null if no match with rules', () => {
        const rules = {
          male: ['ов'],
        };
        expect(getGenderByRule(rules, some => 'Рыбак'.endsWith(some))).toEqual(null);
      });

      it('should return null if match several genders', () => {
        const rulesOverlapped = {
          female: ['a'],
          male: ['a'],
        };

        expect(getGenderByRule(rulesOverlapped, some => 'Рыбка'.endsWith(some))).toEqual(null);
      });
    });

    describe('getGenderByRuleSet()', () => {
      const ruleSet = {
        exceptions: {
          androgynous: ['дарвин', 'грин'],
          male: ['-ага'],
        },
        suffixes: {
          male: ['н'],
          female: ['на', 'га'],
        },
      };

      it('should check exceptions firstly', () => {
        expect(getGenderByRuleSet('Дарвин', ruleSet)).toEqual(ANDROGYNOUS);
      });

      it('should check exceptions with suffix', () => {
        expect(getGenderByRuleSet('ольга', ruleSet)).toEqual(FEMALE);
        expect(getGenderByRuleSet('адилага', ruleSet)).toEqual(MALE);
      });

      it('should check suffixes', () => {
        expect(getGenderByRuleSet('Пилевин', ruleSet)).toEqual(MALE);
        expect(getGenderByRuleSet('Пилевина', ruleSet)).toEqual(FEMALE);
      });
    });
  });

  describe('getFirstnameGender()', () => {
    it('should determine by gender firstname rules', () => {
      expectList(
        getFirstnameGender,
        `
        // MALES
        Павел 1
        Петр 1

        // FEMALES
        Анна 2
        Катя 2

        // ANDROGYNOUS
        Саша 4
        Женя 4
        Бахыт 4
        Муса 4

        // UNDETERMINED BY RULES
        тттт null
        аааа null
        yes null
      `
      );
    });
  });

  describe('getMiddlenameGender()', () => {
    it('should determine gender by middlename rules', () => {
      expectList(
        getMiddlenameGender,
        `
        // MALES
        Павлович 1
        Бауржанулы 1

        // FEMALES
        Ивановна 2
        Маманкызы 2

        // UNDETERMINED BY RULES
        иваново null
        тттт null
        аааа null
        yes null
      `
      );
    });
  });

  describe('getLastnameGender()', () => {
    it('should determine gender by lastname rules', () => {
      expectList(
        getLastnameGender,
        `
        // MALES
        Иванов 1
        Градский 1
        Ананьев 1

        // FEMALES
        Иванова 2
        Кабазёва 2
        Кабазева 2
        Таптыгина 2

        // ANDROGYNOUS
        Грин 4
        Борейко 4

        // UNDETERMINED BY RULES
        ким null
        тттт null
        аааа null
        yes null
      `
      );
    });
  });

  describe('getGender()', () => {
    it('should determine androgynous', () => {
      expect(
        getGender({
          first: 'Саша',
        })
      ).toEqual(4); // ANDROGYNOUS
    });

    it('should determine gender by lastname', () => {
      expect(
        getGender({
          last: 'Иванов',
          first: 'Саша',
        })
      ).toEqual(1);
    });

    it('should determine gender by middlename', () => {
      expect(
        getGender({
          first: 'Саша',
          middle: 'Петрович',
        })
      ).toEqual(1);
    });
  });
});
