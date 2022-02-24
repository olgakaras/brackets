module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;
  let pairsArray = [];
  let pairsCount = str.length / 2;
  const escaping = ["[", "]", "^", "$", ".", "|", "?", "*", "+", "(", ")"];
  for (let i = 0; i < bracketsConfig.length; i++) {
    let first = bracketsConfig[i][0];
    if (escaping.includes(first)) first = "\\" + first;

    let second = bracketsConfig[i][1];
    if (escaping.includes(second)) second = "\\" + second;

    pairsArray[i] = first + second;
  }

  let regExp = new RegExp(pairsArray.join("|"));

  for (let i = 0; i < pairsCount; i++) {
    let position = str.search(regExp);
    if (position !== -1) {
      str = str.slice(0, position) + str.slice(position + 2);
    } else {
      return false;
    }
  }

  return true;
};