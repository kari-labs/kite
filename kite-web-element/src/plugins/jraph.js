function cleanQueryString(string){
    //This removes whitespaces and slashes and '\n's
    return string.replace(/([\\][n])?([\s])+/g, " ");
}

function prepareFetchBody(queryString){   
    return JSON.stringify({ query: queryString });
}

const Jraph = {};

Jraph.install = function (Vue, options) {
    // 1. add global method or property
    Vue.prototype.$jraph = async function ( args, ...values ) {
        let fetch_options = {
            method: "POST",
            body: null,
            headers: { 'Content-Type': 'application/json' },
        };
        let queryString = "";
        args.forEach( (string, i) => {
            queryString += string + (values[i] || '');
        });
        queryString = cleanQueryString(queryString);
        fetch_options.body = prepareFetchBody(queryString);
        const request = await fetch(options.api, fetch_options).then(res=>res.text());
        try{
            const json = JSON.parse(request);
            return json;
        }catch(e){
            return request;
        }
    }

    Vue.prototype.$gql = (args, ...values) => {
        let query = "";
        args.forEach( (string, i) => {
            query += string + (values[i] || '');
        });
        return query.replace(/([\\][n])?([\s])+/g, " ");
    }

    Vue.prototype.$uploadFiles = function (obj){
        // `obj` should contain a definition for `files`, `query`
        let data = new FormData();
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
        return fetch("https://localhost/api/graphql", {
            method: "POST",
            body: data,
        }).then(res => res.text())
    }
  
    // 2. add a global asset
    /* Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // some logic ...
      }
    }) */
  
    // 3. inject some component options
    /* Vue.mixin({
      created: function () {
        // some logic ...
      }
    }) */
  
    // 4. add an instance method
    Vue.prototype.$myMethod = function () {
      // some logic ...
    }
  }

export default Jraph;