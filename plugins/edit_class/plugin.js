tinymce.PluginManager.add('edit_class', function (editor, url) {
    let elements = 'p,h1,h2,h3,h4,h5,h6,div,ul,ol,table,img';

    function change_class(method, val) {
        tinymce.activeEditor.undoManager.transact(function () {
            tinymce.activeEditor.focus();
            tinymce.activeEditor.formatter[method]('edit_class', {value: val}, null, true);
            tinymce.activeEditor.nodeChanged();
        });
    }

    function get_current_value() {
        return new Promise(function (resolve, reject) {
            tinymce.activeEditor.dom.getParents(tinymce.activeEditor.selection.getStart(), function (elm) {
                let nodeName = elm.nodeName.toLowerCase(),
                    classes = '';
                
                if (!elm.classList.contains('mce-edit-focus') && elements.includes(nodeName)) {
                    classes = elm.getAttribute('class');
                    resolve(classes ? classes : '');
                }
            });

            resolve('');
        })
    }

    async function open_enter_window() {
        editor.windowManager.open({
            title: 'Enter class',
            body: {
                type: 'panel',
                items: [
                    {                       
                        type: 'input',
                        name: 'class'
                    }
                ],
            },
            initialData: {
                class: await get_current_value(true)
            },            
            buttons: [
                {
                    type: 'submit',
                    text: 'OK',
                    primary: true
                }
            ],
            onSubmit: function (api) {
                let data = api.getData();
                
                change_class('apply', data.class);

                api.close();
            }
        });
    }

    editor.ui.registry.addMenuItem('edit_class', {
        text: 'Edit class',
        onAction: function() {
            open_enter_window();
        }
    });

    editor.on('init', function (e) {
        tinymce.get(editor.id).formatter.register('edit_class', {
            selector: elements,
            attributes: {
                class: '%value'
            },
            remove_similar: true   
        });
    });


    return {
        getMetadata: function () {
            return {
                name: 'Edit class',
                url: ''
            };
        }
    };
});