import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppointmentsForm from "./components/AppointmentForm/AppointmentForm";
import AppointmentList from "./components/AppointmentList/AppointmentsList";
import { Appointment, useAppointmentsApi } from "./useAppointmentsApi";

function App() {
	const API = useAppointmentsApi();
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getAppointments = async () => {
			console.log('getApp')
			setLoading(true)
			try {
				const { appointments } = await API.get();
				setAppointments(appointments);
				setLoading(false);
			} catch (error) {
				console.log('Api error:', error);
				setLoading(false);
				getAppointments();
			}
		}
		getAppointments();
	}, [])

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1 className={styles.headerText}>Appointments</h1>
			</header>
			<main className={styles.content}>
				<AppointmentsForm
					appointments={appointments}
					loading={loading}
				/>
				<AppointmentList
					appointments={appointments}
					loading={loading}
				/>
			</main>
		</div>
	);
}

export default App;
