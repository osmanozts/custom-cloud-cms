export const replaceSpecialChars = (str: string): string => {
  const charMap: { [key: string]: string } = {
    ä: "a",
    ö: "o",
    ü: "u",
    Ä: "A",
    Ö: "O",
    Ü: "U",
    ß: "s",
  };

  // Normalize the string to decomposed form (NFD)
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[äöüÄÖÜß]/g, (char) => charMap[char] || char);
};
