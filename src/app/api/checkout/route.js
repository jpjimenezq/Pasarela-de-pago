import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";

const clientId = process.env.PAYPAL_CLIENT_ID
const clientSecret = process.env.PAYPAL_CLIENT_SECRET

const enviorenment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(enviorenment)

export async function POST(){
    try {
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100.00",
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: "100.00"
                            }
                        }
                    },
                    items: [
                        {
                            name: "Picafresa",
                            description: "Una rica picafresa",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "USD",
                                value: "50.00",
                            }
                        },
                        {
                            name: "Churro",
                            description: "Un rico churro",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "USD",
                                value: "50.00",
                            }
                        }
                    ]
                }
            ]
        });

        const response = await client.execute(request)
        console.log(response)

        const db = await connectToDatabase();
        const ordersCollection = db.collection("orders");
        await ordersCollection.insertOne({
            paypalOrderId: response.result.id,
            createdAt: new Date()
        });

        return NextResponse.json({
            id: response.result.id
        })
    } catch (error) {
        console.error("Error al crear la orden de Paypal: ", error.message);
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}