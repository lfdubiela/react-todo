import React, { Component } from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeDescription, search, add } from './todoActions'

class TodoForm extends Component {

    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
        // this.handleAdd = this.handleAdd.bind(this)
        // this.handleSearch = this.heandleSearch.bind(this)
        // this.handleClear = this.handleClear.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, description } = this.props

        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            // props.handleClear()
        }
    }

    render() {
        const { add, search, changeDescription, description } = this.props
        return (
            <div role='form' className='todo-form'>
                <Grid cols='12 9 10'>
                    <input id="description" type="text" className="form-control"
                        placeholder='Adicione uma tarefa'
                        onChange={changeDescription}
                        onKeyUp={this.keyHandler}
                        value={description}
                    />
                </Grid>

                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' onClick={ () => add(description) } />
                    <IconButton style='info' icon='search' onClick={ () => search } />
                    <IconButton style='default' icon='close' onClick={this.props.handleClear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispatch =>
    bindActionCreators({ changeDescription, search, add }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)