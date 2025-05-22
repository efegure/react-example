import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'
import { Product, User } from '~/types/domain'

// ? MOCK DATA
const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys']
let favorites: Array<string> = []
const products = Array.from({ length: 10 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  category: faker.helpers.arrayElement(CATEGORIES),
  price: faker.finance.amount()
}))
const users = Array.from({ length: 5 }).map(() => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
}))

// ? MOCK DATA

export const productHandlers = [
  http.get('/api/product', async () => {
    await delay(500)
    return HttpResponse.json(products)
  }),

  http.post('/api/product', async ({ request }) => {
    const newProduct = (await request.json()) as Partial<Product>
    await delay(500)
    return HttpResponse.json(
      { id: faker.string.uuid(), ...newProduct },
      { status: 201 }
    )
  }),
  http.put('/api/product', async ({ request }) => {
    const editedProduct = (await request.json()) as Product
    await delay(500)
    return HttpResponse.json(editedProduct, { status: 200 })
  }),
  http.delete('/api/product/:id', async ({ params }) => {
    await delay(500)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  }),
  http.get('/api/product/favorite/:id', async ({ params }) => {
    const id = params.id as string
    if (favorites.includes(id)) {
      favorites = favorites.filter((e) => e !== id)
    } else {
      favorites.push(id)
    }
    await delay(500)
    return HttpResponse.json(favorites, { status: 200 })
  }),
  http.get('/api/product/search', async ({ request }) => {
    const url = new URL(request.url)
    const query = decodeURI(url.searchParams.get('query') ?? '')
    const category = decodeURI(url.searchParams.get('category') ?? '')
    await delay(500)
    return HttpResponse.json(
      products
        .filter(
          (p) =>
            p.name.toLocaleLowerCase().includes(query) ||
            p.description.toLocaleLowerCase().includes(query)
        )
        .filter((p) => (category ? p.category === category : true)),
      { status: 200 }
    )
  })
]

export const userHandlers = [
  http.get('/api/user', async () => {
    await delay(500)
    return HttpResponse.json(users)
  }),
  http.post('/api/user', async ({ request }) => {
    const newUser = (await request.json()) as Partial<User>
    await delay(500)
    return HttpResponse.json(
      { id: faker.string.uuid(), avatar: faker.image.avatar(), ...newUser },
      { status: 201 }
    )
  }),
  http.put('/api/user', async ({ request }) => {
    const editedUser = (await request.json()) as Partial<User>
    await delay(500)
    return HttpResponse.json(
      { avatar: faker.image.avatar(), ...editedUser },
      { status: 200 }
    )
  }),
  http.delete('/api/user/:id', async ({ params }) => {
    await delay(500)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  })
]
