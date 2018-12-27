import React, {Component} from 'react';
import AttractionItem from "../AttractionItem";

class AttractionList extends Component {
    render() {
        const {deleteAttr, editAttr, allAttractions} = this.props;
        return (
            <ul className="ListAttraction">
                {allAttractions && allAttractions.length > 0 && allAttractions.map((item) => (
                    <AttractionItem
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        rating={item.rating}
                        allAttractions={allAttractions}
                        editAttr={editAttr}
                        deleteAttr={deleteAttr}
                    />
                ))
                }
            </ul>
        )
    }
}

export default AttractionList;
