const Manager = require("../lib/Manager.js")

test("officenumber must return via constructor", () => {
    const test = "987";
    const newtest = new Manager("AAA", 123123, "AAA@TTT.com", test);
    expect(newtest.officeNumber).toBe(test);
})

test("getRole() must return Manager", () => {
    const test = "Manager";
    const newtest = new Manager("AAA", 123123, "AAA@TTT.com", 987);
    expect(newtest.getRole()).toBe(test);
})

test("getOffice() must return officenumber", () => {
    const test = "987";
    const newtest = new Manager("AAA", 123123, "AAA@TTT.com", test);
    expect(newtest.getOfficeNumber()).toBe(test);
})