import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './todoitem';
const ToDoList = props => {
    return (
        <div className="list-group">
            {
                props.todos.length > 0 ?
                props.todos.map((todo, i) => {
                    return (
                        <ToDoItem
                            todo={todo}
                            key={i}
                            handleClickTrash={props.handleClickTrash}
                            pos={i}
                        />
                    )
                })
                :(
                    <a href="#" className="list-group-item list-group-item-action text-center disabled">
                        Lista de Tareas Vacia
                    </a>
                )
            }
        </div>
    )
}
ToDoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleClickTrash: PropTypes.func.isRequired
}
export default ToDoList;