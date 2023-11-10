Feature: Ecommerce validations
  @regression
  Scenario Outline: Placing the Order
    Given A login to Ecommerce application with "<username>" and "<password>"
    When Adding "<product>" to cart
    Then Verify that "<product>" is displayed in the cart
    When Verify "<username>" as shipping username, enter valid details and Place the order
    Then Verify order is present in the Order History page

    Examples:
      | username          | password    | product         |
      | kyp1395@gmail.com | Test@1234   | zara coat 3     |
      | anshika@gmail.com | Iamking@000 | adidas original |


# Extra notes:
# Command to run based on tagname: npx cucumber-js --tags "@positive" --exit
# Command to generate html report: npx cucumber-js features/ErrorValidations.feature --format html:cucumber-report.html --exit
# Command to run in parallel: npx cucumber-js features/ErrorValidations.feature --parallel 2 --exit
# Command to run failed test cases: npx cucumber-js --tags "@positive" --retry 1 --exit --format html:cucumber-report.html