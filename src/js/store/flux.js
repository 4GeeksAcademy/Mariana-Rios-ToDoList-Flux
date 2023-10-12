const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todos: [
				{
					done: false,
					id: "08f9862337094b7a9c5a3506dfbbd126",
					label: "example task"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			submitNewtask: (e) => {
				let store = getStore();
				let actions = getActions();
				if (e.key === "Enter") {
					const newTodo = {label: e.target.value, done: false, id: actions.getNextID()};
					store.todos.push(newTodo);
					setStore(store);
					// setStore({todos:[...store.todos, ...[newTodo]]});
					console.log(newTodo);
					actions.uploadTodos(store.todos)
				};
				
			},

			getNextID: () => {
				let store = getStore();
				return Math.max.apply(Math, store.todos.map(function(o) { return o.id; })) + 1;
			},

			hovering: (i) => {
				document.querySelector("#deletebtn" + i).style.visibility = "visible"
			},

			notHovering: (i) => {
				document.querySelector("#deletebtn" + i).style.visibility = "hidden"
			},

			deleteTask: (i) =>{
				let store = getStore();
				let actions = getActions()
				let newTaskList = store.todos.filter((item, indx) => indx !== i)
				setStore({todos:newTaskList});
				if (store.todos.length < 1){
					alert("dont delete")
				}
				else{
				actions.uploadTodos(newTaskList)
				}
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getTodos: () => {
				fetch('https://playground.4geeks.com/apis/fake/todos/user/mrios')
					.then(resp => {
						console.log("is response succesful: " + resp.ok); // will be true if the response is successfull
						console.log("status code: "+ resp.status); // the status code = 200 or code = 400 etc.
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						//here is where your code should start after the fetch finishes
						console.log(data); //this will print on the console the exact object received from the server
						setStore({todos: data})
					})
					.catch(error => {
						//error handling
						console.log(error);
					});
			},
			uploadTodos: (todos) => {
				fetch('https://playground.4geeks.com/apis/fake/todos/user/mrios', {
					method: "PUT",
					body: JSON.stringify(todos),
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				  .then(resp => {
					  console.log(resp.ok); // will be true if the response is successfull
					  console.log(resp.status); // the status code = 200 or code = 400 etc.
					  console.log(resp.text()); // will try return the exact result as string
					  return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				  })
				  .then(data => {
					  //here is where your code should start after the fetch finishes
					  console.log(data); //this will print on the console the exact object received from the server
				  })
				  .catch(error => {
					  //error handling
					  console.log(error);
				  });
			},
		}
	};
};

export default getState;
