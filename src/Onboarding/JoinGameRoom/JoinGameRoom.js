import React from "react";
import JoinGame from "../JoinGame/JoinGame";
import ChessGame from "../../ChessLogic/UI/ChessGame";

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
	state = {
		didGetUserName: false,
		inputText: "",
	};

	constructor(props) {
		super(props);
		this.textArea = React.createRef();
	}

	typingUserName = () => {
		// grab the input text from the field from the DOM
		const typedText = this.textArea.current.value;

		// set the state with that text
		this.setState({
			inputText: typedText,
		});
	};

	render() {
		return (
			<React.Fragment>
				{this.state.didGetUserName ? (
					<React.Fragment>
						<JoinGame userName={this.state.inputText} isCreator={false} />
						<ChessGame myUserName={this.state.inputText} />
					</React.Fragment>
				) : (
					<div
						className=""
						style={{
							height: "100vh",
							width: "100vw",
							backgroundImage:
								"url('https://cdn.dribbble.com/users/1784672/screenshots/16292048/media/74d761c94f2c456ad7e6311a91185c39.png')",
							backgroundSize: "cover",
							backgroundPosition: "center center",
							backgroundRepeat: "no-repeat",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="container">
							<div>
								<p className="form-header">Multiplayer Chess board</p>
								<p className="form-sub">
									Hello, you have been invited by your friend to play chess, input your username to start game
								</p>
							</div>
							<div className="username-container">
								<p>Your Username:</p>
								<input
									placeholder="Enter your username"
									ref={this.textArea}
									onInput={this.typingUserName}
								></input>
							</div>
							<button
								className="start-button"
								disabled={!(this.state.inputText.length > 0)}
								onClick={() => {
									// When the 'Submit' button gets pressed from the username screen,
									// We should send a request to the server to create a new room with
									// the uuid we generate here.
									this.setState({
										didGetUserName: true,
									});
								}}
							>
								Submit
							</button>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default JoinRoom;
