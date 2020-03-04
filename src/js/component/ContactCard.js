import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ContactCard = props => {
	const { store, actions } = useContext(Context);
	const [card, setCard] = useState(true);
	const [value, setValue] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const onValueChange = ({ target: { value } }) => {
		setValue(value);
	};

	const pMethod = i => {
		console.log(i);
		fetch("https://assets.breatheco.de/apis/fake/contact/agenda/jason", {
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

	const inputHandle = i => {
		const data = {
			full_name: name,
			email: email,
			phone: phone,
			address: address,
			agenda_slug: "jason"
		};

		pMethod(data);
	};
	const dMethod = i => {
		fetch("https://assets.breatheco.de/apis/fake/contact/" + i, {
			method: "DELETE",
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

	return store.contacts === []
		? "Loading..."
		: store.contacts.map(t => (
				<li key={t.id} className="list-group-item">
					<div className="row w-100">
						<div className="col-12 col-sm-6 col-md-3 px-0">
							<img
								src="https://i.ytimg.com/vi/KQ67fDlqqhc/maxresdefault.jpg"
								alt="Mike Anamendolla"
								className="rounded-circle mx-auto d-block img-fluid"
							/>
						</div>
						<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
							<div className=" float-right">
								<button
									className="btn"
									onClick={() => {
										{
											card === true ? setCard(false) : setCard(true);
										}
										inputHandle(value);
									}}>
									<i className="fas fa-pencil-alt mr-3" />
								</button>
								<button
									className="btn"
									onClick={() => {
										dMethod(t.id);
									}}>
									<i className="fas fa-trash-alt" />
								</button>
							</div>
							{card === true ? (
								<label className="name lead">{t.full_name}</label>
							) : (
								<input placeholder={t.full_name} onChange={e => setName(e.target.value)} />
							)}
							<br />
							<i className="fas fa-map-marker-alt text-muted mr-3" />
							{card === true ? (
								<span className="text-muted">{t.address}</span>
							) : (
								<input placeholder={t.address} onChange={e => setAddress(e.target.value)} />
							)}

							<br />
							<span
								className="fa fa-phone fa-fw text-muted mr-3"
								data-toggle="tooltip"
								title=""
								data-original-title="{t.phone}"
							/>
							{card === true ? (
								<span className="text-muted small">{t.phone}</span>
							) : (
								<input placeholder={t.phone} onChange={e => setPhone(e.target.value)} />
							)}
							<br />
							<span
								className="fa fa-envelope fa-fw text-muted mr-3"
								data-toggle="tooltip"
								data-original-title=""
								title=""
							/>
							{card === true ? (
								<span className="text-muted small text-truncate">{t.email}</span>
							) : (
								<input placeholder={t.email} onChange={e => setEmail(e.target.value)} />
							)}
						</div>
					</div>
				</li>
		  ));
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
