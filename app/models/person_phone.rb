# frozen_string_literal: true

class PersonPhone < ApplicationRecord
  belongs_to :person

  enum phone_type: %i[home cellphone work]
end
