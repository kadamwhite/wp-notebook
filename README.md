# WP Notebook

A simple front-end private journaling application application for the WordPress REST API, built with the [wpapi](https://github.com/wp-api/node-wpapi) NPM module and React.

It registers a "wpn_journal" custom post type, which is configured to only be available through the API, and uses a React-generated front-end form to permit authenticated users to create private journal entries.

## Building the application

Run `npm run build`, or `npm run watch` to start Webpack in watch mode.

Files are built to `/dist`; generated bundles should be checked in to source control so that they can be detected by WordPress without a deploy-time build.
