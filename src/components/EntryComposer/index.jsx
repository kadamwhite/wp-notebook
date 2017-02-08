import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';

import DangerousBlock from '../DangerousBlock';

import styles from './EntryComposer.styl';

class EntryComposer extends PureComponent {

  constructor(props) {
    super(props);

    const entry = props.entry;

    this.state = {
      missingTitle: false,
      missingContent: false,
      title: null,
      content: null,
      current_music: null,
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
    const title = this.valueOf('title');
    const content = this.valueOf('content');
    const current_music = this.valueOf('current_music');

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
        title: null,
        content: null,
        current_music: null,
      });
    });
  }

  valueOf(prop) {
    if (this.state[prop] !== null) {
      return this.state[prop];
    }

    if (this.props.entry && this.props.entry[prop]) {
      return this.props.entry[prop].raw ?
        this.props.entry[prop].raw :
        this.props.entry[prop];
    }

    return '';
  }

  render() {
    const { entry } = this.props;
    const formClass = classNames(this.props.className, styles.EntryComposer);
    const { missingTitle, missingContent } = this.state;

    const values = {
      title: this.valueOf('title'),
      content: this.valueOf('content'),
      current_music: this.valueOf('current_music'),
    };
    console.log(this.props.entry, values.current_music);

    return (
      <form className={formClass} onSubmit={this.handleSubmit}>
        <h2>{!!entry ? 'Edit' : 'Add'} Journal Entry</h2>

        {missingTitle ? (
          <p className={styles.error}>Title is required</p>
        ) : null}

        <label>
          Title
          <input
            type="text"
            name="title"
            value={values.title}
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
            value={values.content}
            onChange={this.handleChange}
            required
          ></textarea>
        </label>

        <label>
          Currently Listening to
          <input
            type="text"
            name="current_music"
            value={values.current_music}
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
    id: PropTypes.number,
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
