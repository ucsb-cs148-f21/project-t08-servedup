import mockAsyncStorage from 'node_modules/@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('node_modules/@react-native-async-storage/async-storage', () => mockAsyncStorage);