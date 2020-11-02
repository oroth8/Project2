var db = require("../models");
const router = express.Router();
const Product = require("../models/product");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes
// Get product list, render handlebars products page
router.get('/', (req,res)=> 
Product.findAll()
.then(products => {
    res.render('products', {
        products
    });
}).catch(err=>console.log(err)));

// Display page routes via handlebar renders
router.get('/add', (req,res)=> res.render('add'));


// Insert into table
Product.create({
  brand,
  name,
  category,
  subCategory,
  price,
  image_URLs
}).then(gig => res.redirect('/products')).catch(err=>console.log(err));


  app.get("/admin", function(req,res){
    res.render("adminhome",{});
  });

// Search for products
router.get('/search', (req,res)=>{
  let {term} = req.query;
  // lower case
  term = term.toLowerCase();

  Product.findAll({where: {technologies: { [Op.like]: '%'+term+'%'}}});
 
});
// =============================================================
module.exports = function(app) {

  // admin get route, will display all information from a chosen table if no category, otherwise will display the category column.
  app.get("/admin/:table/:category?", function(req,res){
    let table=req.params.table;
    if(req.params.category){
      let category=["id"];
      let categories=req.params.category.split(',');
      for(let i=0; i< categories.length; i++){
        category.push(categories[i]);
      }
      db[`${table}`].findAll({
        attributes: category,
        }).then(function(results){
          let item=(results[0].dataValues);
          let newTable=[];
          for(let i=0; i < results.length; i++){
            newTable.push(results[i].dataValues);
          }
          res.render("admin", { "item": item, "table": newTable });
        });
    }else{
      db[`${table}`].findAll({}).then(function(results){
        let item=(results[0].dataValues);
        let newTable=[];
        for(let i=0; i < results.length; i++){
          newTable.push(results[i].dataValues);
        }
        res.render("admin", { "item": item, "table": newTable });

      });
    }
  });

  app.get("/admin/:table/change/byId/:id", function(req,res){
    let table=req.params.table;
  db[`${table}`].findAll({
    where: {
      id: req.params.id
    }
  }).then(function(results){
    let item=(results[0].dataValues);
    res.render("adminchangeid", { "item": item});
  });
  });

  app.get("/admin/:table/change/:category", function(req,res){
    let table=req.params.table;
    let category=["id"];
    let newCategory=req.params.category;
    category.push(newCategory);
      db[`${table}`].findAll({
        attributes: category,
        }).then(function(results){
          let item=(results[0].dataValues);
          let newTable=[];
          for(let i=0; i < results.length; i++){
            newTable.push(results[i].dataValues);
          }
          res.render("adminchange", { "item": item, "table": newTable});
        });
  });


  app.post("/admin/:table/change/:category", function(req,res){
    let table=req.params.table;
    let category=req.params.category;
    let body={};
    body[category]=req.body.value;
    db[`${table}`].update(
      body, {
      where: {
        id: req.body.id
      }
    })
      .then(function() {
        res.json({ value: true});
      });

  });



  // Admin post route, will create new table entry.  
    app.post("/admin/:table", function(req,res){
      let table=req.params.table;
    db[`${table}`].create(
      req.body
    ).then(function() {
        // We have access to the new todo as an argument inside of the callback function
        res.json({value: true});
      });
  
    });

    app.put("/admin/:table",function(req,res){
      let table=req.params.table;
      db[`${table}`].update(
        req.body, {
        where: {
          id: req.body.id
        }
      })
        .then(function() {
          res.json({ value: true});
        });
  
    });


    


  app.get("*", function(req, res) {
    res.render("index", {data:"Hello World!"})
  });
}

