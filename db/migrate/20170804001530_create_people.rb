class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.string :gender_const, limit: 2
      t.date :birth_date
      t.references :place_of_birth_city, foreign_key: { to_table: :cities }
      t.references :place_of_birth_state, foreign_key: { to_table: :states }
      t.string :assistance_priority_const, limit: 2
      t.string :enrollment_status_const, limit: 2
      t.string :education_level_const, limit: 2
      t.string :work_status_const, limit: 2
      t.string :person_type_const, limit: 2
      t.references :occupation, foreign_key: true
      t.decimal :monthly_income, precision: 10, scale: 2

      t.timestamps
    end
  end
end
