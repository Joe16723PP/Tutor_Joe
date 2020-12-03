import { BookModel } from "./models.ts";

let bookList: BookModel[] = [
  {
    id: 0,
    name: "onepiece",
    price: 30,
    type: "cartoon",
    amount: 2,
  },
  {
    id: 1,
    name: "inception",
    price: 299,
    type: "movie",
    amount: 4,
  },
  {
    id: 2,
    name: "football",
    price: 99,
    type: "sport",
    amount: 1,
  },
];

const getAllBook = () => {
  return bookList;
};
const getBookById = (id: number) => {
  const book = bookList.find((value) => {
    return value.id === id;
  });
  return book ? book : null;
};

const getBookByType = (type: string) => {
  const filteredBooks = bookList.filter((value) => {
    return value.type === type;
  });
  return filteredBooks.length !== 0 ? filteredBooks : null;
};

const addBook = (book: BookModel) => {
  bookList.push(book);
};

const updateAmount = (bookId: number, updatedAmount: number) => {
  let foundIndex = 0;
  const updatedBook = bookList.find((value, index) => {
    if (value.id === bookId) {
      foundIndex = index;
      return value;
    }
  });
  if (updatedBook) {
    const tmp = { ...updatedBook, amount: updatedAmount };
    bookList[foundIndex] = tmp;
    return true;
  } else {
    return false;
  }
};
const updatePrice = (bookId: number, updatedPrice: number) => {
  let foundIndex = 0;
  const updatedBook = bookList.find((value, index) => {
    if (value.id === bookId) {
      foundIndex = index;
      return value;
    }
  });
  if (updatedBook) {
    const tmp = { ...updatedBook, price: updatedPrice };
    bookList[foundIndex] = tmp;
    return true;
  } else {
    return false;
  }
};

const deleteBook = (bookId: number) => {
  const deletedBook = bookList.find((value, index) => {
    return value.id === bookId;
  });

  if (deletedBook) {
    bookList = bookList.filter((value) => {
      return value.id !== deletedBook.id;
    });
    return true;
  } else {
    return false;
  }
};

const getOutOfStock = () => {
    return bookList.filter(value => {
        return value.amount >= 0;
    })
}

export default {
  getAllBook,
  getBookById,
  getBookByType,
  addBook,
  updateAmount,
  updatePrice,
  deleteBook,
  getOutOfStock
};
