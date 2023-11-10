Feature: Ecommerce validations
    
    @validation
    @negative
    Scenario Outline: Placing the Order
        Given A login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Message is displayed

        Examples:
            | username    | password |
            | rahulshetty | learning |
            | rahul       | learning |
            | Hello       | hello123 |
    
    # @validation
    # @negative
    # Scenario Outline: Placing the Order
    #     Given A login to Ecommerce2 application with "rahulshetty" and "learning"
    #     Then Verify Message is displayed


    @validation
    @positive
    Scenario: Placing the Order
        Given A login to Ecommerce2 application with "rahulshettyacademy" and "learning"
        Then Display all available product titles
        