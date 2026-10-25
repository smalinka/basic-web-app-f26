// BigInt keeps large results exact; no `**` or `1n` literals since target is es5
function power(base: bigint, exponent: bigint): bigint {
  let result = BigInt(1);
  for (let i = BigInt(0); i < exponent; i = i + BigInt(1)) {
    result = result * base;
  }
  return result;
}

// Evaluates e.g. "2 plus 3 multiplied by 4" with normal operator precedence
function evaluate(expression: string): string | null {
  const tokens = expression
    .trim()
    .split(/\s+(plus|minus|multiplied by|divided by|to the power of)\s+/i);
  const numbers: bigint[] = [];
  const operators: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 === 0) {
      if (!/^-?\d+$/.test(tokens[i])) {
        return null;
      }
      numbers.push(BigInt(tokens[i]));
    } else {
      operators.push(tokens[i].toLowerCase());
    }
  }
  if (operators.length === 0) {
    return null;
  }

  const precedence = [
    ["to the power of"],
    ["multiplied by", "divided by"],
    ["plus", "minus"],
  ];
  for (const level of precedence) {
    let i = 0;
    while (i < operators.length) {
      if (level.indexOf(operators[i]) === -1) {
        i++;
        continue;
      }
      const a = numbers[i];
      const b = numbers[i + 1];
      let result: bigint;
      switch (operators[i]) {
        case "to the power of":
          result = power(a, b);
          break;
        case "multiplied by":
          result = a * b;
          break;
        case "divided by":
          if (b === BigInt(0)) {
            return null;
          }
          result = a / b;
          break;
        case "plus":
          result = a + b;
          break;
        default:
          result = a - b;
      }
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
    }
  }
  return numbers[0].toString();
}

function isPrime(n: number): boolean {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function isSquareAndCube(n: number): boolean {
  const root = Math.round(Math.pow(n, 1 / 6));
  return Math.pow(root, 6) === n;
}

// Numbers listed after the colon in "Which of the following numbers ...: 1, 2, 3?"
function listedNumbers(query: string): number[] {
  const list = query.slice(query.indexOf(":") + 1).match(/-?\d+/g) || [];
  return list.map((n) => parseInt(n, 10));
}

export default function QueryProcessor(query: string): string {
  const lower = query.toLowerCase();

  const mathMatch = query.match(/what is (.+?)\??\s*$/i);
  if (mathMatch) {
    const result = evaluate(mathMatch[1]);
    if (result !== null) {
      return result;
    }
  }

  if (lower.includes("which of the following numbers")) {
    const numbers = listedNumbers(query);
    if (lower.includes("largest")) {
      return Math.max(...numbers).toString();
    }
    if (lower.includes("smallest")) {
      return Math.min(...numbers).toString();
    }
    if (lower.includes("prime")) {
      return numbers.filter(isPrime).join(", ");
    }
    if (lower.includes("square and a cube")) {
      return numbers.filter(isSquareAndCube).join(", ");
    }
  }

  if (lower.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lower.includes("name")) {
    return "simon";
  }

  if (lower.includes("age")) {
    return "67";
  }

  return "";
}
