var express = require('express');
var path = require('path');
var app = express();var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');
app.use(express.static(__dirname));
//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);
    // Require static assets from public folder
    app.use(express.static(path.join(__dirname, 'public')));
    // Set view engine as EJS
    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    // Set 'views' directory for any views 
    // being rendered res.render()
    app.set('views', path.join(__dirname, ''));
    app.use('/form', express.static(__dirname + '/index.ejs'));
app.get('/' , function (req , res ) {

	res.render( __dirname + "/index.ejs");

});


app.post('/' , function (req , res ) {
    
	var code = req.body.codePart;	
	var input = req.body.input;
    
    console.log(input);
    if(input != "")inputRadio = "true";
    var lang = "C++";
    
    
    console.log(code);
    console.log
    if((lang === "C") || (lang === "C++"))
    {        
        if(inputRadio === "true")
        {    
            
            //
        	var envData = { OS : "windows" , cmd : "g++",options: {timeout:1000 } };	   	
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{   console.log("nimit, what is this?")
        			// res.send(data.error); 
                    res.render("index",{
                        code,
                        userOutput:data.error ,
                        input
                    });
        
        		}
        		else
        		{
        			res.render("index", {
                        code,
                        userOutput:data.output,
                        userInput:input
                    });
        		}
        	});
	   }
	   else
	   {
	   	
	   	var envData = { OS : "windows" , cmd : "g++",options: {timeout:1000 } };	   
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
                
        		res.render("index",{
                    code,
                    userOutput:data.error
                });
        	}    	
        	else
        	{
                // console.log(code);
                console.log(data.output);
        		res.render("index",{
                    code,
                    userOutput:data.output
                });
        	}
    
            });
	   }
    }
    if(lang === "Java")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "windows" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                res.send(data);
            });

        }

    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function(data){
                res.send(data);
            });
        }
    }
    if( lang === "CS")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileCSWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileCS(envData , code , function(data){
                res.send(data);
            });
        }

    }
    if( lang === "VB")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileVBWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileVB(envData , code , function(data){
                res.send(data);
            });
        }

    }

});

app.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});


app.listen(8080);