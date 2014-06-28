$(document).ready(addAllScripts);

function addAllScripts() {
   addScripts([
      'Error.js',
      'HeaderFooter.js'
   ]);
}
function addScripts(scripts) {
   for (var script in scripts) {
      addScript(scripts[script]);
   }
}

function addScript(script) {
   $(document.body).append('<script type="text/javascript" src="' +
    script + '"></script>');
}
