class CreatePersonAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :person_addresses do |t|
      t.references :person, foreign_key: true
      t.references :address, foreign_key: true
      t.string :address_type_const, limit: 2

      t.timestamps
    end
  end
end
