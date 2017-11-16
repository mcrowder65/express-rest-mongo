import {stringValidator} from "../../src/validators/index";
/*eslint-disable max-nested-callbacks*/
describe("test/validators/index.spec.js", () => {
    describe("stringValidator", () => {
        describe("edge cases", () => {
            test("undefined", () => {
                expect(() => stringValidator(undefined)).toThrow();
            });
            test("null", () => {
                expect(() => stringValidator(null)).toThrow();
            });
            test("1234", () => {
                const num = 1234;
                expect(() => stringValidator(num)).toThrow();
            });
            test("empty string", () => {
                expect(() => stringValidator("")).toThrow();
            });
        });
        describe("standard", () => {
            test("asdf", () => {
                const result = stringValidator("asdf");
                expect(result).toEqual("asdf");
            });
        });
    });
});
