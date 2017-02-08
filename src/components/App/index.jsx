import React, { PureComponent } from 'react';
import WPAPI from 'wpapi';
import WP_API_Settings from 'WP_API_Settings';

import EntryComposer from '../EntryComposer';
import EntryList from '../EntryList';

import styles from './App.styl';

class App extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      authError: false,
      entries: [],
      loading: true,
    };

    this.savePost = this.savePost.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    this.api = new WPAPI({
      endpoint: WP_API_Settings.root,
      nonce: WP_API_Settings.nonce
    });
    this.api.journalEntries = this.api.registerRoute( 'wp/v2', 'journal-entries/(?P<id>[\\d]+)', {
      params: [ 'status' ]
    });

    this.updateData();
  }

  savePost(post) {
    const { currentPost } = this.state;

    if (currentPost && currentPost.id) {
      return this.api.journalEntries()
        .id(currentPost.id)
        .update(Object.assign(post, {
          status: 'private'
        }))
        .then(result => {
          this.setState({
            currentPost: null
          });
          // Refresh the data
          this.updateData();
          return result;
        });
    }

    return this.api.journalEntries()
      .create({
        title: post.title,
        content: post.content,
        current_music: post.current_music,
        status: 'private'
      })
      .then(result => {
        // Refresh the data
        this.updateData();
        return result;
      });
  }

  handleEditClick(post) {
    this.setState({
      currentPost: post
    });
  }

  updateData() {
    this.api.journalEntries()
      .status('any')
      .context('edit')
      .then(entries => {
        this.setState({
          loading: false,
          entries,
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
        if (e.data && e.data.status === 400) {
          this.setState({
            authError: true
          });
        } else {
          console.error(e);
        }
      });
  }

  render() {
    const {
      authError,
      currentPost,
      entries,
      loading,
    } = this.state;

    if ( authError ) {
      return (
        <div className={styles.AppError}>
          <h2>Authentication Failure</h2>
          <p><em>You must be logged in to access your journal</em></p>
        </div>
      );
    }

    if ( loading ) {
      return (
        <div className={styles.AppLoading}>
          <h2>Loading Journal...</h2>
        </div>
      );
    }

    const leftColumn = entries.length ? (
      <EntryList
        className={styles.leftColumn}
        entries={entries}
        onEdit={this.handleEditClick}
        selected={currentPost}
      />
    ) : (
      <div className={styles.leftColumn}>
        <h2>No entries found</h2>
      </div>
    );

    return (
      <div className={styles.App}>
        <EntryComposer
          entry={currentPost}
          className={styles.rightColumn}
          onSubmit={this.savePost}
        />
        {leftColumn}
      </div>
    );
  }
}

export default App;
