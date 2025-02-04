import { Client } from "@opensearch-project/opensearch";

const PushToOpenSearch =  async (title, description, author, videoUrl) => {
   try {

       console.log('Pushing to Open Search');
       // Process video upload and extract metadata
       var auth = "keerti:HHLDisawesome1!"; // For testing only. Don't store credentials in code.
       var host = "https://streamtube:Kathir2212!@search-yt-os-service-vl3kimkppurv2rwcsz6r3mq3la.eu-north-1.es.amazonaws.com";
       var host_aiven = "https://avnadmin:AVNS_qHdQGO91Uz-bJl-Mmcq@os-2d5f82e7-ritchennai-d496.g.aivencloud.com:10972";
      
       var client = new Client({
           node: host_aiven
       });

       var index_name = "video";
       var document = {
           title: title,
           author: author,
           description: description,
           videoUrl: videoUrl
       };

       var response = await client.index({
           id: title, // id should ideally be db id
           index: index_name,
           body: document,
           refresh: true,
       });
       console.log("Adding document:");
       console.log(response.body);
      
   } catch (error) {
       // Respond with error message
       console.log(error.message)
   }
};
export default PushToOpenSearch;