import React from "react";
import "./contentview.css";

class ContentView extends React.Component {
	
	render(){
		return(
			<div className = "seperator">
				<div className = "content-area">
					Total Area Cleaned: {} <br />
					Total Time: {} <br />
					Productivity: {} <br /> 
				</div>
			</div>
		);
	}
}
export default ContentView;