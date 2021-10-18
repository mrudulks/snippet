const MainApp = {
    data() {
        return {
            counter: 0,
            codeName: '',
            codeLanguage: '',
            codeContent: '',
            snippetItems: []
        }
    },
    methods: {
        getSnippet() {
            fetch('./snippets').then(response=>response.json()).then(console.log("my response", this.response)).then(data=>(this.snippetItems = data));
            console.log(this.snippetItems)
        },
        addSnippets() {
            fetch('./snippets', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    codename: this.codeName,
                    codelanguage: this.codeLanguage,
                    codecontent: this.codeContent

                })
            })
            this.getSnippet();
            console.log(this.codename);
        }

    },
    created() {
        this.getSnippet()
    }
}

// view component--------------

const ViewApp = {
    data() {
        return {
            compiledcontent: {},
            val: '',
            variable: {}
        }
    },
    methods: {

        fetchData() {
            fetch('./snippets/1').then(response=>response.json()).then(data=>{
                this.compiledcontent = data;
                this.val = _.template(this.compiledcontent.codecontent);
            });
        },
        renderTemplate() {
            consolelog(this.val)
            var dafaultData = {};
            for ( var i in this.compiledcontent.variables ){
                defaultData[ this.compiledcontent.variables[i] ] = ''
            }
            try{
                return this.val( Object.assign(defaultData, this.variable) );    
            } catch(e){
                console.log( 'Error', e)
            }
            
        }
    },
    created() {
        this.fetchData()
    }
}

//Vue.createApp(MainApp ).mount('#main-app')
Vue.createApp(ViewApp).mount('#code-view')
