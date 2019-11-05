const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');

app.listen(5000,()=>{
  console.log("Server Started on port 5000");
});

app.get('/api',(req,res)=>{
  res.json({msg:'Hello NodeJS'});
})

app.post('/api/post',verifyToken,(req,res)=>{
jwt.verify(req.token,'secrectkey',(err,userData)=>{
    if(err)
    res.sendStatus(403);
    else
     res.json({msg:'Post created successfully...',user:userData});
 })
});

app.post('/api/login',(req,res)=>{
const user={
  username:'admin',
  emailid:'admin@gmail.com'
     }
 jwt.sign({user},'secrectkey',{expiresIn:'60s'},(err,token)=>{
   if(err)
  // res.json({msg:err});
   res.sendStatus(403)
else
    res.json({token:token});
 })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.json({msg:'Please provide valid token'});
  }
}
