import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';
import _ from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn().mockReturnValue(1)
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => {
      account.withdraw(2000);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    const secondAccount = getBankAccount(500);
    expect(() => {
      account.transfer(2000, secondAccount);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => {
      account.transfer(1000, account);
    }).toThrow();
  });

  test('should deposit money', () => {
    const account = getBankAccount(0);
    account.deposit(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const secondAccount = getBankAccount(0);
    account.transfer(20, secondAccount);
    expect(account.getBalance()).toBe(80);
    expect(secondAccount.getBalance()).toBe(20);
  });

/*   test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  }); */

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).not.toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
