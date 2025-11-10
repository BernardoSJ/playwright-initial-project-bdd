Feature: Login

  @login
  Scenario: Successful Login
    Given I am on the login page
    When I log in with credentials "standard_user" and "secret_sauce"
    Then I should be able to see the inventory