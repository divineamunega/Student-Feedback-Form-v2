import styles from "./Admin.module.css";

function admin() {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Level</th>
          <th>Feedbacks</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

export default admin;
