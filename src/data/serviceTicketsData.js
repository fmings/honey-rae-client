const _apiUrl = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

//export a function here that gets a ticket by id

export const getServiceTicket = (id) => new Promise((resolve, reject) => {
  fetch(`/api/servicetickets/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
})

export const createServiceTicket = (payload) => new Promise((resolve, reject) => {
  fetch("/api/servicetickets", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export const deleteServiceTicket = (id) => new Promise((resolve, reject) => {
  fetch(`/api/servicetickets/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
})

export const completeServiceTicket = (id) => new Promise((resolve, reject) => {
  fetch(`/api/servicetickets/${id}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
})
