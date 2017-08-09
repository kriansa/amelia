class CreatePersonPhones < ActiveRecord::Migration[5.1]
  def change
    create_table :person_phones do |t|
      t.string :phone_number
      t.references :person, foreign_key: true
      t.integer :phone_type, default: 0

      t.timestamps
    end
  end
end
