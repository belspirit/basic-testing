import 'jest-extended';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 42;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 42;
    const account = getBankAccount(balance);
    expect(() => {
      account.withdraw(balance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 42;
    const account = getBankAccount(balance);
    expect(() => account.transfer(1, account)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 42;
    const account = getBankAccount(balance);
    expect(() => account.transfer(1, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 42;
    const account = getBankAccount(balance);
    expect(account.deposit(10).getBalance()).toBe(52);
  });

  test('should withdraw money', () => {
    const balance = 42;
    const account = getBankAccount(balance);
    expect(account.withdraw(10).getBalance()).toBe(32);
  });

  test('should transfer money', () => {
    const balance = 42;
    const account1 = getBankAccount(balance);
    const account2 = getBankAccount(balance);
    account1.transfer(10, account2);
    expect(account1.getBalance()).toBe(32);
    expect(account2.getBalance()).toBe(52);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 42;
    const account = getBankAccount(balance);
    await expect(account.fetchBalance()).resolves.toSatisfy(
      (x) => x === null || typeof x === 'number',
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 42;
    const account = getBankAccount(balance);
    const newBalance = 125;
    const fetchBalanceSpy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementationOnce(() => Promise.resolve(newBalance));
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
    fetchBalanceSpy.mockClear();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 42;
    const account = getBankAccount(balance);
    const fetchBalanceSpy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementationOnce(() => Promise.resolve(null));
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    fetchBalanceSpy.mockClear();
  });
});
