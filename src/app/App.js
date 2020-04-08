import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.addTask = this.addTask.bind(this);

    }

    // Crear Evento Agregar Tarea
    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Actualizada'});
                this.setState({title: '', description: '', _id: ''});
                this.fetchTasks();
            });
        } else {
            fetch('/api/tasks', 
        {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Saved'});
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({tasks: data});
            console.log(this.state.tasks);
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]:  value
        });
    }

    deleteTask(id) {
        // console.log(`Eliminando ${id}`);
        if(confirm('¿Está seguro de eliminar la Tarea?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Eliminada'});
                this.fetchTasks();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });
            console.log(this.state);
        });
    }

    render() {
        return (
            <div>
                {/* NAVEGACION */}
                <div className="container">
                    <nav className="blue-grey darken-3">
                        <div className="container">
                            <a className="brand-logo" href="/">MERN STACK</a>
                        </div>
                    </nav>
                </div>
                {/* End Container */}
                
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card blue-grey lighten-5">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                                                    <label htmlFor="title">Task Title</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <textarea className="materialize-textarea" name="description" onChange={this.handleChange} value={this.state.description}></textarea>
                                                    <label htmlFor="description">Task Description</label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn light-blue darken-4">
                                                Guardar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <div className="card blue-grey lighten-5">
                                <div className="card-content">
                                    <table className="centered">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tasks.map(task => {
                                                    return (
                                                        <tr key={task._id}>
                                                            <td>
                                                                {task.title}
                                                            </td>
                                                            <td>
                                                                {task.description}
                                                            </td>
                                                            <td>
                                                                <button className="btn amber lighten-2" style={{margin: '4px'}}
                                                                    onClick={
                                                                        () => this.editTask(task._id)
                                                                    }>
                                                                    <i className="material-icons">edit</i>
                                                                </button>
                                                                <button className="btn red darken-3" 
                                                                    onClick={
                                                                        () => {
                                                                            this.deleteTask(task._id);
                                                                        }
                                                                    }>
                                                                    <i className="material-icons">delete</i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )                                                
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Container */}
            </div>
        )
    }
}


export default App;