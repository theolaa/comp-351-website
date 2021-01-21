questionAdder = document.getElementById("questionInput");
questionEditor = document.getElementById("questionEditor");

options = document.getElementById("options");
addOptionButton = document.getElementById("addOptionButton");
correctAnswer = document.getElementById("correctAnswer");

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

function addOption() {
    optionNumber = options.children.length;
    if (optionNumber > 10) {
        alert("Cannot have more than ten options.\nSeriously, why would you want that anyways?");
        return;
    }
    optionLetter = getLetterFromInt(optionNumber);

    option = document.createElement("div");
    option.setAttribute("class", "option pb-2 row");
    option.setAttribute("id", "option" + optionLetter);

    label = document.createElement("label");
    label.setAttribute("for", "option" + optionLetter + "text");
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

    addOptionButton.parentNode.insertBefore(option, addOptionButton);

    correctAnswerOption = document.createElement("option");
    correctAnswerOption.setAttribute("value", optionLetter.toLowerCase());
    correctAnswerOption.innerText = optionLetter;
    correctAnswer.append(correctAnswerOption);

}

function removeOption(e) {
    if (options.children.length <= 2) {
        alert("You cannot remove the last option.");
    } else {
        e.parentNode.removeChild(e);
        renameOptions();
        correctAnswer.lastChild.remove();
    }
}

function renameOptions() {
    for (i = 0; i < options.children.length - 1; i++) {
        // Label
        optionLetter = getLetterFromInt(i+1);
        options.children[i].children[0].setAttribute("for", "option" + optionLetter + "text");
        options.children[i].children[0].innerText = "Option " + optionLetter;

        // Text Column
        options.children[i].children[2].setAttribute("name", "option" + optionLetter + "text");
        options.children[i].children[2].setAttribute("id", "option" + optionLetter + "text");
    }
}

function showAddQuestion() {
    questionAdder.style.display = "block";
    questionEditor.style.display = "none";
}

function showEditQuestion() {
    questionEditor.style.display = "block";
    questionAdder.style.display = "none";
}