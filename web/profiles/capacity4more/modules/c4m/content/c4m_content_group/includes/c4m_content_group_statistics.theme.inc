<?php

/**
 * @file
 * Display suite field to display the group statistics.
 */

/**
 * Display function to display the group statistics.
 */
function c4m_content_group_statistics($field) {
  $data = c4m_content_get_current_group_statistics();
  if (empty($data)) {
    return;
  }

  $statistics = array(
    '#theme' => 'c4m_website_statistics_summary',
    '#data' => $data,
  );
  return render($statistics);
}
