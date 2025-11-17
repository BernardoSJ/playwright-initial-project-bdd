@mock
Feature: Network mocking demo
  As a tester
  I want to mock a /api/users response
  So that I can validate the UI against a fake backend

  Scenario: Render mocked users from /api/users
    Given I mock the api users endpoint with fake users
    When I load a demo page that calls api users
    Then I should see the mocked users rendered in the page