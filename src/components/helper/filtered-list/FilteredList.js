import React, {Component} from 'react';
import {connect} from 'react-redux';
import SvgLetter from '../SvgLetter';
import {addItem} from '../../../actions/reactChipActions';

import './FilteredList.css'

class FilteredList extends Component{
    currentPosition = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top
        };
    }

    componentDidMount(){
        window.addEventListener('resize', () => { });
    }

    componentDidUpdate(){
        this.repositionFilteredList();
    }

    repositionFilteredList = () => {
        let chipInput = document.getElementById('chip-input');
        let filteredList = document.getElementById('chip-filtered-list');
        let reactChipWidth = document.getElementById('react-chip').offsetWidth;
        if(filteredList){
            if((this.currentPosition(chipInput).left > reactChipWidth / 2)) {
                filteredList.style.right = 0;
                filteredList.style.left = 'unset';
            } else {
                filteredList.style.right = 'unset';
                filteredList.style.left = 0;
            }
        }
    }

    addItemInList = (id) => {
        document.getElementById('chip-input').value = ''; 
        this.props.addItem(id);
    }

    render(){
        let {filteredList} = this.props;
        const chipInput = document.getElementById('chip-input');
        const filterText = chipInput && chipInput.value;
        return (
            <div id='chip-filtered-list' className='filtered-list isHidden'>
                {
                    filteredList.sort((item1, item2) => item1.id - item2.id)
                    .map( item => {
                        let {id, name, email} = item;
                        const nameList = filterText && name.split(filterText);
                        return (
                            <div key={id} id={id} className='filtered-item' 
                                onClick={() => this.addItemInList(id)}>
                                <SvgLetter letter={name[0]} isSmallSvg={false}/>
                                <div className='item'>
                                    <div className='item-name'>
                                        {
                                            nameList ? 
                                            nameList.map((val, i) => {
                                                if(i >= nameList.length - 1) return val;
                                                return <span key={i}>{val}<span style={{background: 'yellow'}}>{filterText}</span></span>
                                            })
                                            : name
                                        }
                                    </div>
                                    <div className='item-email'>{email}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filteredList: state.reactChip.filteredList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (id) => dispatch(addItem(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilteredList);