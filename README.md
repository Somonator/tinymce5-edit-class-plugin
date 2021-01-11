# Class edit plugin for TinyMCE 5 (beta)
Manage class list of block elements.

## Install
1. Place the plugin files in the tinymce/plugins directory.
2. Activate plugin and set button to the menubar:
```
plugins: ['edit_class']
menubar: 'edit view insert format table tools',
menu: {
    tools: {
        title: 'Tools',
        items: 'edit_class'
    }
},
```
