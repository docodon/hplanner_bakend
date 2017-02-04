class CreateFitnessFunctions < ActiveRecord::Migration
  def change
    create_table :fitness_functions do |t|
      t.text "description" ,null: false
      t.text "code",null: false
      t.timestamps null: false
    end
  end
end
