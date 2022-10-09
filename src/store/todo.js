import { defineStore } from "pinia";
import db from "../utils/firebase";
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, deleteField, setDoc } from "firebase/firestore";
import { useToast } from "vue-toastification";
const toast = useToast();


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
                toast.error(error);
            }
        },
        async addTodo(todo) {
            try {
                let response = await addDoc(collection(db, "todos"), todo)
                toast.success('Eklendi')
                todo.id = response.id
                this.todos = [...this.todos, todo]
            } catch (error) {
                toast.error(error)
            }
        },
        async removeTodo(id) {
            try {
                await deleteDoc(doc(db, 'todos', id))
                toast.success('Silindi')
                this.todos = this.todos.filter((x) => x.id != id)
            } catch (error) {
                toast.error(error)
            }
        },
        removeAll(todos) {
            todos.forEach(x => {
                deleteDoc(doc(db, 'todos', x.id)).then(x => {
                    toast.success('Tumu Silindi')
                    this.todos = null
                }).catch(err => {
                    toast.error(err)
                })
            })
        },
        async isDoneEdit(todo) {
            try {
                todo.isDone = !todo.isDone;
                const docSnap = doc(db, "todos", todo.id);
                setDoc(docSnap, { isDone: todo.isDone }, { merge: true });
                let index = this.todos.findIndex(x => x.id === todo.id)
                this.todos[index].isDone = todo.isDone
            } catch (error) {
                toast.error(error)
            }
        }
    }
})

export default useTodo