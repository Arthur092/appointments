import React from "react";
import styles from "./App.module.css";
import AppointmentsForm from "./components/AppointmentForm/AppointmentForm";
import AppointmentList from "./components/AppointmentList/AppointmentsList";

function App() {
	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1 className={styles.headerText}>Appointments</h1>
			</header>
			<main className={styles.content}>
				<AppointmentsForm />
				<AppointmentList />
			</main>
		</div>
	);
}

export default App;
