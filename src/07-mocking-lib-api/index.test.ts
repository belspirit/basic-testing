import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let getSpy: any;
  const responseData = 'some data';

  beforeEach(() => {
    getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: responseData }));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    getSpy.mockRestore();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('some-path');
    jest.runAllTimers();

    const baseURLProvided = createSpy.mock.calls[0]?.[0]?.baseURL;
    const { baseURL } = createSpy.mock.results[0]?.value.defaults;
    expect(baseURLProvided).toBe(baseURL);
    createSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'some-relative-path';
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    const getRelativePath = getSpy.mock.calls[0]?.[0];
    expect(getRelativePath).toBe(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = 'some-relative-path';
    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(result).toBe(responseData);
  });
});
