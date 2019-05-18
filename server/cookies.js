export function getCookies(cookie) {
  var c = cookie,
    v = 0,
    cookies = {};
  if (cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
    c = RegExp.$1;
    v = 1;
  }
  if (v === 0) {
    c.split(/[,;]/).map(function(cookie) {
      var parts = cookie.split(/=/, 2),
        name = decodeURIComponent(parts[0].trimLeft()),
        value =
          parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
      cookies[name] = value;
    });
  } else {
    c
      .match(
        /(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g
      )
      .map(function($0, $1) {
        var name = $0,
          value =
            $1.charAt(0) === '"'
              ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
              : $1;
        cookies[name] = value;
      });
  }
  return cookies;
}
