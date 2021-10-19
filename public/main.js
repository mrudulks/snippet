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

//view snippet component
var ViewSnippet = {
    template: '#view-snippet',
    props: ['type', 'snipid'],
    data() {
        return {
            compiledcontent: '',
            val: '',
            variable: {//componentname:'componentname'
            }
        }
    },
    methods: {

        fetchData() {
            fetch('./snippets/1').then(response=>response.json()).then(data=>{
                this.compiledcontent = data;
                this.val = _.template(this.compiledcontent.codecontent);
            }
            );
        },
        renderTemplate() {

            var defaultData = {};
            console.log('renderTemplate', this.compiledcontent + '');
            for (var i in this.compiledcontent.variables) {
                defaultData[this.compiledcontent.variables[i]] = ''
            }
            try {
                return this.val(Object.assign(defaultData, this.variable));
            } catch (e) {
                console.log('Error', e)
            }

        }
    },
    created() {
        this.fetchData()
    }
};

// view component--------------

// test component--------------
var testComp = {
    template:'#test-comp',
    props:['compitem'],
    data(){
        return{

        }
    },
    methods:{
        renderTest(){
            this.compitem;
            console.log("test component",this.compitem)
        }
    }
}
// test component--------------

const ViewApp = {

    components: {
        'view-snippet': ViewSnippet,
        'test-comp':testComp
    },
    data() {
        return {
            snippetItems: '',

        }
    },
    methods: {

        snippetFetch() {
            var id = 1;
            if (id === '') {
                var fetchItem = '/snippets/';
            } else {
                var fetchItem = './snippets/' + id;
            }
            fetch(fetchItem).then(response=>response.json()).then(data=>{
                this.snippetItems = data;
                console.log("my array", this.snippetItems)
            }
            );
        }
    },
    created() {
        this.snippetFetch()
    }

}

//Vue.createApp(MainApp ).mount('#main-app')
Vue.createApp(ViewApp).mount('#code-view')
