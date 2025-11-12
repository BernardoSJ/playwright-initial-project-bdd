@cart
Feature: Cart actions
  As a user
  I want to add and remove products
  So that I can manage my cart

  Background:
    Given I am logged in as "standard_user" with "secret_sauce"

  Scenario: Add 2 products and verify badge and names
    When I add 2 products to the cart
    Then the cart badge should show 2
    When I open the cart
    Then I should see the same 2 product names in the cart

  Scenario: Remove one product and validate empty badge
    When I add 1 products to the cart
    Then the cart badge should show 1
    When I open the cart
    And I remove the first product from the cart
    Then the cart badge should be hidden
