import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { BookModel } from "./models.ts";
import BookHandler from './bookHandler.ts';
const app = new Application();
const router = new Router();

// router
//     .get('/', (ctx) => {
//         ctx.response.body = 'my first deno api';
//     })
//     .get('/responsejson', (ctx) => {
//         ctx.response.body = { msg: 'my first deno api' };
//     })
//     .get('/param/:id', (ctx) => {
//         console.log(ctx.params.id);
//         ctx.response.body = { msg: 'get params from url' };
//     })
//     .get('/queryParam', (ctx) => {
//         console.log(ctx.request.url.searchParams.get('id'));
//         ctx.response.body = { msg: 'get query params from url' };
//     })
// .post('/postBody', async (ctx) => {
//     const body = await ctx.request.body();
//     console.log(body.value);
//     ctx.response.body = { msg: 'get body from url' };
// })
router
  .get("/", (ctx) => {
    ctx.response.body = { response: "my book store api" };
  })
  .get("/books", (ctx) => {
    ctx.response.body = { response: BookHandler.getAllBook() };
  })
  .get('/books/outofstock', (ctx) => {
    ctx.response.body = { response: BookHandler.getOutOfStock() };
  })
  .get("/books/:id", (ctx) => {
    const id = ctx.params.id;
    if (id) {
      const book = BookHandler.getBookById(+id);
      if (book) {
        ctx.response.body = { response: book };
      } else {
        ctx.response.body = { message: 'book not found' };
        ctx.response.status = 404;
      }
    } else {
      ctx.response.body = { message: 'bad request' };
      ctx.response.status = 400;
    }
  })
  .get("/books/type/:type", (ctx) => {
    const type = ctx.params.type;
    if (type) {
      const books = BookHandler.getBookByType(type);
      if (books) {
        ctx.response.body = { response: books };
      } else {
        ctx.response.body = { message: 'not found' };
        ctx.response.status = 404;
      }
    }
    else {
      ctx.response.body = { message: 'bad request' };
      ctx.response.status = 400;
    }
  })
  .post("/books", async (ctx) => {
    const body = await ctx.request.body();
    let newBook: BookModel = body.value;
    newBook.id = new Date().valueOf();
    BookHandler.addBook(newBook);
    ctx.response.body = { response: 'add book success' };
  })
  .patch("/books/:id/amount", async (ctx) => {
    const id = ctx.params.id;
    const body = await ctx.request.body();
    const amount = body.value.amount;
    
    if (id && amount) {
      const res = BookHandler.updateAmount(+id, +amount);
      if (res) {
        ctx.response.body = { response: 'update amount success' };
      } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'book not found' };
      }
    } else {
      ctx.response.body = { message: 'bad request' };
      ctx.response.status = 400;
    }
  })
  .patch("/books/:id/price", async (ctx) => {
    const id = ctx.params.id;
    const body = await ctx.request.body();
    const price = body.value.price;
    if (id && price) {
      const res = BookHandler.updatePrice(+id, +price);
      if (res) {
        ctx.response.body = { response: 'update price success' };
      } else {
        ctx.response.status = 404;
        ctx.response.body = { message: 'book not found' };
      }
    } else {
      ctx.response.body = { message: 'bad request' };
      ctx.response.status = 400;
    }
  })
  .delete("/books/:id", (ctx) => {
    const id = ctx.params.id;
    if (id) {
      const res = BookHandler.deleteBook(+id);
      if (res) {
        ctx.response.body = { response: 'delete sucess' };
      } else {
        ctx.response.body = { message: 'not found' };
        ctx.response.status = 404;
      }
    } else {
      ctx.response.body = { message: 'bad request' };
      ctx.response.status = 400;
    }
  });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.info(`app listen on http://localhost:3000`);
await app.listen({ port: 3000 });
