class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
		t.string "title"
		t.text "overview"
		t.integer "vote_count"
		t.string "poster_path"
		t.datetime "release_date"

    end
  end
end
