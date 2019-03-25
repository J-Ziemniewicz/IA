function isEmpty(a) {
    if (a.length == '0') {
        return true;
    } else {
        return false;
    }
}

function validate(formularz) {
    var validated = true;
    if (!checkStringAndFocus(formularz.elements["f_imie"], "Please enter correct name")) {
        document.getElementsByName("f_imie")[0].className = 'wrong';
        validated = false;
    }
    if (!checkString(formularz.elements["f_nazwisko"].value, "Please enter correct surename")) {
        document.getElementsByName("f_nazwisko")[0].className = 'wrong';
        validated = false;
    }
    if (checkZIPCodeRegEx(formularz.elements["f_kod"].value)) {
        document.getElementsByName("f_kod")[0].className = 'wrong';
        validated = false;
    }
    if (!checkString(formularz.elements["f_ulica"].value, "Please enter correct street")) {
        document.getElementsByName("f_ulica")[0].className = 'wrong';
        validated = false;
    }
    if (!checkString(formularz.elements["f_miasto"].value, "Please enter correct city")) {
        document.getElementsByName("f_miasto")[0].className = 'wrong';
        validated = false;
    }
    if (!checkEmailRegEx(formularz.elements["f_email"].value)) {
        document.getElementsByName("f_email")[0].className = 'wrong';
        validated = false;
    }
    return validated;
}

function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (ws.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

function checkString(str, msg_alert) {
    if (isEmpty(str) || isWhiteSpace(str)) {
        alert(msg_alert);
        return false;
    }
    else
        return true;
}

function checkEmail(str) {
    if (isWhiteSpace(str)) {
        alert("Podaj właściwy e-mail");
        return false;
    }
    else {
        var at = str.indexOf("@");
        if (at < 1) {
            alert("Nieprawidłowy e-mail");
            return false;
        }
        else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                alert("Nieprawidłowy e-mail");
                return false;
            }
        }
        return true;
    }
}

function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        startTimer(errorFieldName)
        obj.focus();
        return false;
    }
    else {
        return true;
    }
}

var errorField = "";

function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}

function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        alert("Podaj właściwy e-mail");
        return false;
    }
}

function checkZIPCodeRegEx(str) {
    var zip = /\d{2}-\d{3}/;
    if (zip.test(str)) {
        document.getElementById('kod').innerHTML = "OK";
        document.getElementById('kod').className = "green";
        return false;
    } else {
        document.getElementById('kod').innerHTML = "Wrong ZIP";
        document.getElementById('kod').className = "red";
        return true;
    }

}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}
function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}
function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}

alterRows(1, document.getElementsByTagName('tr'));