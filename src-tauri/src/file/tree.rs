use glob::glob;
use serde::ser::{Serialize, SerializeStruct, Serializer};
use std::path::Path;

pub struct FileNode {
    pub name: String,
    pub path: String,
    pub children: Vec<FileNode>,
}

impl Serialize for FileNode {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut s = serializer.serialize_struct("FileNode", 3)?;
        s.serialize_field("name", &self.name)?;
        s.serialize_field("path", &self.path)?;
        s.serialize_field("children", &self.children)?;
        s.end()
    }
}

// Get the files tree of target project
#[tauri::command]
pub fn get_files_tree(path: &str) -> Result<Vec<FileNode>, String> {
    let mut path = path.to_string();
    path.push_str("/*");
    let files = glob(&path).unwrap();

    let mut result = Vec::new();
    for file in files {
        let path = file.unwrap();
        let path = Path::new(path.to_str().unwrap());
        let name = Path::file_name(path).unwrap().to_str().unwrap().to_string();
        if path.is_dir() {
            result.push(FileNode {
                name,
                path: path.to_str().unwrap().to_string(),
                children: get_files_tree(path.to_str().unwrap())?,
            });
        } else {
            result.push(FileNode {
                name,
                path: path.to_str().unwrap().to_string(),
                children: vec![],
            });
        }
    }
    Ok(result)
}
