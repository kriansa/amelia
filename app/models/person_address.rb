class PersonAddress < ApplicationRecord
  belongs_to :person
  belongs_to :address
end
