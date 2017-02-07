import React, { PropTypes, PureComponent } from 'react';

import DangerousBlock from '../DangerousBlock';

import styles from './EntryComposer.styl';

class EntryComposer extends PureComponent {

  constructor(props) {
    super(props);

    const entry = props.entry;

    this.state = {
      missingTitle: false,
      missingContent: false,
      title: entry ? (entry.title && entry.title.raw) : '',
      content: entry ? (entry.content && entry.content.raw) : '',
      current_music: entry ? entry.current_music : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { title, content, current_music } = this.state;

    this.setState({
      missingTitle: !title,
      missingContent: !content,
    });

    if (!title || !content) {
      return;
    }

    onSubmit({
      title,
      content,
      current_music,
    }).then(result => {
      this.setState({
        title: '',
        content: '',
        current_music: '',
      });
    });
  }

  render() {
    const { entry } = this.props;
    const { missingTitle, missingContent } = this.state;

    return (
      <form className={styles.EntryComposer} onSubmit={this.handleSubmit}>
        <h2>{!!entry ? 'Edit' : 'Add'} Journal Entry</h2>

        {missingTitle ? (
          <p className={styles.error}>Title is required</p>
        ) : null}

        <label>
          Title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
        </label>

        {missingContent ? (
          <p className={styles.error}>Content is required</p>
        ) : null}

        <label>
          Content
          <textarea
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            required
          ></textarea>
        </label>

        <label>
          Currently Listening to
          <input
            type="text"
            name="current_music"
            value={this.state.current_music}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit" className="btn">Save</button>
      </form>
    );
  }
}

EntryComposer.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.shape({
      raw: PropTypes.string,
      rendered: PropTypes.string,
    }),
    content: PropTypes.shape({
      raw: PropTypes.string,
      rendered: PropTypes.string,
    }),
    date: PropTypes.string,
    current_music: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default EntryComposer;
