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

const mainApp = {
    components: {
        'tag-input': TagInput,
    },
    data() {
        return {
            message: "hello",
            name: "",
        }

        console.log(message);
    },
    methods: {}
}

Vue.createApp(mainApp).mount('#tag');
