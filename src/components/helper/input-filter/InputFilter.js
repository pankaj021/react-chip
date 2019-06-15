import React, {Component} from 'react';
import {connect} from 'react-redux';
import './InputFilter.css';
import FilteredList from '../filtered-list/FilteredList';
import {filterSearch} from '../../../actions/reactChipActions';
import {deleteItem} from '../../../actions/reactChipActions'

class InputFilter extends Component {
    constructor(props){
        super();
        this.state = {filterText: "", backSpaceCount: 0};
    }
    onKeyUpHandler = (event) => {
        let backSpaceCount = this.state.backSpaceCount;
        let selectedItems = document.getElementsByClassName('selected-item');
        let chipInput = document.getElementsByClassName('chip-input');
        backSpaceCount = selectedItems.length ? backSpaceCount + 1 : 0;
        this.resetDeleteFocus();
        if(backSpaceCount && event.keyCode === 8) {
            if(backSpaceCount % 2 === 0 ) {
                this.props.deleteItem(parseInt(selectedItems[selectedItems.length - 1].id));
            } else if( !chipInput.value){
                selectedItems[selectedItems.length - 1].style.backgroundColor = 'red';
            }
            this.setState({backSpaceCount});
        }
    }
    resetDeleteFocus(){
        let selectedItems = document.getElementsByClassName('selected-item');
        if(selectedItems && selectedItems.length){
            selectedItems[selectedItems.length - 1].style.backgroundColor = '#ccc';
        } 
    }
    onBlurHandler = () => {
        this.resetDeleteFocus();
        this.setState({backSpaceCount: 0});
    }
    onChangeInput = (event) => {
        const targetText = event.target.value;
        this.resetDeleteFocus();
        this.setState({filterText: targetText, backSpaceCount: 0}, () => {
            this.props.filterSearch(targetText);
        })
    }
    render() {
        return (
            <span className='input-filter'>
                <input id='chip-input' type='text' placeholder='Find your details' 
                    onChange={this.onChangeInput} value={this.state.filterText}
                    onKeyUp={this.onKeyUpHandler}
                    onBlur={this.onBlurHandler}    
                />
                <FilteredList/>
            </span>
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        filterSearch: (text) => dispatch(filterSearch(text)),
        deleteItem: (id) => dispatch(deleteItem(id))
    }
}

export default connect(null, mapDispatchToProps)(InputFilter);
