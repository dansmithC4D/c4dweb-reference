<?php

/**
 * @file
 * Custom Display Suite function fields and theming functions.
 */

/**
 * Theme function for wiki page.
 *
 * @param array $variables
 *   Theme variables.
 *
 * @return mixed
 *   The rendered output.
 */
function theme_c4m_features_og_wiki_wiki(array $variables) {
  $output = '';
  if (empty($variables['content'])) {
    $message['element'] = array(
      '#tag' => 'p',
      '#attributes' => array(
        'class' => array('wiki-empty-message'),
      ),
      '#value' => t('No wiki pages (yet).'),
    );
    $output .= theme_html_tag($message);

    // Add wiki page button when user has permissions to add a wiki page.
    if ($group = og_context()) {
      if (node_access('create', 'wiki_page')) {
        $url_options = array(
          'absolute' => TRUE,
          'purl' => array(
            'provider' => 'og_purl|node',
            'id' => $group['gid'],
          ),
        );

        $button['element'] = array(
          '#tag' => 'a',
          '#attributes' => array(
            'class' => array('add-wiki-page btn btn-success'),
            'href' => url(
              'node/add/wiki-page',
              $url_options
            ),
          ),
          '#value' => t('Add a new wiki page.'),
        );
        $output .= theme_html_tag($button);
      }
    }
    return $output;
  }
}
