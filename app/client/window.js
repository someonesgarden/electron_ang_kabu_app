ipcRenderer===null ? require('electron').ipcRenderer : ipcRenderer;

var forEach = function(selector, callback){
    return [].forEach.call(document.querySelectorAll(selector), callback);
};

var actions = ['minimize', 'maximize', 'restore', 'close'];

forEach('.window-action', function(windowAction){
    windowAction.onclick = function(e){
        actions.forEach(function(actionName){
            var classNameSegment = actionName;
            if(windowAction.classList.contains('window-action-' + classNameSegment)){
                ipcRenderer.send('main-window', classNameSegment);
            }
        });
    };
});

ipcRenderer.on('maximized', function(){
    document.body.classList.add('window--is-maximised');
    document.querySelector('.window-action-wrapper-maximize').style.display = 'none';
    document.querySelector('.window-action-wrapper-restore').style.display = 'inherit';
});

ipcRenderer.on('restored', function(){
    document.body.classList.remove('window--is-maximised');
    document.querySelector('.window-action-wrapper-maximize').style.display = 'inherit';
    document.querySelector('.window-action-wrapper-restore').style.display = 'none';
});

