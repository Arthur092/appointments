import styles from "./AppointmentList.module.css";

export default function AppointmentList() {
    return (
        <section className={styles.appointmentsContainer}>
            <h2 className={styles.appointmentsTitle}>Existing Appointments</h2>
            <ul className={styles.appointments}>
                <li className={styles.appointment}>
                    <b>John Smith</b>
                    <p>
                        {new Date().toDateString()} - {new Date().toTimeString()}
                    </p>
                </li>
            </ul>
        </section>
    )
}