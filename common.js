$(document).ready(addAllScripts);

function addAllScripts() {
   addScripts([
      'Error.js',
      'HeaderFooter.js'
   ]);
}
function addScripts(scripts) {
   $.ajaxSetup({cache: true});
   for (var script in scripts) {
      addScript(scripts[script]);
   }
   $.ajaxSetup({cache: false});
}

function addScript(script) {
   $(document.body).append('<script type="text/javascript" src="' +
    calcScriptUrl(script) + '"></script>');
}

var dirsDeep = null;
function calcScriptUrl(script) {
   if (dirsDeep === null) {
      dirsDeep = location.pathname.split('/').length - 1;
   }

   var remaining = dirsDeep;
   var path = '';

   while (remaining--) {
      path += '../'
   }

   return path + script;
}
