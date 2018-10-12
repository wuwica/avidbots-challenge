import React from "react";
import "./contentview.css";

function RenderData(props) {
	return (
		<div className="data-box">
			Total Area Cleaned: {props.data[props.type]["area"]} m<sup>2</sup>
			<br />
			Total Time: {props.data[props.type]["time"]} <br />
			Productivity: {(props.data[props.type]["area"] / props.data[props.type]["time"]).toFixed(
				5
			)}{" "}
			m<sup>2</sup>
			/s
		</div>
	);
}

class ContentView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: 0,
			accountCleaningMap: this.matchId(this.props.cleaningList) ,
		};
		
    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ mode: (event.target.checked? 1:0)});
	}

	gatherChildrenNodes(selected) {
		var childNodes = [];
		if (selected) {
			childNodes.push(selected.id);
			for (var child in selected["children"]) {
				childNodes = childNodes.concat(
					this.gatherChildrenNodes(selected["children"][child])
				);
			}
		}
		return childNodes;
	}

	calculateAggregated(childNodeIDs) {
		//console.log(this.props.cleaningList)
		//console.log(this.state.accountCleaningMap)
		//console.log(childNodeIDs)

		let aggregate = { area: 0, time: 0 };
		let independent = { area: 0, time: 0 };
		let temp = { area: 0, time: 0 };

		for (let i = childNodeIDs.length-1; i >= 0 ; i--) {
			for (let k = this.state.accountCleaningMap[childNodeIDs[i]]['start']; 
					k <= this.state.accountCleaningMap[childNodeIDs[i]]['finish']; k++){
				//console.log(k)
				temp['area'] += this.props.cleaningList[k]['area'];
				temp['time'] += this.props.cleaningList[k]['time'];
			}
			independent["area"] = temp["area"];
			independent["time"] = temp["time"];
			aggregate["area"] += temp["area"];
		  aggregate["time"] += temp["time"];
		  temp["time"] = 0;
		  temp["area"] = 0;
		}
		var modes = [];
		modes.push(aggregate);
		modes.push(independent);
		return modes;
	}

	matchId(sortedCleaningList) {
		let account = 0;
		let start = 0;
		let accountToCleaning = []
		for (var cleaning in sortedCleaningList){
			if(sortedCleaningList[cleaning]['account'] !== account){
				accountToCleaning.push({
					start: start,
					finish: cleaning -1
				});
				start = cleaning;
				account = sortedCleaningList[cleaning]['account'];
			}
		}
		accountToCleaning.push({
					start: start,
					finish: cleaning 
				});
		return accountToCleaning;
	}

	render() {;
		//console.log(this.props.selectedNode)
		const data = this.calculateAggregated(
			this.gatherChildrenNodes(this.props.selectedNode)
		);

		return (
			<div className="seperator">
				<div className="content-area">
					<div className="top-bar">
						<h3>{this.props.selectedNode["name"]} </h3>
					</div>
					<RenderData type={this.state.mode} data={data} />
					<div className="switch-container">
						<div className="switch-text">Aggrigate</div>
						<label className="switch">
							<input type="checkbox" onChange={this.handleChange} />
							<span className="slider" />
						</label>
						<div className="switch-text">Independent</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ContentView;
