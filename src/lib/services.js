/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */

export const sendLoginEmail = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/sendLoginEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}