class CreatePersonRelationships < ActiveRecord::Migration[5.1]
  def change
    create_table :person_relationships do |t|
      t.references :person_1, foreign_key: { to_table: :people }
      t.string :relationship_type_const, limit: 2
      t.references :person_2, foreign_key: { to_table: :people }

      t.timestamps
    end
  end
end
