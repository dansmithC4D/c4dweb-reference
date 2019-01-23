<?php

/**
 * @file
 * Block hook implementations and block form alterations.
 */

/**
 * Implements hook_block_info().
 */
function current_search_block_info() {
  $blocks = array();

  // Loads settings for enabled facets.
  ctools_include('export');
  foreach (ctools_export_crud_load_all('current_search') as $config) {
    if (empty($config->disabled)) {
      $blocks[$config->name] = array(
        'info' => 'Current search: ' . $config->label,
        'cache' => DRUPAL_NO_CACHE,
      );
    }
  }

  // Returns available blocks.
  return $blocks;
}

/**
 * Implements hook_ctools_block_info().
 *
 * @see http://drupal.org/node/1669918
 */
function current_search_ctools_block_info($module, $delta, &$info) {
  // Give the current search blocks it's own categories.
  $info['category'] = t('Current Search Blocks');
  // Allow blocks to be used before the search results in Panels.
  $info['render last'] = TRUE;
}

/**
 * Returns the content for a facet based on the delta.
 */
function current_search_block_view($delta = '') {
  // Test block visibility and ensure the config and adapter will load.
  if (!current_search_check_visibility($delta)) {
    return;
  }

  // Load configuration and adapter.
  $config = ctools_export_crud_load('current_search', $delta);
  $adapter = facetapi_adapter_load($config->settings['searcher']);

  $build = array();

  // Iterate over items and execute the plugins.
  foreach ($config->settings['items'] as $name => $item) {
    if ($class = ctools_plugin_load_class('current_search', 'items', $item['id'], 'handler')) {
      $plugin = new $class($name, $config);
      if ($return = $plugin->execute($adapter)) {
        $build[$name] = $return;
        $build[$name]['#theme_wrappers'][] = 'current_search_item_wrapper';
        $build[$name]['#current_search_id'] = $item['id'];
        $build[$name]['#current_search_name'] = $name;
      }
    }
  }

  // Return the block content.
  if (count($build)) {
    $build['#contextual_links'] = array(
      'current_search' => array('admin/config/search/current_search/list', array($delta)),
    );
    return array(
      'subject' => t('Current search'),
      'content' => $build,
    );
  }
}

/**
 * Checks whether the block should be displayed.
 *
 * In cases where modules like Context are being used, hook_block_list_alter()
 * is not invoked and we get fatal errors. We have to test whether or not the
 * hook has been invoked and call this function manually otherwise.
 *
 * @param $delta
 *   The block delta.
 *
 * @return
 *   A boolean flagging whether to display this block or not.
 */
function current_search_check_visibility($delta) {

  // Checks whether block should be displayed.
  if (!$config = current_search_item_load($delta)) {
    return FALSE;
  }
  if (empty($config->settings['searcher'])) {
    return FALSE;
  }
  if (!facetapi_is_active_searcher($config->settings['searcher'])) {
    return FALSE;
  }
  if (!$adapter = facetapi_adapter_load($config->settings['searcher'])) {
    return FALSE;
  }
  if (!$adapter->searchExecuted($config->settings['searcher'])) {
    return FALSE;
  }

  // Returns TRUE based on the empty_searches setting and the current search.
  switch ($config->settings['advanced']['empty_searches']) {
    case CURRENT_SEARCH_DISPLAY_KEYS:
      return ($adapter->getSearchKeys());
    case CURRENT_SEARCH_DISPLAY_FILTERS:
      return ($adapter->getAllActiveItems());
    case CURRENT_SEARCH_DISPLAY_KEYS_FILTERS:
      return ($adapter->getSearchKeys() || $adapter->getAllActiveItems());
    case CURRENT_SEARCH_DISPLAY_ALWAYS:
    default:
      return TRUE;
  }
}

/**
 * Gets the default searcher.
 *
 * @return
 *   The default searcher.
 *
 * @todo Figure out a beter default system.
 */
function current_search_get_default_searcher() {
  $options = current_search_get_searcher_options();
  return key($options);
}
