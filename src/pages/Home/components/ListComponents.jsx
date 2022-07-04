export const ListItem = (props) => {
  const value = props.value;
  const allDataTask = JSON.parse(localStorage.getItem('todos'));
  const deleteTask = (value) => {
    console.log('delete ', value)
    const delTask = allDataTask.filter(e => {
      return e !== value
    })
    localStorage.setItem("todos", JSON.stringify(delTask));
    window.location.reload(); // reload untuk sementara
  }

  return (
    <li>
      {value} &nbsp;
      <button type="button" onClick={() => deleteTask(value)}>Del</button>
    </li>
  );
}

export default ListItem;
