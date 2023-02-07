const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3000
app.use(express.json())


const pedido = []

const firstMiddleWare = (request, response, next) => {
    const {id} = request.params

    const index = pedido.findIndex(pedido => pedido.id === id)

    if(index < 0) {
        return response.status(404).json({ menssage: "user not found"})
    }

    request.orderIndex = index
    request.orderId = id

    next()

}
 const secoundMiddleWare = (request, response, next) => {
    console.log(request.method)
    console.log(request.url)

    next()
 }

app.get('/order', secoundMiddleWare, (request, response) => {

    return response.json(pedido)

})

app.post('/order', secoundMiddleWare, (request, response) => {
    const {order, clientName, price} = request.body
    const comand = {id: uuid.v4() , order, clientName, price, "status": "em preparação"}

    pedido.push(comand)

    return response.status(201).json(comand)

})

app.put('/order/:id', firstMiddleWare, secoundMiddleWare, (request, response) => {
    const index = request.orderIndex
    const id = request.orderId

    const {order, clientName, price} = request.body
    const updateOrder = {id, order, clientName, price, "status": "em preparação"}
    
    pedido[index] = updateOrder

    return response.json(updateOrder)

})

app.delete('/order/:id', firstMiddleWare, secoundMiddleWare, (request, response) => {
    const index = request.orderIndex

    pedido.splice(index,1)

    return response.status(204).json()

})

app.get('/order/:id', firstMiddleWare, secoundMiddleWare, (request, response) => {
    const index = request.orderIndex

    return response.json(pedido [index])

})

app.patch('/order/:id', firstMiddleWare, secoundMiddleWare, (request, response) => {
    const index = request.orderIndex
    const order = pedido[index]
    
    order.status = "Pronto"

    return response.json(order)

})

app.listen(port, () => {
    console.log(`🐱 server started in port ${port}`)
})

