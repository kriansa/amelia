# User
* name
* email
* password

# Person
* name
* gender_const
* birth_date
* place_of_birth_city_id
* place_of_birth_state_id
* assistance_priority_const
* enrollment_status_const
* education_level_const
* work_status_const
* person_type_const
* ocupation_id
* monthly_income

# PersonPhone
* phone_number
* person_id
* phone_type_const

# PersonAddress
* person_id
* address_id
* address_type_const

# PersonRelationship
* person_1_id
* relationship_type_const
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

# StudentSchool
* student_id
* school_id
* school_shift_const
* school_level_const

# School
* name
* address_id

# SchoolPhone
* school_id
* phone_number
* phone_type_id
* phone_carrier_id

# ContactEmployment
* occupation_id
* sallary

# Occupation
* name

# SocialQuiz
* student_id
* live_there_since
* interest_in_vacancy
* has_social_assistance

# StudentHealth
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
