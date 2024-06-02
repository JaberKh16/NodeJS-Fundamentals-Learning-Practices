/*
    Express Templating Engine Concepts
    ==================================
    Express Templating Engine renders the HTMIish syntax to the HTML code through the
    expess through some templating engines.

    Some Templating Engines
    -----------------------
        a. EJS          --> normal HTML and plain js in script
        b. Pug(Jade)    --> use minimal HTML and custom template language
        c. Handlebars   --> use normal HTML and custom template language

    Follow the link -
    [https://expressjs.com/en/guide/using-template-engines.html]

    Some popular templating engines that works with Express such as - Pug, Mustace and EJS.
    The Express application generator use Jade as its default.

    To render templating engine set the following application settings to the app file -
        a. views --> the directory where the template files are located where
                    default is views directory in the application directory.
        b. view engine --> to define the what template engine is used

    Now, see the code following to setup the engine work -

        app.set('view engine', 'pug'); // setup Pug is the template engine
        app.set('views', './views' ); // to define which file to look for the templating code

    To render the file use the following -
        response.render('view', options:{}|undefined, callback);

    Where,
        'viewname'  --> can be the file to render, filename without .extension
        {}          --> to passed object of values to the template engine file

    Note: The view engine cache does not cache the contents of the template’s output, only
    the underlying template itself. The view is still re-rendered with every request even
    when the cache is on.

    Pug Working Mechanism Concepts
    ------------------------------
    Follow below concepts to work with Pug template engine-

    a. To Work With HTML Tags:
        a. div.main-header                  --> to define single class
        b. div#main-header                  --> to define single id literal
        c. div.main-header.text-danger      --> to define multiple clasess
        d. .content-wrapper                 --> when an element is div tag doesn't require 'div' to
                                                specify just classname works
        e. #content-wrapper                 --> when an element is div tag doesn't require 'div' to
                                                specify just idname works
        f. div.content-wrapper Write page   --> to define normal text inside tag use space
        g. a.nav-link(href='/')             --> to define attribute inside use ()
    b. To Work With JS Variale Rendering:
        a. #{varName}                       --> to work with variable
        b. each varName in array/object     --> to setup looping
        c. if condition                     --> to setup conditionals

    c. To Work With Template Inheritance:
        a. block someName               --> to define a dynamic block basically repetted code with
                                             extended code from some other file
        b. extends ./path/file.pug          --> to extends at export file

    d. div.wrapper(class(js conditional))   --> to setup class name with HTML tags

    Note: To know about Pug more follow the link-
            [https://pugjs.org/api/getting-started.html]

    Handlebars Working Mechanism Concepts
    --------------------------------------
    To work wit non built-in template engine such as handlebars need to import the
    file and setup the engine.
    For Handlebars Engine-
        const expressHandlebars = require('express-handlebars');
        app.engine('engine_name', expressHandlebars()); // to register a new engine
        app.set('view engine', 'engine_name'); // to setup the engine name for view
        app.set('views', 'path'); // to tell engine what path to look at for views file

    Note, now with handlebars whatever the 'engine_name' given that can also be used file extension
    Example-
            layout-header.handlebars    // 'engine_name' is handlebars
            layout-header.hbs           // 'engine_name' is hbs

    Follow below concepts to work with Pug template engine-
    a. To Work With JS Variale Rendering:
        a. {{ varName }}                --> to work with variables.
        b. {{#if condition }}{{/if}}    --> # is used to define speciall blocks
        c. {{#each varName}}            --> to define looping and to acces values use- this.var1

    Learn more about - [https://handlebarsjs.com/]

    EJS Working Mechanism Concepts
    ------------------------------
    To work with another built-in template engine such as ejs templating engine
    which is similar like the Pug.

    Feature Supports By EJS
    -----------------------
        a. VanilaJS Based Conditionals and Code Support
        b. Does not support layouting but just the importing of files

    For EJS Engine-
        app.set('view engine', 'ejs'); // to setup the engine name for view
        app.set('views', 'path'); // to tell engine what path to look at for views file

    Follow below concepts to work with Pug template engine-
    a. To Work With JS Variale Rendering:
        a. <%= varName %>                   --> to work with variables execution '%' is matter
        b. <% if(condition){ > <% } %>      --> enclosing with <%  %>
        c. <% if(condition){ > <% } %>      --> enclosing with <%  %>
    b. To Work With Export/Import:
        a. <%- include('path') %>           --> to import html code snippet, '%-' is important
                                                to the contents html other than plain text

    Learn more about - [https://ejs.co/#docs]

*/
/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { query, validationResult } = require('express-validator');
const path = require('path');
const users = require('../data/users-data');

// template engine files
const ejsFilePathObj = require('../util/path-ejs-resolver');
const pugFilePathObj = require('../util/path-pug-resolver');
const handlebarsFilePathObj = require('../util/path-handlebars-resolver');

// creating an instance of express
const app = express();

// setup static pages
app.use(express.static(path.join(__dirname, '../public')));

// setup template engine - ejs
// app.set('views', pugFilePathObj.filePath);
// app.set('view engine', 'pug');

// // Setup template engine - ejs
app.set('views', ejsFilePathObj.filePath);
app.set('view engine', 'ejs');

// Setup port number
const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
    // Render without passing data
    // response.render('index');

    // Render with data
    response.render('index', {
        title: 'Setup Pug',
        message: 'Welcome to the page',
        path: pugFilePathObj,
    });
});

app.use((request, response, next) => {
    response.render('404', { title: '404 Page', message: 'Page not found' });
});

// Listen to requests
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
