var express = require('express');
const axios = require('axios');
const app = express()
const port = 8000
const cors = require('cors')
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);




app.use(cors());
app.use(express.json());

function distance(lat1,lat2, lon1, lon2)
{
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return(c * r);
}


const mapboxApi = async (address) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
            + encodeURIComponent(address) + '.json?access_token='
            + process.env.ACCESS_TOKEN + '&limit=1&language=en';
      
    const response = await axios.get(url)
    const data = await response.data['features'][0]['geometry']['coordinates'];
    return data
};


app.post('/addressSend', async(req,res)=>{
    let arr1=await mapboxApi(req.body.addressDonor)
    let arr2=await mapboxApi(req.body.addressReceiver)

    var value = distance(arr1[0],arr2[0],arr1[1],arr2[1])
    if(value<=1){
        console.log(value)
        console.log("chlega!")
    }
    else{
        console.log("nai vhalega")
    }

    res.send("done")

})


app.post('/sendsms',(req,res)=>{
    console.log(req.body)
    // client.messages
    // .create({
    //     body: 'A request to you has been made regarding the POA. Login to the "मेरा आधार" portal for more info.',
    //     from: '+14195566741',
    //     to: '+91'+req.body.number
    // })
    // .then(message => console.log(message.sid));
    res.send("done")

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

