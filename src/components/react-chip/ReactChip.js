import React, { Component } from 'react';
import {connect} from 'react-redux';
import './ReactChip.css';
import InputFilter from '../helper/input-filter/InputFilter';
import SelectedItemList from '../helper/selected-item-list/SelectedItemList';
import {initializeStoreWithData} from '../../actions/reactChipActions';

class ReactChip extends Component {
    constructor(props){
        super();
        props.initializeStoreWithData(props.data);
    }
    componentDidMount(){
        window.addEventListener('click', (event) => {
            let searchBox = document.getElementById('search-box');
            let filteredList = document.getElementById('chip-filtered-list');
            searchBox && searchBox.classList.remove('border-active');
            if(filteredList) {
                filteredList.classList.remove('isVisible');
                filteredList.classList.add('isHidden')
            }
        })
    }
    onClickChip = (event) => {
        event.stopPropagation();
        let searchBox = event.currentTarget.getElementsByClassName('search-box')[0];
        let input = event.currentTarget.getElementsByTagName('input')[0];
        let filteredList = event.currentTarget.getElementsByClassName('filtered-list')[0];
        searchBox.classList.add('border-active');
        filteredList.classList.remove('isHidden');
        filteredList.classList.add('isVisible');
        input.focus();
    }
    render() {
        return (
            <div id='react-chip' className='react-chip' onClick={this.onClickChip}>
                <div id='search-box' className='search-box'>
                    <div className='selected-list'>
                        <SelectedItemList />
                        <InputFilter />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initializeStoreWithData: (data) => dispatch(initializeStoreWithData(data))
    }
}

export default connect(null, mapDispatchToProps)(ReactChip);