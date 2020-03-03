import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [newContact, setNewContact] = useState({});
	const onNameChange = ({ target: { name } }) => {
		setName(name);
	};
	const onEmailChange = ({ target: { email } }) => {
		setEmail(email);
	};
	const onPhoneChange = ({ target: { phone } }) => {
		setPhone(phone);
	};
	const onAddressChange = ({ target: { address } }) => {
		setAddress(address);
	};

	const pMethod = i => {
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

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="name"
							className="form-control"
							placeholder="Enter full name"
							onChange={onNameChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={onEmailChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={onPhoneChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={onAddressChange}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							setNewContact({
								full_name: { name },
								email: { email },
								phone: { phone },
								address: { address },
								agenda_slug: "jason"
							}),
								pMethod(newContact);
						}}>
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
