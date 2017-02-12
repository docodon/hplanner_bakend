class CreateAlgoDetails < ActiveRecord::Migration
  def change
    create_table :algo_details do |t|
      t.text :property, null: false
      t.text :value, null: false
      t.timestamps null: false
    end
  end
end
