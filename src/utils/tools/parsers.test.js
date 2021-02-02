import {
  parseQTcFra,
  parseSexFromIndex,
  parseCustomDateString,
  parseAgeFromDateString,
} from './parsers';

describe('Parsers', () => {
  it('correctly parses sex from index', () => {
    expect(parseSexFromIndex(0)).toBe('Male');
    expect(parseSexFromIndex(1)).toBe('Female');
  });

  it('correctly parses custom date string', () => {
    expect(parseCustomDateString(new Date(2000, 0, 1))).toBe('Jan 01, 2000');
  });

  it('correctly parses age from date string', () => {
    expect(parseAgeFromDateString('Jan 1, 2000')).toBe(21);
  });

  it('correctly parses QTcFra', () => {
    expect(parseQTcFra(304, 133)).toBe(389);
  });
});
