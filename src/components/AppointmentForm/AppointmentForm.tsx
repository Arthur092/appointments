import React, { useState } from 'react';
import { useAppointmentsApi } from '../../useAppointmentsApi';
import styles from "./AppointmentForm.module.css";

export default function AppointmentsForm() {
	const API = useAppointmentsApi();
	const [errorText, setErrorText] = useState<string | null>(null);
	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		setErrorText(null);
		await API.post({
			name: "John Smith",
			startTime: Date.now(),
			endTime: Date.now(),
		});
	};

    return <React.Fragment>
			{errorText && (
				<div className={styles.error} aria-live="polite">
					<p>{errorText}</p>
				</div>
			)}
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className={styles.formTitle}>Create an appointment</h2>
				<label className={styles.label}>
					<span className={styles.labelText}>Your name</span>
					<input
						className={styles.input}
						type="text"
						placeholder="John Smith"
					/>
				</label>
				<label className={styles.label}>
					<span className={styles.labelText}>Start Time</span>
					<input className={styles.input} type="datetime-local" />
				</label>
				<label className={styles.label}>
					<span className={styles.labelText}>End Time</span>
					<input className={styles.input} type="datetime-local" />
				</label>
				<button type="submit" className={styles.button}>
					Submit Request
				</button>
			</form>
        </React.Fragment>;
}