import React from "react";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const pMethod = i => {
		fetch("https://assets.breatheco.de/apis/fake/contact/", {
			method: "PUT",
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

	const inputHandle = val => {
		const data = [
			...tasks,
			{
				label: val
			}
		];

		pMethod(data);
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text" className="form-control" placeholder="Full Name" value={name} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" placeholder="Enter email" value={email} />
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" className="form-control" placeholder="Enter phone" value={phone} />
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" className="form-control" placeholder="Enter address" value={address} />
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							pMethod();
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
