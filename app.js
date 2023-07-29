//jshint esversion: 6
const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")
const { stringify } = require("querystring")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))//this function is used to display the css and image from the local like from your haedisk..

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res)
{
    const firname=req.body.fname
    const lastname=req.body.lname
    const mail=req.body.email
    console.log(firname)
    console.log(lastname)
    console.log(mail)

    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fileds:{ 
                    FNAME:firname,
                    LNAME:lastname
                }
            }
        ]
    };

    const jsonDATA=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/40bb1a5f4e"
    const options={
        method:"post",
        auth:"abhijit:0bd4b431c40f3c56033fab17ae1cfbb3-us21"
    }
   const request= https.request(url,options,function(response)
    {
        response.on("data",function(data)
        {
            console.log(JSON,stringify(data))
        })
    })
    request.write(jsonDATA)
    request.end()
})

app.listen(4500, function () {
    console.log("server is running on 4500 ")
})

//api ket
// 0bd4b431c40f3c56033fab17ae1cfbb3-us21

//list id
// 40bb1a5f4e