import React, {Component} from 'react';
import {connect} from 'react-redux';
import SvgLetter from '../SvgLetter';
import {addItem} from '../../../actions/reactChipActions';

import './FilteredList.css'

class FilteredList extends Component{
    constructor(){
        super();
        this.state = {isSmallSvg: window.innerWidth < 800};
    }
    currentPosition = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            right: rect.right
        };
    }

    componentDidMount(){
        window.addEventListener('resize', () => { 
            this.setState({isSmallSvg: window.innerWidth < 800})
        });
    }

    componentDidUpdate(){
        this.repositionFilteredList();
    }

    repositionFilteredList = () => {
        let filteredList = document.getElementById('chip-filtered-list');
        let reactChip = document.getElementById('react-chip');
        if(filteredList){
            let filteredListPos = this.currentPosition(filteredList);
            let reactChipPos = this.currentPosition(reactChip);
            if(filteredListPos.left < reactChipPos.left) {
                filteredList.style.left = 0;
                filteredList.style.right = 'auto';
            } 
            if(filteredListPos.right > reactChipPos.right){
                filteredList.style.right = 0;
                filteredList.style.left = 'auto';
            }
        }
    }

    addItemInList = (id) => {
        document.getElementById('chip-input').value = ''; 
        this.props.addItem(id);
    }

    bruteForceHighlightText = (name, filterText) => {  // to be replaced with other efficient subString match algo.
        const nameList = name.toUpperCase().split(filterText.toUpperCase());
        let travIndex = 0;
        return nameList.map((val, i) => {
            const noMatchOffset = val.length + travIndex;
            const matchOffset = noMatchOffset + filterText.length;
            if(i >= nameList.length - 1) return name.substring(travIndex, noMatchOffset);
            let htmlReturn = <span key={i}>{name.substring(travIndex, noMatchOffset)}<span style={{background: 'yellow'}}>{name.substring(noMatchOffset, matchOffset)}</span></span>
            travIndex = matchOffset;
            return htmlReturn;
        })
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
                        return (
                            <div key={id} id={id} className='filtered-item' 
                                onClick={() => this.addItemInList(id)}>
                                <div className='wd-50p'><SvgLetter letter={name[0]} isSmallSvg={this.state.isSmallSvg}/></div>
                                <div className='item wd-100-50p'>
                                    <div className='item-name'>
                                        {
                                            filterText ? this.bruteForceHighlightText(name, filterText) : name
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