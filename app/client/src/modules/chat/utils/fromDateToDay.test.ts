import { expect, test, describe } from 'vitest';
import { enMockT, ruMockT } from '@/__test__/__mock__/i18n.mock';

import fromDateToDay from './fromDateToDay';

const mondayNovember = new Date('2023-11-06').toString();
const tuesdayDecember = new Date('2023-12-05').toString();
const wednesdayJanuary = new Date('2023-01-04').toString();
const today = new Date().toString();

describe('[CHAT_UTILS] fromDateToDay Test', () => {
  test('Monday, November 6th | ru language', () => {
    expect(fromDateToDay(mondayNovember, ruMockT)).toBe(
      'Понедельник, Ноябрь 6'
    );
  });
  test('Monday, November 6th | en language', () => {
    expect(fromDateToDay(mondayNovember, enMockT)).toBe('Monday, November 6');
  });
  test('Tuesday, December 5th | ru language', () => {
    expect(fromDateToDay(tuesdayDecember, ruMockT)).toBe('Вторник, Декабрь 5');
  });
  test('Tuesday, December 5th | en language', () => {
    expect(fromDateToDay(tuesdayDecember, enMockT)).toBe('Tuesday, December 5');
  });
  test('Wednesday, January 4th | ru language', () => {
    expect(fromDateToDay(wednesdayJanuary, ruMockT)).toBe('Среда, Январь 4');
  });
  test('Wednesday, January 4th | en language', () => {
    expect(fromDateToDay(wednesdayJanuary, enMockT)).toBe(
      'Wednesday, January 4'
    );
  });
  test('Today | ru language', () => {
    expect(fromDateToDay(today, ruMockT)).toMatch(/Сегодня,/g);
  });
  test('Today | en language', () => {
    expect(fromDateToDay(today, enMockT)).toMatch(/Today,/g);
  });
});
