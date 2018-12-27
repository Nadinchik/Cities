import React, { Component } from 'react';

class AttractionItem extends Component {

    render() {
        const { attraction, deleteAttr, editAttr} = this.props;
        return(
            <li className="AttrItem">
                <div>
                    <h4>Достопримечательность: {attraction.title}</h4>
                    <p>Описание: {attraction.description}</p>
                    <h4>Рейтинг: {attraction.rating}</h4>
                </div>
                <div className="btnItem">
                    <button className="editCity" onClick={editAttr(attraction)}>Редактировать
                    </button>
                    <button className="delCity" onClick={deleteAttr(attraction.id)}>Удалить
                    </button>
                </div>
            </li>
        )
    }
}


export default AttractionItem;