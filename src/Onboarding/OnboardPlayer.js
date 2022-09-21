import React from "react";
import { Redirect } from "react-router-dom";
import uuid from "uuid/v4";
import { ColorContext } from "../Context/ColorContext";
// const socket = require("../connection/socket").socket;

  /******************************************/
    /* Onboard is where we create the virtual game room. */
  /*********************************************/

// Importing CSS file
import './OnboardPlayer.css'

class CreateNewGame extends React.Component {
	state = {
		didGetUserName: false,
		inputText: "",
		gameId: "",
	};

	constructor(props) {
		super(props);
		this.textArea = React.createRef();
	}

	send = () => {
		// This is used to generate a unique ID for game player
		const newGameRoomId = uuid();

		// set the state of this component with the gameId so that we can
		// redirect the user to that URL later.
		this.setState({
			gameId: newGameRoomId,
		});

		// emit an event to the server to create a new game room
		// socket.emit("createNewGame", newGameRoomId);
	};

	typingUserName = () => {
		// grab the input text from the field from the DOM
		const typedText = this.textArea.current.value;

		// set the state with that text
		this.setState({
			inputText: typedText,
		});
    console.log(typedText)
	};

	render() {
		// !!! TODO: edit this later once you have bought your own domain.

		return (
			<>
				{this.state.didGetUserName ? (
					<Redirect to={"/game/" + this.state.gameId}>
						<button
							className="btn btn-success"
							style={{
								marginLeft: String(window.innerWidth / 2 - 60) + "px",
								width: "120px",
							}}
						>
							Start Game
						</button>
					</Redirect>
				) : (
					<div
            className=""
            style={{
              height: '100vh',
              width: '100vw',
              backgroundImage: "url('https://cdn.dribbble.com/users/1784672/screenshots/16292048/media/74d761c94f2c456ad7e6311a91185c39.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              display: "flex",
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="container">
              <div>
                <p className="form-header">Multiplayer Chess board</p>
                <p className="form-sub">Welcome, enter your name to play chess with friends</p>
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
								this.props.didRedirect();
								this.props.setUserName(this.state.inputText);
								this.setState({
									didGetUserName: true,
								});
								this.send();
							}}
						>
							Submit
						</button>
            </div>
					</div>
				)}
			</>
		);
	}
}

const Onboard = (props) => {
	const color = React.useContext(ColorContext);

	return (
		<CreateNewGame
			didRedirect={color.playerDidRedirect}
			setUserName={props.setUserName}
		/>
	);
};

export default Onboard;

{/* <p className="text-2xl text-white">
							Your Username:
						</p>

						<input
							ref={this.textArea}
							onInput={this.typingUserName}
						></input>

						<button
							className="btn btn-primary"
							disabled={!(this.state.inputText.length > 0)}
							onClick={() => {
								// When the 'Submit' button gets pressed from the username screen,
								// We should send a request to the server to create a new room with
								// the uuid we generate here.
								this.props.didRedirect();
								this.props.setUserName(this.state.inputText);
								this.setState({
									didGetUserName: true,
								});
								this.send();
							}}
						>
							Submit
						</button> */}