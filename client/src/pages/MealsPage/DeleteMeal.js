const handleDelete = (id, meal, setDeletedMeal) => {
  const { public_id } = meal;

  fetch(`/api/meal/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      public_id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setDeletedMeal(true);
    })
    .catch((err) => console.log(err));
};

export default handleDelete;
