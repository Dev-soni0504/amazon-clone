// // /**
// //  * Import function triggers from their respective submodules:
// //  *
// //  * const {onCall} = require("firebase-functions/v2/https");
// //  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
// //  *
// //  * See a full list of supported triggers at https://firebase.google.com/docs/functions
// //  */

// // // const {onRequest} = require("firebase-functions/v2/https");
// // // const logger = require("firebase-functions/logger");
// // // const express = require ("express");
// // // const cors = require("cors");
// // // const stripe = require("stripe")('sk_test_51R2crjCFfRcf7IM37BdaG8pBcz80JuleSNVrVknk17hwNaqv49926O11Wy5EfDVYyAuqM0HJfC1Y42nRsxnw6Hpb0044jubUmh')

// // // //API

// // // //APP CONFIG
// // // const app = express();

// // // //middlewares
// // // app.use(cors({ origin: true}));
// // // app.use(express.json());

// // // //API ROUTES
// // // app.get('/',(request,response)=>response.status(200).send
// // // ('hello world'))

// // // //LISTEN COMMAND
// // // exports.api = FunctionsError.https.onRequest(app)

// // const { onRequest } = require("firebase-functions/v2/https"); // Correct import
// // const logger = require("firebase-functions/logger");
// // const express = require("express");
// // const cors = require("cors");
// // const stripe = require("stripe")("sk_test_51R2crjCFfRcf7IM37BdaG8pBcz80JuleSNVrVknk17hwNaqv49926O11Wy5EfDVYyAuqM0HJfC1Y42nRsxnw6Hpb0044jubUmh");

// // // APP CONFIG
// // const app = express();

// // // MIDDLEWARES
// // app.use(cors({ origin: true }));
// // app.use(express.json());

// // // API ROUTES
// // app.get("/", (request, response) => response.status(200).send("Hello, world!"));

// // app.post('/payments/create',async(request,response)=>{
// //     const total = request.query.total;

// //     console.log('Payment request received boom!!! for this amount>>>',total)

// //     const paymentIntent = await stripe.paymentIntents.create({
// //         amount:total,//subunits of currency
// //         currency:"usd",
// //     });

// //     //OK-CREATED
// //     response.status(201).send({
// //         clientSecret:paymentIntent.client_secret,
// //     })
// // })

// // // LISTEN COMMAND (Corrected export)
// // exports.api = onRequest(app); // Use `onRequest(app)` instead of `FunctionsError.https.onRequest(app)`


const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51R2crjCFfRcf7IM37BdaG8pBcz80JuleSNVrVknk17hwNaqv49926O11Wy5EfDVYyAuqM0HJfC1Y42nRsxnw6Hpb0044jubUmh");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello, world!"));

app.post("/payments/create", async (req, res) => {
  const {total} = req.body; // ✅ Extract total from body (not query)

  console.log("Received Payment Request for total:", total); // Debugging

  if (!total || isNaN(total) || total <= 0) {
    return res.status(400).send({error: "Invalid or missing total amount"});
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total), // Convert to an integer
      currency: "usd",
    });

    console.log("Generated Client Secret:", paymentIntent.client_secret); // Debugging

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).send({error: error.message});
  }
});

exports.api = onRequest(app);
