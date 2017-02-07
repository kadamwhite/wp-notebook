<?php
/**
 * Plugin Name: WP Notebook
 * Description: Provides a private journaling interface within WordPress
 * Author: K Adam White
 * Author URI: http://github.com/kadamwhite
 * Version: 0.1.0
 * Plugin URI: http://github.com/kadamwhite/wp-notebook
 */
require_once( 'lib/page-templater.php' );

function wpn_enqueue_scripts() {
  wp_register_script(
    'wpn_notebook_app',
    plugin_dir_url( __FILE__ ) . 'dist/bundle.js',
    array(),
    false,
    true
  );
  wp_register_style(
    'wpn_notebook_styles',
    plugin_dir_url( __FILE__ ) . 'dist/bundle.css'
  );
  if ( is_page_template( 'wpn_notebook.php' ) ) {
    // Localize our script to inject a NONCE that can be used to authenticate
    wp_localize_script(
      'wpn_notebook_app',
      'WP_API_Settings',
      array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
      )
    );
    wp_enqueue_script( 'wpn_notebook_app' );
    wp_enqueue_style( 'wpn_notebook_styles' );
  }
}
add_action( 'wp_enqueue_scripts', 'wpn_enqueue_scripts' );

function wpn_register_journal_cpt() {
  $args = array(
    'labels'             => array(
      'name'               => _x( 'Journal Entries', 'post type general name', 'wpnotebook' ),
      'singular_name'      => _x( 'Journal Entry', 'post type singular name', 'wpnotebook' ),
    ),
    'description'        => __( 'Private journal entries.', 'wpnotebook' ),
    'hierarchical'       => false,
    'menu_position'      => null,
    // No admin UI or archives page
    'public'             => false,
    // But expose through REST
    'show_in_rest'       => true,
    'rest_base'          => 'journal-entries',
    'capability_type'    => 'post',
    'supports'           => array( 'title', 'editor', 'custom-fields' )
  );

  register_post_type( 'wpn_journal', $args );
}
add_action( 'init', 'wpn_register_journal_cpt' );

function wpn_register_rest_fields() {
  register_rest_field(
    'wpn_journal',
    'current_music',
    array(
      'get_callback' => function ( $data ) {
        return get_post_meta( $data['id'], '_current_music', true );
      },
      'update_callback' => function ( $value, $post ) {
        $value = sanitize_text_field( $value );
        update_post_meta( $post->ID, '_current_music', wp_slash( $value ) );
      },
      'schema' => array(
        'description' => __( 'The music you were listening to as you compose an entry.', 'wpnotebook' ),
        'type'        => 'string'
      ),
    )
  );
}
add_action( 'rest_api_init', 'wpn_register_rest_fields' );

