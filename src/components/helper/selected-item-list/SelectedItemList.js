import React from 'react';
import {connect} from 'react-redux';
import SelectedItem from '../selected-item/SelectedItem';

function SelectedItemList({selectedList}) {
    if(!selectedList) return null;
    return (
        selectedList.map( item => <SelectedItem key={item.id} name={item.name} id={item.id}/> )
    )
}

const mapStateToProps = (state) => {
    return {
        selectedList: state.reactChip.selectedList
    }
}

export default connect(mapStateToProps, null)(SelectedItemList);