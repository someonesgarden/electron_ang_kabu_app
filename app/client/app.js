const electron  = require('electron');
const remote    = electron.remote;
const dialog    = remote.require('electron').dialog;
const marked    = require('marked');
const fs        = require('fs');
const shell     = electron.shell;
const ipcRenderer   = electron.ipcRenderer;
const container     = document.querySelector('.container');

//const topLogo  = document.querySelector('img.toplogo');
remote.app.clearRecentDocuments();

var currentFile = remote.getGlobal('fileToOpen') || null;
if(currentFile) {
    openFile(currentFile);
}

ipcRenderer.on('open-file', function(event, arg){
    openFile(arg);
});


////////// APPLICATION LOGIC

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

function openFile (filename) {

    document.title =filename;

    var contents = fs.readFileSync(filename);
    currentFile  = filename;
    editor.value = contents;

    container.classList.remove('hidden');
    remote.app.addRecentDocument(filename);

    ipcRenderer.send('set-represented-filename',filename);
}

function saveFile (dirname, content){
    console.log(dirname);
    //var filename = dirname+'/README'+new Date().getTime()+'.md';
    var filename = dirname+'/README.md';
    fs.writeFile(filename, content, function(err){
        if (err) throw err;
        console.log('It\'s saved!');
    });
}
