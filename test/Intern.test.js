const Intern = require("../lib/Intern.js")

test("schoolname must return via constructor", () => {
    const test = "UCSD";
    const newtest = new Intern("AAA", 123123, "AAA@TTT.com", test);
    expect(newtest.school).toBe(test);
})

test("getRole() must return Intern", () => {
    const test = "Intern";
    const newtest = new Intern("AAA", 123123, "AAA@TTT.com", "UCSD");
    expect(newtest.getRole()).toBe(test);
})

test("getSchool() must return schoolname", () => {
    const test = "UCSD";
    const newtest = new Intern("AAA", 123123, "AAA@TTT.com", test);
    expect(newtest.getSchool()).toBe(test);
})