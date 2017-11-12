export const stringValidator = str => {
    if (!str) {
        throw new Error("str not defined");
    }
    if (typeof str !== "string") {
        throw new Error("str is not a string");
    }
    return str;
};

