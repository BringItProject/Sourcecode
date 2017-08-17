var product =
[
 {
   "id"         :1 ,
  "productName" : "Pen",
 "productPrice" : "200",
 'productStock' : "false"
 },
 {
  "id" :2 ,
  "productName" : "Pencil",
 "productPrice" : "200",
 "productStock" : "false"
 },
 ];

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/BringIT";

exports.getProducts = function(req,res){
    
       res.send(product);
};

exports.getBringerJob = function (req, res) {




    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        
        var query = { BringerID: "B0001" };
        //var query = { BringerID: req.params.BringerID };
        db.collection("BringerCurrentJob").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
   // res.send(product);
    //res.send(res);
};

exports.addProduct = function(req,res)
{       
       var data = req.body;
       product.push(data);     
       res.send(product);
}

exports.addBringerJob = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
       // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("BringerCurrentJob").insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });


}




exports.deleteProduct = function(req,res)
{
    
    var id = parseInt(req.params.id)-1; 
    var itemdeleted = product.splice(id,1)
    if(itemdeleted===undefined)
        {
            res.send("Not Deleted");
        }
    else
      {
         ;
         res.send(product);
     }
}
       

exports.updateProduct = function(req,res)
{
    var id = parseInt(req.params.id)-1;
    var productToUpdate = product[id];  
    var data = req.body;
    
    if(productToUpdate===undefined)
        {

            res.send("Not Updated");
        }
    else
      {
          productToUpdate.productName = data.productName;
          productToUpdate.productPrice = data.productPrice;
          productToUpdate.productStock = data.productStock;

     res.send(product);
     }      
    
}
