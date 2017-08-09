class CreatePersonRelationships < ActiveRecord::Migration[5.1]
  def change
    create_table :person_relationships do |t|
      t.references :person_1, foreign_key: { to_table: :people }
      t.integer :relationship_type, default: 0
      t.references :person_2, foreign_key: { to_table: :people }

      t.timestamps
    end
  end
end
