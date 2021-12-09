import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      nombreAdmin: '',
      apellidoAdmin: '',
      fechaNacimientoAdmin: '',
      correoAdmin: " ",
      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombreAdmin: this.state.nombreAdmin,
          apellidoAdmin: this.state.apellidoAdmin,
          fechaNacimientoAdmin: this.state.fechaNacimientoAdmin,
          correoAdmin: this.state.correoAdmin,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({_id: '', nombreAdmin: '', apellidoAdmin: '',fechaNacimientoAdmin: '',correoAdmin: ''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
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
          window.M.toast({html: 'Task Saved'});
          this.setState({nombreAdmin: '', apellidoAdmin: '',fechaNacimientoAdmin: '',correoAdmin: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) {
    if(confirm('Are you sure you want to delete it?')) {
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
          M.toast({html: 'Task deleted'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          nombreAdmin: data.nombreAdmin,
          apellidoAdmin: data.apellidoAdmin,
          fechaNacimientoAdmin: data.fechaNacimientoAdmin,
          correoAdmin: data.correoAdmin,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">MERN Stack</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="nombreAdmin" onChange={this.handleChange} value={this.state.nombreAdmin} type="text" placeholder="Task Nombre" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="apellidoAdmin" onChange={this.handleChange} value={this.state.apellidoAdmin} cols="30" rows="10" placeholder="Task Apellido" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="fechaNacimientoAdmin" onChange={this.handleChange} value={this.state.fechaNacimientoAdmin} cols="30" rows="10" placeholder="Task fechaNacimientoAdmin" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="correoAdmin" onChange={this.handleChange} value={this.state.correoAdmin} cols="30" rows="10" placeholder="Task correoElectronico" className="materialize-textarea"></textarea>
                      </div>
                    </div>



                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>nombreAdmin</th>
                    <th>apellidoAdmin</th>
                    <th>fechaNacimientoAdmin</th>
                    <th>correoAdmin</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.nombreAdmin}</td>
                          <td>{task.apellidoAdmin}</td>
                          <td>{task.fechaNacimientoAdmin}</td>
                          <td>{task.correoAdmin}</td>
                          <td>
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
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
    )
  }
}

export default App;