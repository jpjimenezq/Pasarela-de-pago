"use client"
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'

function HomePage(){
  return (
    <div className='h-screen bg-slate-950 flex justify-center items-center'>
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT
      }}>
        <PayPalButtons
          style={{
            color: "blue",
            layout: "horizontal"
          }}
          createOrder={async () =>{
            const res = await fetch('/api/checkout', {
              method: "POST"
            })
            const order = await res.json()
            console.log(order)
            return order.id
          }}
          onApprove={(data, actions) => {
            console.log(data)
            actions.order.capture()
          }}
          onCancel={(data) => {
            console.log("Cancelled: ", data)
          }}
        />
      </PayPalScriptProvider>
    </div>
  )
}
export default HomePage