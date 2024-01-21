// Utils

export const randomInteger = (minimum: number, maximum: number) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);

let sleepTimeoutId: NodeJS.Timeout | null = null;

export function sleep({ delay = randomInteger(500, 1500), errorProbability = 0.5, errorMessage = 'Error!' }) {
  if (sleepTimeoutId)
    clearTimeout(sleepTimeoutId);

  if (Math.random() < errorProbability) {
    return new Promise((_resolve, reject) => {
      sleepTimeoutId = setTimeout(() => reject(new Error(errorMessage)), delay);
    });
  }

  return new Promise((resolve) => {
    sleepTimeoutId = setTimeout(resolve, delay);
  });
}
