import { makeAutoObservable } from "mobx"

type BooksType = {
    name?: string;
    description?: string;
    author?: string;
    id?: number,
}

type ItemType = {
    name: string,
    id:number,
    books: BooksType[] 
}

class User {
    users:ItemType[] = 
    JSON.parse(localStorage.getItem('users')!) || 
    [
        {
            name:"Василий Иванов",
            id: 1,
            books: []
        },
        {
            name:"Мария Петрова",
            id: 2,
            books: []
        },
        {
            name:"Иван Степанов",
            id: 3,
            books: []
        },
    ]

    index:number = 0

    constructor() {
        makeAutoObservable(this)
    }

    addUser(item:ItemType) {
        this.users.unshift(item)
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    deleteUser(id:number) {
        this.users = this.users.filter(user => user.id !== id)
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    GiveBook(book:BooksType | undefined, user:ItemType) {
       const indexUser =  this.users.indexOf(user)
       const sameBook = this.users[indexUser].books.find(i => i.id === book?.id)
       if (!sameBook){
        this.users[indexUser].books.unshift(book!)
       }
       localStorage.setItem('users', JSON.stringify(this.users))
    }

    indexUser(u:ItemType) {
        const obj = this.users.find(i => i.id === u.id)
        const index = this.users.indexOf(obj!)
        this.index = index
    }

    deleteBook(book:BooksType | undefined, indexUser:number) {
        const indexBook =  this.users[indexUser].books.indexOf(book!)
        this.users[indexUser].books.splice(indexBook,1)
        localStorage.setItem('users', JSON.stringify(this.users))
    }
}

export default new User()