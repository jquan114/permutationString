Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

var checkInclusion = function(s1, s2) {
     if (s1.length > s2.length) {
        return false;
    }
    let s1Map = new Map();
    let s2Map = new Map();
    for (let i = 0; i < s1.length; i++) {
        if (!s1Map.has(s1[i])) {
            s1Map.set(s1[i], 1);
        } else {
            s1Map.set(s1[i], s1Map.get(s1[i]) + 1);
        }
    }
    for (let i = 0; i < s1.length; i++) {
        if (!s2Map.has(s2[i])) {
            s2Map.set(s2[i], 1);
        } else {
            s2Map.set(s2[i], s2Map.get(s2[i]) + 1);
        }
    }
    for (let i = 0; i < s2.length - s1.length; i++) {
        if (isMatch(s1Map, s2Map)) {
            return true;
        }
        let startChar = s2[i];
        let endChar = s2[i + s1.length];
        s2Map.set(startChar, s2Map.get(startChar) - 1);
        if (s2Map.get(startChar) === 0) {
            s2Map.delete(startChar);
        }
        if (!s2Map.has(endChar)) {
            s2Map.set(endChar, 1);
        } else {
            s2Map.set(endChar, s2Map.get(endChar) + 1);
        }
    }
    return isMatch(s1Map, s2Map);
}

function isMatch(s1Map, s2Map) {
    if (s1Map.size !== s2Map.size) {
        return false;
    }
    for (let [key, value] of s1Map) {
        if (!s2Map.has(key) || s2Map.get(key) !== value) {
            return false;
        }
    }
    return true;
};
