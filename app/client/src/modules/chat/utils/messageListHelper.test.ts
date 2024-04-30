import { describe, expect, test } from 'vitest';

import messageListHelper from './messageListHelper';
import { Messages } from '@/models/data';

const userId = 1;

describe('[CHAT_UTILS] messageListHelper Test', () => {
  test('FIRST_MESSAGE', () => {
    const firstMessage = [{ date: new Date().toString(), userId: 1 }];

    expect(
      messageListHelper(userId.toString(), firstMessage[0] as Messages, null)
    ).toBe('FIRST_MESSAGE');
  });
  test('FIRST_MESSAGE_COMP', () => {
    const firstMessageComp = [{ date: new Date().toString(), userId: 2 }];

    expect(
      messageListHelper(
        userId.toString(),
        firstMessageComp[0] as Messages,
        null
      )
    ).toBe('FIRST_MESSAGE_COMP');
  });
  test('NEW_DATE', () => {
    const newDate = [
      { date: new Date().toString(), userId: 1 },
      { date: new Date('2053-03-1').toString(), userId: 1 },
    ];

    expect(
      messageListHelper(
        userId.toString(),
        newDate[0] as Messages,
        newDate[1] as Messages
      )
    ).toBe('NEW_DATE');
  });
  test('NEW_DATE_COMP', () => {
    const newDateComp = [
      { date: new Date().toString(), userId: 2 },
      { date: new Date('2053-03-1').toString(), userId: 1 },
    ];

    expect(
      messageListHelper(
        userId.toString(),
        newDateComp[0] as Messages,
        newDateComp[1] as Messages
      )
    ).toBe('NEW_DATE_COMP');
  });
  test('NEW_TIME', () => {
    const newTime = [
      { date: new Date('2023-12-06T13:13:25').toString(), userId: 1 },
      { date: new Date('2023-12-06T13:10:25').toString(), userId: 1 },
    ];

    expect(
      messageListHelper(
        userId.toString(),
        newTime[0] as Messages,
        newTime[1] as Messages
      )
    ).toBe('NEW_TIME');
  });
  test('NEW_TIME_COMP', () => {
    const newTimeComp = [
      { date: new Date('2023-12-06T13:13:25').toString(), userId: 2 },
      { date: new Date('2023-12-06T13:10:25').toString(), userId: 1 },
    ];

    expect(
      messageListHelper(
        userId.toString(),
        newTimeComp[0] as Messages,
        newTimeComp[1] as Messages
      )
    ).toBe('NEW_TIME_COMP');
  });
  test('OLD_TIME', () => {
    const oldTime = [
      { date: new Date('2023-12-06T13:10:25').toString(), userId: 1 },
      { date: new Date('2023-12-06T13:10:25').toString(), userId: 1 },
    ];

    expect(
      messageListHelper(
        userId.toString(),
        oldTime[0] as Messages,
        oldTime[1] as Messages
      )
    ).toBe('OLD_TIME');
  });
  test('OLD_TIME_COMP', () => {
    const oldTimeComp = [
      { date: new Date('2023-12-06T13:10:25').toString(), userId: 2 },
      { date: new Date('2023-12-06T13:10:25').toString(), userId: 2 },
    ];

    expect(
      messageListHelper(
        userId.toString(),
        oldTimeComp[0] as Messages,
        oldTimeComp[1] as Messages
      )
    ).toBe('OLD_TIME_COMP');
  });
});
