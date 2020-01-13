import React from 'react'
import IconButton from '../template/iconButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { markAsDone, remove } from './todoActions'

const TodoList = props => {
    const renderRows = () => {
        const list = props.list || []

        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'task-done' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={todo.done}
                        onClick={() => props.markAsDone(todo)}>
                    </IconButton>

                    <IconButton style='warning' icon='rotate-left' hide={!todo.done}
                        onClick={() => props.markAsDone(todo)}>
                    </IconButton>

                    <IconButton style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.remove(todo)}>
                    </IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='table-actions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = dispatch =>
    bindActionCreators({ markAsDone, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)