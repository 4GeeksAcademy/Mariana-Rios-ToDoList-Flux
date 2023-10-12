import React, { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import injectContext from "../store/appContext";
import { Context } from "../store/appContext";


export const Home = () => {

	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<div>
				<h1 className="header">ToDo's</h1>
			</div>
			<div>
				<input type="text" className="py-3 w-100 inputLine" placeholder="What needs to be done?" onKeyDown={(e) => actions.submitNewtask(e)}/>
			</div>
			<div>
				<ul className="tasksUL">
					{store.todos.map((task, i) => (
						<li className="listItem" onMouseOver={() => actions.hovering(i)} onMouseOut={() => actions.notHovering(i)} key={i}>
							{task.label}
							<i onClick={() => actions.deleteTask(i)} className="fa-solid fa-xmark deletebtn" id={"deletebtn" + i}></i>
						</li>
						))}
				</ul>
			</div>
			<div className="itemsLeft">{store.todos.length} Items Left</div>
		</div>
	);
};

export default injectContext(Home);