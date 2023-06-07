export async function getParkingList() {
  const response = await fetch(`/api/parking-lot`);

  console.log(response);

  return response.json();
}
