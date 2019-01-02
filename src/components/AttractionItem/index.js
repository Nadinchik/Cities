import React, {PureComponent} from 'react';

class AttractionItem extends PureComponent {

    render() {
        const {attraction:{title, description, rating }, attraction, deleteAttr, editAttr} = this.props;
        console.log('this.propsItem', this.props);
        return (
            <li className="AttrItem">
                <div>
                    <h4>Достопримечательность: {title}</h4>
                    <p>Описание: {description}</p>
                    <h4>Рейтинг: {rating}</h4>
                </div>
                <div className="btnItem">
                    <button className="editCity" onClick={() => editAttr(attraction)}>Редактировать
                    </button>
                    <button className="delCity" onClick={() => deleteAttr(attraction.id)}>Удалить
                    </button>
                </div>
            </li>
        )
    }
}


export default AttractionItem;