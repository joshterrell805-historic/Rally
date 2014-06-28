$(document).ready(addHeaderAndFooter);

function addHeaderAndFooter() {
   var header = $('<div id="header">' + getHeaderHtml() + '</div>');
   var footer = $('<div id="footer">' + getFooterHtml() + '</div>');
   $(document.body).prepend(header);
   $(document.body).append(footer);
}

function getHeaderHtml() {
   switch (location.protocol) {
      case 'file:':
         if (!location.pathname.match(/\/Rally\//)) {
            throw new Exception('If browsing locally, the project root must ' +
             'be \'Rally\'');
         }

         var fileHierarchy = location.pathname.split('/');

         var projectHierarchy = fileHierarchy.reduce(
          function getProjectHierarchy(hierarchy, file, index) {
            // Root has already been found.
            if (hierarchy.length) {
               if (index === fileHierarchy.length - 1) {
                  hierarchy.push({'name' : file, 'url' : null});
               } else {
                  hierarchy.push({'name' : file, 'url' : getRelativePath()});
               }
            } else {
               if (file === 'Rally') {
                  hierarchy.push({'name' : 'Rally', 'url' : getRelativePath()});
               }
            }
            return hierarchy;
            function getRelativePath () {
               var dirsDeep = fileHierarchy.length - index - 2;
               if (dirsDeep == 0) {
                  return './index.html';
               } else if (dirsDeep > 0) {
                  var path = '';
                  for (var i = 0; i < dirsDeep; ++i) {
                     path += '../'
                  }
                  return path + 'index.html';
               } else {
                  throw new Exception('dirsDeep should never be negative');
               }
            }
         }, []);
         var fileHtmls = projectHierarchy.map(function toLink(file) {
            if (file.url) {
               return '<a href="' + file.url + '">' + decodeURI(file.name) +
                '</a>';
            } else {
               return decodeURI(file.name);
            }
         });
         break;
      case 'http:':
      case 'https:':
         throw new Exception('http and https not implemented yet');
         break;
      default:
         throw new Exception('Unhandled location.protocol');
   }

   return fileHtmls.join(' / ');
}

function getFooterHtml() {
   return 'this may be a footer one day.';
}
