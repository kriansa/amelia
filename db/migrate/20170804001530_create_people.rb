class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.integer :gender, default: 0
      t.date :birth_date
      t.references :place_of_birth_city, foreign_key: { to_table: :cities }
      t.references :place_of_birth_state, foreign_key: { to_table: :states }
      t.integer :assistance_priority, default: 0
      t.integer :enrollment_status, default: 0
      t.integer :education_level, default: 0
      t.integer :work_status, default: 0
      t.integer :person_type, default: 0
      t.references :occupation, foreign_key: true
      t.decimal :monthly_income, precision: 10, scale: 2

      t.timestamps
    end
  end
end
