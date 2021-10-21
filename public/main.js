// Taginput component----------
var TagInput = {
    template: '#tag-input-template',
    props: ['modelValue'],
    data() {
        return {
            tagItems: [],
            tagInput: '',
            isEdit: true
        };
    },
    // --------
    methods: {
        updateData(ev) {
            ev.preventDefault()
            console.log('Coma added', this.tagInput);
            this.tagItems.push(this.tagInput);
            this.tagInput = ''
            this.$emit('update:modelValue', this.tagItems);
        },
        removeTag(){
            this.isEdit = false
        }
    }
};

// Input Component
var InputElements = {
    components:{
        'tag-input': TagInput,
    },
    template:'#input-elements',
    props:['on-item-saved'],
    data(){
        return{
            codeName:'',
            codeLanguage:'',
            codeContent:'',
            name:''
        }
    },
    methods:{
        addElements() {
            fetch('./snippets', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    codename: this.codeName,
                    codelanguage: this.codeLanguage,
                    codecontent: this.codeContent,
                    variables:this.name
                
                })
            })
        this.$emit('created' );
        }
    }
}
// Component View--------------
var ViewComp = {
    template: '#view-comp',
    props: ['compitem'],
    data() {
        return {
            codeRender : _.template(this.compitem.codecontent),
            id:'',
            codeVariables: {
            }
        }
    },
    methods: {
        
        renderCode() {
//             console.log("my array",this.compitem[1])
            this.compitem;
            
            // console.log("New Temp",this.codeRender)
            var defaultData = {};
            // console.log('renderTemplate', this.compitem + '');
            for (var i in this.compitem.variables) {
                defaultData[this.compitem.variables[i]] = ''
            }
            try {
                return this.codeRender(Object.assign(defaultData, this.codeVariables));
            } catch (e) {
                console.log('Error', e)
            }

        }
    }
}
// view component--------------

// Main component----------
const ViewApp = {

    components: {
        // 'view-snippet': ViewSnippet,
        'view-comp': ViewComp,
        'input-elements':InputElements
        
    },
    data() {
        return {
            snippetItems: [],
            isHidden:true,
            selectedItem: null,

        }
    },
    methods: {
        ItemView(id){
            console.log(id)
        },
        snippetFetch() {
            fetch('/snippets').then(response=>response.json()).then(data=>{
                this.snippetItems = data;
                var len = this.snippetItems.length;
                console.log("my array",len)
            }
            );
            this.isHidden = true;
        }
    },
    created() {
        this.snippetFetch()
    }

}

//Vue.createApp(MainApp ).mount('#main-app')
Vue.createApp(ViewApp).mount('#code-view')
