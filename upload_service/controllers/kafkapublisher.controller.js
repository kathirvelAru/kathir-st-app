import KafkaConfig from "../kafka/kafka.js";

const sendMessageToKafka = async (req, res) => {
   console.log("got here in upload service...")
   try {
       const message = req.body
       console.log("body : ", message)
       const kafkaconfig = new KafkaConfig()
       const msgs = [
           {
               key: "key1",
               value: JSON.stringify(message)
           }
       ]
       const result = await kafkaconfig.produce("transcode", msgs)
       console.log("result of produce : ", result)
       res.status(200).json("message uploaded successfully")

   } catch (error) {
       console.log(error)
   }
}
export default sendMessageToKafka;

export const pushVideoForEncodingToKafka = async(title,filename) =>{
    try {
        const message = {
            "title":title,
            "filename":filename
        }
        console.log("body : ", message)
        const kafkaconfig = new KafkaConfig()
        const msgs = [
            {
                key: "Video",
                value: JSON.stringify(message)
            }
        ]
        await kafkaconfig.produce("transcode", msgs)
 
    } catch (error) {
        console.log(error)
    }
}
