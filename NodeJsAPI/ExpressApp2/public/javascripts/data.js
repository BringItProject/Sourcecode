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
var url = "mongodb://localhost:27017/bringit";

exports.getProducts = function (req, res) {

    res.send(product);
};

exports.getBringerJob = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { BringerID: req.params.BringerID };
        db.collection("bringerjob").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};

exports.addBringerJob = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("bringerjob").insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 addBringerJob inserted");
            db.close();
        });
    });
}

exports.getSenderJob = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        //var query = { BringerID: "B0001" };
        var query = { SenderID: req.params.SenderID };
        db.collection("senderjob").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};


exports.addSenderJob = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("senderjob").insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 addSenderJob inserted");
            db.close();
        });
    });
}

exports.getBringerJobDetail = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        //var query = { BringerID: "B0001" };
        var query = { BringerID: req.params.BringerID };
        db.collection("bringerjobdetail").find(query).toArray(function (err, result) {
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
        db.collection("bringerjobdetail").insertMany(data, function (err, res) {
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
        db.collection("senderjobdetail").find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json(result);
            db.close();
        });
    });
};

exports.getJobMactching3 = function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        var table_data = [];
        var query = { jobid: "S-JID-0001" };
        db.collection('senderjobdetail').find().toArray(function (err, result) {

            for (var i = 0, len = result.length; i < len; i++) {
                var response;
                db.collection('senderjobdetail').aggregate([
                    {
                        "$geoNear": {
                            "near": {
                                "type": "Point",
                                "coordinates": [101.04078000000001, 13.368440000000001]
                            },
                            "distanceField": "distance",
                            "maxDistance": 1000,
                            "spherical": true
                        }
                    },
                ],
                    function (err, response) {
                        response = response;
            

                    });

                table_data[i] = response;
                console.log(response);
            }
          
            return res.json(table_data);
        });
    });
}


exports.getJobMactching2 = function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        var table_data = [];
        var query = { jobid: "S-JID-0001" };
        var disStep = 0;
        db.collection('senderjobdetail').find().toArray(function (err, result) {
            for (var i = 0, len = result.length; i < len; i++)
            {
                disStep = disStep + result[i].distance;
                if (disStep > 500 || i == result.length )
                {
                    console.log(disStep);
                    disStep = 0;
                  var count;
                db.collection('senderjobdetail').aggregate([
                    {
                        "$geoNear": {
                            "near": {
                                "type": "Point",
                                "coordinates": [101.04078000000001, 13.368440000000001]
                            },
                            "distanceField": "distance",
                            "maxDistance": 1000,
                            "spherical": true
                        }
                    },
                ],
                    function (err, response) {
                       table_data.push({
                           response
                        });
                       //console.log(response);
                       if (i == result.length) {
                           console.log(i);
                           return res.json(table_data);
                         
                    }
                });

                }

            }
            db.close();
            
        });
  
    });
};

exports.getJobMactching = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var query = { jobid: "S-JID-0001" };
        db.collection("senderjobdetail").find(query).toArray(function (err, result) {
            var response;

            function doSomething() {
                //console.log(response);
                return res.json(response);
                callback(response);
            }

            console.log(result.length);

            
            
            db.collection('senderjobdetail').aggregate([
                {
                    "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": [101.04078000000001, 13.368440000000001]
                        },
                        "distanceField": "distance",
                        "maxDistance": 1000,
                        "spherical": true
                    }
                },
            ],
                function (err, docs) {
                    response = docs;
                    doSomething();
                   
                });
    
            //db.close();
      
        });
    });



};


//exports.getJobMactching = function (req, res) {
//    MongoClient.connect(url, function (err, db) {
//        if (err) throw err;
//        db.collection('senderjobdetail').aggregate([
//            {
//                "$geoNear": {
//                    "near": {
//                        "type": "Point",
//                        // "coordinates": [parseFloat(req.params.lng), parseFloat(req.params.lat)]100.98817000000001
//                        "coordinates": [101.04078000000001, 13.368440000000001]
//                    },
//                    "distanceField": "distance",
//                    "maxDistance": 1000,
//                    "spherical": true
//                }
//            },
//        ],
//            function (err, docs) {
//                response = docs;
//                return res.json(response);

//            });
//        db.close();
//    });

//};


function geoNear(lat,lng,callback)
{
    var response = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection('senderjobdetail').aggregate([
            {
                "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [101.04078000000001, 13.368440000000001]
                    },
                    "distanceField": "distance",
                    "maxDistance": 50,
                    "spherical": true
                }
            },
        ],
            function (err, docs) {
                //response = JSON.stringify(docs);
                //MongoClient.connect(url, function (err, db) {
                //        db.collection("temp").insertMany(docs, function (err, res) {
                //        db.close();
                //    });
                //});
                callback(null, docs);
            });
        db.close();
    });   
 
}


exports.deleteBringerJobDetail = function (req, res) {
    var data = req.body;
        MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("bringerjobdetail").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("BringerJobDetail deleted!!");
            db.close(); 
        });
    });
}

exports.deleteBringerJob = function (req, res) {
    var data = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("bringerjob").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("BringerJob deleted!!");
            db.close();
        });
    });
}

exports.deleteSenderJobDetail = function (req, res) {
    var data = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("senderjobdetail").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("SenderJobDetail deleted!!");
            db.close();
        });
    });
}

exports.deleteSenderJob = function (req, res) {
    var data = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("senderjob").deleteMany(data, function (err, res) {
            if (err) throw err;
            console.log("SenderJob deleted!!");
            db.close();
        });
    });
}



exports.addSenderJobDetail = function (req, res) {
    var data = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("senderjobdetail").insertMany(data, function (err, res) {
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
