const inquirer = require("inquirer");
const gs = require("github-scraper");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
let mydataArr = {};
// const convertFactory = require("electron-html-to");

var pdf = require('html-pdf');
// var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Tabloid',
orientation: "portrait" };
 
const colors = {
    green: {
      topColor: "#53682F",
    },
    blue: {
      topColor: "#5F64D3",
    },
    pink: {
      topColor: "#EEBCC0",
    },
    red: {
      topColor: "#A20005",
    },
    mocha: {
      topColor: "#383331",
    }
  };
 
// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });


const questions = [
  {
    type: "input",
    message: "What is the GitHub username you would like a profile generated for?",
    name: "username"
  },
  {
    type: "checkbox",
    message: "What color do you want the theme to be?",
    name: "color",
    choices: ["green", "blue", "pink", "red", "mocha"]
  }
];


function init() {

  init();
}

inquirer
  .prompt(questions)
  .then(function (response) {
    console.log(response.username);
    console.log(response.color[0]);
    mydataArr.color=response.color[0];
    gs(response.username, function (err, data) {
      mydataArr.avatar = data.avatar;
      mydataArr.name = data.name;
      mydataArr.username = data.username;
      mydataArr.bio = data.bio.substring(0, data.bio.length / 2);
      mydataArr.repos = data.repos;
      mydataArr.followers = data.followers;
      mydataArr.stars = data.stars;
      mydataArr.following = data.following;
      mydataArr.userLocation = data.location.substring(0, data.location.indexOf('\n\n'));
      mydataArr.gpsLocation = "https://www.google.com/maps/place/" + encodeURIComponent(data.location.substring(0, data.location.indexOf('\n\n')));
      mydataArr.githubProfile = "https:/github.com/" + mydataArr.username;
      mydataArr.githubBlog = "https://github.blog/author/" + mydataArr.username + "/";
      console.log(mydataArr)
      const htmlFile = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
          <title>GitHub Profile Generator</title>
          <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
            background: ${colors[mydataArr.color].topColor};
        }
        img {
          margin-top:2%;
      }
        a {
            color: white;
        }
        .topColor {
          color: ${colors[mydataArr.color].topColor};
        }
        .bio-container {
            height: 50pt;
        }
        .three-links {
            margin-top: 3%;
            margin-bottom: 3%;
        }
        h4 {
            font-size: medium;
            color: cornflowerblue;
            padding-top: 3%;
        }
        h5 {
            font-size: medium;
            font-weight: 200;
        }
        .stats {
            margin-top: 1%;
            margin-right: 1%;
            margin-bottom: 1%;
            margin-left: 1%;
            border-radius: 25px;
            padding: 10px;
        }
        </style>
      </head>
      
      <body>
        <div class="container-fluid text-light text-center top">
          <img src=${mydataArr.avatar} class="rounded-circle" alt="Profile Image" width="300" height="300">
          <h1>${mydataArr.name}</h1>
          <h3>${mydataArr.username}</h3>
          <div class="three-links">
          <div class="row">
      <div class="col-3"></div>
      <div class="col-2">
        <p><i class="fas fa-location-arrow"></i>
        <a href="${mydataArr.gpsLocation}">${mydataArr.userLocation}</a></p>
      </div>
      <div class="col-2">
      <p><i class="fab fa-github"></i>
        <a href="${mydataArr.githubProfile}">GitHub Profile</a></p>
      </div>
      <div class="col-2">
      <p><i class="fas fa-file-alt"></i>
        <a href="${mydataArr.githubBlog}">GitHub Blog</a></p>
      </div>
      <div class="col-3"></div>
      </div>
  </div>
  </div>
  </div>
        <div class="container-fluid bg-white text-center bio-container">
          <h4>${mydataArr.bio}</h4>
        </div>
        <div class="container-fluid bg-white text-center">
        <div class="row">
      <div class="col-3"></div>
      <div class="col-3 bg-dark text-white stats">
          <h5>Public Repositories: ${mydataArr.repos}</h5>
          </div>
      <div class="col-3 bg-dark text-white stats">
          <h5>Followers: ${mydataArr.followers}</h5>
          </div>
      <div class="col-3"></div>
      </div>
          <div class="row">
      <div class="col-3"></div>
      <div class="col-3 bg-dark text-white stats">
          <h5>Github Stars: ${mydataArr.stars}</h5>
          </div>
      <div class="col-3 bg-dark text-white stats">
          <h5>Following: ${mydataArr.following}</h5>
          </div>
      <div class="col-3"></div>
      </div>
        </div>
        <script src="https://kit.fontawesome.com/73a5feaf89.js" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
          crossorigin="anonymous"></script>
      </body>
      
      </html>
  `
      writeToFile("githubuser.html", htmlFile).then(function () {
        console.log("Successfully wrote to githubuser.html file");
      });
      // conversion({ html: htmlFile }, function(err, result) {
      //   if (err) {
      //     return console.error(err);
      //   }

      pdf.create(htmlFile, options).toFile('githubuser.pdf', function(err, res) {
        if (err) return console.log(err);

        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
        //console.log(result.numberOfPages);
        //console.log(result.logs);
        //result.stream.pipe(fs.createWriteStream('githubprofile.pdf'));
        //conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
      });
    });


