import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {
      // noop
    });
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).toBeCalledTimes(3);
    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(logSpy).toBeCalled();
    logSpy.mockRestore();
  });
});
