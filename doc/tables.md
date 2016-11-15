# Student
* name
* birth_date
* place_of_birth_city_id
* place_of_birth_state_id
* assistance_priority_id
* status_id
* student_school_id

# Contact
* name
* birth_date
* place_of_birth_city_id
* place_of_birth_state_id
* education_level_id
* work_status_id
* contact_employment_id

# ContactPhone
* contact_id
* phone_id
* phone_type_id
* phone_carrier_id

# ContactAddress
* contact_id
* address_id
* address_type_id

# StudentContactRelationship
* relationship_type_id

# StudentRelationship
* student_1_id
* student_2_id
* student_relationship_type_id

# StudentPhone
* student_id
* phone_id
* phone_type_id
* phone_carrier_id

# PhoneCarrier
* name

# PhoneType
* name

# PhoneNumber
* phone

# StudentRelationshipType
* name

# RelationshipType
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

# AddressType
* name

# AssistancePriority
* name

# StudentStatus
* student_id
* enrollment_status_id

# StudentAddress
* student_id
* student_address
* address_type_id

# EnrollmentStatus
* name

# StudentSchool
* student_id
* school_id
* school_shift_id
* school_level_id

# SchoolLevel
* name

# SchoolShift
* name

# School
* name
* address_id
* phone_number_id

# WorkStatus
* name

# ContactEmployment
* contact_id
* occupation_id
* income_value

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
