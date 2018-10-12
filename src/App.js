import React, { Component } from "react";
import "./App.css";
import SideBar from "./sidebar";
import ContentView from "./contentview";

/**
 * Get the list of accounts
 * return {Array} - the list of accounts
 */

function getAccounts() {
  const accounts = [
    { id: 0, parent: null, name: "Account 0" },
    { id: 1, parent: 0, name: "Account 1" },
    { id: 2, parent: 0, name: "Account 2" },
    { id: 3, parent: 0, name: "Account 3" },
    { id: 4, parent: 1, name: "Account 4" },
    { id: 5, parent: 1, name: "Account 5" },
    { id: 6, parent: 1, name: "Account 6" },
    { id: 7, parent: 2, name: "Account 7" },
    { id: 8, parent: 3, name: "Account 8" },
    { id: 9, parent: 4, name: "Account 9" }
  ];

  return accounts;
}

/**
 * Get the list of cleanings
 * return {Array} - the list of cleanings
 */

function getCleanings() {
  const cleanings = [];
  for (let i = 0; i < 100; i++) {
    cleanings.push({
      id: i,
      account: Math.floor(Math.random() * 10),
      robot: Math.floor(Math.random() * 10),
      area: Math.floor(Math.random() * 100),
      time: Math.floor(Math.random() * 1000)
    });
  }

  return cleanings;
}

/**
 *Transforms the list of Accounts into a tree
 */
function buildTree(accounts) {
  var tree = [];
  var list = {};
  accounts.forEach(function(element) {
    list[element["id"]] = element;
    element["children"] = [];
  });
  accounts.forEach(function(element) {
    if (element["parent"] != null) {
      list[element["parent"]]["children"].push(element);
    } else {
      tree.push(element);
    }
  });
  return tree;
}

function sortByUsers(unsortedCleaningList){
  return [].concat(unsortedCleaningList).sort((a, b) => a.account - b.account);
  
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const headNodes = buildTree(getAccounts());
    this.state = {
      accountsTree: headNodes,
      cleaningList: sortByUsers(getCleanings()),
      selectedID: headNodes["0"],
    };
  }

  handleNodeClick(i){
    this.setState({
      selectedID: i,
    },function(){
      console.log(this.state.selectedID)
    })
  }



  render() {
    return (
            <div className = "card">
              <SideBar
                accountsTree={this.state.accountsTree}
                onSelect={i => this.handleNodeClick(i)}
                selectedNode = {this.state.selectedID}
              />
              <ContentView
                accountsTree={this.state.accountsTree}
                selectedNode = {this.state.selectedID}
                cleaningList={this.state.cleaningList}
              />
            </div>
            );

  }
}

export default App;
