export function findPost(state, PID, obj, list) {
  if (!PID) return null;

  if (!Object.prototype.hasOwnProperty.call(state, obj)) {
    console.error(`The object ${obj} is not found in state`);
    return null;
  }

  if (!Object.prototype.hasOwnProperty.call(state[obj], list)) {
    console.error(`The list ${list} is not found in the object ${obj}`);
    return null;
  }

  let target = state[obj][list];
  const posts =
    Object.prototype.hasOwnProperty.call(target, "posts") &&
    Array.isArray(target.posts)
      ? target.posts
      : Array.isArray(target)
      ? target
      : null;

  if (!posts) {
    console.error(`There is no searchable list with name ${list} in ${obj}`);
    return null;
  }

  const targetedPost = posts.find((post) => post.PID === PID);

  if (!targetedPost) {
    console.error(
      `There is no post with PID ${PID} in the list ${list} inside ${obj}`
    );
    return null;
  }

  return targetedPost;
}

// Find Reel

export function findReel(state, RID, obj, list) {
  if (!RID) return null;

  if (!Object.prototype.hasOwnProperty.call(state, obj)) {
    console.error(`The object ${obj} is not found in state`);
    return null;
  }

  if (!Object.prototype.hasOwnProperty.call(state[obj], list)) {
    console.error(`The list ${list} is not found in the object ${obj}`);
    return null;
  }

  let target = state[obj][list];
  const reels =
    Object.prototype.hasOwnProperty.call(target, "reels") &&
    Array.isArray(target.reels)
      ? target.reels
      : Array.isArray(target)
      ? target
      : null;

  if (!reels) {
    console.error(`There is no searchable list with name ${list} in ${obj}`);
    return null;
  }

  const targetedReel = reels.find((reel) => reel.RID === RID);

  if (!targetedReel) {
    console.error(
      `There is no reel with RID ${RID} in the list ${list} inside ${obj}`
    );
    return null;
  }

  return targetedReel;
}
export function GenerateUniqueID() {
  const alphabetAndNumbers = "abcdefghijklmnopqrstuvwxyz0123456789";
  let char_1 = null,
    char_2 = null,
    char_3 = null,
    char_4 = null,
    len = alphabetAndNumbers.length;
  function rand(n) {
    let num = Math.floor(Math.random() * n);
    if (num > n) {
      return (num -= 2);
    } else {
      return num;
    }
  }
  for (let i = 0; i < len; i++) {
    char_1 = alphabetAndNumbers[rand(len)];
    char_2 = alphabetAndNumbers[rand(len)];
    char_3 = alphabetAndNumbers[rand(len)];
    char_4 = alphabetAndNumbers[rand(len)];
  }
  return char_1 + char_2 + char_3 + char_4;
}
