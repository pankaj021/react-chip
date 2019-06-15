import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteItem} from '../../../actions/reactChipActions';
import SvgLetter from '../SvgLetter';
import './SelectedItem.css'

class SelectedItem extends Component{
    onClickDelete = (event, id) => {
        event.stopPropagation();
        this.props.deleteItem(id);
    }
    render(){
        let {id, name} = this.props;
        return (
            <div id={id} className='selected-item'>
                <SvgLetter letter={name[0]} isSmallSvg={true}/>
                <div className='item-name'>{name}</div>
                <img className='delete-i' src='/cancel.svg' height='14' width='14' alt='Oops'
                    onClick={(event) => this.onClickDelete(event, id)}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (id) => dispatch(deleteItem(id))
    }
}

export default connect(null, mapDispatchToProps)(SelectedItem);