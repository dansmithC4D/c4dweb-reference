<?php
/**
 * @file
 * Custom theme function to theme the additional field.
 */

/**
 * DS function field.
 *
 * Render preview of document
 *
 * @param array $field
 *   The field definition.
 *
 * @return string
 *   The rendered version.
 */
function theme_c4m_ds_embed_view(array $variables) {
  $output = '';

  $view = views_get_view($variables['view']);
  $view->set_display($variables['display']);
  $title = $view->get_title();
  $content = $view->preview(
    $variables['display'],
    !empty($variables['args']) ? $variables['args'] : array()
  );

  if (empty($view->result)) {
    return '';
  }

  $header['element'] = array(
    '#tag' => $variables['header'],
    '#value' => $title,
  );

  $body['element'] = array(
    '#tag' => 'div',
    '#value' => $content,
  );

  $tag['element'] = array(
    '#tag' => 'div',
    '#value' => theme_html_tag($header) . theme_html_tag($body),
  );

  $output .= theme_html_tag($tag);

  return $output;
}

/**
 * DS function field.
 *
 * Render link to the comment's node.
 *
 * @param array $variables
 *   The field definition.
 *
 * @return string
 *   The rendered version.
 */
function theme_c4m_ds_comment_node_link(array $variables) {
  if (!isset($variables['entity'])) {
    return NULL;
  }

  $comment = $variables['entity'];
  $wrapper = entity_metadata_wrapper('node', $comment->nid);
  $link = l($wrapper->label(), 'node/' . $wrapper->getIdentifier());

  $tag['element'] = array(
    '#tag' => 'div',
    '#value' => $link,
  );

  return theme_html_tag($tag);
}
