function checkCookie() {
  var token = getCookie("token");
  if (token !== "") {
    return token;
  } else {
    return "NEED_TO_LOGIN";
  }
}

function setCookie(cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = "token" + "=" + cvalue + ";" + expires + ";path=/";
  return true;
}

function getCookie() {
  var name = "token" + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie() {
  setCookie("");
}

export default { setCookie, getCookie, checkCookie, deleteCookie };
