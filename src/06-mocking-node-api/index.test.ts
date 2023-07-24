import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 10_000;
    const cb = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(cb, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const timeout = 10_000;
    const cb = jest.fn();
    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeout = 10_000;
    const cb = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, timeout);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(cb, timeout);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timeout = 5_000;
    const cb = jest.fn();
    doStuffByInterval(cb, timeout);

    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(26_000);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(5);
  });
});

jest.mock('path', () => ({
  join: () => {
    // noop
  },
}));

jest.mock('fs', () => ({
  existsSync: () => true,
}));

const mockFileContent = 'some file content';
jest.mock('fs/promises', () => ({
  readFile: () => mockFileContent,
}));

describe('readFileAsynchronously', () => {
  afterAll(() => {
    jest.unmock('path');
    jest.unmock('fs');
    jest.unmock('fs/promises');
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'somefile.ext';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalled();
    expect(joinSpy.mock.calls[0]).toContain(pathToFile);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => false);
    const pathToFile = 'somefile.ext';
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
    existsSyncSpy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'somefile.ext';
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(
      mockFileContent,
    );
  });
});
