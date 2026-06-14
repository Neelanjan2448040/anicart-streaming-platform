use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use strsim::jaro_winkler;

#[derive(Serialize, Deserialize, Clone)]
pub struct Movie {
    pub id: u32,
    pub title: String,
    pub description: String,
}

#[wasm_bindgen]
pub struct SearchEngine {
    movies: Vec<Movie>,
}

#[wasm_bindgen]
impl SearchEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> SearchEngine {
        SearchEngine { movies: Vec::new() }
    }

    #[wasm_bindgen]
    pub fn load_index(&mut self, json_data: &str) -> Result<(), JsValue> {
        let movies: Vec<Movie> = serde_json::from_str(json_data)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        self.movies = movies;
        Ok(())
    }

    #[wasm_bindgen]
    pub fn search(&self, query: &str) -> JsValue {
        let query_lower = query.to_lowercase();
        let mut results: Vec<(f64, &Movie)> = self.movies
            .iter()
            .map(|movie| {
                let score_title = jaro_winkler(&movie.title.to_lowercase(), &query_lower);
                let score_desc = if movie.description.to_lowercase().contains(&query_lower) { 0.5 } else { 0.0 };
                let final_score = score_title.max(score_desc);
                (final_score, movie)
            })
            .filter(|(score, _)| *score > 0.6)
            .collect();

        // Sort by highest score first
        results.sort_by(|a, b| b.0.partial_cmp(&a.0).unwrap());

        // Return top 5 matches as JSON
        let top_movies: Vec<&Movie> = results.into_iter().take(5).map(|(_, m)| m).collect();
        JsValue::from_str(&serde_json::to_string(&top_movies).unwrap())
    }
}
