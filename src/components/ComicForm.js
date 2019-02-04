import React, { Component } from 'react';
import './css/comicForm.css';

class ComicForm extends Component {
  render() {
    return (
      <div className="comics form-container">
        <form onSubmit={this.props.onSubmit} className="dashboard-comics-form">
          <button className="dashboard-button">COMICS</button>
        </form>
      </div>
    );
  }
}

export default ComicForm;