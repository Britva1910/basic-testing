import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relativePath = '/test';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockedAxiosCreate = axios.create as jest.Mock;
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'Test data' }),
    };
    mockedAxiosCreate.mockReturnValueOnce(axiosClient);

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxiosCreate).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'Test data' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(axiosClient.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'Test data' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers(); 

    expect(result).toEqual('Test data');
  });
})