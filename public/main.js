const MainApp ={
    data(){
        return {
            counter: 0,
            codeName:'',
            codeLanguage:'',
            codeContent:'',
            snippetItems:[]
          }
    },
    methods:{
        getSnippet(){
            fetch('./snippets').then(response => response.json()).then(console.log("my response",this.response)).then(data => (this.snippetItems = data));
            console.log(this.snippetItems)
        },
        addSnippets(){
            fetch('./snippets',{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    codename: this.codeName,
                    codelanguage:this.codeLanguage,
                    codecontent:this.codeContent

                })
            })
            this.getSnippet();
            console.log(this.codename);
        }
        
    },
    created(){
        this.getSnippet()
    }
}
Vue.createApp(MainApp ).mount('#main-app')
