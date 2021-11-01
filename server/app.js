import Vonage from '@vonage/server-sdk'

const vonage = new Vonage({
    applicationId:process.env.VONAGE_APPLICATION_ID,
    privateKey:'./private.key'
})

const textMessage = "Hello from Mansi"
const toNumber = '7506318246'

vonage.channel.send(
    { "type": "sms", "number": toNumber },
    { "type": "sms", "number": 'Vonage' },
    {
        "content": {
        "type": "text",
        "text": textMessage
        }
    },
    (err, data) => {
        if (err) {
        console.error(err);
        } else {
        console.log(data.message_uuid);
        }
    }
);