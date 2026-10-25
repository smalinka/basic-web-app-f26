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
});