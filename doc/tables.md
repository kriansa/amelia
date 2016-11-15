# Student
* name
* birth_date
* place_of_birth_city_id
* place_of_birth_state_id
* assistance_priority_const
* status_id
* student_school_id

# Contact
* name
* birth_date
* place_of_birth_city_id
* place_of_birth_state_id
* education_level_id
* work_status_const
* contact_employment_id

# ContactPhone
* contact_id
* phone_id
* phone_type_id
* phone_carrier_id

# ContactAddress
* contact_id
* address_id
* type_const (address type)

# StudentContactRelationship
* student_id
* contact_id
* relationship_type_id

# RelationshipType
* name

# StudentRelationship
* student_1_id
* student_2_id

# StudentPhone
* student_id
* phone_number
* phone_type_id
* phone_carrier_id

# PhoneCarrier
* name

# PhoneType
* name

# City
* name

# State
* name
* abbreviation

# Address
* street_address
* number
* complement
* neighborhood
* zip_code
* state_id
* city_id

# StudentStatus
* student_id
* enrollment_status_const

# StudentAddress
* student_id
* student_address
* type_const (tipo de endereco)

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
* contact_id
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
