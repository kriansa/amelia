# frozen_string_literal: true

class Person < ApplicationRecord
  belongs_to :place_of_birth_city, class_name: 'City', optional: true
  belongs_to :place_of_birth_state, class_name: 'State', optional: true
  belongs_to :occupation, optional: true

  enum gender: %i[male female]
  enum assistance_priority: %i[emergency]
  enum enrollment_status: %i[created enrolled]
  enum education_level: %i[basic degree]
  enum work_status: %i[working not_working]
  enum person_type: %i[student father mother]
end
