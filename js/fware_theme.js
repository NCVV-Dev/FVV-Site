function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax"
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

if (getCookie("themebtn") == 'pressed') {
    setCookie("themebtn", "pressed", 365)
    localStorage.setItem('data-theme', 'nvv');
    document.body.setAttribute('data-theme', 'nvv')
} else {
    setCookie("themebtn", "notpressed", 365)
    localStorage.setItem('data-theme', 'fware');
    document.body.setAttribute('data-theme', 'fware')
}

function switchtheme() {
    if (getCookie("themebtn") == 'notpressed') {
        document.body.setAttribute('data-theme', 'nvv');
        localStorage.setItem('data-theme', 'nvv');
        setCookie("themebtn", "pressed", 365)
    } else {
        document.body.setAttribute('data-theme', 'fware');
        localStorage.setItem('data-theme', 'fware');
        setCookie("themebtn", "notpressed", 365)
    }
}