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
  convertGenderStr,
  getGenderByRule,
  getGenderByRuleSet,
} from '../gender';

function expectList(fn: (s: string) => any, str: string) {
  const lines = str
    .split(/\n|\r/g)
    .map((s) => s.trim())
    .map((s) => s.replace(/#.*|\/\/.*/, ''))
    .filter((s) => !!s);
  lines.forEach((line) => {
    const [arg, res] = line.split(/\s+/g);
    expect(`${arg} ${fn(arg) || 'null'}`).toEqual(`${arg} ${res}`);
  });
}

describe('lvovich/gender', () => {
  describe('internal methods', () => {
    describe('mergeGenders()', () => {
      it('return ANDROGYNOUS', () => {
        expect(mergeGenders(ANDROGYNOUS, null)).toEqual(null);
        expect(mergeGenders(null, ANDROGYNOUS)).toEqual(null);
        expect(mergeGenders(ANDROGYNOUS, ANDROGYNOUS)).toEqual(ANDROGYNOUS);
      });

      it('return MALE', () => {
        expect(mergeGenders(MALE, null)).toEqual(null);
        expect(mergeGenders(MALE, ANDROGYNOUS)).toEqual(MALE);
        expect(mergeGenders(null, MALE)).toEqual(null);
        expect(mergeGenders(ANDROGYNOUS, MALE)).toEqual(MALE);
      });

      it('return FEMALE', () => {
        expect(mergeGenders(FEMALE, null)).toEqual(null);
        expect(mergeGenders(FEMALE, ANDROGYNOUS)).toEqual(FEMALE);
        expect(mergeGenders(null, FEMALE)).toEqual(null);
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
        expect(getGenderConst('strange' as any)).toEqual(null);
      });
    });

    describe('convertGenderStr()', () => {
      it('return GENDER', () => {
        expect(convertGenderStr(MALE)).toEqual('male');
        expect(convertGenderStr(FEMALE)).toEqual('female');
        expect(convertGenderStr(ANDROGYNOUS)).toEqual('androgynous');
        expect(convertGenderStr('male')).toEqual('male');
        expect(convertGenderStr('female')).toEqual('female');
        expect(convertGenderStr('androgynous')).toEqual('androgynous');
      });

      it('return null', () => {
        expect(convertGenderStr(null)).toEqual(null);
        expect(convertGenderStr('strange')).toEqual(null);
      });
    });

    describe('getGenderByRule()', () => {
      it('should return GENDER', () => {
        const rules = {
          female: ['ова'],
          male: ['ов'],
          androgynous: ['о'],
        };

        expect(getGenderByRule(rules, (some) => 'Петров'.endsWith(some))).toEqual(MALE);

        expect(getGenderByRule(rules, (some) => 'Иванова'.endsWith(some))).toEqual(FEMALE);

        expect(getGenderByRule(rules, (some) => 'Зубко'.endsWith(some))).toEqual(ANDROGYNOUS);
      });

      it('should return null if no match with rules', () => {
        const rules = {
          male: ['ов'],
        };
        expect(getGenderByRule(rules, (some) => 'Рыбак'.endsWith(some))).toEqual(null);
      });

      it('should return null if match several genders', () => {
        const rulesOverlapped = {
          female: ['a'],
          male: ['a'],
        };

        expect(getGenderByRule(rulesOverlapped, (some) => 'Рыбка'.endsWith(some))).toEqual(null);
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

      it('should return null if name is empty', () => {
        expect(getGenderByRuleSet('', ruleSet)).toEqual(null);
      });

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
        Павел male
        Петр male

        // FEMALES
        Анна female
        Катя female

        // ANDROGYNOUS
        Саша androgynous
        Женя androgynous
        Бахыт androgynous
        Муса androgynous

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
        Павлович male
        Бауржанулы male

        // FEMALES
        Ивановна female
        Маманкызы female

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
        Иванов male
        Градский male
        Ананьев male

        // FEMALES
        Иванова female
        Кабазёва female
        Кабазева female
        Таптыгина female

        // ANDROGYNOUS
        Грин androgynous
        Борейко androgynous

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
      ).toEqual('androgynous');
    });

    it('should determine gender by lastname', () => {
      expect(
        getGender({
          last: 'Иванов',
          first: 'Саша',
        })
      ).toEqual('male');
    });

    it('should determine gender by middlename', () => {
      expect(
        getGender({
          first: 'Саша',
          middle: 'Петрович',
        })
      ).toEqual('male');
    });

    it('should return null for wrong male/female data', () => {
      expect(
        getGender({
          last: 'Абуова',
          first: 'Андрей',
        })
      ).toEqual(null);
    });

    it('should skip null for lastname', () => {
      expect(
        getGender({
          last: 'Шкарупа',
          first: 'Евгений',
          middle: 'Ваганович',
        })
      ).toEqual('male');

      expect(
        getGender({
          last: 'Шкарупа',
          first: 'Ольга',
          middle: 'Александровна',
        })
      ).toEqual('female');
    });
  });
});
