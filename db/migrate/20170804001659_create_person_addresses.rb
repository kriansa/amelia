class CreatePersonAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :person_addresses do |t|
      t.references :person, foreign_key: true
      t.references :address, foreign_key: true
      t.integer :address_type, default: 0

      t.timestamps
    end
  end
end
