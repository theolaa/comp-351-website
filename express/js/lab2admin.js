questions = document.getElementById("questions");

function removeQuestion(e) {
    if (e.parentNode.children.length == 1) {
        alert("You cannot remove the last question.");
    } else {
        parent = e.parentNode;
        e.remove();
        for (i = 0; i < parent.children.length; i++) {
            parent.replaceChild(renumberQuestion(parent.children[i], i + 1), parent.children[i]);
        }
    }
}

function addQuestion(question, code, options, correctAnswer) {
    questionNumber = questions.children.length + 1;

    newQuestion = questions.firstElementChild.cloneNode(true);

    newQuestion = renumberQuestion(newQuestion, questionNumber);

    questions.append(newQuestion);

}

function renumberQuestion(node, number) {

    node.children[0].setAttribute("id", "questionForm" + number);
    formGroup = node.children[0].children[0];
    formGroup.children[0].innerText = "Question " + number;
    formGroup.children[2].children[0].setAttribute("for", "questionText" + number);
    formGroup.children[2].children[2].setAttribute("name", "questionText" + number);
    formGroup.children[2].children[2].setAttribute("id", "questionText" + number);
    formGroup.children[3].children[0].setAttribute("for", "code" + number);
    formGroup.children[3].children[2].setAttribute("name", "code" + number);
    formGroup.children[3].children[2].setAttribute("id", "code" + number);
    formGroup.children[3].children[2].setAttribute("form", "questionForm" + number);
    formGroup.children[5].children[2].setAttribute("name", "correctAnswer" + number);
    formGroup.children[5].children[2].setAttribute("id", "correctAnswer" + number);

    return node;

}

function saveQuestion() {
    optionArray = new Array();
    for (i = 0; i < options.children.length - 1; i++) {
        optionArray.push(options.children[i].children[2].children[0].value);
    }

    questionJSON = {
        id: Number(localStorage.getItem("nextID")),
        questionText: document.getElementById("question").value,
        code: document.getElementById("code").value,
        options: optionArray,
        answer: document.getElementById("correctAnswer").value
    }

    var questionsArray = [];
    if (localStorage.getItem("questions")) {
        questionsArray = JSON.parse(localStorage.getItem("questions"));
    }
    questionsArray.push(questionJSON);

    localStorage.setItem("questions", JSON.stringify(questionsArray));

    // Increment ID
    localStorage.setItem("nextID", Number(localStorage.getItem("nextID")) + 1)
}

function getLetterFromInt(i) {
    switch (i) {
        case 1: return "A"; break;
        case 2: return "B"; break;
        case 3: return "C"; break;
        case 4: return "D"; break;
        case 5: return "E"; break;
        case 6: return "F"; break;
        case 7: return "G"; break;
        case 8: return "H"; break;
        case 9: return "I"; break;
        case 10: return "J"; break;
        default: return ":("; break;
    }
}

function addOption(e) {
    optionNumber = e.children.length;
    if (optionNumber > 10) {
        alert("Cannot have more than ten options.\nSeriously, why would you want that anyways?");
        return;
    }
    optionLetter = getLetterFromInt(optionNumber);

    option = document.createElement("div");
    option.setAttribute("class", "option pb-2 row");
    option.setAttribute("id", "option" + optionLetter);

    label = document.createElement("label");
    label.innerText = "Option " + optionLetter;

    textColumn = document.createElement("div");
    textColumn.setAttribute("class", "col-sm col-sm-10");

    optionText = document.createElement("input");
    optionText.setAttribute("type", "text");
    optionText.setAttribute("class", "form-control");
    optionText.setAttribute("name", "option" + optionLetter + "text");
    optionText.setAttribute("id", "option" + optionLetter + "text");

    delButtonColumn = document.createElement("div");
    delButtonColumn.setAttribute("class", "col col-sm-2");

    delButton = document.createElement("button");
    delButton.setAttribute("class", "btn bg-danger text-light col form-control");
    delButton.setAttribute("onclick", "removeOption(this.parentNode.parentNode)");
    delButton.innerText = " X ";

    option.append(label);
    option.append(document.createElement("br"));

    textColumn.append(optionText);
    delButtonColumn.append(delButton);

    option.append(textColumn);
    option.append(delButtonColumn);

    e.insertBefore(option, e.children[e.children.length - 1]);

    correctAnswerOption = document.createElement("option");
    correctAnswerOption.setAttribute("value", optionLetter.toLowerCase());
    correctAnswerOption.innerText = optionLetter;
    e.nextElementSibling.lastElementChild.append(correctAnswerOption);

}

function removeOption(e) {
    if (e.parentNode.children.length <= 2) {
        alert("You cannot remove the last option.");
    } else {
        parent = e.parentNode;
        e.parentNode.nextElementSibling.lastElementChild.lastElementChild.remove();
        e.parentNode.removeChild(e);
        renameOptions(parent);
    }
}

function renameOptions(e) {
    for (i = 0; i < e.children.length - 1; i++) {
        // Label
        optionLetter = getLetterFromInt(i + 1);
        e.children[i].children[0].setAttribute("for", "option" + optionLetter + "text");
        e.children[i].children[0].innerText = "Option " + optionLetter;

        // Text Column
        e.children[i].children[2].setAttribute("name", "option" + optionLetter + "text");
        e.children[i].children[2].setAttribute("id", "option" + optionLetter + "text");
    }
}

window.onload = function () {
    if (!localStorage.getItem("nextID")) {
        localStorage.setItem("nextID", 0);
    }
}