import { defineStore } from "pinia";
import db from "../utils/firebase";
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, deleteField, setDoc } from "firebase/firestore";


const useTodo = defineStore('todo', {
    state: () => ({
        todos: []
    }),
    getters: {
        getTodos: (state) => state.todos
    },
    actions: {
        async loadTodos() {
            try {
                const docsSnap = await getDocs(collection(db, 'todos'));
                docsSnap.forEach((doc) => {
                    let todo = doc.data();
                    todo.id = doc.id;
                    this.todos.push(todo);
                })
            } catch (error) {
                console.log(error)
            }
        },
        async addTodo(todo) {
            try {
                let response = await addDoc(collection(db, "todos"), todo)
                todo.id = response.id
                this.todos = [...this.todos, todo]
            } catch (error) {
                console.log(error)
            }
        },
        async removeTodo(id) {
            try {
                await deleteDoc(doc(db, 'todos', id))
                this.todos = this.todos.filter((x) => x.id != id)
            } catch (error) {
                console.log(error)
            }
        },
        async isDoneEdit(todo) {
            try {
                const docSnap = doc(db, "todos", todo.id);
                setDoc(docSnap, { isDone: todo.isDone }, { merge: true });
                let index = this.todos.findIndex(x => x.id === todo.id)
                this.todos[index].isDone = todo.isDone
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export default useTodo