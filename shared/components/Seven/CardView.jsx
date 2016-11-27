import React from 'react';
import Draggable from 'react-draggable';
export default class CardView extends React.Component {
  handleDragStop(e){
    const { card } = this.props;
    // TODO: check if it is within the correct box
    // use dom = document.querySelector(".seven-suitrow[data-suit-name=`${card.suit}`]")
    // dom.offsetLeft / offsetHeight / etc...
  }

  render(){
    const { card } = this.props;
    return (
        <Draggable
          axis="both"
          zIndex={100}
          allowAnyClick={true}
          position={null}
          onStop={this.handleDragStop.bind(this)}
        >
          <div className="seven-card">
            <img src={card.getImageSource()} className="seven card"/>
          </div>
        </Draggable>
    )
  }
}
