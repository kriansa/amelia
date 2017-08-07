class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street_address
      t.string :number
      t.string :complement
      t.string :neighborhood
      t.string :zip_code
      t.references :state, foreign_key: true
      t.references :city, foreign_key: true

      t.timestamps
    end
  end
end
