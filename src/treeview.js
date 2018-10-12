import React from "react";
import "./treeview.css";

class TreeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.selectActive = this.selectActive.bind(this);
  }

  handleClick() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  selectActive(index, props){
    //this.setState({active:index});
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      name = "",
      children,
      className = ""
    } = this.props;
    
    let arrowClass = "tree-view-arrow";
    if (collapsed) {
      arrowClass = "tree-view-arrow-collapsed";
    }
    if (children.length === 0) {
      arrowClass = "leaf-node";
    }

    const arrow = (
      <div onClick={this.handleClick} className={className + arrowClass} />
    );

    const label = (
      <div 
          className={this.props.isActive? 'label active' : 'label'}  
          onClick={() => {this.props.onSelect({id: this.props.id,name: this.props.name})}} >
        {name}
      </div>
    );

    return (
      <div className="parent-row">
        <div className="row">
          {arrow}
          {label}
        </div>
        <div className={"children " + (!collapsed ? "" : "collapsed")}>
          {children}
        </div>
      </div>
    );
  }
}

export default TreeView;
