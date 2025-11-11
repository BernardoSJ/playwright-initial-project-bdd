@inventory
Feature: Inventory sorting
  As a user
  I want to sort the catalog
  So that I can see items ordered correctly

  Background:
    Given I am logged in as "standard_user" with "secret_sauce"

  @catalog
  Scenario Outline: Sort catalog by <option>
    When I sort the catalog by "<option>"
    Then the catalog should be sorted by "<option>"

    Examples:
      | option |
      | az     |
      | za     |
      | lohi   |
      | hilo   |
