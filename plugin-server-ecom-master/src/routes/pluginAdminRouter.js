const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

var pluginAdminRouter = express.Router();

// Require ShopifyProductItem, TracifiedProductItem model in routes module
var ShopifyProductItem = require('../models/ShopifyProductItem');
var TracifiedProductItem = require('../models/TracifiedProductItem');

//these should save in env or mlab
const shop = 'test-tracified.myshopify.com';
const accessToken = '21a40a6b6d8a2bd049da8c6e197af813'; 
const shopRequestUrl = 'https://' + shop + '/admin/products.json';
const tracifiedRequestUrl='https://'
  
// for /pluginAdmin/getProducts
//get product json from shopify and make list of product handlers with id
pluginAdminRouter.route('/getProducts').get(function (req, res) {

    const shopRequestHeaders = {
        'X-Shopify-Access-Token': accessToken,
      };

      request.get(shopRequestUrl,{headers:shopRequestHeaders})
        .then((shopResponse)=>{

           
            //get TraceData - hardbind
            
                    
            //reduce product.json by title and ids
            var productJson = JSON.parse(shopResponse); 
            var products = productJson.products;

            products = products.reduce(function(reducedJson, product) {
                reducedJson.push({ 
                        id: product.id,
                        title: product.title
                       
                    });
        
                return reducedJson;
                console.log(products);
            }, []);
            
            console.log("mhhhhhhhhhhhhhh");
            console.log(products);
            res.json(products);

        })
        .catch(err=>{
            res.status(err.statusCode).send(err.error.error_description);
        });
  });

  // for /pluginAdmin/getTracibilityItems
//get product json from shopify and make list of product handlers with id
pluginAdminRouter.route('/getTraceData').get(function (req, res) {
    const shopRequestHeaders = {
        'X-Shopify-Access-Token': accessToken,
      };

    //   request.get( 'https://tracified-mock-api.herokuapp.com/Traceability_data/Data',{headers:shopRequestHeaders})
    //     .then((shopResponse)=>{
           
    //         //get TraceData - hardbind
            
                    
    //         //reduce product.json by title and ids
    //         var traceproductJson = JSON.parse(shopResponse); 
    //         console.log(traceproductJson);
    //         var traceproducts = traceproductJson.Apple;
    //         traceproducts = traceproducts.reduce(function(tracereducedJson, traceproduct) {
    //             tracereducedJson.push({ 
    //                 product_itemID: traceproduct.product_itemID,
    //                    // tracetitle: traceproduct.tracified_ItemID
                       
    //                 });
        
    //             return tracereducedJson;
    //         }, []);

    //         console.log(traceproducts);
    //         res.json(traceproducts);

    //     })
    //     .catch(err=>{
    //         console.log("nishani");
            
    //         res.status(err.statusCode).send(err.error.error_description);
    //     });

    request.get(shopRequestUrl,{headers:shopRequestHeaders})
    .then((shopResponse)=>{

       
        //get TraceData - hardbind
        
                
        //reduce product.json by title and ids
        var productJson = JSON.parse(shopResponse); 
        var products = productJson.products;

        products = products.reduce(function(reducedJson, product) {
            reducedJson.push({ 
                    id: product.id,
                    title: product.title
                   
                });
    
            return reducedJson;
            console.log(products);
        }, []);

        console.log("###############");
        console.log(products);
        res.json(products);

    })
    .catch(err=>{
        res.status(err.statusCode).send(err.error.error_description);
    });
   
});

  module.exports = pluginAdminRouter;
  