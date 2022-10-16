use std::fs;

// Get file's content
#[tauri::command]
pub fn get_file_content(path: &str) -> String {
    String::from_utf8_lossy(&fs::read(path).unwrap())
        .parse::<String>()
        .unwrap()
}
