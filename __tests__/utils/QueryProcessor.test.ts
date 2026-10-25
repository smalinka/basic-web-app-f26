import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "simon"
          ));
    })

    test('should add two numbers', () => {
        const query = "What is 14 plus 59?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("73");
    })

    test('should add more than two numbers', () => {
        const query = "What is 1 plus 2 plus 3?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("6");
    })

    test('should return the largest number', () => {
        const query = "Which of the following numbers is the largest: 55, 66, 53?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("66");
    })

    test('should compute large powers exactly', () => {
        const query = "What is 18 to the power of 69?";
        const response: string = QueryProcessor(query);
        expect(response).toBe(
            "410963122147519885718066723155689209764147116520545174410510008329199685768993065402368"
        );
    })

    test('should multiply', () => {
        expect(QueryProcessor("What is 54 multiplied by 7?")).toBe("378");
    })

    test('should subtract', () => {
        expect(QueryProcessor("What is 92 minus 4?")).toBe("88");
    })

    test('should respect operator precedence', () => {
        expect(QueryProcessor("What is 2 plus 3 multiplied by 4?")).toBe("14");
        expect(QueryProcessor("What is 5 multiplied by 3 plus 2?")).toBe("17");
    })

    test('should return the smallest number', () => {
        expect(QueryProcessor("Which of the following numbers is the smallest: 55, 66, 53?")).toBe("53");
    })

    test('should return primes', () => {
        expect(QueryProcessor("Which of the following numbers are primes: 27, 25, 64, 19, 85?")).toBe("19");
        expect(QueryProcessor("Which of the following numbers are primes: 29, 88, 3, 66, 95?")).toBe("29, 3");
    })

    test('should return numbers that are both a square and a cube', () => {
        expect(QueryProcessor("Which of the following numbers is both a square and a cube: 64, 100, 729, 8?")).toBe("64, 729");
    })
});