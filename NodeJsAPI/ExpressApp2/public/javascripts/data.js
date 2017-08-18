var product =
    [
        {
            "id": 1,
            "productName": "Pen",
            "productPrice": "200",
            'productStock': "false"
        },
        {
            "id": 2,
            "productName": "Pencil",
            "productPrice": "200",
            "productStock": "false"
        },
    ];

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/BringIT";

exports.getProducts = function (req, res) {

    res.send(product);
};

exports.getBringerCurrentJob = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        //var query = { BringerID: "B0001" };
        var query = { BringerID: req.params.BringerID };
        db.collection("BringerCurrentJob").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};

exports.addBringerCurrentJob = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("BringerCurrentJob").insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 addBringerCurrentJob inserted");
            db.close();
        });
    });
}

exports.getSenderCurrentJob = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        //var query = { BringerID: "B0001" };
        var query = { SenderID: req.params.SenderID };
        db.collection("SenderCurrentJob").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};


exports.addSenderCurrentJob = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("SenderCurrentJob").insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 addSenderCurrentJob inserted");
            db.close();
        });
    });
}

exports.getBringerJobDetail = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        //var query = { BringerID: "B0001" };
        var query = { BringerID: req.params.BringerID };
        db.collection("BringerJobDetail").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};

exports.addBringerJobDetail = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
         db.collection("BringerJobDetail").insertMany(data, function (err, res) {
            if (err) throw err;
            console.log("addBringerJobDetail inserted");
            db.close();
        });
    });
}

exports.getSenderJobDetail = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        //var query = { BringerID: "B0001" };
        var query = { SenderID: req.params.SenderID };
        db.collection("SenderJobDetail").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};

exports.deleteBringerJobDetail = function (req, res) {
    var data = req.body;
        MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("BringerJobDetail").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("BringerJobDetail deleted!!");
            db.close(); 
        });
    });
}

exports.deleteBringerCurrentJob = function (req, res) {
    var data = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("BringerCurrentJob").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("BringerCurrentJob deleted!!");
            db.close();
        });
    });
}

exports.deleteSenderJobDetail = function (req, res) {
    var data = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("SenderJobDetail").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("SenderJobDetail deleted!!");
            db.close();
        });
    });
}

exports.deleteSenderCurrentJob = function (req, res) {
    var data = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("SenderCurrentJob").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("SenderCurrentJob deleted!!");
            db.close();
        });
    });
}



exports.addSenderJobDetail = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("SenderJobDetail").insertMany(data, function (err, res) {
            if (err) throw err;
            console.log("1 addSenderJobDetail inserted");
            db.close();
        });
    });
}
exports.addProduct = function (req, res) {
    var data = req.body;
    product.push(data);
    res.send(product);
}



        exports.deleteProduct = function (req, res) {

            var id = parseInt(req.params.id) - 1;
            var itemdeleted = product.splice(id, 1)
            if (itemdeleted === undefined) {
                res.send("Not Deleted");
            }
            else {
                ;
                res.send(product);
            }
        }


        exports.updateProduct = function (req, res) {
            var id = parseInt(req.params.id) - 1;
            var productToUpdate = product[id];
            var data = req.body;

            if (productToUpdate === undefined) {

                res.send("Not Updated");
            }
            else {
                productToUpdate.productName = data.productName;
                productToUpdate.productPrice = data.productPrice;
                productToUpdate.productStock = data.productStock;

                res.send(product);
            }

        }
