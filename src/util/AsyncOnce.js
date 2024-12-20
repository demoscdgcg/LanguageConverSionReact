//函数接受一个异步函数作为参数   返回一个新的函数，新的函数同时只能被调用一次，多次调用只返回第一次调用的结果
// export function asyncOnce(callback: (...args: []) => Promise<any>) {

// export function asyncOnce(callback) {
//   let isPending = false;
//   const result = [];
//   return (...args) => {
//     return new Promise((resolve, reject) => {
//       result.push({ resolve, reject });
//       if (isPending) return;
//       isPending = true;
//       callback(...args)
//         .then((response) => {
//           result.forEach(({ resolve }) => resolve(response));
//         })
//         .catch((error) => {
//           result.forEach(({ reject }) => reject(error));
//         })
//         .finally(() => {
//           result.length === 0;
//           isPending = false;
//         });
//     });
//   };
// }

export function asyncOnce(callback) {
  const map = {};
  return (...args) => {
    return new Promise((resolve, reject) => {
      const key = JSON.stringify(args);
      if (!map[key]) {
        map[key] = {
          resolve: [],
          reject: [],
          isPending: false,
        };
      }

      const state = map[key];
      state.resolve.push(resolve);
      state.reject.push(reject);

      if (!state.isPending) return;

      callback(...args)
        .then((response) => {
          state.resolve.forEach(({ resolve }) => resolve(response));
        })
        .catch((error) => {
          state.reject.forEach(({ reject }) => reject(error));
        })
        .finally(() => {
          map[key] = null;
        });
    });
  };
}
