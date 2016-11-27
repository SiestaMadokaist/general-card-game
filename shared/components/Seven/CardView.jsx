import React from 'react';
export default class CardView extends React.Component {
  render(){
    const { card } = this.props;
    return (
        <div className="seven-card">
          <img src={card.getImageSource()} className="seven card"/>
        </div>
    )
  }
}
