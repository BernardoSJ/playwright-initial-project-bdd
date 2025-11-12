@login
Feature: Login
  As a valid user
  I want to log in successfully
  So that I can access the inventory page

  Scenario: Successful Login
    Given I am on the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page