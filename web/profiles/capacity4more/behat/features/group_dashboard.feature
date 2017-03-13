Feature: Group dashboard
  As a group member and non-member
  In order to see the group latest activity and information
  I need to be able to see a dashboard with different widgets

  @api
  Scenario: Check dashboard content as group owner
    Given I am logged in as user "mariecurie"
    When  I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should see the group dashboard with quick post form

  @api
  Scenario: Check dashboard is not accessable for not member of the private group.
    Given I am logged in as user "mariecurie"
    When  I change access of group "Movie Popcorn Corner" to "Private"
    And   I am logged in as user "president"
    And   I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should see "Access denied"

  @api
  Scenario: Check dashboard is not accessable for not member of the group with restricted access.
    Given I am logged in as user "mariecurie"
    When  I change access of group "Movie Popcorn Corner" to "Restricted"
    And   I am logged in as user "president"
    And   I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should see "Access denied"

  @api
  Scenario: Check dashboard is accessable for not member of the group with restricted access.
    Given I am logged in as user "mariecurie"
    When  I change access of group "Movie Popcorn Corner" to Restricted with "ec.europa.eu" restriction
    And   I am logged in as user "president"
    And   I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should see the group dashboard without quick post form

  @api
  Scenario: Check dashboard is accessable for not member of the public group.
    Given I am logged in as user "mariecurie"
    When  I change access of group "Movie Popcorn Corner" to "Public"
    And   I am logged in as user "president"
    And   I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should see the group dashboard without quick post form

  @api
  Scenario: Check Invite a member link is available for a member of an open public group.
    Given I am logged in as user "charlesbabbage"
    When  I visit the dashboard of group "Music Lovers"
    And   I click "Join this group"
    And   I click "Invite a member"
    Then  I should see the text "Invite new users"
    And   I should not see the text "Manage all group memberships"

  @api
  Scenario: Check Invite a member link is not available for a member of a private group.
    Given I am logged in as user "badhairday"
    When  I visit the dashboard of group "Tennis Group"
    Then  I should not see the link "Invite a member"

  @api
  Scenario: Check Invite a member link is not available for a non-member of a group.
    Given I am logged in as user "president"
    When  I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should not see the link "Invite a member"

  @api
  Scenario: Check notifications toggle link is not available for a non-member of a group.
    Given I am logged in as user "president"
    When  I visit the dashboard of group "Movie Popcorn Corner"
    Then  I should not see the link "Enable notifications"
    And   I should not see the link "Disable notifications"

  @api
  Scenario: Check Invite a member link is available for an administrator of a private group.
    Given I am logged in as user "alfrednobel"
    When  I visit the dashboard of group "Tennis Group"
    And   I click "Invite a member"
    Then  I should see the text "Invite new users"
    And   I should see the text "Manage all group memberships"

  @api
  Scenario: Check Invite a member link is available for a site administrator who is a non-member of a private group.
    Given I am logged in as user "survivalofthefittest"
    When  I visit the dashboard of group "Architecture"
    And   I click "Invite a member"
    Then  I should see the text "Invite new users"
    And   I should see the text "Manage all group memberships"

  @javascript
  Scenario Outline: SA highlight a group via its dashboard.
    Given I am logged in as user "<username>"
    And   The window is maximized
    When  I visit the dashboard of group "Nobel Prize"
    Then  I should be able to toggle the group highlight link

    Examples:
    | username             |
    | mariecurie           |
    | survivalofthefittest |

  @javascript
  Scenario Outline: SA highlight a group via the groups overview.
    Given I am logged in as user "<username>"
    And   The window is maximized
    When  I go to "/groups?text=nobel"
    Then  I should be able to toggle the group highlight link

    Examples:
    | username             |
    | mariecurie           |
    | survivalofthefittest |

  @api
  Scenario: Visitor should not be able to highlight a group.
    Given I am an anonymous user
    When  I visit the dashboard of group "Nobel Prize"
    Then  I should see the text "Nobel Prize"
    And   I should not see the ".c4m-group-node-highlight" element
    When  I go to "/groups?text=nobel"
    Then  I should see the text "Nobel Prize"
    And   I should not see the ".c4m-group-node-highlight" element

  @api
  Scenario Outline: GO / GA / Member / User should not be able to highlight a group.
    Given I am logged in as user "<username>"
    When  I visit the dashboard of group "Nobel Prize"
    Then  I should see the text "Nobel Prize"
    And   I should not see the ".c4m-group-node-highlight" element
    When  I go to "/groups?text=nobel"
    Then  I should see the text "Nobel Prize"
    And   I should not see the ".c4m-group-node-highlight" element

    Examples:
    | username    |
    | alfrednobel |
    | galileo     |
    | badhairday  |
    | president   |

  @api
  Scenario: Highlighted document title should link to it's page.
    Given I am logged in as user "badhairday"
    When I visit the dashboard of group "Nobel Prize"
    Then I should see the text "Nobel Prize"
    And I follow "Nobel Prize sheet" in the "highlighted block" region
    Then I should get a "200" HTTP response

  @api
  Scenario: Highlighted discussion title should link to it's page.
    Given I am logged in as user "badhairday"
    When I visit the dashboard of group "Nobel Prize"
    Then I should see the text "Nobel Prize"
    And I follow "Nobel Foundation" in the "highlighted block" region
    Then I should get a "200" HTTP response
