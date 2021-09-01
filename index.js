
const http = require('http')
const express = require('express')
// const {WebSocketServer} = require('ws')
const binance = require('binance-api-node').default
const client = binance()
const app = express()
const mongoose= require('mongoose')
const Bnb = require('./bnb-model')
const moment = require('moment')

mongoose.connect('mongodb://localhost:27017/bnbtest',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       }).then(()=>console.log('db connected locally')).catch(err=>console.log(err))

const getbnb =async function (req,res){
    
    console.log(req.params["coinname"])
     var valueofBNB= async ()=>{
        let resp= await client.prices({ symbol: req.params["coinname"] })
        return resp
    }
     valueofBNB().then(result=>{
        return result[req.params.coinname]
     }).catch(err=>{
         res.send(err)
         console.log(err)
        })
     let value= await valueofBNB();
     res.send(value)
}
//BNBUSDT
app.get('/getcoinvalue/:coinname',getbnb)
// setInterval(async ()=>{
//             var valueofBNB= async ()=>{
//            let resp= await client.prices({ symbol: 'BNBUSDT' })
//             return resp
//         }
//             let value = await valueofBNB()
//             console.log(value.BNBUSDT.toString())
//             const bnb=new Bnb({
//                 _id:mongoose.Types.ObjectId(),
//                 valueofBNB:value.BNBUSDT.toString(),
//                 timeStamp:moment().format("hh:mm").toString()
//             })
//             bnb.save((err,result)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 console.log(`user saved${result}`)
//             })
//             },5000)
    
app.listen(3000, () => console.log('server listening on 3000'))
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   // const server=http.createServer(app)
   // const wss = new WebSocketServer({server})
   // app.get('/bnb-price', (req, res) => {
       
   //     wss.on('connection',function connection(ws){
   //         pricesWS=client.ws.depth('BNBBTC', depth => {
   //          return depth
   //         })
   //         console.log(pricesWS)
   //         ws.on('message',(pricesWS)=>{
   //            res.send(JSON.stringify(pricesWS))
   //     })
   //         })
   // })