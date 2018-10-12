import React from "react";
import "./sidebar.css";
import TreeView from "./treeview";

function RenderCollapsibleRow(props) {
	return (
		<TreeView
			key={props.id}
			name={props.name}
			id={props.id}
			onSelect={i => props.onSelect(i)}
		>
			{props.children}
		</TreeView>
	);
}

class SideBar extends React.Component {

	traverse(accounts) {
		var results = {};
		var childNodes = [];
		if (accounts) {
			for (var child in accounts["children"]) {
				childNodes.push(this.traverse(accounts["children"][child]));
			}
			results = (
				<RenderCollapsibleRow
					key={accounts.id}
					name={accounts.name}
					id={accounts.id}
					parent={accounts.parent}
					onSelect={i => this.props.onSelect(i)}
				>
					{childNodes}
				</RenderCollapsibleRow>
			);
		}
		return results;
	}

	render() {
		var headNodes = [];
		for (var node in this.props.accountsTree) {
			headNodes.push(this.traverse(this.props.accountsTree[node]));
		}
		return <div className="sidebar">{headNodes}</div>;
	}
}
export default SideBar;
