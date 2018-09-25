import readline from 'readline';
import path from 'path';
import fs from 'fs';
import { getFirstnameGender, getLastnameGender, MALE, FEMALE, ANDROGYNOUS } from '../gender';

describe('data set tests', () => {
  it('firstnames.gender.tsv', done => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(path.resolve(__dirname, './opencorpora/firstnames.gender.tsv')),
    });

    let err;
    const counters = {
      skipWithoutRules: 0,
      skipped: [],
      success: 0,
    };
    lineReader.on('line', line => {
      const [name, genderDirty] = line.split('\t');
      let gender;
      switch (genderDirty) {
        case 'мр':
          gender = MALE;
          break;
        case 'жр':
          gender = FEMALE;
          break;
        case 'мр-жр':
          gender = ANDROGYNOUS;
          break;
        default:
          gender = null;
      }
      if (gender && !err) {
        const g = getFirstnameGender(name);
        if (g === null) {
          counters.skipped.push(name);
          counters.skipWithoutRules += 1;
          return;
        }

        try {
          expect(`${name} ${g}`).toEqual(`${name} ${gender}`);
          counters.success += 1;
        } catch (e) {
          err = e;
          done.fail(e);
          lineReader.close();
        }
      }
    });

    lineReader.on('close', () => {
      // counters.skipped = counters.skipped
      //   .filter(
      //     s => !s.endsWith('КА') && !s.endsWith('ША') && !s.endsWith('НЯ'),
      //   )
      //   .join('   ');
      // console.log(counters);
      if (!err) done();
    });
  });

  it('surnames.gender.tsv', done => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(path.resolve(__dirname, './opencorpora/surnames.gender.tsv')),
    });

    let err;
    const counters = {
      skipWithoutRules: 0,
      skipped: [],
      success: 0,
    };
    lineReader.on('line', line => {
      const [name, genderDirty] = line.split('\t');
      let gender;
      switch (genderDirty) {
        case 'мр':
          gender = MALE;
          break;
        case 'жр':
          gender = FEMALE;
          break;
        case 'мр-жр':
          gender = ANDROGYNOUS;
          break;
        default:
          gender = null;
      }

      if (gender && !err) {
        const g = getLastnameGender(name);
        if (g === null) {
          counters.skipped.push(name);
          counters.skipWithoutRules += 1;
          return;
        }

        try {
          expect(`${name} ${g}`).toEqual(`${name} ${gender}`);
          counters.success += 1;
        } catch (e) {
          err = e;
          done.fail(e);
          lineReader.close();
        }
      }
    });

    lineReader.on('close', () => {
      // counters.skipped = counters.skipped.join('   ');
      // console.log(counters);
      if (!err) done();
    });
  });
});
