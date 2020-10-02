function getPlugShare() {
    axios({
        method:'get',
        url: 'https://api.plugshare.com/locations/38606'
    })
    .then(res => console.log(res.json()))
    .catch(err => console.log(err));
}