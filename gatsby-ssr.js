/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

 const abScript = `
  window.rlxABMode = 'a'
  if(!/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)){
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    window.rlxABMode = getCookie('rlx-ab-mode')
    if(!window.rlxABMode){
      window.rlxABMode = Math.floor(Math.random() * (1 - 0 + 1)) ? 'a' : 'b'
      setCookie('rlx-ab-mode', window.rlxABMode, 30)
    }
  }
  document.getElementsByTagName('body')[0].className = 'ab-mode-'+window.rlxABMode
 `

// You can delete this file if you're not using it
exports.onRenderBody = ({setPreBodyComponents}) => {
  var React = require('react')
  setPreBodyComponents([<script key='rlx-ab-mode-script' dangerouslySetInnerHTML={{__html: abScript}}/>])
}