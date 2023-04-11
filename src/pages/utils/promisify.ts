export default function<T>(fn: (...args: any[]) => void): (...args: any[]) => Promise<T> {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error: Error, result: T) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}