// const express=require("express");
// const path=require("path");
// const app=express();
// const PORT=3000;
// app.use(express.static(path.join(__dirname,"public")));
// app.listen(PORT,()=>{
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// const express=require("express");
// const mongoose=require("mongoose");
// const app=express();
// mongoose.connect("mongodb+srv://Raghav:<Xcross2007>@cluster0.0u6qqko.mongodb.net/?appName=Cluster0")
// .then(()=>console.log("MongoDB Connected"))
// .catch(arr=>console.log(err));
// app.listen(3000,()=>{
//    console.log("Server running on port 3000"); 
// });

const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
const PORT=3000;
app.use(express.static(path.join(__dirname,"public")));
mongoose.connect("mongodb+srv://Raghav:Xcross2007@cluster0.0u6qqko.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})

const UserSchema= new mongoose.Schema({
   name:String,
   email:String,
   password:String
});
const User=mongoose.model("User",UserSchema);

const OrderSchema=new mongoose.Schema({
    products:Array,
    OrderDate:{
        type:Date,
        default:Date.now
    }
});
const Order=mongoose.model("Order",OrderSchema);

const ProductSchema=new mongoose.Schema({
    name:String,
    price:Number,
    image:String
});
const Product=mongoose.model("Product",ProductSchema);

app.post("/register",async(req,res)=>{
    const { name,email,password }=req.body;
    console.log(name,email,password);
    const newUser=new User({
        name,
        email,
        password
    });
    await newUser.save();
    console.log("User Saved");
    res.json({
        message:"Registration Successful!"
    });
});

app.post("/login", async(req,res)=>{
     console.log("LOGIN HIT");
    console.log(req.body);
    const { email, password }=req.body;
    const foundUser=await User.findOne({
        email,
        password
    });
    if(foundUser){
        res.json({
            message:"Login Successful!"
        });
    }
    else{
        res.json({
            message:"Invalid Email or Password"
        });
    }
});

app.post("/place-order",async(req,res)=>{
    const { products }=req.body;
    console.log("ORDER RECEIVED:",products);
    const newOrder=new Order({
        products
    });
    await newOrder.save();
    console.log("ORDER SAVED");
    res.json({
        message:"Order Saved Successfully!"
    });
});

app.get("/add-products",async(req,res)=>{
    await Product.deleteMany({});
    await Product.insertMany([
        {
            name:"Iphone 17",
            price:"83000",
            image:"https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/geo/article/Apple-iPhone-17-hero-250909_inline.jpg.large_2x.jpg"
        } ,
        {
            name:"Samsung S24",
            price:"70000",
            image:"https://tse3.mm.bing.net/th/id/OIP.7X1q6G1O_b64HDIN8D_3bAHaEK?pid=Api&P=0&h=180"
        },
        {
            name:"Boat headphones",
            price:"5000",
            image:"https://tse2.mm.bing.net/th/id/OIP.fkIBlDJFIx8XLJkkEapa6AHaHa?pid=Api&P=0&h=180"
        },
        {
            name:"Laptop",
            price:"50000",
            image:"https://www.gadgetvoize.com/wp-content/uploads/2021/05/gigabyrte.jpg"
        }
    ]);
    res.send("Products Added");
})