import Vue from 'vue';
import Component from "vue-class-component";


@Component({
    props: {
        focus: {
            type: Function,
        },
    }
})
class FormInput extends Vue {
    constructor(){
        super();
    }
    render(){
        return (
            <input type="text" onFocus={this.$props.onFocus}/>
        )
    }
}


module.exports = {
    FormInput,
}