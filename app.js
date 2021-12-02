const path=__dirname;
let port = process.env.PORT;
const mailchimp = require('@mailchimp/mailchimp_marketing');
const request=require('request');
const express=require('express');
const https=require('https');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
mailchimp.setConfig({
    apiKey: 'YOUR_MAILCHIMP_API_KEY',
    server: 'YOUR_SERVER_PREFIX',
});
app.get('/',(req,res)=>{
    res.sendFile(path+"/signup.html");
});
app.post('/signup',(req,res)=>{
    const {fName,lName,email}=req.body;
    const run = async () => {
        const response = await mailchimp.lists.addListMember("MAILCHIMP_LIST_ID", {
          email_address: email,
          merge_fields:{
              FNAME:fName,
              LNAME:lName
          },
          status: "subscribed",
        });
      };
      run().then(()=>res.sendFile(path+"/success.html")).catch(()=>res.sendFile(path+"/failure.html"));
});

if(port==null || port==""){
    port=8000;
}
app.listen(port,()=>console.log(`Server is running on port ${port}`));