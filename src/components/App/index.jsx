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
    console.log(post);
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

  updateData() {
    this.api.journalEntries()
      .status( 'any' )
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
    const { authError, entries, loading } = this.state;
    return loading ? (
      <div className={styles.AppLoading}>
        <EntryComposer onSubmit={this.savePost} />
        <h2>Loading Entries...</h2>
      </div>
    ) : authError ? (
      <div className={styles.AppError}>
        <h2>Authentication Failure</h2>
        <p><em>You must be logged in to access your journal</em></p>
      </div>
    ) : (
      <div className={styles.App}>
        <EntryComposer onSubmit={this.savePost} />
        {entries.length ? (
          <EntryList entries={entries} />
        ) : (
          <h2>No entries found</h2>
        )}
      </div>
    );
  }
}

export default App;
