const express = require('express')
const app = express()

app.use(express.json())

const usersRouter = require('./routes/users')
const tokensRouter = require('./routes/tokens')
const restaurantsRoutes = require('./routes/restaurantRouter')
const ordersRouter = require('./routes/orders')

const search = require('./routes/search')



app.use('/api/users', usersRouter)
app.use('/api/tokens', tokensRouter)
app.use('/api/restaurants', restaurantsRoutes)
app.use('/api/orders', ordersRouter)
app.use('/api/search', search)

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
