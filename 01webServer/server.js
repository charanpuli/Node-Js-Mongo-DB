const http=require('http')
const hostname='127.0.0.1'
const port=5005
http.createServer((req,res)=>{
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.end('hello world')
}).listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}`);
    
})