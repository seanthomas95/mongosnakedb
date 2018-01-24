// The variable must be outside the function to export.
var person;

function sendLogin() {

    person = document.getElementById("nameInput").value;

    // If the user does not input a name, their name will be 'anonymous'.
    if (person === "") {
        person = "anonymous";
    }

    console.log("pre" + person);

    window.location.replace("game.html?data=" + person);

    console.log("post" + person);

    console.log('%c Username: ' + person + ' ', 'background: #F0FF74; color: black');
}