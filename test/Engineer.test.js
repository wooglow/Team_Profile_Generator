const Engineer = require("../lib/Engineer.js")

test("github name must return via constructor", () => {
    const test = "Engineer";
    const newtest = new Engineer("AAA", 123123, "AAA@TTT.com", test);
    expect(newtest.github).toBe(test);
})

test("getrole() must return Engineer", () => {
    const test = "Engineer";
    const newtest = new Engineer("AAA", 123123, "AAA@TTT.com", "githubuser");
    expect(newtest.getRole()).toBe(test);
})

test("getGithub() must return githubname", () => {
    const test = "githubuser";
    const newtest = new Engineer("AAA", 123123, "AAA@TTT.com", test);
    expect(newtest.getGithub()).toBe(test);
})