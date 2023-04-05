import { options } from "../../constants";
import { Appointment } from "../../useAppointmentsApi";
import styles from "./AppointmentList.module.css";

interface loadingPostProps {
    appointments: Appointment[],
    loading: boolean,
}

export default function loadingPost({ appointments, loading }: loadingPostProps) {
    return (
        <section className={styles.appointmentsContainer}>
            <h2 className={styles.appointmentsTitle}> Existing Appointments</h2>
            {loading && <span className={styles.loader}></span>}

            <ul className={styles.appointments}>
                {appointments.map(appointment =>
                    <li key={appointment.startTime} className={styles.appointment}>
                        <b>{appointment.name}</b>
                        <p>
                            {new Date(appointment.startTime).toLocaleDateString("en-US", options)} - {new Date(appointment.endTime).toLocaleDateString("en-US", options)}
                        </p>
                    </li>
                )}
            </ul>
        </section>
    )
}