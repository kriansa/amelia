# User
* name
* email
* password

# Person
* name
* gender
* birth_date
* place_of_birth_city_id
* place_of_birth_state_id
* assistance_priority
* enrollment_status
* education_level
* work_status
* person_type
* ocupation_id
* monthly_income

# PersonPhone
* phone_number
* person_id
* phone_type

# PersonAddress
* person_id
* address_id
* address_type

# PersonRelationship
* person_1_id
* relationship_type
* person_2_id

# City
* name

# State
* name
* acronym

# Address
* street_address
* number
* complement
* neighborhood
* zip_code
* state_id
* city_id

# StudentSchool (not created)
* student_id
* school_id
* school_shift
* school_level

# School (not created)
* name
* address_id

# SchoolPhone (not created)
* school_id
* phone_number
* phone_type_id
* phone_carrier_id

# ContactEmployment (not created)
* occupation_id
* sallary

# Occupation
* name

# SocialQuiz (not created)
* student_id
* live_there_since
* interest_in_vacancy
* has_social_assistance

# StudentHealth (not created)
* student_id
* has_learning_issues
* learning_issues_desc
* has_physical_problems
* physical_problems_desc
* has_special_needs
* special_needs_desc
* has_health_conditions
* health_conditions_desc
* needs_regular_medication
* regular_medication_desc
