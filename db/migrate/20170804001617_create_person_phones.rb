class CreatePersonPhones < ActiveRecord::Migration[5.1]
  def change
    create_table :person_phones do |t|
      t.string :phone_number
      t.references :person, foreign_key: true
      t.string :phone_type_const, limit: 2

      t.timestamps
    end
  end
end
