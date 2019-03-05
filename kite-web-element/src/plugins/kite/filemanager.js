export default class FileManager {
	constructor() { }

	configure(config) {
		this.api_url = config.api_url || '';
	}

	async getFiles(userid, filepath) {    
		let res = await fetch(`${this.api_url}api/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					query {
						getDirContents(userid: "${userid}", path: "${filepath}") {
							files {
								name,
								isdirectory,
								modified,
								created,
								size
							}
						}
					}
				`
			}),
		});

		let json = await res.json();
		
		if(!json.data) {
			for(let err of json.errors){
				throw err;
			}
		}

		return json.data.getDirContents.files;
		//return files.json();
	}

	async renameFile(userid, filepath, newFilepath) {    
		let res = await fetch(`${this.api_url}api/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					mutation {
						renameFile(userid: "${userid}", path: "${filepath}", newPath: "${newFilepath}") {
							files {
								name,
								isdirectory,
								modified,
								created,
								size
							}
						}
					}
				`
			}),
		});

		let json = await res.json();
		
		if(!json.data) {
			throw new Error(json.errors);
		}

		return json.data.getDirContents.files;
		//return files.json();
	}

	downloadFile(file, filename) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;base64,' + file.contents);
		element.setAttribute('download', filename);
	
		element.style.display = 'none';
		document.body.appendChild(element);
	
		element.click();
	
		document.body.removeChild(element);
	}

	uploadFiles(userid, files){
    let data = new FormData()

    data.append("operations", JSON.stringify({
      query: `
        mutation($files: [Upload!]!){
          multipleUpload(userid: "${userid}", files: $files){
            name
            size
          }
        }
      `
    }));
    
    let map = {};
		for(let i=0;i<files.length;i++) map[i] = [`variables.files.${i}`]; 
		data.append("map", JSON.stringify(map));
		for(let i=0;i<files.length;i++) data.append(`${i}`, files[i]); 

		return fetch(`${this.api_url}api/graphql`, {
			method: 'POST',
			body: data,
		});

		// `obj` should contain a definition for `files`, `query`
		/*let data = new FormData();
		if(obj.query == undefined) return void 0;
		this.operations = {
			query: obj.query,
			variables: {files: Array(obj.files.length).fill(null)}
		};
		data.append("operations", JSON.stringify(this.operations));
		let map = {};
		for(let i=0;i<obj.files.length;i++) map[i] = [`variables.files.${i}`]; 
		data.append("map", JSON.stringify(map));
		for(let i=0;i<obj.files.length;i++) data.append(`${i}`, obj.files[i]); 
		return fetch(`${this.api_url}api/graphql`, {
			method: "POST",
			body: data,
		}).then(res => res.text())*/
	}
	static install(Vue, options) {
		Object.defineProperty(Vue.prototype, '$fileManager', {
			get() {return this.$root._fileManager}
		})
	
		Vue.mixin({
			beforeCreate() {
				if(this.$options.fileManager) {
					this._fileManager = this.$options.fileManager
					this._fileManager.configure(options)
				}
			}
		})
	}
}