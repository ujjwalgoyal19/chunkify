function computePrefixFunction(pattern: String) {
  const lengthOfPattern = pattern.length;
  const pi = Array(lengthOfPattern).fill(0);
  let k = 0;

  for (let i = 0; i < lengthOfPattern; i++) {
    while (k > 0 && pattern.charAt(k) !== pattern.charAt(i)) {
      k = pi[k - 1];
    }
    if (pattern.charAt(k) === pattern.charAt(i)) {
      k++;
    }
    pi[i] = k;
  }

  return pi;
}

// export function kmpOverlap(str1:String, str2:String){
//   const combinedStr = str1+"#"+str2;
//   const pi = computePrefixFunction(combinedStr);

//   const overlap = pi[pi.length-1];

//   const highlightedStr1 = str1.substring()
// }
