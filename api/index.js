const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Product, Category, User } = require('./src/db');
const data = require('./data');

// Syncing all the models at once.
const PORT = 5000;
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`--------------------------------------  -WWWWWo------------------------------------------------------------------
-----------------------------------   oW#########Wo--------------------------------------------------------------
---------------------------------  -oWWWW####WW#####o------------------------------------------------------------
----------------------------   --oWWW####WWWW#WWWWWW#Wo----------------------------------------------------------
--------------------------------       -oWW#WWoWWWWWoWWW---------------------------------------------------------
----------------------------       ---    --oW#WoWWWWooWWo-------------------------------------------------------
--------------------------       ---oooooo--  -oooWWWWWoooo------------------------------------------------------
--------------------------      ---ooooooo----       -oWooo------------------------------------------------------
---------------------------     ---ooooooo------        -oo------------------------------------------------------
----------------------------   --ooooooooooo---           ---------------------ooooooooo-------------------------
---------------------------       -ooooo-oooooo-          -----------------oo-------------ooo--------------------
---------------------------        ----      ---          ---------------oo------------------oo------------------
----------------------------  -----oo------------          ------------oo-----------------------o----------------
----------------------------------oooooooooooooo--         ----------oo--------------------------oo--------------
-------------------------------ooooooooooooooooooo-                  ------------------------------oo------------
--------------------------------------oooooo-----                       ----------------------------oo-----------
----------------------------------  ---------        --                   --------------------------oo-----------
---------------------------------   ----o--------   --                     -ooWoo------oooWoo--------o-----------
-------------------------------          --------                           -ooWWo----oooooWWo-------o-----------
--------------------------------------     ------                            ooWo-----ooooooooo-----oo-----------
-----------------------------------------------------                        ooo-------ooWWoo-------oo-----------
-----------------------------o-----o-o--------------                         -----o-o-----o--------oo------------
-------------------------oooooo----o-------------                            ----oWoWWo-----------oo-------------
--------------------oooo-----ooo---        -------                           -----o-oo----------oo---------------
----------------ooooooo-o----ooo---       -------                                -----------oooo---oooo----------
-------------o-oooooo-o-oo----------        ------                              -o------o-ooo-----oWWWWoo--------
-----------o---ooooooo-------------------    -------                            -ooooWoWWoo-------ooWoo-oooo-----
------------------------------o--------o--   ----------                         ---o-oooooo-------oooo-------oo--
---------------------------oooooo--------------------------                    --ooW-oooo-o------oooo--o----ooo--
----------------------------ooooo---------------------------                  ------------o-----ooo-ooooooooo----
-------------------- --------ooo-----------------------------                --ooo-------oo--oWo-ooo-------------
--------------------     -------o---------------------------               -----ooooWWWooo--oWo-ooo--------------
--------------------      ------o---------------------------               --ooo-ooo------oo--ooo----------------
---------------------     ---------------------------------              --------o--oooooo-oooo------------------
---------------------     ---------------------------------             --------oo--ooooo-oo---------------------
---------------------     ---------------------------------            -----------oooooooooo---------------------
---------------------      --------------------------------  --       ---------oo---ooooooo-ooooo----------------
---------------------       -------------------------------   -       -oooooWWWo--------ooo- -oooooo-------------
--------------------         ------------------------------          oooooooo------------o--   --oooo------------
-----oo---------- --    --- -------------------------------          ooooo------oooo-------      -ooooooooo------
-----        ----- -            --------------------------           ----------o-o--o----         --oooooooWo----
------                  --      --------------------------            ------ooo--------           --o--oooooo----
-----oooooo--    --    ----        -----------------------            -----oooo--------            --oo--ooo-----
------oooooooooooo-    ------- --------------------------             ---ooo-oo-------             ---o--oo------
------ooooooooooo--   ----------------------------------               oooooooooo-----             ---oo--o------
🚀 Server is listening on http://localhost:${PORT}`
    );

    //Productos harcodeados cuando se levanta el servidor(descomentar para probar back)
    // Product.bulkCreate(data.products);
    User.create({
      "email": "admin@admin.com",
      "avatar": "https://static.wikia.nocookie.net/simpsons/images/9/9d/Maggie_Simpson.png",
      "firstName": "Maggie",
      "lastName": "Simpson",
      "birthdate": "1988-01-14",
      "password": "1234",
      "isAdmin": true,
      "changePassword": false
    });

    User.create({
      "email": "dailytinkerer@gmail.com",
      "avatar": "",
      "firstName": "Daley",
      "lastName": "Tinky",
      "birthdate": "1987-01-23",
      "password": "1234",
      "isAdmin": true,
      "changePassword": false
    });

    User.create({
      "email": "apu@nahasa.com",
      "avatar": "https://static.wikia.nocookie.net/simpsons/images/7/7d/Apu_Nahasapeemapetilon.png",
      "firstName": "Apu",
      "lastName": "Nahasapeemapetilon",
      "birthdate": "1940-01-01",
      "password": "1234",
      "isAdmin": false,
      "changePassword": false
    });

    Category.bulkCreate(data.categories);


    Product.create({
      "name": data.products[0].name,
      "description": data.products[0].description,
      "price": data.products[0].price,
      "stock": data.products[0].stock,
      "images": data.products[0].images,
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[1].name,
      "description": data.products[1].description,
      "price": data.products[1].price,
      "stock": data.products[1].stock,
      "images": data.products[1].images,
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[2].name,
      "description": data.products[2].description,
      "price": data.products[2].price,
      "stock": data.products[2].stock,
      "images": data.products[2].images,
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[3].name,
      "description": data.products[3].description,
      "price": data.products[3].price,
      "stock": data.products[3].stock,
      "images": data.products[3].images,
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[4].name,
      "description": data.products[4].description,
      "price": data.products[4].price,
      "stock": data.products[4].stock,
      "images": data.products[4].images,
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[5].name,
      "description": data.products[5].description,
      "price": data.products[5].price,
      "stock": data.products[5].stock,
      "images": data.products[5].images,
      "categories": data.products[5].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[6].name,
      "description": data.products[6].description,
      "price": data.products[6].price,
      "stock": data.products[6].stock,
      "images": data.products[6].images,
      "categories": data.products[6].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[7].name,
      "description": data.products[7].description,
      "price": data.products[7].price,
      "stock": data.products[7].stock,
      "images": data.products[7].images,
      "categories": data.products[7].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[8].name,
      "description": data.products[8].description,
      "price": data.products[8].price,
      "stock": data.products[8].stock,
      "images": data.products[8].images,
      "categories": data.products[8].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[9].name,
      "description": data.products[9].description,
      "price": data.products[9].price,
      "stock": data.products[9].stock,
      "images": data.products[9].images,
      "categories": data.products[9].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[10].name,
      "description": data.products[10].description,
      "price": data.products[10].price,
      "stock": data.products[10].stock,
      "images": data.products[10].images,
      "categories": data.products[10].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[11].name,
      "description": data.products[11].description,
      "price": data.products[11].price,
      "stock": data.products[11].stock,
      "images": data.products[11].images,
      "categories": data.products[11].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[12].name,
      "description": data.products[12].description,
      "price": data.products[12].price,
      "stock": data.products[12].stock,
      "images": data.products[12].images,
      "categories": data.products[12].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[13].name,
      "description": data.products[13].description,
      "price": data.products[13].price,
      "stock": data.products[13].stock,
      "images": data.products[13].images,
      "categories": data.products[13].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[14].name,
      "description": data.products[14].description,
      "price": data.products[14].price,
      "stock": data.products[14].stock,
      "images": data.products[14].images,
      "categories": data.products[14].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[15].name,
      "description": data.products[15].description,
      "price": data.products[15].price,
      "stock": data.products[15].stock,
      "images": data.products[15].images,
      "categories": data.products[15].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[16].name,
      "description": data.products[16].description,
      "price": data.products[16].price,
      "stock": data.products[16].stock,
      "images": data.products[16].images,
      "categories": data.products[16].categories
    }).then(createdProduct => {
      createdProduct.setCategories([8]);
    });

    Product.create({
      "name": data.products[17].name,
      "description": data.products[17].description,
      "price": data.products[17].price,
      "stock": data.products[17].stock,
      "images": data.products[17].images,
      "categories": data.products[17].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[18].name,
      "description": data.products[18].description,
      "price": data.products[18].price,
      "stock": data.products[18].stock,
      "images": data.products[18].images,
      "categories": data.products[18].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[19].name,
      "description": data.products[19].description,
      "price": data.products[19].price,
      "stock": data.products[19].stock,
      "images": data.products[19].images,
      "categories": data.products[19].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[20].name,
      "description": data.products[20].description,
      "price": data.products[20].price,
      "stock": data.products[20].stock,
      "images": data.products[20].images,
      "categories": data.products[20].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[21].name,
      "description": data.products[21].description,
      "price": data.products[21].price,
      "stock": data.products[21].stock,
      "images": data.products[21].images,
      "categories": data.products[21].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[22].name,
      "description": data.products[22].description,
      "price": data.products[22].price,
      "stock": data.products[22].stock,
      "images": data.products[22].images,
      "categories": data.products[22].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[23].name,
      "description": data.products[23].description,
      "price": data.products[23].price,
      "stock": data.products[23].stock,
      "images": data.products[23].images,
      "categories": data.products[23].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[24].name,
      "description": data.products[24].description,
      "price": data.products[24].price,
      "stock": data.products[24].stock,
      "images": data.products[24].images,
      "categories": data.products[24].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[25].name,
      "description": data.products[25].description,
      "price": data.products[25].price,
      "stock": data.products[25].stock,
      "images": data.products[25].images,
      "categories": data.products[25].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[26].name,
      "description": data.products[26].description,
      "price": data.products[26].price,
      "stock": data.products[26].stock,
      "images": data.products[26].images,
      "categories": data.products[26].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });

    Product.create({
      "name": data.products[27].name,
      "description": data.products[27].description,
      "price": data.products[27].price,
      "stock": data.products[27].stock,
      "images": data.products[27].images,
      "categories": data.products[27].categories
    }).then(createdProduct => {
      createdProduct.setCategories([3]);
    });


    Product.create({
      "name": data.products[28].name,
      "description": data.products[28].description,
      "price": data.products[28].price,
      "stock": data.products[28].stock,
      "images": data.products[28].images,
      "categories": data.products[28].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });

    Product.create({
      "name": data.products[29].name,
      "description": data.products[29].description,
      "price": data.products[29].price,
      "stock": data.products[29].stock,
      "images": data.products[29].images,
      "categories": data.products[29].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });


    Product.create({
      "name": data.products[29].name,
      "description": data.products[29].description,
      "price": data.products[29].price,
      "stock": data.products[29].stock,
      "images": data.products[29].images,
      "categories": data.products[29].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });

    Product.create({
      "name": data.products[30].name,
      "description": data.products[30].description,
      "price": data.products[30].price,
      "stock": data.products[30].stock,
      "images": data.products[30].images,
      "categories": data.products[30].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });


    Product.create({
      "name": data.products[31].name,
      "description": data.products[31].description,
      "price": data.products[31].price,
      "stock": data.products[31].stock,
      "images": data.products[31].images,
      "categories": data.products[31].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });


    Product.create({
      "name": data.products[32].name,
      "description": data.products[32].description,
      "price": data.products[32].price,
      "stock": data.products[32].stock,
      "images": data.products[32].images,
      "categories": data.products[32].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });

    Product.create({
      "name": data.products[33].name,
      "description": data.products[33].description,
      "price": data.products[33].price,
      "stock": data.products[33].stock,
      "images": data.products[33].images,
      "categories": data.products[33].categories
    }).then(createdProduct => {
      createdProduct.setCategories([5]);
    });

    Product.create({
      "name": data.products[34].name,
      "description": data.products[34].description,
      "price": data.products[34].price,
      "stock": data.products[34].stock,
      "images": data.products[34].images,
      "categories": data.products[34].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[35].name,
      "description": data.products[35].description,
      "price": data.products[35].price,
      "stock": data.products[35].stock,
      "images": data.products[35].images,
      "categories": data.products[35].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[36].name,
      "description": data.products[36].description,
      "price": data.products[36].price,
      "stock": data.products[36].stock,
      "images": data.products[36].images,
      "categories": data.products[36].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[37].name,
      "description": data.products[37].description,
      "price": data.products[37].price,
      "stock": data.products[37].stock,
      "images": data.products[37].images,
      "categories": data.products[37].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[38].name,
      "description": data.products[38].description,
      "price": data.products[38].price,
      "stock": data.products[38].stock,
      "images": data.products[38].images,
      "categories": data.products[38].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[39].name,
      "description": data.products[39].description,
      "price": data.products[39].price,
      "stock": data.products[39].stock,
      "images": data.products[39].images,
      "categories": data.products[39].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[40].name,
      "description": data.products[40].description,
      "price": data.products[40].price,
      "stock": data.products[40].stock,
      "images": data.products[40].images,
      "categories": data.products[40].categories
    }).then(createdProduct => {
      createdProduct.setCategories([7]);
    });

    Product.create({
      "name": data.products[41].name,
      "description": data.products[41].description,
      "price": data.products[41].price,
      "stock": data.products[41].stock,
      "images": data.products[41].images,
      "categories": data.products[41].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[42].name,
      "description": data.products[42].description,
      "price": data.products[42].price,
      "stock": data.products[42].stock,
      "images": data.products[42].images,
      "categories": data.products[42].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[43].name,
      "description": data.products[43].description,
      "price": data.products[43].price,
      "stock": data.products[43].stock,
      "images": data.products[43].images,
      "categories": data.products[43].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[44].name,
      "description": data.products[44].description,
      "price": data.products[44].price,
      "stock": data.products[44].stock,
      "images": data.products[44].images,
      "categories": data.products[44].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[45].name,
      "description": data.products[45].description,
      "price": data.products[45].price,
      "stock": data.products[45].stock,
      "images": data.products[45].images,
      "categories": data.products[45].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[46].name,
      "description": data.products[46].description,
      "price": data.products[46].price,
      "stock": data.products[46].stock,
      "images": data.products[46].images,
      "categories": data.products[46].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[47].name,
      "description": data.products[47].description,
      "price": data.products[47].price,
      "stock": data.products[47].stock,
      "images": data.products[47].images,
      "categories": data.products[47].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[48].name,
      "description": data.products[48].description,
      "price": data.products[48].price,
      "stock": data.products[48].stock,
      "images": data.products[48].images,
      "categories": data.products[48].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[49].name,
      "description": data.products[49].description,
      "price": data.products[49].price,
      "stock": data.products[49].stock,
      "images": data.products[49].images,
      "categories": data.products[49].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[50].name,
      "description": data.products[50].description,
      "price": data.products[50].price,
      "stock": data.products[50].stock,
      "images": data.products[50].images,
      "categories": data.products[50].categories
    }).then(createdProduct => {
      createdProduct.setCategories([4]);
    });

    Product.create({
      "name": data.products[51].name,
      "description": data.products[51].description,
      "price": data.products[51].price,
      "stock": data.products[51].stock,
      "images": data.products[51].images,
      "categories": data.products[51].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[52].name,
      "description": data.products[52].description,
      "price": data.products[52].price,
      "stock": data.products[52].stock,
      "images": data.products[52].images,
      "categories": data.products[52].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[53].name,
      "description": data.products[53].description,
      "price": data.products[53].price,
      "stock": data.products[53].stock,
      "images": data.products[53].images,
      "categories": data.products[53].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[54].name,
      "description": data.products[54].description,
      "price": data.products[54].price,
      "stock": data.products[54].stock,
      "images": data.products[54].images,
      "categories": data.products[54].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[55].name,
      "description": data.products[55].description,
      "price": data.products[55].price,
      "stock": data.products[55].stock,
      "images": data.products[55].images,
      "categories": data.products[55].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[56].name,
      "description": data.products[56].description,
      "price": data.products[56].price,
      "stock": data.products[56].stock,
      "images": data.products[56].images,
      "categories": data.products[56].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[57].name,
      "description": data.products[57].description,
      "price": data.products[57].price,
      "stock": data.products[57].stock,
      "images": data.products[57].images,
      "categories": data.products[57].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[58].name,
      "description": data.products[58].description,
      "price": data.products[58].price,
      "stock": data.products[58].stock,
      "images": data.products[58].images,
      "categories": data.products[58].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[59].name,
      "description": data.products[59].description,
      "price": data.products[59].price,
      "stock": data.products[59].stock,
      "images": data.products[59].images,
      "categories": data.products[59].categories
    }).then(createdProduct => {
      createdProduct.setCategories([2]);
    });

    Product.create({
      "name": data.products[60].name,
      "description": data.products[60].description,
      "price": data.products[60].price,
      "stock": data.products[60].stock,
      "images": data.products[60].images,
      "categories": data.products[60].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[61].name,
      "description": data.products[61].description,
      "price": data.products[61].price,
      "stock": data.products[61].stock,
      "images": data.products[61].images,
      "categories": data.products[61].categories
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[62].name,
      "description": data.products[62].description,
      "price": data.products[62].price,
      "stock": data.products[62].stock,
      "images": data.products[62].images,
      "categories": data.products[62].categories
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[63].name,
      "description": data.products[63].description,
      "price": data.products[63].price,
      "stock": data.products[63].stock,
      "images": data.products[63].images,
      "categories": data.products[63].categories
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });

    Product.create({
      "name": data.products[64].name,
      "description": data.products[64].description,
      "price": data.products[64].price,
      "stock": data.products[64].stock,
      "images": data.products[64].images,
      "categories": data.products[64].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[65].name,
      "description": data.products[65].description,
      "price": data.products[65].price,
      "stock": data.products[65].stock,
      "images": data.products[65].images,
      "categories": data.products[65].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[66].name,
      "description": data.products[66].description,
      "price": data.products[66].price,
      "stock": data.products[66].stock,
      "images": data.products[66].images,
      "categories": data.products[66].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[67].name,
      "description": data.products[67].description,
      "price": data.products[67].price,
      "stock": data.products[67].stock,
      "images": data.products[67].images,
      "categories": data.products[67].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[68].name,
      "description": data.products[68].description,
      "price": data.products[68].price,
      "stock": data.products[68].stock,
      "images": data.products[68].images,
      "categories": data.products[68].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[69].name,
      "description": data.products[69].description,
      "price": data.products[69].price,
      "stock": data.products[69].stock,
      "images": data.products[69].images,
      "categories": data.products[69].categories
    }).then(createdProduct => {
      createdProduct.setCategories([6]);
    });

    Product.create({
      "name": data.products[70].name,
      "description": data.products[70].description,
      "price": data.products[70].price,
      "stock": data.products[70].stock,
      "images": data.products[70].images,
      "categories": data.products[70].categories
    }).then(createdProduct => {
      createdProduct.setCategories([1]);
    });
  });
});