//sk_test_51MySfISDhR3TyBvwoYeehMM7Sdyh4zd6brbEI9aFqODMHCNP00cDThCfyNKVLH5kUtM3zUctNGN6Ry1B3fYYzdyO00HU93h5lW
//coffee : price_1MySjxSDhR3TyBvwS75uxtWr
//sunglasses : price_1MySlhSDhR3TyBvwq2hacMkg
//phone: price_1MySlhSDhR3TyBvwq2hacMkg
//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

const express=require('express');
const cors=require('cors');

const stripe=require('stripe')('sk_test_51MySfISDhR3TyBvwoYeehMM7Sdyh4zd6brbEI9aFqODMHCNP00cDThCfyNKVLH5kUtM3zUctNGN6Ry1B3fYYzdyO00HU93h5lW')


const app=express();
app.use(cors());
app.use(express.static('public'));

app.use(express.json());



app.post("/checkout", async (req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "https://thunderous-nasturtium-64dc45.netlify.app/success",
        cancel_url: "https://thunderous-nasturtium-64dc45.netlify.app/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});



//run
app.listen(4000,()=>{
    console.log(`Server running on  ${4000}`);
})