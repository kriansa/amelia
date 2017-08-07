# frozen_string_literal: true

class Person < ApplicationRecord
  belongs_to :place_of_birth_city, class_name: 'City', optional: true
  belongs_to :place_of_birth_state, class_name: 'State', optional: true
  belongs_to :occupation, optional: true
end
