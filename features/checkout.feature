@checkout
Feature: Checkout Module Data Driven
  As a user
  I want to checkout with random customer data
  So that I can validate a successful order completion

  Background:
    Given I am logged in as "standard_user" with "secret_sauce"

  Scenario: Happy checkout 
    When I add 1 product to the cart
    And I open the cart
    And I proceed to checkout
    And I complete the checkout form with random customer data
    Then the order should be completed successfully

  Scenario: Non happy checkout
    When I open the cart
    And I proceed to checkout
    Then I should stay on checkout step one with a required fields error