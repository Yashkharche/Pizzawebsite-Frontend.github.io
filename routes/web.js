

function initRoutes(app){
    app.get("/",function(req,res){
        //Menu.find({},function(err,pizzas){
    
            res.render("home")//,{pizzas:pizzas});
       // })
    })
    app.get("/cart",function(req,res){
        res.render("cart");
    })
    app.get("/login",function(req,res){
        res.render("login");
    })
    app.get("/register",function(req,res){
        res.render("register");
    })
    
    
}

module.exports=initRoutes