import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [value, setValue] = useState("");
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [phone, setPhone] = useState("");
	// const [address, setAddress] = useState("");

	const onValueChange = ({ target: { value } }) => {
		setValue(value);
	};
	// const onNameChange = ({ target: { name } }) => {
	// 	setName(name);
	// };

	// const onEmailChange = ({ target: { email } }) => {
	// 	setEmail(email);
	// };
	// const onPhoneChange = ({ target: { phone } }) => {
	// 	setPhone(phone);
	// };
	// const onAddressChange = ({ target: { address } }) => {
	// 	setAddress(address);
	// };

	const update = e => {
		e.preventDefault();
		setValue("");
	};

	const pMethod = i => {
		console.log(i);
		fetch("https://assets.breatheco.de/apis/fake/contact/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(i)
		})
			.then(response => response.json())
			.then(i => {
				console.log("Success:", i);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	//WHAT I DID FOR TODOS///////////////////////////////////////////////////////////////////////////////////////////////////////////

	const inputHandle = val => {
		const data = {
			full_name: val,
			email: val,
			phone: val,
			address: val
		};

		pMethod(data);
	};

	//END///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={update}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							// onChange={onValueChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							// onChange={onValueChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							// onChange={onValueChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							// onChange={onValueChange}
						/>
					</div>
					<button type="button" className="btn btn-primary form-control" onClick={() => inputHandle(value)}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
