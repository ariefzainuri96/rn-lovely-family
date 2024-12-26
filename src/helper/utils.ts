import { RequestState } from './enums';

export function delay(ms: number) {
  // function to delay the execution of a function
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getRandomNumber = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
}

export function getState(isLoading: boolean = false, isError: boolean = false): RequestState {
  if (isLoading) return RequestState.LOADING;
  if (isError) return RequestState.ERROR;

  return RequestState.SUCCESS;
}

export function generateStringArray(total: number = 10): string[] {
  const array: string[] = [];
  for (let i = 0; i < total; i++) {
    array.push(generateRandomString(6));
  }

  return array;
}

export async function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
  try {
    const data = await promise;
    return [undefined, data] as [undefined, T];
  } catch (error) {
    return [error] as [Error];
  }
}

export function defaultValue(value: string | null | undefined, defaultValue: string): string {
  return value === null || value === undefined || value.trim() === '' ? defaultValue : value;
}
