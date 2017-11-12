import {stringValidator} from "../../src/validators/index";
/*eslint-disable max-nested-callbacks*/
describe("test/validators/index.spec.js", () => {
    describe("stringValidator", () => {
        describe("edge cases", () => {
            it("undefined", () => {
                expect(() => stringValidator(undefined)).to.throw();
            });
            it("null", () => {
                expect(() => stringValidator(null)).to.throw();
            });
            it("1234", () => {
                const num = 1234;
                expect(() => stringValidator(num)).to.throw();
            });
            it("empty string", () => {
                expect(() => stringValidator("")).to.throw();
            });
        });
        describe("standard", () => {
            it("asdf", () => {
                const result = stringValidator("asdf");
                expect(result).equal("asdf");
            });
        });
    });
});
