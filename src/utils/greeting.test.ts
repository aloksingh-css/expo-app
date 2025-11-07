import { describe, expect, it } from 'bun:test';
import { getFormalGreeting, getGreeting } from './greeting';

describe('greeting utils', () => {
  describe('getGreeting', () => {
    it('should return a greeting with the provided name', () => {
      expect(getGreeting('Alice')).toBe('Hello, Alice!');
    });

    it('should work with different names', () => {
      expect(getGreeting('Bob')).toBe('Hello, Bob!');
      expect(getGreeting('Charlie')).toBe('Hello, Charlie!');
    });

    it('should throw error for empty string', () => {
      expect(() => getGreeting('')).toThrow('Name cannot be empty');
    });

    it('should throw error for whitespace only', () => {
      expect(() => getGreeting('   ')).toThrow('Name cannot be empty');
    });
  });

  describe('getFormalGreeting', () => {
    it('should return a formal greeting with the provided name', () => {
      expect(getFormalGreeting('Alice')).toBe('Good day, Alice.');
    });

    it('should work with different names', () => {
      expect(getFormalGreeting('Bob')).toBe('Good day, Bob.');
    });

    it('should throw error for empty string', () => {
      expect(() => getFormalGreeting('')).toThrow('Name cannot be empty');
    });
  });
});

