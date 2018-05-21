extern crate web_view;


#[macro_use] extern crate serde_derive;
extern crate serde_json;
use web_view::*;

#[derive(Debug, Serialize, Deserialize)]
struct Todo{
	name: String,
	done: bool, 
	id: u32
}

#[allow(non_camel_case_types)]
#[derive(Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
	init,
	log { text: String },
	addTask { name: String },
	markTask { index: usize, done: bool },
	clearDoneTasks,
}

fn main() {
    let html = format!(r#"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {styles}
            </head>
            <body>
                <div id="app"></div>
                {scripts}
            </body>
            </html>
		"#,
		styles = inline_style(include_str!("js-src/dist/index.css")),
		scripts = inline_script(include_str!("js-src/dist/index.js"))
);

	let size = (320, 480);
	let resizable = false;
	let debug = false;
	let init_cb = |_webview| {};
	let userdata: Vec<Todo> = vec![];
	let mut id = 0;
	run("Todo React App", Content::Html(html), Some(size), resizable, debug, init_cb, move |webview, arg, tasks: &mut Vec<Todo>| {
			use Cmd::*;
			match serde_json::from_str(arg).unwrap() {
				init => (),
				log { text } => println!("{}", text),
				addTask { name } => {
					tasks.push(Todo { name, done: false, id });
					id += 1; 
					println!("ID: {}", id)
				},
				markTask { index, done } => tasks[index].done = done,
				clearDoneTasks => tasks.retain(|t| !t.done),
			}
			render(webview, tasks);
		},
		userdata
	);
}

fn render<'a, T>(webview: &mut WebView<'a, T>, tasks: &[Todo]) {
	println!("All tasks {:#?}", tasks);
	webview.eval(&format!("window.refresh({})", serde_json::to_string(tasks).unwrap()));
}

fn inline_style(s: &str) -> String {
	format!(r#"<style type="text/css">{}</style>"#, s)
}

fn inline_script(s: &str) -> String {
	format!(r#"<script type="text/javascript">{}</script>"#, s)
}