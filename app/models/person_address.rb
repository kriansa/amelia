# frozen_string_literal: true

class PersonAddress < ApplicationRecord
  belongs_to :person
  belongs_to :address

  enum address_type: %i[home work]
end
