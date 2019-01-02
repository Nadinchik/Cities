import React, {PureComponent} from 'react';
import AttractionItem from "../AttractionItem";

class AttractionList extends PureComponent {
    render() {
        const {deleteAttr, editAttr, allAttractions} = this.props;
        console.log('this.propsList -->', this.props);
        return (
            <ul className="ListAttraction">
                {allAttractions && allAttractions.length > 0 && allAttractions.map((item) => (
                    <AttractionItem
                        attraction={item}
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        rating={item.rating}
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
