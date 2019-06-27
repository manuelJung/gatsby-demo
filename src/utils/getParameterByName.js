let hasWindow
try {if(window) hasWindow = true}
catch(e) {hasWindow=false}

export default function getParameterByName(name, url, inHash) {
  if (!url) url = (hasWindow && window.location.href) || '';
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp((inHash ? "[#&]" : "[?&]") + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}