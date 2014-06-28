$(document).ready(addHeaderAndFooter);

function addHeaderAndFooter() {
   var header = $('<div id="header">' + getHeaderHtml() + '</div>');
   var footer = $('<div id="footer">' + getFooterHtml() + '</div>');
   $(document.body).prepend(header);
   $(document.body).append(footer);
}

function getHeaderHtml() {
   switch (location.protocol) {
      case 'http:':
      case 'https:':
         var projectHierarchy = location.pathname.split('/').map(
          function getProjectHierarchy(file, index, files) {
            file = decodeURI(file);

            if (index === 0) {
               return {'name' : 'Rally', 'url' : getRelativePath()};
            } else if (index === files.length - 1) {
               return {'name' : file, 'url' : getRelativePath()};
            } else {
               return {'name' : file, 'url' : getRelativePath()};
            }

            function getRelativePath () {
               var dirsDeep = files.length - index - 2;
               if (dirsDeep == 0) {
                  return './';
               } else if (dirsDeep > 0) {
                  var path = '';
                  for (var i = 0; i < dirsDeep; ++i) {
                     path += '../'
                  }
                  return path;
               } else if (dirsDeep == -1 ) {
                  return './' + file;
               } else {
                  throw new LogicError('dirsDeep should never be negative');
               }
            }
         });

         var fileHtmls = projectHierarchy.map(function toLink(file) {
            if (file.url) {
               return '<a href="' + file.url + '">' + decodeURI(file.name) +
                '</a>';
            } else {
               return decodeURI(file.name);
            }
         });
         break;
      default:
         throw new InputError('location.protocol',
          "'http:', or 'https:'");
   }

   return fileHtmls.join(' / ');
}

function getFooterHtml() {
   return 'this may be a footer one day.';
}
