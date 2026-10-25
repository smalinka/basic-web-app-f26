export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "simon";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  const addMatch = query.match(/what is (-?\d+(?:\s+plus\s+-?\d+)+)/i);
  if (addMatch) {
    const sum = addMatch[1]
      .split(/\s+plus\s+/i)
      .reduce((total, n) => total + parseInt(n, 10), 0);
    return sum.toString();
  }

  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/-?\d+/g);
    if (numbers) {
      return Math.max(...numbers.map((n) => parseInt(n, 10))).toString();
    }
  }

  return "";
}
