export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let rN = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[rN];
    arr[rN] = temp;
  }

  return arr;
};
