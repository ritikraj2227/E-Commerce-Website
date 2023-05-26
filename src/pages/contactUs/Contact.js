import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const Contact = () => {

	return (
		<section>
			<div className="container contact">
				<h2>Contact Us</h2>
				<div className="section">
					<form
						action="https://formspree.io/f/mayzpblz"
						method="POST">
						<div className="card">
							<label>Name</label>
							<input
								type="text"
								name="Name"
								placeholder="Full Name"
								autoComplete="off"
								required
							/>
							<label>Email</label>
							<input
								type="email"
								name="Email"
								placeholder="Your active email"
								autoComplete="off"
								required
							/>
							<label>Subject</label>
							<input
								type="text"
								name="Subject"
								placeholder="Subject"
								autoComplete="off"
								required
							/>
							<label>Message</label>
							<textarea
								name="Message"
								cols="30"
								rows="10"
								autoComplete="off"
								placeholder="Please Write Us Your Query"
								required
							/>
							<button
								className="--btn --btn-primary"
								>
								Send Message
							</button>
						</div>
					</form>

					<div className="details">
						<div className="card card2">
							<h3>Our Contact Information</h3>
							<p>Fill the form or contact us via other channels listed below</p>
							<div className="icons">
								<span>
									<FaPhoneAlt />
									<p>+91 705 141 6545</p>
								</span>
								<span>
									<FaEnvelope />
									<p>Support@eCommerce.com</p>
								</span>
								<span>
									<GoLocation />
									<p>Surat, Gujarat</p>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
