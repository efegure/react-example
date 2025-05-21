import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'
import { Product, User } from '~/types/domain'

export const productHandlers = [
    http.get('/api/product', async () => {
        const products = Array.from({ length: 5 }).map(() => ({
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department()
        }))

        await delay(1000)
        return HttpResponse.json(products)
    }),

    http.post('/api/product', async ({ request }) => {
        const newProduct = (await request.json()) as Partial<Product>
        await delay(1000)
        return HttpResponse.json({ id: faker.string.uuid(), ...newProduct }, { status: 201 })
    }),
    http.put('/api/product', async ({ request }) => {
        const editedProduct = (await request.json()) as Product
        await delay(1000)
        return HttpResponse.json(editedProduct, { status: 200 })
    }),
    http.delete('/api/product/:id', async ({ params }) => {
        await delay(1000)
        return HttpResponse.json({ id: params.id }, { status: 200 })
    })
]

export const userHandlers = [
    http.get('/api/user', async () => {
        const users = Array.from({ length: 5 }).map(() => ({
            id: faker.string.uuid(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            gender: faker.person.gender(),
            avatar: faker.image.avatar()
        }))
        await delay(1000)
        return HttpResponse.json(users)
    }),
    http.post('/api/user', async ({ request }) => {
        const newUser = (await request.json()) as Partial<User>
        await delay(1000)
        return HttpResponse.json({ id: faker.string.uuid(), ...newUser }, { status: 201 })
    }),
    http.put('/api/user', async ({ request }) => {
        const editedUser = await request.json()
        await delay(1000)
        return HttpResponse.json(editedUser, { status: 200 })
    }),
    http.delete('/api/user/:id', async ({ params }) => {
        await delay(1000)
        return HttpResponse.json({ id: params.id }, { status: 200 })
    })
]
