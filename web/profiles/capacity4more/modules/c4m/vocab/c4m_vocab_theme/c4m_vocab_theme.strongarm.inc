<?php
/**
 * @file
 * c4m_vocab_theme.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function c4m_vocab_theme_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_c4m_vocab_theme_pattern';
  $strongarm->value = 'theme/[term:name]';
  $export['pathauto_taxonomy_term_c4m_vocab_theme_pattern'] = $strongarm;

  return $export;
}
