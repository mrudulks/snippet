
// //view snippet component
// var ViewSnippet = {
//     template: '#view-snippet',
//     props: ['type', 'snipid'],
//     data() {
//         return {
//             compiledcontent: '',
//             val: '',
//             variable: {//componentname:'componentname'
//             }
//         }
//     },
//     methods: {

//         fetchData() {
//             fetch('./snippets/1').then(response=>response.json()).then(data=>{
//                 this.compiledcontent = data;
//                 this.val = _.template(this.compiledcontent.codecontent);
//             }
//             );
//         },
//         renderTemplate() {

//             var defaultData = {};
//             console.log('renderTemplate', this.compitem + '');
//             for (var i in this.compiledcontent.variables) {
//                 defaultData[this.compiledcontent.variables[i]] = ''
//             }
//             try {
//                 return this.val(Object.assign(defaultData, this.variable));
//             } catch (e) {
//                 console.log('Error', e)
//             }

//         }
//     },
//     created() {
//         this.fetchData()
//     }
// };

// view component--------------
var ViewComp = {
    template:'#view-comp',
    props:['compitem'],
    data(){
        return{
           codeRender:'',
           codeVariables:{
               
           }
        }
    },
    methods:{
        renderTest(){
            this.compitem;
            this.codeRender=_.template(this.compitem.codecontent) 
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

const ViewApp = {

    components: {
        // 'view-snippet': ViewSnippet,
        'view-comp':ViewComp
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
