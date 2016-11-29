import React from 'react';
import Draggable from 'react-draggable';
import _ from 'lodash';
import { connect } from 'react-redux';

@connect(state => ({}))
export default class CardView extends React.Component {
  dragEventValue(e, suitArg){
    const { card } = this.props;
    const suit = suitArg || card.suitName();
    const domBox = this.suitRowDOMBox(suit);
    if(e.x < domBox.left){ return 1 }
    if(e.x > domBox.right){ return 2 }
    if(e.y < domBox.top){ return 3 }
    if(e.y > domBox.bottom){ return 4 }
    return 0;
  }

  dragEventIsOnTheRightPosition(e){
    return this.dragEventValue(e) ==  0;
  }

  dragEventOnDifferentSuitRow(e){
    const { card } = this.props;
    const others = _(this.suitRows()).filter((s) => s != card.suitName());
    const otherCheckers = others.map((suit) => this.dragEventValue(e, suit));
    return otherCheckers.any((x) => x == 0)
  }

  suitRows(){
    return ["DIAMOND", "CLOVER", "HEART", "SPADE"];
  }

  handleDragStop = (e, data) => {
    const { card } = this.props;
    if(this.dragEventIsOnTheRightPosition(e)){
      this.setState({position: {x: data.x, y: data.y}});
    }else{
      this.setState({position: {x: 0, y: 0}});
    }
  }

  defaultSuitName(){
    const { card } = this.props;
    return card.suitName();
  }

  suitRowSelector(suit){
    const { card } = this.props;
    const suitName = suit || this.defaultSuitName();
    return `.seven-suitrow[data-suit-name='${suitName}']`;
  }

  suitRowDOM(suit){
    const { card } = this.props;
    const suitName = suit || this.defaultSuitName();
    return document.querySelector(this.suitRowSelector(suitName));
  }

  suitRowDOMBox(suit){
    const suitName = suit || this.defaultSuitName();
    const dom = this.suitRowDOM(suitName);
    return dom.getClientRects()[0];
  }

  constructor(props){
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0
      }
    }
  }

  render(){
    const { card } = this.props;
    return (
        <Draggable
          axis="both"
          zIndex={100}
          position={this.state.position}
          onStop={this.handleDragStop}
        >
          <div className="seven-card">
            <img src={card.getImageSource()} className="seven card"/>
          </div>
        </Draggable>
    )
  }
}
