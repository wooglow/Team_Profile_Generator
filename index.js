const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

function init() {
    startHtml();
    addMember();
}
init();

function addMember () {
    inquirer.prompt
        ([{
        type: 'input',
        message: "What's your name?",
        name: 'name'
        },
        {
        type: 'input',
        message: 'Put your ID',
        name: 'id',
        },
        {
        type: 'input',
        message: "What's your email address?",
        name: 'email',
        },
        {
        type: 'list',
        message: "What's role in your team?",
        name: 'role',
        choices: ["Manager","Engineer","Intern"]
        }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Manager") {
            roleInfo = "officenumber"
        } else if (role === "Engineer") {
            roleInfo = "githubname"
        } else {
            roleInfo = "schoolname"
        }
        inquirer.prompt([{
            type: 'input',
            message: `Put your teammates ${roleInfo}`,
            name: 'roleInfo'
        },
        {
            type: 'list',
            message: "Do you want add more teammates?",
            name: 'addroute',
            choices: ["Yes","No"]
        }])
        .then(function({roleInfo, addroute}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
        employees.push(newMember);
        addHTML(newMember)
        .then(function() {
            if (addroute === "Yes") {
                addMember();
            } else {
                finishHTML();
            }
        });   
    });
});
}



function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-primary mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dist/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Please type your info");
}

function addHTML(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-4">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}">${gitHub}</a></li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const schoolName = member.getSchool();
            data = `<div class="col-4">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">School: ${schoolName}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="col-4">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Office Number: ${officeNumber}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("Processing>>>>>>>>>>>>");
        fs.appendFile("./dist/team.html", data, function (err) {
            if (err) {
                return reject(err);
            } else return resolve(); });
})};

function finishHTML() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Your Team Profile has been made. Please Check 'dist' folder in working directory");
}